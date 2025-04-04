import express from "express";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product, Review } from "../models/product.js";
import validateProduct from "../middleware/validateProduct.js";
import validatePageFormat from "../middleware/validatePageFormat.js";
// import * as res from "express/lib/response";
const router = express.Router();

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

router.get("/products", validatePageFormat, async (req, res, next) => {
  try {
    // page is added to the request object by the validatePageFormat middleware.
    const page = req.page;
    const productsPerPage = 9;

    const result = await Product.aggregate([
      {
        $facet: {
          data: [
            { $skip: (page - 1) * productsPerPage },
            { $limit: productsPerPage },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const pageOfProducts = result[0].data;
    const totalCount = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / productsPerPage);

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found" });
    }

    return res.status(200).json(pageOfProducts);
  } catch (err) {
    next(err);
  }
});

router.get("/products/:productId", validateProduct, async (req, res, next) => {
  try {
    const product = req.product;

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/products/:productId/reviews",
  validateProduct,
  validatePageFormat,
  async (req, res, next) => {
    try {
      const product = req.product;

      await product.populate({
        path: "reviews",
        select: "userName text",
      });

      const reviews = product.reviews;

      if (reviews.length === 0)
        return res.status(404).json({ message: "No reviews found" });

      // page is added to the request object by the validatePageFormat middleware.
      const page = req.page;

      // If page is null
      if (!page) return res.status(200).json(reviews);
      const reviewsPerPage = 4;

      // if page is greater than the required number of pages to display the results
      if (page > Math.ceil(reviews.length / reviewsPerPage)) {
        return res.status(404).json({ message: "Page not found" });
      }

      const pagenatedReviews = reviews.slice(
        (page - 1) * reviewsPerPage,
        page * reviewsPerPage
      );
      // const pagenatedReviews = await Review.find({
      //   _id: { $in: product.reviews },
      // })
      //   .skip((page - 1) * reviewsPerPage)
      //   .limit(reviewsPerPage);
      return res.status(200).json(pagenatedReviews);
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
  validateProduct,
  async (req, res, next) => {
    try {
      // const product = req.product;
      const { userName, text } = req.body;
      const review = new Review({
        userName,
        text,
        product: new mongoose.Types.ObjectId(req.params.productId),
      });

      review.save();
      await Product.findByIdAndUpdate(req.params.productId, {
        $push: { reviews: review._id },
      });

      return res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/products/:productId",
  validateProduct,
  async (req, res, next) => {
    try {
      await Product.deleteOne({ _id: req.product._id });
      return res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      next(err);
    }
  }
);
export default router;
