import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const DBURI = process.env.DBURI;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DBURI);
    console.log(
      `\n 🍃 Database Sucecessfully Connected to ${conn.connection.host} 🍃\n`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
