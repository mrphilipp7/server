import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to Mongo");
  } catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1); // Optionally exit if cannot connect
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from Mongo");
  } catch (err) {
    console.error("Mongoose disconnection error:", err);
  }
};

export { connectDB, disconnectDB };
