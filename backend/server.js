import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connection/db.js";
import productRoutes from "./DBRoutes/ProductsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows us to parse JSON bodies in requests

// Enable CORS so your Vercel frontend can access this API
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? "https://your-project-name.vercel.app" // You will get this from Vercel
    : "http://localhost:5173", // Default Vite port
  credentials: true
}));

const PORT = process.env.PORT;

app.use("/api/products", productRoutes); // Use the product routes for /api/products endpoints

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port http://localhost:' + PORT);
});