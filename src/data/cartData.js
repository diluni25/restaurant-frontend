import chicken from "../assets/cart/chicken.png";
import burrata from "../assets/cart/burrata.png";
import tart from "../assets/cart/tart.png";
import bread from "../assets/cart/bread.png";

export const products = [
  {
    id: "chicken",
    name: "Wood-fired chicken",
    price: 28,
    category: "From the hearth",
    image: chicken,
  },
  {
    id: "burrata",
    name: "Heirloom burrata",
    price: 18,
    category: "Starters",
    image: burrata,
  },
  {
    id: "tart",
    name: "Dark chocolate tart",
    price: 12,
    category: "Desserts",
    image: tart,
  },
  {
    id: "bread",
    name: "Hearth-baked sourdough",
    price: 8,
    category: "Sides",
    image: bread,
  },
];

export const money = (value) => `$${value.toFixed(2)}`;
