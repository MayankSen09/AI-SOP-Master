import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AnalyticsEvent } from '../types';

interface AnalyticsContextType {
    trackEvent: (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => void;
    getEvents: (teamId: string) => AnalyticsEvent[];
    getSOPStats: (teamId: string) => {
        total: number;
        byStatus: Record<string, number>;
        recentActivity: AnalyticsEvent[];
    };
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<AnalyticsEvent[]>(() => {
        const saved = localStorage.getItem('sop_analytics_events');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('sop_analytics_events', JSON.stringify(events));
    }, [events]);

    const trackEvent = (eventData: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => {
        const event: AnalyticsEvent = {
            ...eventData,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
        };
        setEvents(prev => [...prev, event]);
    };

    const getEvents = (teamId: string): AnalyticsEvent[] => {
        return events.filter(e => e.teamId === teamId);
    };

    const getSOPStats = (teamId: string) => {
        const teamEvents = getEvents(teamId);
        const sopCreatedEvents = teamEvents.filter(e => e.eventType === 'sop_created');

        const byStatus: Record<string, number> = {
            Draft: 0,
            Review: 0,
            Approved: 0,
            Archived: 0
        };

        // This is simplified - in a real app, you'd fetch SOPs and count by status
        sopCreatedEvents.forEach(event => {
            const status = event.metadata?.status || 'Draft';
            byStatus[status] = (byStatus[status] || 0) + 1;
        });

        const recentActivity = teamEvents
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10);

        return {
            total: sopCreatedEvents.length,
            byStatus,
            recentActivity
        };
    };

    return (
        <AnalyticsContext.Provider value={{ trackEvent, getEvents, getSOPStats }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};
