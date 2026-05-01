import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db.js";
import productRoutes from "./DBRoutes/ProductsRoutes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json()); //allows us to parse JSON bodies in requests

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use("/api/products", productRoutes); // Use the product routes for /api/products endpoints

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port http://localhost:' + PORT);
});


// MERNdb2026

//60 minutes