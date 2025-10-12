import express from 'express';
import { addComment, getBlogComments, deleteComment } from '../controllers/commentController.js';
import { verifyMiddleware } from '../middleware/auth.js';
import { validateCommentData } from '../middleware/validation.js';

const router = express.Router();

// Public comment routes
router.post('/get-blog-comments', getBlogComments);

// Protected comment routes
router.post('/add-comment', verifyMiddleware, validateCommentData, addComment);
router.post('/delete-comment', verifyMiddleware, deleteComment);

export default router;

