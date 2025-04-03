import mongoose from "mongoose";
import { StringDecoder } from "string_decoder";

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const reviewSchema = new mongoose.Schema({
  userName: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  text: String,
});

export const Product = mongoose.model("Product", productSchema);

export const Review = mongoose.model("Review", reviewSchema);
