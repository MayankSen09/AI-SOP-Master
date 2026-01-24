import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444'];

export function ROICalculator() {
    const [campaigns, setCampaigns] = useState([
        { name: 'Google Ads', spend: 5000, conversions: 150, revenue: 15000 },
        { name: 'Facebook Ads', spend: 3000, conversions: 100, revenue: 8000 },
        { name: 'LinkedIn Ads', spend: 2000, conversions: 50, revenue: 12000 },
    ]);

    const [newCampaign, setNewCampaign] = useState({
        name: '',
        spend: 0,
        conversions: 0,
        revenue: 0
    });

    const calculateROI = (revenue: number, spend: number) => {
        if (spend === 0) return 0;
        return ((revenue - spend) / spend * 100).toFixed(2);
    };

    const calculateCAC = (spend: number, conversions: number) => {
        if (conversions === 0) return 0;
        return (spend / conversions).toFixed(2);
    };

    const totals = campaigns.reduce((acc, campaign) => ({
        spend: acc.spend + campaign.spend,
        conversions: acc.conversions + campaign.conversions,
        revenue: acc.revenue + campaign.revenue
    }), { spend: 0, conversions: 0, revenue: 0 });

    const handleAddCampaign = () => {
        if (newCampaign.name && newCampaign.spend > 0) {
            setCampaigns([...campaigns, newCampaign]);
            setNewCampaign({ name: '', spend: 0, conversions: 0, revenue: 0 });
        }
    };

    const pieData = campaigns.map(c => ({ name: c.name, value: c.revenue }));

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Marketing ROI Calculator</h1>
                        <p className="text-slate-500 dark:text-slate-400">Track and optimize campaign performance</p>
                    </div>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                            <DollarSign className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Spend</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${totals.spend.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${totals.revenue.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                            <Percent className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Overall ROI</p>
                            <p className="text-2xl font-bold text-emerald-600">{calculateROI(totals.revenue, totals.spend)}%</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Conversions</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totals.conversions}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue  Distribution */}
                <Card>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Add New Campaign */}
                <Card>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Add Campaign</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={newCampaign.name}
                            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                            placeholder="Campaign name"
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                        />
                        <div className="grid grid-cols-3 gap-3">
                            <input
                                type="number"
                                value={newCampaign.spend || ''}
                                onChange={(e) => setNewCampaign({ ...newCampaign, spend: Number(e.target.value) })}
                                placeholder="Spend ($)"
                                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                            <input
                                type="number"
                                value={newCampaign.conversions || ''}
                                onChange={(e) => setNewCampaign({ ...newCampaign, conversions: Number(e.target.value) })}
                                placeholder="Conversions"
                                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                            <input
                                type="number"
                                value={newCampaign.revenue || ''}
                                onChange={(e) => setNewCampaign({ ...newCampaign, revenue: Number(e.target.value) })}
                                placeholder="Revenue ($)"
                                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                        </div>
                        <Button onClick={handleAddCampaign} variant="gradient" className="w-full">Add Campaign</Button>
                    </div>
                </Card>
            </div>

            {/* Campaign Table */}
            <Card>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Campaign Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Campaign</th>
                                <th className="text-right p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Spend</th>
                                <th className="text-right p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Conversions</th>
                                <th className="text-right p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Revenue</th>
                                <th className="text-right p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">CAC</th>
                                <th className="text-right p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">ROI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, idx) => (
                                <tr key={idx} className="border-t border-slate-200 dark:border-slate-700">
                                    <td className="p-3 font-medium text-slate-900 dark:text-slate-100">{campaign.name}</td>
                                    <td className="p-3 text-right text-slate-600 dark:text-slate-400">${campaign.spend.toLocaleString()}</td>
                                    <td className="p-3 text-right text-slate-600 dark:text-slate-400">{campaign.conversions}</td>
                                    <td className="p-3 text-right text-slate-600 dark:text-slate-400">${campaign.revenue.toLocaleString()}</td>
                                    <td className="p-3 text-right text-slate-600 dark:text-slate-400">${calculateCAC(campaign.spend, campaign.conversions)}</td>
                                    <td className="p-3 text-right">
                                        <span className={`font-semibold ${Number(calculateROI(campaign.revenue, campaign.spend)) > 100 ? 'text-emerald-600' : 'text-amber-600'
                                            }`}>
                                            {calculateROI(campaign.revenue, campaign.spend)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
