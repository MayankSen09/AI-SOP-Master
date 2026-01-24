import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/env';
import logger from '../utils/logger';

let genAI: GoogleGenerativeAI | null = null;

export function initializeAI(): void {
    if (!config.googleAIKey) {
        logger.warn('Google AI API key not configured. AI features will be disabled.');
        return;
    }

    try {
        genAI = new GoogleGenerativeAI(config.googleAIKey);
        logger.info('✅ Google Generative AI initialized successfully');
    } catch (error) {
        logger.error('Failed to initialize Google AI:', error);
        throw error;
    }
}

export function getAIClient(): GoogleGenerativeAI {
    if (!genAI) {
        throw new Error('AI client not initialized. Call initializeAI() first.');
    }
    return genAI;
}

export function isAIAvailable(): boolean {
    return genAI !== null;
}
