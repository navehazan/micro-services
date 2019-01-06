# Micro-Services Pizza Restaurant

Pizza restaurant making use of micro-services architecture and child processes in Node JS.<br />
Each micro-service runs in its own Docker container.

The API gateway receives an array of pizza orders, each order contains a 'toppings' array.<br />
The pizza is then passed on to the next station / service, in the following order:<br />
**Dough chef -> Topping chef -> Oven -> Serving.**

Once all the orders have been served, a report is generated, specifying the time it took to prepare each order, and how much time each process took, as well as the total preperation time of all the orders.

The report is then stored in mongoDB, and is returned as the response to the initial request.

A different, more resiliant architechture could make use of a queue manager to communicate between the micro-services.
For example, Amazon Simple Queue Service (SQS), ZeroMQ and others.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js version 8.11.4
- MongoDB version 3.4.14
- Docker

### Installing

- Install Docker on your machine. https://www.docker.com/get-started

- Clone the project. git clone https://github.com/Talb2005/micro-services.git

- From the app root folder run: docker-compose up

### Using

Make a POST request to http://localhost:3000/takeOrders with JSON data.
Each order should have a "toppings" array property.

### Example Input:

```
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
```

### Database Access

To inspect the generated report, connect your favorite MongoDB manager to localhost:27017. 

## Built With

- [Node.js](https://nodejs.org/en/docs/) - Open-source, cross-platform JavaScript run-time environment
- [Express.js](https://expressjs.com/) - Node.js web application framework
- [MongoDB](https://docs.mongodb.com/) - Open-source NoSQL database program
- [Docker](https://docs.docker.com/) - Operating-system-level virtualization (containerization).

## Author

- **Tal Bar**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
