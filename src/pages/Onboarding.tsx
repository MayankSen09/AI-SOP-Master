import { motion } from 'framer-motion';
import { Shield, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export function Onboarding() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRoleSelect = (role: UserRole) => {
        login(role);
        setTimeout(() => {
            navigate('/dashboard');
        }, 600);
    };

    const roles = [
        {
            role: 'Admin' as UserRole,
            icon: Shield,
            title: 'Administrator',
            description: 'Full access to manage SOPs, users, and organization settings. Ideal for managers and team leads.',
            color: 'indigo'
        },
        {
            role: 'Editor' as UserRole,
            icon: User,
            title: 'Team Member',
            description: 'View, follow, and suggest edits to Standard Operating Procedures assigned to you.',
            color: 'teal'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                        <div className="w-6 h-6 rounded-md bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Start your journey</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                        Welcome to SOPMaster
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Select your role to configure your personalized workspace.
                    </p>
                </motion.div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {roles.map((item, index) => (
                        <motion.div
                            key={item.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => handleRoleSelect(item.role)}
                                className={`
                                    w-full p-8 rounded-2xl border-2 text-left transition-all duration-300
                                    bg-white dark:bg-slate-800 
                                    border-slate-200 dark:border-slate-700
                                    hover:border-${item.color}-400 dark:hover:border-${item.color}-600
                                    hover:shadow-xl hover:shadow-${item.color}-500/10
                                    hover:-translate-y-1
                                    group
                                `}
                            >
                                <div className={`
                                    w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
                                    bg-${item.color}-100 dark:bg-${item.color}-900/30
                                    text-${item.color}-600 dark:text-${item.color}-400
                                    group-hover:scale-110 transition-transform
                                `}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className={`
                                    inline-flex items-center gap-2 text-sm font-semibold
                                    text-${item.color}-600 dark:text-${item.color}-400
                                    group-hover:gap-3 transition-all
                                `}>
                                    Enter Workspace
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        ← Back to home
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
