
const cook = (order) =>{
  console.log(`Oven ${process.pid} Started: ${new Date().toLocaleTimeString()}`);
  setTimeout(() => {
    const processEnd = new Date();
    console.log(`Oven ${process.pid} Finished: ${new Date().toLocaleTimeString()}`);
    order.prepTime.oven = (processEnd.getTime() - new Date(order.prepTime.oven).getTime()) / 1000;
    process.send(order);
  }, 10000);
};

process.on('message', (order)=> cook(order));

