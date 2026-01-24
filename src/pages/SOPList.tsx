import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Search, Plus, FileText, MoreVertical, Filter, SlidersHorizontal, Download, CheckCircle, Trash2, Eye, Copy, Hash, Globe, Database, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export const SOPList: React.FC = () => {
    const { sops, departments, updateSOP, deleteSOP } = useData();
    const { success, warning, error } = useToast();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedSOPs, setSelectedSOPs] = useState<Set<string>>(new Set());

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('sop-search')?.focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                navigate('/sop-wizard');
            }
            if (e.key === 'Escape' && selectedSOPs.size > 0) {
                setSelectedSOPs(new Set());
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedSOPs, navigate]);

    const filteredSOPs = sops.filter(sop => {
        const matchesSearch = sop.title.toLowerCase().includes(search.toLowerCase());
        const matchesDept = deptFilter ? sop.departmentId === deptFilter : true;
        const matchesStatus = statusFilter ? sop.status === statusFilter : true;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Review': return 'warning';
            case 'Draft': return 'info';
            case 'Archived': return 'default';
            default: return 'default';
        }
    };

    const handleDownloadPDF = (sop: any) => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(sop.title, 20, 25);
            doc.setFontSize(10);
            doc.text(`Department: ${departments.find(d => d.id === sop.departmentId)?.name || 'Unknown'}`, 20, 35);
            doc.text(`Status: ${sop.status}`, 20, 41);
            doc.save(`${sop.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
            success('PDF Downloaded.');
        } catch (err) {
            error('PDF Generation Failed.');
        }
        setActiveMenu(null);
    };

    const handleApprove = (sop: any) => {
        updateSOP(sop.id, { status: 'Approved' });
        success(`"${sop.title}" approved.`);
        setActiveMenu(null);
    };

    const handleDelete = (sop: any) => {
        if (confirm(`Authorize deletion of ${sop.title}?`)) {
            deleteSOP(sop.id);
            warning('System purged.');
        }
        setActiveMenu(null);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-[1400px] mx-auto space-y-10"
        >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-architect-border pb-10">
                <div className="space-y-2">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Standard Operating <span className="architect-gradient">Procedures</span></h1>
                        <p className="text-secondary dark:text-architect-muted font-medium text-sm">Manage and track your organization's protocols</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-architect-muted group-focus-within:text-brand-primary" />
                            <input
                                id="sop-search"
                                type="text"
                                placeholder="Search procedures..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-2xl text-slate-900 dark:text-white text-xs font-black tracking-widest outline-none focus:border-brand-primary transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <Button variant="gradient" icon={Plus} onClick={() => navigate('/sop-wizard')} className="h-full px-8 font-bold text-sm">Create New SOP</Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-architect-dark border border-slate-200 dark:border-architect-border rounded-xl">
                        <Filter className="w-3 h-3 text-slate-500 dark:text-architect-muted" />
                        <select
                            value={deptFilter}
                            onChange={e => setDeptFilter(e.target.value)}
                            className="bg-transparent text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest outline-none cursor-pointer"
                        >
                            <option value="">All Sectors</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-architect-dark border border-slate-200 dark:border-architect-border rounded-xl">
                        <SlidersHorizontal className="w-3 h-3 text-slate-500 dark:text-architect-muted" />
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="bg-transparent text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest outline-none cursor-pointer"
                        >
                            <option value="">All Statuses</option>
                            {['Draft', 'Review', 'Approved', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="ml-auto flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Database className="w-3 h-3 text-brand-primary" />
                            <span className="text-xs font-bold text-secondary dark:text-architect-muted">{filteredSOPs.length} Active SOPs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ledger Content */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredSOPs.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-4 bg-white/50 dark:bg-architect-card/30 border border-dashed border-slate-200 dark:border-architect-border rounded-3xl">
                            <div className="p-4 bg-slate-100 dark:bg-architect-dark w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-slate-200 dark:border-architect-border">
                                <Search className="w-6 h-6 text-slate-400 dark:text-architect-muted" />
                            </div>
                            <p className="text-sm font-bold text-slate-600 dark:text-white">No matching procedures found</p>
                        </motion.div>
                    ) : (
                        filteredSOPs.map((sop) => (
                            <motion.div
                                key={sop.id}
                                variants={itemVariants}
                                layout
                                className="group relative flex items-center gap-6 p-6 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-3xl hover:border-brand-primary transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
                                onClick={() => navigate('/sops')}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-architect-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-architect-dark border border-slate-200 dark:border-architect-border flex items-center justify-center text-slate-900 dark:text-white group-hover:text-brand-primary group-hover:border-brand-primary/50 transition-all">
                                    <FileText className="w-6 h-6" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight truncate group-hover:text-brand-primary transition-colors">{sop.title}</h3>
                                        <Badge variant={getStatusVariant(sop.status)} className="text-[8px] font-black uppercase px-2 py-0.5">{sop.status}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-architect-muted uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {departments.find(d => d.id === sop.departmentId)?.name || 'General Sector'}</span>
                                        <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" /> v{sop.currentVersion}.0</span>
                                        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> Modified {format(new Date(sop.updatedAt), 'dd.MM.yy')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDownloadPDF(sop); }}
                                        className="p-3 bg-slate-50 dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border rounded-xl text-slate-500 dark:text-architect-muted hover:text-brand-primary hover:border-brand-primary transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === sop.id ? null : sop.id); }}
                                        className="p-3 bg-slate-50 dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border rounded-xl text-slate-500 dark:text-architect-muted hover:text-brand-primary hover:border-brand-primary transition-all"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>

                                {activeMenu === sop.id && (
                                    <div className="absolute right-6 top-full mt-2 w-48 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-2xl shadow-2xl py-2 z-50">
                                        <button onClick={() => handleApprove(sop)} className="w-full px-4 py-3 text-left text-xs font-bold text-emerald-500 hover:bg-emerald-500/10 transition-colors flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Approve</button>
                                        <button onClick={() => navigate(`/sops/${sop.id}`)} className="w-full px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2"><Eye className="w-3 h-3" /> View</button>
                                        <button onClick={() => navigate(`/sop-wizard?clone=${sop.id}`)} className="w-full px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2"><Copy className="w-3 h-3" /> Duplicate</button>
                                        <div className="my-1 border-t border-architect-border" />
                                        <button onClick={() => handleDelete(sop)} className="w-full px-4 py-3 text-left text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2"><Trash2 className="w-3 h-3" /> Delete</button>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
