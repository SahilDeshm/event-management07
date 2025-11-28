import { Admin } from "../models/admin.js";
import bcrypt from "bcryptjs";


export  const registerAdmin = async (req , res) => {
    try {
        const {username , password} = req.body;

        const alreadyexistUsername  =  await Admin.findOne({ username});
        if( alreadyexistUsername) return res.status(400).json({message: "Admin already exist"});

        const admin = new Admin({username , password});
        console.log(admin);
        await admin.save();
        res.status(200).json({message: "Admin Registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    return res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
