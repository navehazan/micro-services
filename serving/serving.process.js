
const serve = (order) =>{
  console.log(`Waiter ${process.pid} Started: ${new Date().toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Waiter ${process.pid} Finished: ${processEnd.toLocaleTimeString()}`);
    order.prepTime.serving = (processEnd.getTime() - new Date(order.prepTime.serving).getTime()) / 1000;
    order.prepTime.completedAt = processEnd.toLocaleString();
    process.send(order);
  }, 5000);
};

process.on('message', (order)=> serve(order));

