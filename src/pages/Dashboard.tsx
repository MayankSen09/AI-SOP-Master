import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BarChart3, Clock, AlertCircle, CheckCircle, Zap, Target, Search, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export function Dashboard() {
    const { user } = useAuth();
    const { sops } = useData();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total SOPs', value: sops.length, icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Active', value: sops.filter(s => s.status === 'Approved').length, icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Pending Review', value: sops.filter(s => s.status === 'Review').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Drafts', value: sops.filter(s => s.status === 'Draft').length, icon: AlertCircle, color: 'text-slate-600', bg: 'bg-slate-50' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-8"
        >
            {/* Header Section */}
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Welcome back, {user?.name.split(' ')[0]}
                    </h1>
                    <p className="text-slate-500 mt-1">Here's what's happening in your workspace today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-64 transition-all"
                        />
                    </div>
                    <Button onClick={() => navigate('/sop-wizard')} variant="gradient" icon={Zap} className="shadow-lg shadow-indigo-500/20">
                        Quick Create
                    </Button>
                </div>
            </motion.div>

            {/* Stats Bento Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="group hover:border-indigo-100 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                                +12%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <motion.div variants={item}>
                        <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate('/sop-wizard')}
                                className="flex flex-col items-start p-5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all group text-left"
                            >
                                <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-colors">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-lg mb-1">New SOP</span>
                                <span className="text-indigo-100 text-xs">AI-Assisted Creation</span>
                            </button>

                            <button
                                onClick={() => navigate('/strategy')}
                                className="flex flex-col items-start p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-teal-200 hover:bg-teal-50/30 hover:-translate-y-1 transition-all group text-left"
                            >
                                <div className="p-2 bg-teal-50 rounded-lg mb-3 text-teal-600 group-hover:bg-teal-100 transition-colors">
                                    <Target className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-900 text-lg mb-1">Strategy Gen</span>
                                <span className="text-slate-500 text-xs group-hover:text-teal-600">Marketing Plans</span>
                            </button>

                            <button
                                onClick={() => navigate('/sops')}
                                className="flex flex-col items-start p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-200 hover:bg-indigo-50/30 hover:-translate-y-1 transition-all group text-left"
                            >
                                <div className="p-2 bg-slate-100 rounded-lg mb-3 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                    <Search className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-900 text-lg mb-1">Browse Library</span>
                                <span className="text-slate-500 text-xs">View All Docs</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div variants={item}>
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-bold text-slate-900">Recent Updates</h2>
                            <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
                        </div>
                        <Card className="divide-y divide-slate-100" noPadding>
                            {sops.slice(0, 5).map((sop, i) => (
                                <div key={sop.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i % 2 === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'
                                            }`}>
                                            {sop.title.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{sop.title}</h4>
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                Updated 2h ago • {sop.department}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={
                                            sop.status === 'Approved' ? 'success' :
                                                sop.status === 'Review' ? 'warning' : 'default'
                                        }>
                                            {sop.status}
                                        </Badge>
                                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </motion.div>
                </div>

                {/* Sidebar Widgets */}
                <motion.div variants={item} className="space-y-6">
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold">System Status</h3>
                            <div className="flex items-center gap-2 text-xs bg-white/10 px-2 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Operational
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'API Latency', value: '24ms' },
                                { label: 'AI Engine', value: 'Online' },
                                { label: 'Database', value: 'Healthy' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/10 last:border-0">
                                    <span className="text-slate-400">{item.label}</span>
                                    <span className="font-mono text-emerald-400">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Pending Approvals">
                        <div className="space-y-4">
                            {/* Mock pending items */}
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 line-clamp-1">Q4 Marketing Strategy Revision</p>
                                        <p className="text-xs text-slate-500">Submitted by Sarah J.</p>
                                        <div className="flex gap-2 mt-2">
                                            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Review</button>
                                            <button className="text-xs font-medium text-slate-500 hover:text-slate-700">Dismiss</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
