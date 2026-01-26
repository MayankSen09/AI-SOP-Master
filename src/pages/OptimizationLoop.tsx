import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, RefreshCw, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { generateOptimizationTips } from '../lib/ai';

export const OptimizationLoop: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);

    // Mock recent metrics
    const metrics = {
        engagementRate: "2.4%",
        conversionRate: "1.1%",
        topPost: "Video: Day in the life",
        worstPost: "Static image: Quote",
        growth: "-5% vs last week"
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const result = await generateOptimizationTips(metrics);
            setAnalysis(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-indigo-600" />
                    Smart Optimization Loop
                </h1>
                <p className="text-slate-500">
                    AI-driven analysis to tell you exactly what to stop, start, and scale.
                </p>
            </div>

            {/* Metrics Snapshot */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 border-l-4 border-l-indigo-500">
                    <p className="text-xs text-slate-500 uppercase font-bold">Avg. Engagement</p>
                    <div className="flex items-end gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-900">4.8%</span>
                        <span className="text-xs text-emerald-600 font-bold mb-1 flex items-center"><TrendingUp className="w-3 h-3" /> +12%</span>
                    </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-purple-500">
                    <p className="text-xs text-slate-500 uppercase font-bold">Reach</p>
                    <div className="flex items-end gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-900">12.5k</span>
                        <span className="text-xs text-emerald-600 font-bold mb-1 flex items-center"><TrendingUp className="w-3 h-3" /> +5%</span>
                    </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-orange-500">
                    <p className="text-xs text-slate-500 uppercase font-bold">Conversion</p>
                    <div className="flex items-end gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-900">1.2%</span>
                        <span className="text-xs text-red-600 font-bold mb-1 flex items-center"><TrendingDown className="w-3 h-3" /> -2%</span>
                    </div>
                </Card>
                <Card className="flex items-center justify-center p-0 bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer" onClick={handleAnalyze}>
                    {isAnalyzing ? (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    ) : (
                        <div className="text-center text-white">
                            <BarChart3 className="w-8 h-8 mx-auto mb-1" />
                            <span className="font-bold text-sm">Run AI Audit</span>
                        </div>
                    )}
                </Card>
            </div>

            {/* Recommendations */}
            {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
                    {/* STOP */}
                    <Card className="border-t-4 border-t-red-500 bg-red-50/20">
                        <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> STOP
                        </h3>
                        {analysis.recommendations.filter((r: any) => r.type === 'Stop').map((rec: any, i: number) => (
                            <div key={i} className="mb-4">
                                <p className="font-bold text-slate-800">{rec.action}</p>
                                <p className="text-sm text-slate-600 mt-1">{rec.reason}</p>
                            </div>
                        ))}
                    </Card>

                    {/* START */}
                    <Card className="border-t-4 border-t-emerald-500 bg-emerald-50/20">
                        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" /> START
                        </h3>
                        {analysis.recommendations.filter((r: any) => r.type === 'Start').map((rec: any, i: number) => (
                            <div key={i} className="mb-4">
                                <p className="font-bold text-slate-800">{rec.action}</p>
                                <p className="text-sm text-slate-600 mt-1">{rec.reason}</p>
                            </div>
                        ))}
                    </Card>

                    {/* SCALE */}
                    <Card className="border-t-4 border-t-indigo-500 bg-indigo-50/20">
                        <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                            <ArrowRight className="w-5 h-5" /> SCALE
                        </h3>
                        {analysis.recommendations.filter((r: any) => r.type === 'Scale').map((rec: any, i: number) => (
                            <div key={i} className="mb-4">
                                <p className="font-bold text-slate-800">{rec.action}</p>
                                <p className="text-sm text-slate-600 mt-1">{rec.reason}</p>
                            </div>
                        ))}
                    </Card>
                </div>
            )}

            {analysis && (
                <Card title="A/B Testing Candidates">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis.abTestIdeas.map((idea: string, i: number) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-indigo-200 transition-colors">
                                <span className="font-medium text-slate-700">{idea}</span>
                                <Button size="sm" variant="secondary">Setup Test</Button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default OptimizationLoop;
