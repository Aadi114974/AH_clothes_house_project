import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extract images from request
        const images = ["image1", "image2", "image3", "image4"]
            .map(key => req.files[key] && req.files[key][0])
            .filter(image => image);

        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added", product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Function to remove a product using req.params.id
const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Function to get single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to update a product
const updateProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, price, category },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating product", error: error.message });
    }
};

export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
    updateProduct
};
