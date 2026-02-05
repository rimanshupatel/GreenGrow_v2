const mongoose = require("mongoose");
const axios = require("axios");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set in environment variables");
    process.exit(1);
  }

  try {
    // Optional: Fetch and log the public IP of this server (e.g., for Render)
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      console.log("📡 Public IP Address of this server:", res.data.ip);
    } catch (ipErr) {
      console.warn("⚠️ Could not fetch public IP:", ipErr.message);
    }

    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully 🟢");
  } catch (err) {
    console.error("❌ MongoDB connection failed 🔴", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
