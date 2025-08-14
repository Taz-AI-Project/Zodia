import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`🗄️  MongoDB connected!`);
  } catch (err) {
    console.log(`An error occured while connecting to mongodb ${err}`);
    process.exit(1);
  }
};
