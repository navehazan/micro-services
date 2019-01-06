const {fork} = require('child_process');

module.exports = class DoughController {
  constructor() {
    this.orderQueue = [];
    this.availableWaiters = 2;
  }

  servePizza(req, res) {
    const order = req.body;
    if (!order.prepTime.serving) {
      order.prepTime.serving = new Date();
    }
    if (this.availableWaiters) {
      this.availableWaiters--;
      const waiter = fork('./serving.process.js');
      waiter.send(order);
      waiter.on('message', (_order) =>{
        waiter.kill();
        this.availableWaiters++;
        this.processQueuedOrders();
        res.status(200).send(_order);
      });
    } else {
      this.orderQueue.push({req, res});
    }
  }

  processQueuedOrders() {
    for (let i = 0; i < this.orderQueue.length; i++) {
      if (this.availableWaiters) {
        const {req, res} = this.orderQueue[i];
        this.servePizza(req, res);
        this.orderQueue.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }
};
