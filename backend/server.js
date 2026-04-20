import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db.js";
import productRoutes from "./DBRoutes/ProductsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows us to parse JSON bodies in requests

app.use("/api/products", productRoutes); // Use the product routes for /api/products endpoints

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port http://localhost:5000');
});


// MERNdb2026

//60 minutes