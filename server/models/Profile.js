import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name:{type: String , required: true},
    timezone:{type:String , required: true},
    createdAtUTC: { type: Date, default: Date.now },
});

export const Profile = mongoose.model("Profile" , profileSchema);