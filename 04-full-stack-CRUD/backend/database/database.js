import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect (`mongodb+srv://_db_user:@cluster0.mxdcdgq.mongodb.net/Data?appName=Cluster0`)
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.log("OH NO ERROR");
        console.log(error);
    }
}

export default connectDB

