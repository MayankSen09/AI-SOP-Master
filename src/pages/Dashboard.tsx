import { motion, type Variants } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTeam } from '../context/TeamContext';
import { BarChart3, Clock, AlertCircle, CheckCircle, Search, TrendingUp, Activity, Sparkles, Rocket, Shield, Globe, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

export function Dashboard() {
    const { user } = useAuth();
    const { sops } = useData();
    const { currentTeam } = useTeam();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Systems', value: sops.length, icon: BarChart3, trend: '+12%', color: 'from-cyan-500 to-blue-500' },
        { label: 'Operational', value: sops.filter(s => s.status === 'Approved').length, icon: CheckCircle, trend: '+8%', color: 'from-emerald-500 to-teal-500' },
        { label: 'Under Review', value: sops.filter(s => s.status === 'Review').length, icon: Clock, trend: '-3%', color: 'from-amber-500 to-orange-500' },
        { label: 'Initialization', value: sops.filter(s => s.status === 'Draft').length, icon: AlertCircle, trend: '+5%', color: 'from-slate-500 to-slate-400' },
    ];

    const statusData = [
        { name: 'Approved', value: sops.filter(s => s.status === 'Approved').length },
        { name: 'Review', value: sops.filter(s => s.status === 'Review').length },
        { name: 'Draft', value: sops.filter(s => s.status === 'Draft').length },
        { name: 'Archived', value: sops.filter(s => s.status === 'Archived').length }
    ];

    const activityData = [
        { day: 'Mon', created: 4, reviewed: 2 },
        { day: 'Tue', created: 3, reviewed: 5 },
        { day: 'Wed', created: 6, reviewed: 3 },
        { day: 'Thu', created: 2, reviewed: 4 },
        { day: 'Fri', created: 5, reviewed: 6 },
        { day: 'Sat', created: 1, reviewed: 1 },
        { day: 'Sun', created: 0, reviewed: 0 }
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1600px] mx-auto space-y-10"
        >
            {/* Header Section */}
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                        Dashboard<span className="architect-gradient">.</span>
                    </h1>
                    <p className="text-slate-600 dark:text-architect-muted font-medium tracking-wide flex items-center gap-2">
                        Welcome back, {user?.name.split(' ')[0]} <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" /> {currentTeam?.name || 'My Workspace'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden xl:block group">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-architect-muted group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search SOPs..."
                            className="pl-12 pr-6 py-3 rounded-2xl border border-slate-200 dark:border-architect-border bg-white dark:bg-architect-card text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-architect-muted text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none w-72 transition-all backdrop-blur-xl"
                        />
                    </div>
                    <Button
                        onClick={() => navigate('/sop-wizard')}
                        variant="gradient"
                        icon={Sparkles}
                        className="shadow-2xl shadow-brand-primary/20 px-8 py-6 text-base font-bold uppercase tracking-wider h-auto"
                    >
                        Create SOP
                    </Button>
                </div>
            </motion.div>

            {/* Bento Grid Concept */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Main Stats - Bento Style */}
                {stats.map((stat) => (
                    <motion.div key={stat.label} variants={item}>
                        <Card className="group relative overflow-hidden h-full">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] blur-3xl pointer-events-none group-hover:opacity-[0.1] transition-opacity`} />

                            <div className="flex items-center justify-between mb-8">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-slate-500 dark:text-architect-muted uppercase tracking-[0.2em] mb-1">Trend</span>
                                    <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} flex items-center gap-1`}>
                                        {stat.trend} <TrendingUp className={`w-3 h-3 ${stat.trend.startsWith('-') && 'rotate-180'}`} />
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 relative z-10">
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h3>
                                <p className="text-sm text-slate-600 dark:text-architect-muted font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {/* Performance Chart - Large Block */}
                <motion.div variants={item} className="md:col-span-2 xl:col-span-3">
                    <Card className="h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-brand-primary" />
                                    Recent Activity
                                </h3>
                                <p className="text-xs text-secondary dark:text-architect-muted mt-1 font-medium">SOP creation and review activity (7 days)</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-architect-dark/50 border border-architect-border">
                                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                    <span className="text-[10px] font-black text-architect-muted uppercase">Created</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-architect-dark/50 border border-architect-border">
                                    <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                                    <span className="text-[10px] font-black text-architect-muted uppercase">Validated</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#475569"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#475569"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                        contentStyle={{
                                            backgroundColor: '#0f172a',
                                            border: '1px solid #334155',
                                            borderRadius: '16px',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
                                            padding: '12px'
                                        }}
                                        itemStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                    />
                                    <Bar dataKey="created" fill="url(#blueGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                                    <Bar dataKey="reviewed" fill="url(#cyanGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        </linearGradient>
                                        <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>

                {/* Status Distribution - Square Block */}
                <motion.div variants={item} className="md:col-span-2 xl:col-span-1">
                    <Card className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-architect-gradient opacity-50" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-[0.2em] uppercase mb-8">System Health</h3>

                        <div className="h-[220px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPie>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={0}
                                    >
                                        {statusData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPie>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">100<span className="text-brand-primary">%</span></span>
                                <span className="text-[10px] font-bold text-secondary dark:text-architect-muted uppercase tracking-wider">Uptime</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 w-full px-2">
                            {statusData.map((d, i) => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    <span className="text-[10px] font-black text-architect-muted uppercase tracking-tighter">{d.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Quick Shortcuts - Bento Tiles */}
                <motion.div variants={item} className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => navigate('/sop-wizard')}
                        className="group relative flex flex-col items-start p-8 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-[2rem] overflow-hidden hover:border-brand-primary transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity" />
                        <div className="p-4 bg-brand-primary/10 rounded-2xl mb-6 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                            <Rocket className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI SOP Builder</h4>
                        <p className="text-sm text-secondary dark:text-architect-muted font-medium mb-6">Create standard operating procedures using AI.</p>
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                            Start Building <ChevronRight className="w-3 h-3" />
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/templates')}
                        className="group relative flex flex-col items-start p-8 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-[2rem] overflow-hidden hover:border-blue-500 transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity" />
                        <div className="p-4 bg-blue-500/10 rounded-2xl mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-500">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Template Library</h4>
                        <p className="text-sm text-secondary dark:text-architect-muted font-medium mb-6">Browse pre-built industry templates.</p>
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                            View Templates <ChevronRight className="w-3 h-3" />
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/analytics')}
                        className="group relative flex flex-col items-start p-8 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-[2rem] overflow-hidden hover:border-purple-500 transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity" />
                        <div className="p-4 bg-purple-500/10 rounded-2xl mb-6 text-purple-500 group-hover:scale-110 transition-transform duration-500">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analytics & Reports</h4>
                        <p className="text-sm text-secondary dark:text-architect-muted font-medium mb-6">View system performance and usage stats.</p>
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold text-purple-500 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                            View Reports <ChevronRight className="w-3 h-3" />
                        </div>
                    </button>
                </motion.div>

                {/* System Ledger - Vertical Block */}
                <motion.div variants={item} className="xl:col-span-1">
                    <Card className="h-full flex flex-col" noPadding>
                        <div className="p-6 border-b border-architect-border/50 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Recent SOPs</h3>
                            <Button variant="ghost" size="sm" className="text-[10px] font-bold text-brand-primary uppercase tracking-wider hover:bg-brand-primary/10" onClick={() => navigate('/sops')}>View All</Button>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[400px] scrollbar-hide">
                            {sops.length > 0 ? sops.slice(0, 5).map((sop) => (
                                <div
                                    key={sop.id}
                                    className="p-5 flex items-center justify-between group hover:bg-white/5 transition-all cursor-pointer border-b border-architect-border/30 last:border-0"
                                    onClick={() => navigate('/sops')}
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-architect-dark border border-slate-200 dark:border-architect-border flex items-center justify-center text-xs font-black text-slate-900 dark:text-white group-hover:border-brand-primary/50 transition-colors">
                                            {sop.title.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors truncate uppercase tracking-tight">{sop.title}</h4>
                                            <p className="text-[9px] text-secondary dark:text-architect-muted font-bold mt-0.5 uppercase">Active</p>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        sop.status === 'Approved' ? 'success' :
                                            sop.status === 'Review' ? 'warning' : 'default'
                                    } className="text-[8px] py-0.5 px-2">
                                        {sop.status}
                                    </Badge>
                                </div>
                            )) : (
                                <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                                    <BarChart3 className="w-10 h-10 mb-4 text-architect-border animate-pulse" />
                                    <p className="text-secondary dark:text-architect-muted text-xs font-bold uppercase tracking-wider">No Active SOPs</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
