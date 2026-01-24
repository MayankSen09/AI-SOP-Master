import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Wand2, BarChart3, Settings, Rocket, LogOut, Zap, TrendingUp, Mail, Share2, Megaphone, Layout } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Wand2, label: 'SOP Wizard', path: '/sop-wizard' },
        { icon: FileText, label: 'All SOPs', path: '/sops' },
        { icon: Rocket, label: 'Funnel Builder', path: '/funnel-builder' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-30 h-screen w-64 border-r
                border-slate-200 dark:border-architect-border
                bg-white dark:bg-architect-dark/95
                backdrop-blur-2xl
                transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full relative">
                    {/* Decorative gradient blur */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl pointer-events-none" />

                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-architect-border/50 bg-slate-50 dark:bg-architect-card/30 backdrop-blur-sm relative z-10">
                        <Zap className="w-8 h-8 text-brand-primary mr-3" />
                        <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">
                            SOP<span className="architect-gradient">SYSTEM</span>
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto pt-8 px-4 space-y-1 relative z-10 scrollbar-hide">
                        <div className="px-4 mb-4 text-xs font-bold text-secondary dark:text-architect-muted uppercase tracking-wider">
                            Management
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
                                    ${isActive
                                        ? 'bg-slate-100 dark:bg-architect-card text-slate-900 dark:text-white shadow-lg ring-1 ring-slate-200 dark:ring-architect-border'
                                        : 'text-slate-600 dark:text-architect-muted hover:bg-slate-50 dark:hover:bg-architect-card/50 hover:text-slate-900 dark:hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} />
                                {item.label}
                            </NavLink>
                        ))}

                        <div className="mt-12 px-4 mb-4 text-xs font-bold text-secondary dark:text-architect-muted uppercase tracking-wider">
                            Tools
                        </div>

                        <NavLink
                            to="/strategy"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
                                ${isActive
                                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/10'
                                    : 'text-architect-muted hover:bg-architect-card/50 hover:text-white'
                                }
                            `}
                        >
                            <TrendingUp className="w-5 h-5 flex-shrink-0" />
                            Templates
                        </NavLink>

                        <NavLink
                            to="/funnel-builder"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
                                ${isActive
                                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/10'
                                    : 'text-slate-600 dark:text-architect-muted hover:bg-slate-50 dark:hover:bg-architect-card/50 hover:text-slate-900 dark:hover:text-white'
                                }
                            `}
                        >
                            <Rocket className="w-5 h-5 flex-shrink-0" />
                            Funnel Builder
                        </NavLink>

                        <div className="mt-8 px-4 mb-4 text-xs font-bold text-secondary dark:text-architect-muted uppercase tracking-wider">
                            Campaigns
                        </div>

                        {[
                            { icon: Mail, label: 'Email Builder', path: '/email-campaigns' },
                            { icon: Share2, label: 'Social Planner', path: '/social-media-planner' },
                            { icon: Megaphone, label: 'Ad Copy', path: '/ad-copy' },
                            { icon: Layout, label: 'Landing Pages', path: '/landing-pages' }
                        ].map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
                                    ${isActive
                                        ? 'bg-slate-100 dark:bg-architect-card text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-architect-border'
                                        : 'text-slate-600 dark:text-architect-muted hover:bg-slate-50 dark:hover:bg-architect-card/50 hover:text-slate-900 dark:hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-slate-200 dark:border-architect-border/50 relative z-10">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm font-semibold text-slate-600 dark:text-architect-muted hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>
                </div >
            </aside >
        </>
    );
};
