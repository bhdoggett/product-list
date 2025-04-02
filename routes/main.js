import express from "express";
import faker from "faker";
import { Product, Review } from "../models/product.js";
const router = express.Router();

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();
      let reviews = await Promise.all(
        Array.from({ length: 3 }, async () => {
          const review = new Review({
            userName: faker.internet.userName(),
            text: faker.lorem.sentence(),
            product: product._id,
          });
          return await review.save();
        })
      );

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";
      product.reviews = reviews;

      product.save().catch((err) => {
        if (err) throw err;
      });
    }
    return res.status(200).json({ message: "Fake data added to database" });
  } catch (err) {
    console.error(err);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);

    if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({ message: "Valid 'page' parameter required" });
    }

    const productsPerPage = 9;
    const pageOfProducts = await Product.find()
      .skip((page - 1) * productsPerPage)
      .limit(productsPerPage)
      .populate({
        path: "reviews",
        select: "userName text -_id",
      });

    return res.status(200).json(pageOfProducts);
  } catch (err) {
    next(err);
  }
});

export default router;
