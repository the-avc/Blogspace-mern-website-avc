import express from 'express';
import authRoutes from './auth.js';
import blogRoutes from './blogs.js';
import userRoutes from './users.js';
import commentRoutes from './comments.js';
import interactionRoutes from './interactions.js';

const router = express.Router();

// Mount routes
router.use('/', authRoutes);
router.use('/', blogRoutes);
router.use('/', userRoutes);
router.use('/', commentRoutes);
router.use('/', interactionRoutes);
router.use('/status', ((req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
}))

export default router;

