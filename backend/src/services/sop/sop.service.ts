import prisma from '../../config/database';
import aiService from '../ai/ai.service';
import logger from '../../utils/logger';

export class SOPService {
    /**
     * Create a new SOP (either manual or via AI)
     */
    async createSOP(userId: string, data: any, generatedByAI = false) {
        try {
            const sop = await prisma.sOP.create({
                data: {
                    title: data.title,
                    departmentId: data.departmentId || 'general',
                    category: data.category || 'Standard',
                    purpose: data.purpose,
                    status: 'DRAFT',
                    content: typeof data.content === 'string' ? data.content : JSON.stringify(data.content || data),
                    metadata: typeof data.metadata === 'string' ? data.metadata : JSON.stringify(data.metadata || {}),
                    generatedByAI,
                    createdById: userId,
                    version: 1,
                },
            });

            // Log activity
            await prisma.activityLog.create({
                data: {
                    type: 'SOP_CREATED',
                    description: `SOP "${sop.title}" created ${generatedByAI ? 'via AI' : 'manually'}`,
                    userId,
                    sopId: sop.id,
                },
            });

            return sop;
        } catch (error) {
            logger.error('Error in SOPService.createSOP:', error);
            throw error;
        }
    }

    /**
     * Generate an SOP using AI and then save it
     */
    async generateAndSaveSOP(userId: string, prompt: string, industry?: string) {
        const generatedContent = await aiService.generateSOP(prompt, industry);

        return this.createSOP(userId, {
            title: generatedContent.title,
            purpose: generatedContent.purpose,
            content: generatedContent,
            metadata: generatedContent.metadata,
            category: generatedContent.metadata.industry || 'General',
        }, true);
    }

    /**
     * Get all SOPs (for dashboard/list)
     */
    async getAllSOPs(filters: any = {}) {
        const where: any = { deletedAt: null };

        if (filters.status) where.status = filters.status;
        if (filters.departmentId) where.departmentId = filters.departmentId;

        const sops = await prisma.sOP.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            include: {
                createdBy: {
                    select: { name: true, avatar: true }
                }
            }
        });

        // Parse JSON strings back to objects for the response
        return sops.map(sop => ({
            ...sop,
            content: JSON.parse(sop.content as string),
            metadata: sop.metadata ? JSON.parse(sop.metadata as string) : null,
        }));
    }

    /**
     * Get single SOP by ID
     */
    async getSOPById(id: string) {
        const sop = await prisma.sOP.findUnique({
            where: { id },
            include: {
                createdBy: {
                    select: { name: true, avatar: true }
                }
            }
        });

        if (!sop || sop.deletedAt) throw new Error('SOP not found');

        return {
            ...sop,
            content: JSON.parse(sop.content as string),
            metadata: sop.metadata ? JSON.parse(sop.metadata as string) : null,
        };
    }

    /**
     * Update SOP or create new version
     */
    async updateSOP(id: string, userId: string, updates: any, createNewVersion = false) {
        const current = await this.getSOPById(id);

        if (createNewVersion) {
            return this.createSOP(userId, {
                ...current,
                ...updates,
                version: current.version + 1,
                parentId: current.id,
            });
        }

        const updated = await prisma.sOP.update({
            where: { id },
            data: {
                ...updates,
                content: updates.content ? JSON.stringify(updates.content) : undefined,
                metadata: updates.metadata ? JSON.stringify(updates.metadata) : undefined,
                updatedAt: new Date(),
            }
        });

        return updated;
    }
}

export default new SOPService();
