import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import sopService from '../services/sop/sop.service';
import logger from '../utils/logger';

export class SOPController {
    /**
     * GET /api/v1/sops
     */
    async list(req: AuthRequest, res: Response): Promise<void> {
        try {
            const sops = await sopService.getAllSOPs(req.query);
            res.json({ success: true, count: sops.length, data: sops });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * GET /api/v1/sops/:id
     */
    async get(req: AuthRequest, res: Response): Promise<void> {
        try {
            const sop = await sopService.getSOPById(req.params.id);
            res.json({ success: true, data: sop });
        } catch (error: any) {
            res.status(404).json({ success: false, error: 'SOP not found' });
        }
    }

    /**
     * POST /api/v1/sops/generate
     */
    async generate(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { prompt, industry } = req.body;
            if (!prompt) {
                res.status(400).json({ success: false, error: 'Prompt is required' });
                return;
            }

            if (!req.user) {
                res.status(401).json({ success: false, error: 'Unauthorized' });
                return;
            }

            logger.info(`AI Generation requested by ${req.user.email} for: ${prompt}`);

            const sop = await sopService.generateAndSaveSOP(req.user.id, prompt, industry);

            res.status(201).json({ success: true, data: sop });
        } catch (error: any) {
            logger.error('Generation Error:', error);
            res.status(500).json({ success: false, error: error.message || 'AI Generation failed' });
        }
    }

    /**
     * POST /api/v1/sops (Manual Create)
     */
    async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, error: 'Unauthorized' });
                return;
            }
            const sop = await sopService.createSOP(req.user.id, req.body);
            res.status(201).json({ success: true, data: sop });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}

export default new SOPController();
