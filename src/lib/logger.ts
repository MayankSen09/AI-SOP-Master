/**
 * Secure Logger
 * Prevents sensitive data from being logged to console
 */

// Sensitive keywords to redact
const SENSITIVE_KEYS = [
    'apiKey',
    'api_key',
    'apikey',
    'token',
    'password',
    'passwd',
    'secret',
    'auth',
    'authorization',
    'bearer',
    'key',
    'credential',
    'private',
];

// Check if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';
const debugEnabled = import.meta.env.VITE_ENABLE_DEBUG_LOGS === 'true';

/**
 * Redacts sensitive information from objects
 */
function redactSensitive(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        // Check if string looks like an API key or token
        if (obj.length > 20 && /^[A-Za-z0-9_-]+$/.test(obj)) {
            return '[REDACTED]';
        }
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => redactSensitive(item));
    }

    if (typeof obj === 'object') {
        const redacted: any = {};

        for (const [key, value] of Object.entries(obj)) {
            const lowerKey = key.toLowerCase();

            // Check if key is sensitive
            if (SENSITIVE_KEYS.some(sensitive => lowerKey.includes(sensitive))) {
                redacted[key] = '[REDACTED]';
            } else {
                redacted[key] = redactSensitive(value);
            }
        }

        return redacted;
    }

    return obj;
}

/**
 * Secure logger class
 */
class SecureLogger {
    /**
     * Logs info message (only in development)
     */
    static info(message: string, data?: any): void {
        if (!isDevelopment && !debugEnabled) return;

        const sanitized = data ? redactSensitive(data) : undefined;
        console.log(`ℹ️ ${message}`, sanitized);
    }

    /**
     * Logs warning message
     */
    static warn(message: string, data?: any): void {
        const sanitized = data ? redactSensitive(data) : undefined;
        console.warn(`⚠️ ${message}`, sanitized);
    }

    /**
     * Logs error message (always shown, but sanitized)
     */
    static error(message: string, error?: any): void {
        const sanitized = error ? redactSensitive(error) : undefined;

        if (isDevelopment) {
            console.error(`❌ ${message}`, sanitized);
        } else {
            // In production, log minimal info
            console.error(`❌ ${message}`);

            // Optionally send to error monitoring service (Sentry, etc.)
            this.sendToMonitoring(message, sanitized);
        }
    }

    /**
     * Logs success message (only in development)
     */
    static success(message: string, data?: any): void {
        if (!isDevelopment && !debugEnabled) return;

        const sanitized = data ? redactSensitive(data) : undefined;
        console.log(`✅ ${message}`, sanitized);
    }

    /**
     * Logs debug message (only when debug enabled)
     */
    static debug(message: string, data?: any): void {
        if (!debugEnabled) return;

        const sanitized = data ? redactSensitive(data) : undefined;
        console.log(`🔍 ${message}`, sanitized);
    }

    /**
     * Sends error to monitoring service (placeholder)
     */
    private static sendToMonitoring(message: string, data: any): void {
        // TODO: Integrate with Sentry, LogRocket, or other monitoring service
        // Example:
        // Sentry.captureException(new Error(message), { extra: data });

        if (debugEnabled) {
            console.log('📡 Would send to monitoring:', { message, data });
        }
    }

    /**
     * Creates a safe error object for logging
     */
    static createSafeError(error: any): any {
        if (error instanceof Error) {
            return {
                name: error.name,
                message: error.message,
                stack: isDevelopment ? error.stack : undefined,
            };
        }

        return redactSensitive(error);
    }
}

export default SecureLogger;
export { redactSensitive };
