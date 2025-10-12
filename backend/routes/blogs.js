import express from 'express';
import { 
    getLatestBlogs, 
    getTrendingBlogs, 
    createBlog, 
    getBlog, 
    getUserWrittenBlogs, 
    deleteBlog 
} from '../controllers/blogController.js';
import { verifyMiddleware } from '../middleware/auth.js';
import { validateBlogData } from '../middleware/validation.js';

const router = express.Router();

// Public blog routes
router.post('/latest-blogs', getLatestBlogs);
router.get('/trending-blogs', getTrendingBlogs);
router.post('/get-blog', getBlog);

// Protected blog routes
router.post('/create-blog', verifyMiddleware, validateBlogData, createBlog);
router.post('/user-written-blogs', verifyMiddleware, getUserWrittenBlogs);
router.post('/delete-blog', verifyMiddleware, deleteBlog);

export default router;

