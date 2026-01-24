import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../components/ui/Badge';
import { Search, Mail, Building, User, Users, Calendar, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// Mock types since we don't have shared types yet
interface DemoRequest {
    id: string;
    name: string;
    email: string;
    company: string | null;
    role: string | null;
    teamSize: string | null;
    message: string | null;
    status: string;
    createdAt: string;
}

export default function AdminLeads() {
    const [leads, setLeads] = useState<DemoRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            // In a real app, we'd attach the auth token here
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/demo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setLeads(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Lead Management</h1>
                    <p className="text-secondary dark:text-architect-muted font-medium mt-1">Track and manage incoming demo requests</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border focus:border-brand-primary outline-none transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-xl cursor-not-allowed opacity-70">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Filter</span>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="py-20 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-500">Loading leads...</p>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-architect-card rounded-3xl border border-slate-200 dark:border-architect-border border-dashed">
                    <p className="text-slate-500 font-medium">No leads found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredLeads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-white dark:bg-architect-card border border-slate-200 dark:border-architect-border rounded-2xl hover:border-brand-primary/50 transition-colors shadow-sm"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between lg:justify-start lg:gap-4">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{lead.name}</h3>
                                        <Badge variant={lead.status === 'NEW' ? 'info' : 'default'} className="uppercase text-[10px] tracking-wider font-bold">
                                            {lead.status}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            {lead.email}
                                        </div>
                                        {lead.company && (
                                            <div className="flex items-center gap-2">
                                                <Building className="w-4 h-4 text-slate-400" />
                                                {lead.company}
                                            </div>
                                        )}
                                        {lead.role && (
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                {lead.role}
                                            </div>
                                        )}
                                        {lead.teamSize && (
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-slate-400" />
                                                {lead.teamSize}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="lg:text-right space-y-2 min-w-[200px]">
                                    <div className="flex items-center lg:justify-end gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        <Calendar className="w-3 h-3" />
                                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                                    </div>
                                    {lead.message && (
                                        <p className="text-sm text-slate-500 italic truncate max-w-md ml-auto">
                                            "{lead.message}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
