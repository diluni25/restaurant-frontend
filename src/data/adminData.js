import chicken from "../assets/admin/chicken.png";
import burrata from "../assets/admin/burrata.png";
import carrots from "../assets/admin/carrots.png";
import risotto from "../assets/admin/risotto.png";
import bread from "../assets/admin/bread.png";
import tart from "../assets/admin/tart.png";

import maya from "../assets/admin/maya.png";
import luca from "../assets/admin/luca.png";
import amara from "../assets/admin/amara.png";

export const initialCategories = [
  "Starters",
  "From the hearth",
  "Sides",
  "Desserts",
];

export const initialMenu = [
  {
    id: "EG-M001",
    name: "Heirloom burrata",
    description:
      "Creamy burrata, ripe heirloom tomatoes, basil oil and toasted sourdough.",
    category: "Starters",
    price: 18,
    label: "Vegetarian",
    image: burrata,
    published: true,
  },
  {
    id: "EG-M002",
    name: "Ember-roasted carrots",
    description:
      "Fire-kissed carrots, whipped tahini, pomegranate and toasted pistachio.",
    category: "Starters",
    price: 14,
    label: "Vegan",
    image: carrots,
    published: true,
  },
  {
    id: "EG-M003",
    name: "Wood-fired chicken",
    description:
      "Free-range chicken, charred lemon, rosemary jus and crispy potatoes.",
    category: "From the hearth",
    price: 28,
    label: "House favorite",
    image: chicken,
    published: true,
  },
  {
    id: "EG-M004",
    name: "Wild mushroom risotto",
    description:
      "Arborio rice, woodland mushrooms, aged parmesan and black truffle.",
    category: "From the hearth",
    price: 24,
    label: "Vegetarian",
    image: risotto,
    published: true,
  },
  {
    id: "EG-M005",
    name: "Hearth-baked sourdough",
    description:
      "Our slow-fermented sourdough, cultured butter and flaky sea salt.",
    category: "Sides",
    price: 8,
    label: "Freshly baked",
    image: bread,
    published: true,
  },
  {
    id: "EG-M006",
    name: "Dark chocolate tart",
    description:
      "70% dark chocolate, crisp cocoa pastry, sea salt and vanilla cream.",
    category: "Desserts",
    price: 12,
    label: "House favorite",
    image: tart,
    published: true,
  },
];

export const initialChefs = [
  {
    id: "EG-C001",
    name: "Maya Bennett",
    title: "Executive Chef",
    bio: "Maya brings a decade of seasonal cooking to our hearth. Her food celebrates local growers, slow craft and the simple pleasure of sharing a meal.",
    specialties: ["Wood-fire cooking", "Seasonal American"],
    image: maya,
    published: true,
  },
  {
    id: "EG-C002",
    name: "Luca Rossi",
    title: "Sous Chef",
    bio: "Raised around his family’s table in Emilia-Romagna, Luca brings precision and generosity to handmade grains, woodland mushrooms and the daily rhythm of our kitchen.",
    specialties: ["Italian cuisine", "Handmade pasta"],
    image: luca,
    published: true,
  },
  {
    id: "EG-C003",
    name: "Amara Okafor",
    title: "Pastry Chef",
    bio: "Amara finds the sweet spot between comfort and curiosity. Her desserts pair deep chocolate, seasonal fruit and beautifully textured pastry for a memorable final bite.",
    specialties: ["Artisan pastry", "Chocolate"],
    image: amara,
    published: true,
  },
];
