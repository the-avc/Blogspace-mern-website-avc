import express from 'express';
import { likeBlog, isLiked } from '../controllers/interactionController.js';
import { verifyMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Protected interaction routes
router.post('/like-blog', verifyMiddleware, likeBlog);
router.post('/is-liked', verifyMiddleware, isLiked);

export default router;

