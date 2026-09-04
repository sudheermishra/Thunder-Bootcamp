import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing");
  }
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to Database Successfully");
};

export default connectDB;
