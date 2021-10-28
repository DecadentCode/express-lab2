// require the express module
import express from "express";

// create a new Router object
const pizzaRouter = express.Router();

const toppingsArray: string[] = [
  "mushroom",
  "pepperoni",
  "onions",
  "ham",
  "bacon",
  "pineapple",
  "green peppers",
  "black olives",
  "spinach",
  "sausage",
];

pizzaRouter.get("/", (req, res) => {
  res.render("homepage");
});

pizzaRouter.get("/specialty", (req, res) => {
  const { name, price } = req.query;
  res.render("specialty", { name, price });
});

pizzaRouter.get("/review", (req, res) => {
  res.render("review");
});

pizzaRouter.post("/review-confirmation", (req, res) => {
  res.render("review-confirmation", req.body);
});

pizzaRouter.get("/custom-pizza", (req, res) => {
  res.render("custom-pizza", { toppingsArray });
});

pizzaRouter.post("/your-pizza", (req, res) => {
  const size: string = req.body.size;
  const toppings: number = parseInt(req.body.toppings);
  const glutenFree: string = req.body.gluten;
  let cost: number = 0;
  let delivery: string = "";
  if (size === "small") {
    cost += 7 + toppings * 0.5;
  } else if (size === "medium") {
    cost += 10 + toppings * 1;
  } else {
    cost += 12 + toppings * 1.25;
  }
  if (glutenFree === "on") {
    cost += 2;
  }
  if (cost >= 15) {
    delivery =
      "Because your order meets the $15.00 minimum, you get FREE DELIVERY!";
  }
  const totalCost: string = cost.toFixed(2);
  res.render("your-pizza", { size, toppings, glutenFree, totalCost, delivery });
});

export default pizzaRouter;
