import express from "express";
import faker from "faker";
import Product from "../models/product.js";
const router = express.Router();

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save().catch((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", async (req, res, next) => {
  const page = req.params.page
  
  
  const products = await Product.find()
  const 
})

export default router;
