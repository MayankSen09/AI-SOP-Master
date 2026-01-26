import React, { createContext, useContext, useState } from 'react';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
}

interface Challenge {
    id: string;
    title: string;
    description: string;
    reward_points: number;
    completed: boolean;
    progress: number;
    total: number;
}

interface GamificationContextType {
    points: number;
    level: number;
    achievements: Achievement[];
    challenges: Challenge[];
    addPoints: (amount: number) => void;
    completeChallenge: (id: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [points, setPoints] = useState(1250);
    const [level, setLevel] = useState(5);

    // Mock Data
    const [achievements] = useState<Achievement[]>([
        { id: '1', name: 'First Post', description: 'Published your first post', icon: '🚀', unlockedAt: new Date() },
        { id: '2', name: 'Viral Hit', description: 'Reached 1k views on a post', icon: '🔥' },
        { id: '3', name: 'Consistent Creator', description: 'Posted 7 days in a row', icon: '📅' }
    ]);

    const [challenges, setChallenges] = useState<Challenge[]>([
        { id: 'c1', title: 'Post Streak', description: 'Post 3 times this week', reward_points: 500, completed: false, progress: 2, total: 3 },
        { id: 'c2', title: 'Engagement Master', description: 'Reply to 10 comments', reward_points: 300, completed: true, progress: 10, total: 10 },
        { id: 'c3', title: 'Trend Setter', description: 'Use the Trend Scanner', reward_points: 150, completed: false, progress: 0, total: 1 }
    ]);

    const addPoints = (amount: number) => {
        setPoints(prev => {
            const newPoints = prev + amount;
            // Level up logic (simple check)
            if (newPoints > level * 1000) {
                setLevel(l => l + 1);
            }
            return newPoints;
        });
    };

    const completeChallenge = (id: string) => {
        setChallenges(prev => prev.map(c => {
            if (c.id === id && !c.completed) {
                addPoints(c.reward_points);
                return { ...c, completed: true, progress: c.total };
            }
            return c;
        }));
    };

    return (
        <GamificationContext.Provider value={{ points, level, achievements, challenges, addPoints, completeChallenge }}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};
