# micro-services
Pizza restaurant making use of micro-services architechture and child processes in Node JS.

Install and run each service in a seperate terminal. (api, dough, toppings, oven, serving).

Make a POST request to http://localhost:3000/takeOrders with JSON data.
Each order has a "toppings" array property. 

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
