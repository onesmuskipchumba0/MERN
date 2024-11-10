import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  connectDB();
});
