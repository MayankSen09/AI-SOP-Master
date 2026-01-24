import { Router } from 'express';
import { DemoController } from '../controllers/demo.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

// Public route to submit a demo request
router.post('/', DemoController.createDemoRequest);

// Protected Admin route to view leads
// For MVP/Demo purposes, we might keep this looser or stick to the plan.
// Plan said "Protected endpoints for admins".
// @ts-ignore
router.get('/', authenticate, requireRole('ADMIN'), DemoController.getDemoRequests as unknown as import('express').RequestHandler);

export default router;
