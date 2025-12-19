import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect ()
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.log("OH NO ERROR");
        console.log(error);
    }
}

export default connectDB

