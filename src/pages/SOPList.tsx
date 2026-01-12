import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Search, Plus, FileText, MoreVertical, Filter, SlidersHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const SOPList: React.FC = () => {
    const { sops, departments } = useData();
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Standard Operating Procedures</h1>
                    <p className="text-slate-500 mt-1">Manage and track your organization's processes.</p>
                </div>
                {user?.role !== 'Viewer' && (
                    <Button icon={Plus}>
                        Create SOP
                    </Button>
                )}
            </div>

            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <div className="flex items-center gap-2 min-w-[300px] md:min-w-0">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <select
                                    className="pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none cursor-pointer hover:bg-slate-50 focus:border-indigo-500 transition-colors"
                                    value={deptFilter}
                                    onChange={e => setDeptFilter(e.target.value)}
                                >
                                    <option value="">All Departments</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>

                            <div className="relative">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <select
                                    className="pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none cursor-pointer hover:bg-slate-50 focus:border-indigo-500 transition-colors"
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    {['Draft', 'Review', 'Approved', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Department</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Last Updated</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredSOPs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                                <Search className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <p className="font-medium text-slate-900">No SOPs found</p>
                                            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSOPs.map((sop) => (
                                    <tr key={sop.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{sop.title}</p>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">v{sop.currentVersion}.0</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-600">
                                                {departments.find(d => d.id === sop.departmentId)?.name || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(sop.status)}>
                                                {sop.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {format(new Date(sop.updatedAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
