import mongoose from "mongoose";
import express from "express";
import mainRoutes from "./routes/main.js";

const app = express();

const PORT = 8000;

mongoose.connect("mongodb://localhost/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRoutes);

// Global error handleing
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal servor error", error: err.message });
});

app.listen(8000, () => console.log(`Node.js listening on port ${PORT}`));
