import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?appName=${process.env.MONGODB_APP_NAME}`
        await mongoose.connect(mongoURI)
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.log("OH NO ERROR");
        console.log(error);
    }
}

export default connectDB

