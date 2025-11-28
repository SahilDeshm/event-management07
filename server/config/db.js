import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO?", process.env.MONGO_URI);
        console.log("Mongoose connnected");
    } catch (error) {
        console.log(error);
        process.exit(1);
        }
    };