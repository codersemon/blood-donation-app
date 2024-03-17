// dependencies 
import mongoose from "mongoose";

// connect mongodb 
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log(`🟢 MongoDB Connection Successful!`.bgMagenta.black);
    } catch (error) {
        console.log(`🔴 MongoDB connection faild! ${error.message}`.bgRed.black);
    }
}

// export connection 
export default connectMongoDB;