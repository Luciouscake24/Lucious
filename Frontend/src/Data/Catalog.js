/* =====================================================
   🎂 LEVEL 1 — MAIN CATEGORIES (Navbar / SubNavbar)
===================================================== */
export const categories = [
  { id: "birthday", name: "Birthday Cakes" },
  { id: "anniversary", name: "Anniversary Cakes" },
  { id: "trending", name: "Trending Cakes" },
  { id: "photo", name: "Photo Cakes" },
  { id: "flavour", name: "Cake By Flavour" },
  { id: "occasional", name: "Occasional Cakes" },
  { id: "eggless", name: "Eggless Cakes" },
  { id: "custom", name: "Custom Cakes" },
  { id: "foryou", name: "Cakes For You" }
];


/* =====================================================
   🍩 LEVEL 2 — COLLECTIONS (Cards inside categories)
===================================================== */
export const collections = [

  // TRENDING
  { id:"pinata", name:"Pinata Cakes", categoryId:"trending",
    img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800" },

  { id:"pullmeup", name:"Pull Me Up Cakes", categoryId:"trending",
    img:"https://images.unsplash.com/photo-1605475128023-7c0c9f99c4bb?q=80&w=800" },

  { id:"bento", name:"Bento Cakes", categoryId:"trending",
    img:"https://images.unsplash.com/photo-1586788680434-30d3241c9d8a?q=80&w=800" },

  { id:"bomb", name:"Bomb Cakes", categoryId:"trending",
    img:"https://images.unsplash.com/photo-1551024709-8f23befc6c7f?q=80&w=800" },


  // BIRTHDAY
  { id:"kids", name:"Kids Theme Cakes", categoryId:"birthday",
    img:"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800" },

  { id:"unicorn", name:"Unicorn Cakes", categoryId:"birthday",
    img:"https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=800" },

  { id:"rainbow", name:"Rainbow Cakes", categoryId:"birthday",
    img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800" },

  { id:"number", name:"Number Cakes", categoryId:"birthday",
    img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800" },


  // ANNIVERSARY
  { id:"heart", name:"Heart Cakes", categoryId:"anniversary",
    img:"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800" },

  { id:"golden", name:"Golden Cakes", categoryId:"anniversary",
    img:"https://images.unsplash.com/photo-1551024709-8f23befc6c7f?q=80&w=800" },


  // PHOTO
  { id:"photoprint", name:"Photo Print Cakes", categoryId:"photo",
    img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },


  // FLAVOUR
  { id:"chocolate", name:"Chocolate Cakes", categoryId:"flavour",
    img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800" },

  { id:"vanilla", name:"Vanilla Cakes", categoryId:"flavour",
    img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476a?q=80&w=800" },

  { id:"butterscotch", name:"Butterscotch Cakes", categoryId:"flavour",
    img:"https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=800" }
];


/* =====================================================
   🎉 OCCASIONS (Celebration section)
===================================================== */
export const occasions = [
  { id:"valentine", name:"Valentine’s Day", date:"14 Feb",
    img:"https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=800" },

  { id:"womens", name:"Women’s Day", date:"8 Mar",
    img:"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800" },

  { id:"mothers", name:"Mother’s Day", date:"12 May",
    img:"https://images.unsplash.com/photo-1599785209707-28d06f84a7db?q=80&w=800" },

  { id:"fathers", name:"Father’s Day", date:"16 Jun",
    img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },

  { id:"friendship", name:"Friendship Day", date:"4 Aug",
    img:"https://images.unsplash.com/photo-1529336953121-ad1d6c7c1f3d?q=80&w=800" },

  { id:"christmas", name:"Christmas", date:"25 Dec",
    img:"https://images.unsplash.com/photo-1543584756-315b5b4f1b7f?q=80&w=800" }
];


/* =====================================================
   🎯 FILTER TAGS (CakeFilter section)
===================================================== */
export const filterTags = [
  { id:"custom", name:"Customized" },
  { id:"fresh", name:"Fresh Arrivals" },
  { id:"surprise", name:"Surprise Box" },
  { id:"combos", name:"Combos" },
  { id:"premium", name:"Premium" },
  { id:"heart-shape", name:"Heart Shape" },
  { id:"cupcake", name:"Cup Cake" },
  { id:"photo", name:"Photo Cake" }
];


/* =====================================================
   🍰 LEVEL 3 — PRODUCTS (MAIN DATABASE)
===================================================== */
export const products = [

  // 🍫 PINATA
  {
    id:1,
    name:"Chocolate Pinata Cake",
    price:1299,
    categoryId:"trending",
    collectionId:"pinata",
    occasionId:"valentine",
    flavour:"chocolate",
    diet:"egg",
    cream:"truffle",
    weight:"1kg",
    tags:["premium","surprise"],
    img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800"
  },

  {
    id:2,
    name:"Surprise Pinata Cake",
    price:1399,
    categoryId:"trending",
    collectionId:"pinata",
    occasionId:"friendship",
    flavour:"chocolate",
    diet:"eggless",
    cream:"truffle",
    weight:"1kg",
    tags:["surprise"],
    img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800"
  },

  {
    id:3,
    name:"Pull Me Up Chocolate Cake",
    price:999,
    categoryId:"trending",
    collectionId:"pullmeup",
    occasionId:"birthday",
    flavour:"chocolate",
    diet:"egg",
    cream:"whipped",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=800"
  },

  {
    id:4,
    name:"Cute Bento Cake",
    price:599,
    categoryId:"trending",
    collectionId:"bento",
    occasionId:"womens",
    flavour:"vanilla",
    diet:"eggless",
    cream:"buttercream",
    weight:"500g",
    tags:["cupcake"],
    img:"https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=800"
  },

  {
    id:5,
    name:"Chocolate Bomb Cake",
    price:1499,
    categoryId:"trending",
    collectionId:"bomb",
    occasionId:"christmas",
    flavour:"chocolate",
    diet:"egg",
    cream:"truffle",
    weight:"1kg",
    tags:["premium"],
    img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800"
  },

  // 🎂 BIRTHDAY
  {
    id:6,
    name:"Kids Theme Cake",
    price:999,
    categoryId:"birthday",
    collectionId:"kids",
    occasionId:"birthday",
    flavour:"vanilla",
    diet:"egg",
    cream:"whipped",
    weight:"1kg",
    tags:["custom"],
    img:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=800"
  },

  {
    id:7,
    name:"Unicorn Birthday Cake",
    price:1299,
    categoryId:"birthday",
    collectionId:"unicorn",
    occasionId:"mothers",
    flavour:"strawberry",
    diet:"eggless",
    cream:"buttercream",
    weight:"1kg",
    tags:["premium"],
    img:"https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=800"
  },

  {
    id:8,
    name:"Rainbow Cake",
    price:899,
    categoryId:"birthday",
    collectionId:"rainbow",
    occasionId:"birthday",
    flavour:"vanilla",
    diet:"egg",
    cream:"whipped",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=800"
  },

  {
    id:9,
    name:"Number Cake",
    price:1199,
    categoryId:"birthday",
    collectionId:"number",
    occasionId:"birthday",
    flavour:"butterscotch",
    diet:"eggless",
    cream:"buttercream",
    weight:"1kg",
    tags:["custom"],
    img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800"
  },

  {
    id:10,
    name:"Chocolate Kids Cake",
    price:1099,
    categoryId:"birthday",
    collectionId:"kids",
    occasionId:"birthday",
    flavour:"chocolate",
    diet:"egg",
    cream:"truffle",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1551024709-8f23befc6c7f?q=80&w=800"
  },

  // ❤️ ANNIVERSARY
  {
    id:11,
    name:"Heart Shape Cake",
    price:1099,
    categoryId:"anniversary",
    collectionId:"heart",
    occasionId:"valentine",
    flavour:"red velvet",
    diet:"eggless",
    cream:"whipped",
    weight:"1kg",
    tags:["heart-shape"],
    img:"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800"
  },

  {
    id:12,
    name:"Golden Anniversary Cake",
    price:1599,
    categoryId:"anniversary",
    collectionId:"golden",
    occasionId:"anniversary",
    flavour:"butterscotch",
    diet:"egg",
    cream:"buttercream",
    weight:"1kg",
    tags:["premium"],
    img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476a?q=80&w=800"
  },

  {
    id:13,
    name:"Red Velvet Heart Cake",
    price:1299,
    categoryId:"anniversary",
    collectionId:"heart",
    occasionId:"valentine",
    flavour:"red velvet",
    diet:"eggless",
    cream:"whipped",
    weight:"1kg",
    tags:["premium"],
    img:"https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=800"
  },

  // 🍫 FLAVOUR COLLECTION
  {
    id:14,
    name:"Chocolate Truffle Cake",
    price:899,
    categoryId:"flavour",
    collectionId:"chocolate",
    occasionId:"birthday",
    flavour:"chocolate",
    diet:"egg",
    cream:"truffle",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800"
  },

  {
    id:15,
    name:"Vanilla Cream Cake",
    price:799,
    categoryId:"flavour",
    collectionId:"vanilla",
    occasionId:"birthday",
    flavour:"vanilla",
    diet:"eggless",
    cream:"whipped",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476a?q=80&w=800"
  },

  {
    id:16,
    name:"Butterscotch Cake",
    price:849,
    categoryId:"flavour",
    collectionId:"butterscotch",
    occasionId:"birthday",
    flavour:"butterscotch",
    diet:"egg",
    cream:"buttercream",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=800"
  },

  // 🧁 EXTRA PRODUCTS
  {
    id:17,
    name:"Mini Chocolate Cake",
    price:499,
    categoryId:"trending",
    collectionId:"bento",
    occasionId:"friendship",
    flavour:"chocolate",
    diet:"eggless",
    cream:"truffle",
    weight:"500g",
    tags:["cupcake"],
    img:"https://images.unsplash.com/photo-1586788680434-30d3241c9d8a?q=80&w=800"
  },

  {
    id:18,
    name:"Strawberry Cream Cake",
    price:999,
    categoryId:"flavour",
    collectionId:"vanilla",
    occasionId:"mothers",
    flavour:"strawberry",
    diet:"eggless",
    cream:"whipped",
    weight:"1kg",
    tags:["premium"],
    img:"https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=800"
  },

  {
    id:19,
    name:"Black Forest Cake",
    price:899,
    categoryId:"flavour",
    collectionId:"chocolate",
    occasionId:"birthday",
    flavour:"chocolate",
    diet:"egg",
    cream:"whipped",
    weight:"1kg",
    tags:["fresh"],
    img:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=800"
  },

  {
    id:20,
    name:"Premium Wedding Cake",
    price:2999,
    categoryId:"custom",
    collectionId:"golden",
    occasionId:"anniversary",
    flavour:"vanilla",
    diet:"egg",
    cream:"buttercream",
    weight:"2kg",
    tags:["premium","custom"],
    img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800"
  }
];