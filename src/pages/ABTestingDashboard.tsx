import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Award, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';

const TEST_TYPES = [
    { id: 'email', name: 'Email Subject Line', icon: '📧' },
    { id: 'landing-page', name: 'Landing Page', icon: '🖥️' },
    { id: 'ad-copy', name: 'Ad Copy', icon: '📢' },
    { id: 'cta', name: 'Call-to-Action', icon: '🎯' },
];

export function ABTestingDashboard() {
    const { abTests, createABTest } = useMarketing();
    const { success } = useToast();
    const [creating, setCreating] = useState(false);
    const [newTest, setNewTest] = useState({
        name: '',
        type: 'email' as any,
        variantA: '',
        variantB: ''
    });

    const calculateSignificance = (metricsA: any, metricsB: any) => {
        const rateA = metricsA.impressions > 0 ? metricsA.conversions / metricsA.impressions : 0;
        const rateB = metricsB.impressions > 0 ? metricsB.conversions / metricsB.impressions : 0;
        const diff = Math.abs(rateA - rateB);
        const totalImpressions = metricsA.impressions + metricsB.impressions;

        if (totalImpressions < 100) return 0;
        const confidence = Math.min(95, (diff * totalImpressions * 10));
        return confidence.toFixed(1);
    };

    const handleCreateTest = () => {
        if (!newTest.name || !newTest.variantA || !newTest.variantB) return;

        createABTest({
            name: newTest.name,
            type: newTest.type,
            variantA: { content: newTest.variantA },
            variantB: { content: newTest.variantB },
            status: 'running',
            metricsA: { impressions: 0, conversions: 0, conversionRate: 0 },
            metricsB: { impressions: 0, conversions: 0, conversionRate: 0 }
        });

        success('A/B test created!');
        setNewTest({ name: '', type: 'email', variantA: '', variantB: '' });
        setCreating(false);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white shadow-lg">
                            <FlaskConical className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">A/B Testing Dashboard</h1>
                            <p className="text-slate-500 dark:text-slate-400">Optimize campaigns with data-driven testing</p>
                        </div>
                    </div>
                    <Button onClick={() => setCreating(!creating)} icon={Plus} variant="gradient">
                        New Test
                    </Button>
                </div>
            </motion.div>

            {/* Create New Test */}
            {creating && (
                <Card>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Create A/B Test</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Test Name</label>
                                <input
                                    type="text"
                                    value={newTest.name}
                                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                                    placeholder="e.g., Homepage Hero Test"
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Test Type</label>
                                <select
                                    value={newTest.type}
                                    onChange={(e) => setNewTest({ ...newTest, type: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                >
                                    {TEST_TYPES.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Variant A (Control)</label>
                                <textarea
                                    value={newTest.variantA}
                                    onChange={(e) => setNewTest({ ...newTest, variantA: e.target.value })}
                                    rows={4}
                                    placeholder="Original version"
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Variant B (Test)</label>
                                <textarea
                                    value={newTest.variantB}
                                    onChange={(e) => setNewTest({ ...newTest, variantB: e.target.value })}
                                    rows={4}
                                    placeholder="New version to test"
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleCreateTest} variant="gradient" className="flex-1">Create Test</Button>
                            <Button onClick={() => setCreating(false)} variant="secondary">Cancel</Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Active Tests */}
            <div className="grid grid-cols-1 gap-6">
                {abTests.length > 0 ? abTests.map(test => {
                    const confidence = calculateSignificance(test.metricsA, test.metricsB);
                    const winner = test.metricsA.conversionRate > test.metricsB.conversionRate ? 'A' : 'B';

                    return (
                        <Card key={test.id}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{test.name}</h3>
                                    <p className="text-sm text-slate-500">{TEST_TYPES.find(t => t.id === test.type)?.name}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500">Confidence</div>
                                        <div className={`text-lg font-bold ${Number(confidence) > 95 ? 'text-emerald-600' : Number(confidence) > 80 ? 'text-amber-600' : 'text-slate-400'}`}>
                                            {confidence}%
                                        </div>
                                    </div>
                                    {test.winner && (
                                        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                            <Award className="w-4 h-4 text-emerald-600" />
                                            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                                                Winner: {test.winner}
                                            </span>
                                        </div>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${test.status === 'running' ? 'bg-blue-100 text-blue-700' :
                                        test.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-slate-100 text-slate-700'
                                        }`}>
                                        {test.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Variant A */}
                                <div className={`p-4 border-2 rounded-lg ${winner === 'A' && Number(confidence) > 95 ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-700'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Variant A (Control)</h4>
                                        {winner === 'A' && Number(confidence) > 95 && <Award className="w-5 h-5 text-emerald-600" />}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{test.variantA.content}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <div className="text-xs text-slate-500">Impressions</div>
                                            <div className="font-semibold">{test.metricsA.impressions}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">Conversions</div>
                                            <div className="font-semibold">{test.metricsA.conversions}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">CVR</div>
                                            <div className="font-semibold text-indigo-600">{test.metricsA.conversionRate.toFixed(2)}%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Variant B */}
                                <div className={`p-4 border-2 rounded-lg ${winner === 'B' && Number(confidence) > 95 ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-700'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Variant B (Test)</h4>
                                        {winner === 'B' && Number(confidence) > 95 && <Award className="w-5 h-5 text-emerald-600" />}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{test.variantB.content}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <div className="text-xs text-slate-500">Impressions</div>
                                            <div className="font-semibold">{test.metricsB.impressions}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">Conversions</div>
                                            <div className="font-semibold">{test.metricsB.conversions}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">CVR</div>
                                            <div className="font-semibold text-violet-600">{test.metricsB.conversionRate.toFixed(2)}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                }) : (
                    <Card className="text-center py-12">
                        <FlaskConical className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 mb-4">No A/B tests running</p>
                        <Button onClick={() => setCreating(true)} variant="gradient" icon={Plus}>
                            Create Your First Test
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
}
