import { Product } from "../models/product.js";
import mongoose from "mongoose";

// Middlware for routes that need to get a specific product
const validateProduct = async (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const product = await Product.findById(req.params.productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  req.product = product;
  next();
};

export default validateProduct;
