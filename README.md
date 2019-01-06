






# micro-services

Pizza restaurant making use of micro-services architechture and child processes in Node JS.

The API gateway receives an array of pizza orders, each order contains a 'toppings' array.
The pizza is then passed on to the next station, in the following order Dough chef -> Topping chef -> Oven -> Serving.
Once all the orders have been served, a report is generated, specifying the time it took to prepare each order, and how much time each process took, as well as the total preperation time of all the orders. 
The report is then stored in mongoDB, and is returned as the response to the initial request.  

A different, more resiliant architechture could make use of a queue manager, such as Amazon Simple Queue Service (SQS), ZeroMQ and others. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
* Node.js version 8.11.4 
* MongoDB version 3.4.14

### Installing

* First, install MongoDB https://www.mongodb.com/download-center version 3.4.14. 
Once installed, open a new terminal, and run the command - mongod

* Second, install and run each micro-service seperately (api, dough, toppings, oven, serving):
```
cd api
npm i
node index.js
```
```
cd dough
npm i
node index.js
```
```
cd toppings
npm i
node index.js
```
```
cd oven
npm i
node index.js
```
```
cd serving
npm i
node index.js
```

Make a POST request to http://localhost:3000/takeOrders with JSON data.
Each order should have a "toppings" array property. 

Example data:
[
  {
    "toppings": [
      "olives",
      "pepperony",
      "jalapinio",
      "mushrooms"
    ]
  },
  {
    "toppings": [
      "pepperony",
      "jalapinio",
      "extra cheese"
    ]
  }  
]


## Built With

* [Node.js](https://nodejs.org/en/docs/) - Open-source, cross-platform JavaScript run-time environment 
* [Express.js](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://docs.mongodb.com/) - Open-source NoSQL database program


## Author

* **Tal Bar**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

