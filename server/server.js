import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import profileRoutes from "./routes/profileRoutes.js"
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/admin" , adminRoutes);
app.use("/api/profiles" , profileRoutes);
app.use("/api/events" , eventRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=> {
    console.log(`server running on port ${PORT}`);
})