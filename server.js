import mongoose from "mongoose";
import express from "express";
import mainRoutes from "./routes/main.js";

const app = express();

const PORT = 8000;

mongoose.connect("mongodb://localhost/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(8000, () => console.log(`Node.js listening on port ${PORT}`));
