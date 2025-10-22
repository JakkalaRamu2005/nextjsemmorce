import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

const connectToDB = async () => {
  try {
    // If already connected, skip re-connection
    // if (mongoose.connection.readyState === 1) {
    //   console.log("✅ MongoDB already connected");
    //   return;
    // }

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default connectToDB;
