import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const initDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI || '');
};
