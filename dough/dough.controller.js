const {fork} = require('child_process');
const request = require('request-promise-native');

module.exports = class DoughController {
  constructor() {
    this.orderQueue = [];
    this.availableDoughChefs = 2;
  }

  /**
   * Get single order -> deligate to available chef ->
   * make request to toppings service -> send response back to API Gateway
   *
   * @param {*} req
   * @param {*} res
   */
  prepareDough(req, res) {
    const order = req.body;
    if (!order.prepTime.dough) {
      order.prepTime.dough = new Date();
    }
    if (this.availableDoughChefs) {
      this.availableDoughChefs--;
      const doughChef = fork('./dough.process.js');
      doughChef.send(order);
      doughChef.on('message', (_order) => {
        doughChef.kill();
        this.availableDoughChefs++;
        this.processQueuedOrders();
        this.prepareToppingsRequest(_order)
            .then((response) => {
              res.status(200).send(response);
            })
            .catch((err) => res.status(500).send(err));
      });
    } else {
      this.orderQueue.push({req, res});
    }
  }

  /**
   * returns an HTTP Request Promise to Toppings Service -> prepareToppings.
   *
   * @param {*} order
   * @return {Promise}
   */
  prepareToppingsRequest(order) {
    const reqOptions = {
      url: 'http://topping:3002/prepareToppings',
      method: 'post',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return request(reqOptions);
  }

  /**
   * If there are queued orders, and a Dough Chef is available, call prepareDough with queued order,
   * and update the queue.
   *
   */
  processQueuedOrders() {
    for (let i = 0; i < this.orderQueue.length; i++) {
      if (this.availableDoughChefs) {
        const {req, res} = this.orderQueue[i];
        this.prepareDough(req, res);
        this.orderQueue.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }
};
