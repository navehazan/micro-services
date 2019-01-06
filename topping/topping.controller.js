const { fork } = require("child_process");
const request = require("request-promise-native");

module.exports = class ToppingController {
  constructor() {
    this.orderQueue = [];
    this.availableToppingChefs = 3;
  }
  prepareToppings(req, res) {
    const order = req.body;
    if (this.availableToppingChefs) {
      this.availableToppingChefs--;
      const toppingChef = fork("./topping.process.js");
      toppingChef.send(order);
      toppingChef.on("message", _order => {
        toppingChef.kill();
        this.availableToppingChefs++;
        this.processQueuedOrders();
        this.prepareOvenRequest(_order)
          .then(response => {
            res.status(200).send(response);
          })
          .catch(err => res.status(500).send(err));
      });
    } else {
      this.orderQueue.push({ req, res });
    }
  }

  prepareOvenRequest(order) {
    const reqOptions = {
      url: "http://oven:3003/cookPizza",
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
      if (this.availableToppingChefs) {
        const { req, res } = this.orderQueue[i];
        this.prepareToppings(req, res);
        this.orderQueue.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }
};
