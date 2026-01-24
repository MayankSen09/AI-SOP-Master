import { Request, Response } from 'express';
import prisma from '../config/database';
import logger from '../utils/logger';
import { EmailService } from '../services/email/email.service';

export const DemoController = {
    // Public: Submit a new demo request
    createDemoRequest: async (req: Request, res: Response) => {
        try {
            const { name, email, company, role, teamSize, message } = req.body;

            if (!name || !email) {
                return res.status(400).json({ error: 'Name and email are required' });
            }

            const demoRequest = await prisma.demoRequest.create({
                data: {
                    name,
                    email,
                    company,
                    role,
                    teamSize,
                    message
                }
            });


            logger.info(`New demo request submitted: ${email}`);

            // Send notifications asynchronously (don't block response)
            Promise.all([
                EmailService.sendDemoRequestNotification(demoRequest),
                EmailService.sendDemoConfirmation(demoRequest)
            ]).catch(err => {
                logger.error('Failed to send demo emails:', err);
            });

            return res.status(201).json({
                success: true,
                message: 'Demo request received successfully',
                data: demoRequest
            });
        } catch (error) {
            logger.error('Error submitting demo request:', error);
            return res.status(500).json({ error: 'Failed to submit demo request' });
        }
    },

    // Protected: Get all demo requests (Admin only)
    getDemoRequests: async (_req: Request, res: Response) => {
        try {
            const requests = await prisma.demoRequest.findMany({
                orderBy: { createdAt: 'desc' }
            });

            return res.json({
                success: true,
                data: requests
            });
        } catch (error) {
            logger.error('Error fetching demo requests:', error);
            return res.status(500).json({ error: 'Failed to fetch demo requests' });
        }
    }
};
