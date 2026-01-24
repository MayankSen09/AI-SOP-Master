import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
// @ts-ignore
router.post('/register', authLimiter, (req, res) => authController.register(req, res));

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
// @ts-ignore
router.post('/login', authLimiter, (req, res) => authController.login(req, res));

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
// @ts-ignore
router.get('/me', authenticate, (req, res) => authController.getMe(req, res));

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
// @ts-ignore
router.post('/logout', authenticate, (req, res) => authController.logout(req, res));

export default router;
