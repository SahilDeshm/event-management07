import {Profile} from "../models/Profile.js";


  export const createProfile = async (req, res) => {
    try {
      const { name, timezone } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Name is required" });
      }

      const existing = await Profile.findOne({ name: name.trim() });
      if (existing) return res.status(400).json({ message: "Profile already exists" });

      const profile = await Profile.create({
        name: name.trim(),
        timezone: timezone || "UTC",
      });

      res.status(201).json(profile); // return full profile {_id, name, timezone}
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
