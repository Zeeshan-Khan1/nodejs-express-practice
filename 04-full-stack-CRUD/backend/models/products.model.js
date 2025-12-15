import mongoose from "mongoose"

const productSchame = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true })


// model - explicitly specify collection name as "products"
const Product = mongoose.model("Product", productSchame, "products")

export default Product