const request = require('request-promise-native');

module.exports = class ApiGatewayController {
  constructor(db) {
    this.db = db;
  }

  async takeOrders(req, res) {
    const orders = req.body;
    const ordersReceivedAt = new Date();
    console.log(`API Gateway received ${orders.length} new pizza orders at ${ordersReceivedAt.toLocaleTimeString()}`);
    const orderRequestsStack = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      order.id = i+1;
      order.prepTime = {receivedAt: ordersReceivedAt.toLocaleString()};
      orderRequestsStack.push(this.prepareDoughRequest(order));
    }

    try {
      const completedOrders = await Promise.all(orderRequestsStack);
      const ordersCompletedAt = new Date();
      const report = this.generateReport(completedOrders, ordersReceivedAt, ordersCompletedAt);
      console.log('Report', report);
      res.status(200).send(report);
      console.log(`API Gateway served ${completedOrders.length} pizza orders at ${ordersCompletedAt.toLocaleTimeString()}`);
    } catch (error) {
      console.log('Error', error);
      res.status(500).send(error);
    }
  }
  prepareDoughRequest(order) {
    const reqOptions = {
      url: 'http://localhost:3001/prepareDough',
      method: 'post',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      }};
    return request(reqOptions);
  }

  generateReport(completedOrders, ordersReceivedAt, ordersCompletedAt) {
    const report = {
      totalPreperationTime: (ordersCompletedAt.getTime() - ordersReceivedAt.getTime()) / 1000,
      orders: completedOrders.map((order) => {
        order = JSON.parse(order);
        const startTime = new Date(order.prepTime.receivedAt).getTime();
        const finishTime = new Date(order.prepTime.completedAt).getTime();
        order.prepTime.total = (finishTime - startTime) / 1000;
        return order;
      }),
    };
    this.db.collection('reports').insertOne(report);
    return report;
  }
};


