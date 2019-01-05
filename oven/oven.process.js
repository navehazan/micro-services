
const cook = (order) =>{
  const processStart = new Date();
  console.log(`Oven ${process.pid} Started: ${processStart.toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Oven ${process.pid} Finished: ${new Date().toLocaleTimeString()}`);
    order.prepTime.oven = (processEnd.getTime() - processStart.getTime()) / 1000;
    process.send(order);
  }, 10000);
};

process.on('message', (order)=> cook(order));

