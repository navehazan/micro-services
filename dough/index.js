const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const DoughController = require('./dough.controller');
const doughController = new DoughController();
app.use(bodyParser.json());

app.post('/prepareDough', (req, res)=> doughController.prepareDough(req, res));

app.listen(3001, ()=>{
  console.log('Dough Service listening on port 3001');
});

