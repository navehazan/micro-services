const makeDough = (order) =>{
  const processStart = new Date();
  console.log(`Dough Chef ${process.pid} Started: ${processStart.toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Dough Chef ${process.pid} Finished: ${processEnd.toLocaleTimeString()}`);
    order.prepTime.dough = (processEnd.getTime() - processStart.getTime()) / 1000;
    process.send(order);
  }, 7000);
};

process.on('message', (order)=> makeDough(order));

