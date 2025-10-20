import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { validateSignupData } from '../middleware/validation.js';

const router = express.Router();

// Authentication routes
router.post('/signup', validateSignupData, signup);
router.post('/signin', signin);

export default router;

