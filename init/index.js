
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // Find existing demo user
    let user = await User.findOne({ username: "demo_owner" });

    // Create demo user if not found
    if (!user) {
      user = await User.register(
        new User({
          username: "demo_owner",
          email: "demo@gmail.com",
        }),
        "DemoPassword123!"
      );

      console.log("Demo user created");
    } else {
      console.log("Demo user already exists");
    }

    // Delete existing listings
    await Listing.deleteMany({});

    // Assign demo user as owner of every listing
    const listings = initData.data.map((obj) => ({
      ...obj,
      owner: user._id,
    }));

    // Insert sample listings
    await Listing.insertMany(listings);

    console.log("Data was initialized successfully");
  } catch (err) {
    console.log("Database initialization error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

initDB();
