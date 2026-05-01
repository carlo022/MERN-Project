import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db.js";
import productRoutes from "./DBRoutes/ProductsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows us to parse JSON bodies in requests

const PORT = process.env.PORT;

app.use("/api/products", productRoutes); // Use the product routes for /api/products endpoints

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port http://localhost:' + PORT);
});


// MERNdb2026

//60 minutes