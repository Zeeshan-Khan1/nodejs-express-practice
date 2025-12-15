import express from "express"
const router = express.Router()

import { createProduct, readAllProducts, deleteProduct } from "../controllers/products.controllers.js"

// create product "/products"  
router.route("/products").post(createProduct)

// read all products "/products"  
router.route("/products").get(readAllProducts)

// delete product by id "/products/:id"
router.route("/products/:id").delete(deleteProduct)

export default router