import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

// Valid role values (SQLite uses strings instead of enums)
type UserRole = 'ADMIN' | 'MANAGER' | 'CONTRIBUTOR' | 'VIEWER';

export const requireRole = (...allowedRoles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        if (!allowedRoles.includes(req.user.role as UserRole)) {
            res.status(403).json({
                error: 'Forbidden',
                message: `This action requires one of the following roles: ${allowedRoles.join(', ')}`,
                required: allowedRoles,
                current: req.user.role,
            });
            return;
        }

        next();
    };
};

// Role hierarchy helper
const roleHierarchy: Record<UserRole, number> = {
    VIEWER: 1,
    CONTRIBUTOR: 2,
    MANAGER: 3,
    ADMIN: 4,
};

export const requireMinRole = (minRole: UserRole) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const userLevel = roleHierarchy[req.user.role as UserRole];
        const requiredLevel = roleHierarchy[minRole];

        if (userLevel < requiredLevel) {
            res.status(403).json({
                error: 'Forbidden',
                message: `This action requires at least ${minRole} role`,
                current: req.user.role,
            });
            return;
        }

        next();
    };
};
