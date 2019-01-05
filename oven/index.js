const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const OvenController = require('./oven.controller');
const ovenController = new OvenController();
app.use(bodyParser.json());

app.post('/cookPizza', (req, res)=> ovenController.cookPizza(req, res));

app.listen(3003, ()=>{
  console.log('Oven Service listening on port 3003');
});

