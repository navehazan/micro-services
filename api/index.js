const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const ApiGatewayController = require('./api.controller');
const app = express();

const url = 'mongodb://localhost:27017';

app.use(bodyParser.json());

MongoClient.connect(url, {useNewUrlParser: true}, (err, client)=> {
  if (err) {
    throw new Error('Error while connecting to mongoDB.');
  }
  const db = client.db('pizzeria');
  const apiGatewayController = new ApiGatewayController(db);

  app.post('/takeOrders', (req, res)=> apiGatewayController.takeOrders(req, res));
  app.listen(3000, ()=>{
    console.log(`Pizzeria API Gateway listening on port 3000`);
  });
  app.on('close', ()=>{
    client.close();
  });
});


