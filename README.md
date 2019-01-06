






# micro-services

Pizza restaurant making use of micro-services architechture and child processes in Node JS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Node.js version 8.11.4 
* MongoDB version 3.4.14

What things you need to install the software and how to install them

```
Give examples
```

### Installing

Install (npm i) and run (node index.js) each micro-service in a seperate terminal. (api, dough, toppings, oven, serving).

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

