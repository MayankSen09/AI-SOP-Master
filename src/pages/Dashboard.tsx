import { motion } from 'framer-motion';
import {
    FileText,
    CheckCircle2,
    Clock,
    Plus,
    TrendingUp,
    Zap,
    ListChecks,
    Users
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Dashboard() {
    // Mock Data (In a real app, useData() would be here)
    const stats = [
        { label: 'Total SOPs', value: 24, change: '+12%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
        { label: 'Approved', value: 18, change: '+4%', icon: CheckCircle2, color: 'text-teal-600', bg: 'bg-teal-50/50' },
        { label: 'In Review', value: 4, change: '-2%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50/50' },
        { label: 'Drafts', value: 2, change: '+1', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50/50' },
    ];

    const recentActivity = [
        { id: 1, action: 'SOP Created', target: 'Remote Work Policy', user: 'Sarah Jenkins', time: '2h ago' },
        { id: 2, action: 'Review Request', target: 'Q1 Marketing Plan', user: 'Mike Ross', time: '4h ago' },
        { id: 3, action: 'Approved', target: 'Employee Onboarding', user: 'Rachel Green', time: '1d ago' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of your standardized procedures.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={TrendingUp}>View Reports</Button>
                    <Button icon={Plus} className="shadow-lg shadow-indigo-500/20">New SOP</Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat) => (
                    <motion.div key={stat.label} variants={item}>
                        <Card className="hover:shadow-md hover:border-indigo-100/50 transition-all duration-300 group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs font-medium">
                                <span className={stat.change.startsWith('+') ? 'text-teal-600' : 'text-rose-600'}>
                                    {stat.change}
                                </span>
                                <span className="text-slate-400 ml-2">from last month</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Recent Activity */}
                <Card className="lg:col-span-2 p-0 overflow-hidden border-slate-100 shadow-sm" title="Recent Activity" footer={
                    <Button variant="ghost" className="w-full justify-center text-sm font-medium">View All Activity</Button>
                }>
                    <div className="divide-y divide-slate-100">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                    {activity.user.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">
                                        {activity.user} <span className="text-slate-500 font-normal">performed</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        on {activity.target}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card title="Quick Actions" className="h-fit">
                    <div className="space-y-3">
                        <Button variant="secondary" className="w-full justify-start h-auto py-3 px-4 hover:border-indigo-200 hover:bg-indigo-50/30 group">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3 group-hover:bg-indigo-100 transition-colors">
                                <Plus className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-medium text-slate-900">Create New SOP</span>
                                <span className="text-xs text-slate-500">Draft a new procedure</span>
                            </div>
                        </Button>

                        <Button variant="secondary" className="w-full justify-start h-auto py-3 px-4 hover:border-violet-200 hover:bg-violet-50/30 group">
                            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg mr-3 group-hover:bg-violet-100 transition-colors">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-medium text-slate-900">Generate Strategy</span>
                                <span className="text-xs text-slate-500">AI Marketing Plan</span>
                            </div>
                        </Button>

                        <Button variant="secondary" className="w-full justify-start h-auto py-3 px-4 hover:border-amber-200 hover:bg-amber-50/30 group">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mr-3 group-hover:bg-amber-100 transition-colors">
                                <ListChecks className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-medium text-slate-900">Review Pending</span>
                                <span className="text-xs text-slate-500">3 items waiting</span>
                            </div>
                        </Button>

                        <Button variant="secondary" className="w-full justify-start h-auto py-3 px-4 hover:border-teal-200 hover:bg-teal-50/30 group">
                            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg mr-3 group-hover:bg-teal-100 transition-colors">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-medium text-slate-900">Team Reports</span>
                                <span className="text-xs text-slate-500">View compliance</span>
                            </div>
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
