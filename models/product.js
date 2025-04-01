import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
