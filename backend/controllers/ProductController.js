import Product from '../DBModels/Products.js';
import mongoose from 'mongoose';

export const createproducts = async (req, res) => {
  const product = req.body;
  // Here you would typically save the product to the database
  if(!product.name || !product.price || !product.Image || !product.description) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newProduct = new Product(product);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save product' });
  }
};

export const getproducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products, Message: 'Products fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


export const deleteproducts = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, deletedProduct, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


export const updateproducts = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, updatedProduct, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
};