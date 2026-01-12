import React from 'react';
import { Menu, Bell, Search, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
    const { user, login } = useAuth();

    if (!user) return null;

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        login(e.target.value as UserRole);
    };

    return (
        <header className="fixed top-0 right-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 lg:left-64 transition-all duration-300">
            <div className="h-full px-4 lg:px-8 flex items-center justify-between">
                {/* Left: Mobile Menu & Search */}
                <div className="flex items-center flex-1 gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="hidden md:flex max-w-md w-full relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="block w-full pl-10 pr-3 py-2 border-0 bg-slate-100/50 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:shadow-lg focus:shadow-indigo-500/5 transition-all sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">âŒ˜K</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Role Switcher Demo */}
                    <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-2 py-1">
                        <label className="text-xs font-medium text-slate-500 mr-2 whitespace-nowrap">View as:</label>
                        <select
                            value={user.role}
                            onChange={handleRoleChange}
                            className="bg-transparent text-sm font-semibold text-slate-900 border-none focus:ring-0 cursor-pointer py-1"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                    <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                        <Moon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};
