import { Request, Response } from 'express';
import authService from '../services/auth/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';
import logger from '../utils/logger';

export class AuthController {
    /**
     * POST /api/v1/auth/register
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name, role } = req.body;

            // Validation
            if (!email || !password || !name) {
                res.status(400).json({ error: 'Email, password, and name are required' });
                return;
            }

            if (password.length < 6) {
                res.status(400).json({ error: 'Password must be at least 6 characters' });
                return;
            }

            const result = await authService.register({
                email,
                password,
                name,
                role,
            });

            res.status(201).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            logger.error('Registration error:', error);
            res.status(400).json({ error: error.message || 'Registration failed' });
        }
    }

    /**
     * POST /api/v1/auth/login
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const result = await authService.login({
                email,
                password,
            });

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            logger.error('Login error:', error);
            res.status(401).json({ error: error.message || 'Login failed' });
        }
    }

    /**
     * GET /api/v1/auth/me
     */
    async getMe(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            const profile = await authService.getProfile(req.user.id);

            res.status(200).json({
                success: true,
                data: profile,
            });
        } catch (error: any) {
            logger.error('Get profile error:', error);
            res.status(500).json({ error: error.message || 'Failed to get profile' });
        }
    }

    /**
     * POST /api/v1/auth/logout
     */
    async logout(req: AuthRequest, res: Response): Promise<void> {
        // Since we're using JWT (stateless), logout is handled client-side
        // In the future, we can implement token blacklisting with Redis
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    }
}

export default new AuthController();
