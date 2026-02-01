/**
 * Rate Limiter
 * Prevents abuse by limiting the number of requests in a time window
 */

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
    identifier?: string;
}

interface RequestLog {
    timestamps: number[];
}

class RateLimiter {
    private requestLogs: Map<string, RequestLog> = new Map();

    /**
     * Checks if a request can be made within rate limits
     * @param key Unique identifier for the rate limit (e.g., 'ai-generation', user ID)
     * @param config Rate limit configuration
     * @returns Object with allowed status and remaining requests
     */
    canMakeRequest(
        key: string,
        config: RateLimitConfig
    ): { allowed: boolean; remaining: number; resetIn: number } {
        const now = Date.now();
        const log = this.requestLogs.get(key) || { timestamps: [] };

        // Remove timestamps outside the current window
        log.timestamps = log.timestamps.filter(
            (timestamp) => now - timestamp < config.windowMs
        );

        // Check if limit exceeded
        if (log.timestamps.length >= config.maxRequests) {
            const oldestTimestamp = log.timestamps[0];
            const resetIn = config.windowMs - (now - oldestTimestamp);

            return {
                allowed: false,
                remaining: 0,
                resetIn: Math.ceil(resetIn / 1000), // Convert to seconds
            };
        }

        // Add current request
        log.timestamps.push(now);
        this.requestLogs.set(key, log);

        return {
            allowed: true,
            remaining: config.maxRequests - log.timestamps.length,
            resetIn: 0,
        };
    }

    /**
     * Records a successful request
     */
    recordRequest(key: string): void {
        const now = Date.now();
        const log = this.requestLogs.get(key) || { timestamps: [] };
        log.timestamps.push(now);
        this.requestLogs.set(key, log);
    }

    /**
     * Clears rate limit for a key
     */
    clear(key: string): void {
        this.requestLogs.delete(key);
    }

    /**
     * Clears all rate limits
     */
    clearAll(): void {
        this.requestLogs.clear();
    }

    /**
     * Gets current usage for a key
     */
    getUsage(key: string, windowMs: number): { count: number; oldestTimestamp: number | null } {
        const now = Date.now();
        const log = this.requestLogs.get(key);

        if (!log || log.timestamps.length === 0) {
            return { count: 0, oldestTimestamp: null };
        }

        // Filter valid timestamps
        const validTimestamps = log.timestamps.filter(
            (timestamp) => now - timestamp < windowMs
        );

        return {
            count: validTimestamps.length,
            oldestTimestamp: validTimestamps[0] || null,
        };
    }
}

// Global rate limiter instance
const globalRateLimiter = new RateLimiter();

// Predefined rate limiters for specific features
export const aiRateLimiter = {
    /**
     * Rate limit for AI generation requests
     */
    checkGeneration(userId?: string): { allowed: boolean; remaining: number; resetIn: number } {
        const key = `ai-generation-${userId || 'anonymous'}`;
        const maxPerMinute = parseInt(import.meta.env.VITE_MAX_AI_REQUESTS_PER_MINUTE || '10');
        const maxPerHour = parseInt(import.meta.env.VITE_MAX_AI_REQUESTS_PER_HOUR || '50');

        // Check per-minute limit
        const minuteCheck = globalRateLimiter.canMakeRequest(key + '-minute', {
            maxRequests: maxPerMinute,
            windowMs: 60 * 1000, // 1 minute
        });

        if (!minuteCheck.allowed) {
            return minuteCheck;
        }

        // Check per-hour limit
        const hourCheck = globalRateLimiter.canMakeRequest(key + '-hour', {
            maxRequests: maxPerHour,
            windowMs: 60 * 60 * 1000, // 1 hour
        });

        return hourCheck;
    },

    /**
     * Records a successful AI generation
     */
    recordGeneration(userId?: string): void {
        const key = `ai-generation-${userId || 'anonymous'}`;
        globalRateLimiter.recordRequest(key + '-minute');
        globalRateLimiter.recordRequest(key + '-hour');
    },
};

export default RateLimiter;
export { globalRateLimiter };
