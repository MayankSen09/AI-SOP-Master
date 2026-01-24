import { Router } from 'express';
import sopController from '../controllers/sop.controller';
import { authenticate } from '../middleware/auth.middleware';
import { aiEndpointLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// All SOP routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/sops
 * @desc    Get all SOPs
 */
router.get('/', (req: any, res) => sopController.list(req, res));

/**
 * @route   GET /api/v1/sops/:id
 * @desc    Get single SOP details
 */
router.get('/:id', (req: any, res) => sopController.get(req, res));

/**
 * @route   POST /api/v1/sops (Manual)
 * @desc    Create new SOP manually
 */
router.post('/', (req: any, res) => sopController.create(req, res));

/**
 * @route   POST /api/v1/sops/generate
 * @desc    Generate SOP using AI Architect
 */
router.post('/generate', aiEndpointLimiter, (req: any, res) => sopController.generate(req, res));

export default router;
