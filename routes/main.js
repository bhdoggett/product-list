import express from "express";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product, Review } from "../models/product.js";
const router = express.Router();

// Middlware for routes that need to get a specific product
const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const product = await Product.findById(req.params.productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  req.product = product;
  next();
};

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();
      let reviews = await Promise.all(
        Array.from({ length: 12 }, async () => {
          const review = new Review({
            userName: faker.internet.username(),
            text: faker.lorem.sentence(),
            product: product._id,
          });
          return await review.save();
        })
      );

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = parseFloat(
        faker.commerce.price({ min: 1, max: 500, dec: 2 })
      );
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

router.get("/products/:productId", getProduct, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/products/:productId/reviews",
  getProduct,
  async (req, res, next) => {
    try {
      const product = req.product;

      const reviews = await Review.find({ _id: { $in: product.reviews } });

      if (!reviews)
        return res.status(404).json({ message: "No reviews found" });

      const page = parseInt(req.query.page);

      if (page) {
        const reviewsPerPage = 4;
        const pagenatedReviews = await Review.find({
          _id: { $in: product.reviews },
        })
          .skip((page - 1) * reviewsPerPage)
          .limit(reviewsPerPage);
        return res.status(200).json(pagenatedReviews);
      } else {
        return res.status(200).json(reviews);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post("/products", async (req, res, next) => {
  try {
    const { category, name, price, image } = req.body;

    if (!category || !name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      category,
      name,
      price: parseFloat(price),
      image,
      reviews: [],
    });

    await product.save();

    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/products/:productId/reviews",
  getProduct,
  async (req, res, next) => {
    try {
      const product = req.product;

      const review = new Review({
        userName,
        text,
        product: mongoose.Types.ObjectId(req.params.productId),
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
