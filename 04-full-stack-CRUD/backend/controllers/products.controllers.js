import Product from "../models/products.model.js"

// create product
export const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { name, price } = req.body

        if (!name || !price) {
            return res.status(401).json({
                message: "Product Name and Price can not be empty"
            })
        }

        const product = new Product(req.body)
        await product.save()

        res.status(200).json({
            message: "Prodcut creaed in DB successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// read all products
export const readAllProducts = async (req, res) => {
    try {
        console.log("=== GET Request Started ===");
        console.log("Fetching products from database...");
        console.log("Database name:", Product.db.name);
        console.log("Collection name:", Product.collection.name);
        
        const products = await Product.find({})
        console.log("Products found:", products.length);
        console.log("Products data:", JSON.stringify(products, null, 2));
        
        res.status(200).json({
            success: true,
            message: "All product read from DB",
            count: products.length,
            products: products
        })
    } catch (error) {
        console.log("=== ERROR in GET Request ===");
        console.log("Error fetching products:", error);
        console.log("Error stack:", error.stack);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// delete product by id
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log("=== DELETE Request Started ===");
        console.log("Product ID to delete:", id);
        
        // MongoDB Query: Find and delete product by ID
        const deletedProduct = await Product.findByIdAndDelete(id)
        
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found with this ID"
            })
        }
        
        console.log("Product deleted successfully:", deletedProduct);
        
        res.status(200).json({
            success: true,
            message: "Product deleted from DB successfully",
            deletedProduct
        })
    } catch (error) {
        console.log("=== ERROR in DELETE Request ===");
        console.log("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

