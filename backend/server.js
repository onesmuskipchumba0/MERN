import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  connectDB();
});
