import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect (`mongodb+srv://Zeeshan_db_user:Zeeshan123456@cluster0.mxdcdgq.mongodb.net/Data?appName=Cluster0`)
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.log("OH NO ERROR");
        console.log(error);
    }
}

export default connectDB

