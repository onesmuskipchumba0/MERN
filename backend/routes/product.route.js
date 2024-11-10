import express from "express";
import Product from "../models/product.js";
import mongoose from "mongoose";
import cors from "cors";

const router = express.Router();
 

router.post("/", async (req, res) => {
    const { name, price, description, category,quantity , image } = req.body;
    if (!name || !price || !description || !category || !image || !quantity) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }
    try {
        const product = await Product.create({ name, price, description, category,quantity, image });
        res.status(201).json({success: true, product});
    } catch (error) {
        // Internal server error
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
});
// delete product
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: "Invalid product ID"});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
})

router.get("/", async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
})

//search for a product
router.get("/search", async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: "Invalid product ID"});
    }
    try {
        const product = await Product.findById(id);
        res.status(200).json({success: true, product});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
})
 //update product 
 router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, quantity, image } = req.body;
    if (!name || !price || !description || !category || !image || !quantity) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: "Invalid product ID"});
    }
    try {
        // Update the product with the new data in the request body
        const product = await Product.findByIdAndUpdate(id, {name, price, description, category, quantity, image});
        res.status(200).json({success: true, product});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
        console.log(error.message);
    }
 })
export default router;
