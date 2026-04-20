import express from "express";
import { getproducts, createproducts, deleteproducts, updateproducts } from "../controllers/ProductController.js";

const router = express.Router();

export default router;

router.post('/', createproducts);

router.get('/', getproducts);

router.delete('/:id', deleteproducts );

router.put('/:id', updateproducts );