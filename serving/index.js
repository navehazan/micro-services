const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ServingController = require('./serving.controller');
const servingController = new ServingController();
app.use(bodyParser.json());

app.post('/servePizza', (req, res)=> servingController.servePizza(req, res));

app.listen(3004, ()=>{
  console.log('Serving Service listening on port 3004');
});

