import mongoose from "mongoose";
import configs from "./index.js";

const databaseConnected = async () => {
    try {
        const conn = await mongoose.connect(configs.mongoDBUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
    console.log("Database connected successfully");
}
export default databaseConnected