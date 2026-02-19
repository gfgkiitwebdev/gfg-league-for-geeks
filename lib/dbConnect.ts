import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

export async function dbConnect(): Promise<Mongoose> {
  // Check if we already have an active connection state
  if (mongoose.connection.readyState >= 1) {
    return mongoose as unknown as Mongoose;
  }

  console.log("Mongo URI Loaded:", !!process.env.MONGODB_URI);
  return await mongoose.connect(MONGODB_URI, {
    autoIndex: process.env.NODE_ENV !== "production",
  });
}