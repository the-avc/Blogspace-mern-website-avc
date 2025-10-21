import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const createServer = () => {
    const server = express();
    
    // Middleware setup
    server.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }));
    server.use(express.json({
        limit:'10mb'
    }));
    
    return server;
};


