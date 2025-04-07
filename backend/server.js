import mongoose from "mongoose";
import express from "express";
import mainRoutes from "./routes/main.js";
import cors from "cors";
const PORT = process.env.Port || 8000;

const app = express();
app.use(cors());
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

mongoose.connect("mongodb://localhost/products");

app.listen(PORT, () => console.log(`Node.js listening on port ${PORT}`));
