import config from '../../config/env';
import { getAIClient } from '../../config/ai';
import logger from '../../utils/logger';
import { SOP_GENERATION_PROMPT, REFINE_SOP_PROMPT } from './prompts';

export interface GeneratedSOP {
    title: string;
    purpose: string;
    scope: string;
    procedures: Array<{
        stepNumber: number;
        title: string;
        description: string;
        warnings: string[];
        resources: string[];
    }>;
    definitions: Record<string, string>;
    compliance: string[];
    metadata: {
        industry: string;
        complexity: string;
        estimatedTime: string;
    };
}

export class AIService {
    private _model: any = null;
    private generationConfig: any = {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
    };

    /**
     * Lazy getter for the generative model
     */
    private get model() {
        if (!this._model) {
            const genAI = getAIClient();
            this._model = genAI.getGenerativeModel({
                model: config.aiModel,
            });
        }
        return this._model;
    }

    /**
     * Generates a complete SOP from a brief description or title
     */
    async generateSOP(input: string, industry?: string): Promise<GeneratedSOP> {
        const startTime = Date.now();
        logger.info(`Starting SOP generation for: ${input.substring(0, 50)}...`);

        try {
            const prompt = `
        ${SOP_GENERATION_PROMPT}
        
        [User Input]:
        Title/Topic: ${input}
        ${industry ? `Industry: ${industry}` : ''}
      `;

            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: this.generationConfig,
            });
            const response = await result.response;
            let text = response.text();

            // Clean possible markdown JSON wrappers
            text = this.cleanJsonString(text);

            try {
                const parsed = JSON.parse(text);
                const duration = Date.now() - startTime;
                logger.info(`SOP generated successfully in ${duration}ms`);
                return parsed as GeneratedSOP;
            } catch (parseError) {
                logger.error('Failed to parse AI response as JSON:', text);
                throw new Error('AI produced an invalid response format');
            }
        } catch (error) {
            logger.error('Error in AIService.generateSOP:', error);
            throw error;
        }
    }

    /**
     * Refines an existing SOP based on feedback
     */
    async refineSOP(originalContent: string, feedback: string): Promise<GeneratedSOP> {
        try {
            const prompt = REFINE_SOP_PROMPT
                .replace('{{originalContent}}', originalContent)
                .replace('{{feedback}}', feedback);

            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: this.generationConfig,
            });
            const response = await result.response;
            let text = response.text();
            text = this.cleanJsonString(text);

            return JSON.parse(text) as GeneratedSOP;
        } catch (error) {
            logger.error('Error in AIService.refineSOP:', error);
            throw error;
        }
    }

    /**
     * Simple method to sanitize AI output if needed
     */
    private cleanJsonString(str: string): string {
        return str.replace(/```json\n?|```/g, '').trim();
    }
}

export default new AIService();
