import { NavLink } from 'react-router-dom';
import {
    BarChart3,
    FileText,
    Settings,
    Users,
    Shield,
    Bot,
    LogOut,
    LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FileText, label: 'Standard Operating Procedures', path: '/sops' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    ];

    if (user.role === 'Admin') {
        navItems.push({ icon: Users, label: 'Team Management', path: '/team' });
        navItems.push({ icon: Settings, label: 'Settings', path: '/settings' });
    }

    // AI Features
    const aiFeature = { icon: Bot, label: 'AI SOP Wizard', path: '/sop-wizard' };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-30 h-screen w-64 border-r border-slate-200/50
                bg-white/80 backdrop-blur-xl
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full relative">
                    {/* Decorative gradient blur */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100/50 bg-white/50 backdrop-blur-sm relative z-10">
                        <Shield className="w-8 h-8 text-indigo-600 mr-3" />
                        <span className="font-bold text-xl text-slate-900 tracking-tight">SOP<span className="text-indigo-600">Master</span></span>
                    </div>

                    {/* User Profile Summary */}
                    <div className="p-4 border-b border-slate-100/50 bg-slate-50/30 relative z-10">
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-white/80 shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500 capitalize flex items-center gap-1">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 relative z-10">
                        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Main Menu
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                                    ${isActive
                                        ? 'bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                        : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-900 hover:shadow-sm'
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                                        {item.label}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        <div className="mt-8 px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            AI Tools
                        </div>
                        <NavLink
                            to={aiFeature.path}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group
                                ${isActive
                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-900'
                                }
                            `}
                        >
                            {() => (
                                <>
                                    <aiFeature.icon className="w-5 h-5 flex-shrink-0 group-hover:animate-pulse" />
                                    {aiFeature.label}
                                </>
                            )}
                        </NavLink>
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-slate-200/50 bg-white/30 backdrop-blur-sm relative z-10">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
