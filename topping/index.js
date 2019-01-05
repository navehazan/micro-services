const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ToppingController = require('./topping.controller');
const toppingController = new ToppingController();
app.use(bodyParser.json());

app.post('/prepareToppings', (req, res)=> toppingController.prepareToppings(req, res));

app.listen(3002, ()=>{
  console.log('Topping Service listening on port 3002');
});

