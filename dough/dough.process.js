const makeDough = (order) =>{
  console.log(`Dough Chef ${process.pid} Started: ${new Date().toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Dough Chef ${process.pid} Finished: ${processEnd.toLocaleTimeString()}`);
    order.prepTime.dough = (processEnd.getTime() - new Date(order.prepTime.dough).getTime()) / 1000;
    process.send(order);
  }, 7000);
};

process.on('message', (order)=> makeDough(order));

