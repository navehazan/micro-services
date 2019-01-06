const { fork } = require("child_process");
const request = require("request-promise-native");

module.exports = class DoughController {
  constructor() {
    this.orderQueue = [];
    this.isOvenActive = false;
  }

  cookPizza(req, res) {
    const order = req.body;
    if (this.isOvenActive) {
      this.orderQueue.push({ req, res });
      return;
    }
    this.isOvenActive = true;
    const oven = fork("./oven.process.js");
    oven.send(order);
    oven.on("message", _order => {
      oven.kill();
      this.isOvenActive = false;
      this.processQueuedOrders();
      this.prepareServePizzaRequest(_order, res)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(err => res.status(500).send(err));
    });
  }

  prepareServePizzaRequest(order) {
    const reqOptions = {
      url: "http://serving:3004/servePizza",
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return request(reqOptions);
  }

  processQueuedOrders() {
    for (let i = 0; i < this.orderQueue.length; i++) {
      if (!this.isOvenActive) {
        const { req, res } = this.orderQueue[i];
        this.cookPizza(req, res);
        this.orderQueue.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }
};
