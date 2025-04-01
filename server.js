import mongoose from "mongoose";
import express from "express";
import mainRoutes from "./routes/main.js";

const app = express();

const PORT = 8000;

mongoose.connect("mongodb://localhost/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRoutes);

app.listen(8000, () => console.log(`Node.js listening on port ${PORT}`));
