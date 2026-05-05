import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connection/db.js";
import productRoutes from "./DBRoutes/ProductsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows us to parse JSON bodies in requests

// Enable CORS so your Vercel frontend can access this API
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.FRONTEND_URL || ""
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const PORT = process.env.PORT;

app.use("/api/products", productRoutes); // Use the product routes for /api/products endpoints

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port http://localhost:' + PORT);
});