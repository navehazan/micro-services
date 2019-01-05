
const serve = (order) =>{
  const processStart = new Date();
  console.log(`Waiter ${process.pid} Started: ${processStart.toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Waiter ${process.pid} Finished: ${processEnd.toLocaleTimeString()}`);
    order.prepTime.serving = (processEnd.getTime() - processStart.getTime()) / 1000;
    order.prepTime.completedAt = processEnd.toLocaleString();
    process.send(order);
  }, 5000);
};

process.on('message', (order)=> serve(order));

