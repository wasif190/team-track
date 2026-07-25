import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("Mongo DB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
