import rateLimit from 'express-rate-limit';
import config from '../config/env';
import { AuthRequest } from './auth.middleware';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiter for AI endpoints
export const aiEndpointLimiter = rateLimit({
    windowMs: config.aiRateLimitWindowMs,
    max: config.aiRateLimitMax,
    message: {
        error: 'AI request limit exceeded. Please wait before trying again.',
        retryAfter: config.aiRateLimitWindowMs / 1000,
    },
    keyGenerator: (req) => {
        // Rate limit by user ID if authenticated, otherwise by IP
        const authReq = req as AuthRequest;
        return authReq.user?.id || req.ip || 'unknown';
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth endpoint rate limiter (prevent brute force)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        error: 'Too many login attempts, please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful logins
});
