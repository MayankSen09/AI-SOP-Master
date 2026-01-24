import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database';
import config from '../../config/env';
import logger from '../../utils/logger';

// Valid role values (SQLite uses strings instead of enums)
export type UserRole = 'ADMIN' | 'MANAGER' | 'CONTRIBUTOR' | 'VIEWER';

interface RegisterInput {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}

interface LoginInput {
    email: string;
    password: string;
}

interface TokenPayload {
    userId: string;
    email: string;
}

export class AuthService {
    /**
     * Register a new user
     */
    async register(input: RegisterInput) {
        const { email, password, name, role = 'VIEWER' } = input;

        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email },
        });

        if (existing) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                role,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        // Generate token
        const token = this.generateToken(user.id, user.email);

        logger.info(`New user registered: ${email}`);

        return {
            user,
            token,
        };
    }

    /**
     * Login user
     */
    async login(input: LoginInput) {
        const { email, password } = input;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.passwordHash) {
            throw new Error('Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new Error('This account has been deactivated');
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate token
        const token = this.generateToken(user.id, user.email);

        logger.info(`User logged in: ${email}`);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role as UserRole,
                avatar: user.avatar,
            },
            token,
        };
    }

    /**
     * Get user profile by ID
     */
    async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                isActive: true,
                createdAt: true,
                lastLoginAt: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    /**
     * Generate JWT token
     */
    private generateToken(userId: string, email: string): string {
        const payload: TokenPayload = {
            userId,
            email,
        };

        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn as any,
        });
    }

    /**
     * Verify token
     */
    verifyToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, config.jwtSecret) as TokenPayload;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default new AuthService();
