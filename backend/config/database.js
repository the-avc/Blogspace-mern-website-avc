// config/database.js (improved)
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: true,
        });
        
        console.log("✅ Connected to MongoDB");
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });
        
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};