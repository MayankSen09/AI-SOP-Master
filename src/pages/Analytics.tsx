import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, FileText, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useTeam } from '../context/TeamContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { useData } from '../context/DataContext';

export function Analytics() {
    const { currentTeam } = useTeam();
    const { getSOPStats } = useAnalytics();
    const { sops } = useData();

    if (!currentTeam) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">Please select a team to view analytics</p>
            </div>
        );
    }

    const stats = getSOPStats(currentTeam.id);
    const teamSOPs = sops.filter(sop => sop.teamId === currentTeam.id || !sop.teamId);

    const statCards = [
        {
            icon: FileText,
            label: 'Total SOPs',
            value: teamSOPs.length,
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-50 dark:bg-indigo-900/30'
        },
        {
            icon: TrendingUp,
            label: 'Approved',
            value: teamSOPs.filter(s => s.status === 'Approved').length,
            color: 'text-teal-600 dark:text-teal-400',
            bg: 'bg-teal-50 dark:bg-teal-900/30'
        },
        {
            icon: Activity,
            label: 'In Review',
            value: teamSOPs.filter(s => s.status === 'Review').length,
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-900/30'
        },
        {
            icon: Users,
            label: 'Team Members',
            value: 1, // Simplified
            color: 'text-violet-600 dark:text-violet-400',
            bg: 'bg-violet-50 dark:bg-violet-900/30'
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Analytics Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Track SOP performance and team activity for {currentTeam.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* SOP Status Distribution */}
            <Card title="SOP Status Distribution">
                <div className="space-y-4">
                    {Object.entries(stats.byStatus).map(([status, count]) => {
                        const total = teamSOPs.length || 1;
                        const percentage = (count / total) * 100;
                        const colors: Record<string, string> = {
                            Draft: 'bg-slate-500',
                            Review: 'bg-amber-500',
                            Approved: 'bg-teal-500',
                            Archived: 'bg-gray-400'
                        };
                        return (
                            <div key={status}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{status}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{count} ({percentage.toFixed(0)}%)</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className={`h-full ${colors[status] || 'bg-slate-500'}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Recent Activity */}
            <Card title="Recent Activity">
                {stats.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                        {stats.recentActivity.map((event) => (
                            <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                        {event.eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No activity yet. Start creating SOPs!</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
