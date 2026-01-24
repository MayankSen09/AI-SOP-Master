import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, Wrench, Target } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoadmapDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any; // The specific month data (title, focus, weeks, kpis)
}

export const RoadmapDetailsModal: React.FC<RoadmapDetailsModalProps> = ({ isOpen, onClose, data }) => {
    console.log('RoadmapDetailsModal render:', { isOpen, hasData: !!data });
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-200 dark:border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Growth Roadmap</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.title}</h2>
                                    <p className="text-slate-500 dark:text-architect-muted font-medium mt-1">{data.focus}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100 dark:hover:bg-white/10 rounded-full w-10 h-10 p-0">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-8 custom-scrollbar">

                            {/* Weeks Breakdown */}
                            <div className="space-y-6">
                                {data.weeks?.map((week: any, idx: number) => (
                                    <div key={idx} className="bg-slate-50 dark:bg-architect-dark/50 rounded-2xl p-6 border border-slate-200 dark:border-white/5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-6 px-3 rounded-full bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-white flex items-center justify-center">
                                                {week.week}
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Execution Phase</h3>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            {week.actions?.map((action: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-slate-600 dark:text-architect-muted font-medium leading-relaxed">{action}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {week.tools && week.tools.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {week.tools.map((tool: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-500 dark:text-architect-muted uppercase tracking-wide">
                                                        <Wrench className="w-3 h-3" />
                                                        {tool}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* KPIs Section */}
                            <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                                <Target className="w-5 h-5 text-brand-primary mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Success Metrics (KPIs)</h4>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {data.kpis?.map((kpi: string, idx: number) => (
                                            <span key={idx} className="text-xs font-semibold text-slate-600 dark:text-architect-muted flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                                {kpi}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent flex justify-end">
                            <Button onClick={onClose} className="rounded-xl px-8">Close Details</Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
