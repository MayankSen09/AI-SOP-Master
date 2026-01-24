import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import prisma from '../config/database';

// Valid role values (SQLite uses strings instead of enums)
type UserRole = 'ADMIN' | 'MANAGER' | 'CONTRIBUTOR' | 'VIEWER';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
        name: string;
    };
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);

        try {
            const decoded = jwt.verify(token, config.jwtSecret) as {
                userId: string;
                email: string;
            };

            // Fetch user from database
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    isActive: true,
                },
            });

            if (!user || !user.isActive) {
                res.status(401).json({ error: 'Invalid or inactive user' });
                return;
            }

            // Attach user to request
            (req as AuthRequest).user = user as {
                id: string;
                email: string;
                role: UserRole;
                name: string;
            };
            next();
        } catch (jwtError) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};
