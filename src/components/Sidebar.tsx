import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Settings,
    Rocket,
    Users,
    FolderOpen,
    TrendingUp,
    Repeat,
    Trophy,
    MessageSquare,
    RefreshCw,
    DollarSign,
    UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';
import { useGamification } from '../context/GamificationContext';

export const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const { points } = useGamification();

    if (!user) return null;

    const links = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/sops', icon: FileText, label: 'SOP Library' },

        // Advanced AI Tools
        ...(user.role !== 'Viewer' ? [
            { to: '/strategy', icon: Rocket, label: 'AI Strategy' },
            { to: '/funnel-builder', icon: TrendingUp, label: 'Funnel Builder' },
            { to: '/trend-scanner', icon: TrendingUp, label: 'Trend Scanner' },
            { to: '/content-repurposing', icon: Repeat, label: 'Repurpose Engine' },
            { to: '/audience-personas', icon: UserCircle, label: 'Personas' },
        ] : []),

        // Growth & Ops
        { to: '/social-inbox', icon: MessageSquare, label: 'Social Inbox' },
        { to: '/optimization', icon: RefreshCw, label: 'Optimization Loop' },
        { to: '/monetization', icon: DollarSign, label: 'Monetization' },

        { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
        { to: '/notifications', icon: Users, label: 'Team' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0 overflow-y-auto">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <FolderOpen className="w-6 h-6" />
                    <span>SOP Manager</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => clsx(
                            'flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200',
                            isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-secondary/10 hover:text-foreground'
                        )}
                    >
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Your Points</span>
                        <Trophy className="w-4 h-4 text-indigo-500" />
                    </div>
                    <h4 className="font-bold text-2xl text-indigo-900">{points.toLocaleString()}</h4>
                    <NavLink to="/leaderboard" className="text-xs text-indigo-600 hover:underline">View Leaderboard</NavLink>
                </div>
            </div>
        </aside>
    );
};
