import { motion } from 'framer-motion';
import { User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export function Onboarding() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRoleSelect = (role: UserRole) => {
        login(role);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to SOP Master</h1>
                    <p className="text-slate-500">Select your role to configure your workspace.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Admin Card */}
                    <button
                        onClick={() => handleRoleSelect('Admin')}
                        className="group relative bg-white p-8 rounded-2xl border-2 border-transparent hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Administrator</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Full access to manage SOPs, users, and organization settings. Ideal for managers.
                        </p>
                        <div className="flex items-center text-indigo-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                            Enter Workspace <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>

                    {/* Member Card */}
                    <button
                        onClick={() => handleRoleSelect('Editor')}
                        className="group relative bg-white p-8 rounded-2xl border-2 border-transparent hover:border-teal-500 shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors">
                            <User className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Team Member</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            View, follow, and suggest edits to Standard Operating Procedures assigned to you.
                        </p>
                        <div className="flex items-center text-teal-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                            Enter Workspace <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
