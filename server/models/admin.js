import mongoose from "mongoose";

const adminSchema =  new mongoose.Schema({
    username: {type: String , required: true , unique: true},
    password: {type: String , required: true},
})

//here mongodb doesnt store it directly it stores the bcrpted password in to  the database
adminSchema.pre("save" , async function () {
        if(!this.isModified("password")) return next();
        
        const bcrypt = await import("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password ,salt);
});

export const Admin = mongoose.model("Admin" , adminSchema);