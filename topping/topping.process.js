const _ = require('lodash');

const addTwoToppingsPromise = (chunk) =>{
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(chunk);
    }, 4000);
  });
};

const addToppings = async (order) =>{
  const processStart = new Date();
  console.log(`Topping Chef ${process.pid} Started: ${processStart.toLocaleTimeString()}`);
  const {toppings} = order;
  const chunks = _.chunk(toppings, 2);
  for (const chunk of chunks) {
    await addTwoToppingsPromise(chunk);
  }
  const processEnd = new Date();
  console.log(`Topping Chef ${process.pid} Finished: ${processEnd.toLocaleTimeString()}`);
  order.prepTime.toppings = (processEnd.getTime() - processStart.getTime()) / 1000;
  process.send(order);
};


process.on('message', (order)=> addToppings(order));

