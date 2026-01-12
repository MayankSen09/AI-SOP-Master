import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Rocket, Users, FolderOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    const links = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/sops', icon: FileText, label: 'SOP Library' },
        // Show Strategy Generator for Admin and Editor
        ...(user.role !== 'Viewer' ? [{ to: '/strategy', icon: Rocket, label: 'AI Strategy' }] : []),
        { to: '/notifications', icon: Users, label: 'Team' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <FolderOpen className="w-6 h-6" />
                    <span>SOP Manager</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
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
                        <link.icon className="w-5 h-5" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="bg-secondary/10 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-secondary-foreground mb-1">Need Help?</h4>
                    <p className="text-xs text-muted-foreground">Check the documentation or contact support.</p>
                </div>
            </div>
        </aside>
    );
};
