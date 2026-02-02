import React, { useState } from 'react';
import { Rocket, Target, TrendingUp, Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const StrategyGenerator: React.FC = () => {
    const [formData, setFormData] = useState({
        industry: '',
        companySize: '',
        geo: '',
        model: 'B2B'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulate complex AI processing
        setTimeout(() => {
            setResult(generateMockResult(formData));
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">AI Marketing Strategy Generator</h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
                    Transform your business details into a comprehensive marketing roadmap using our advanced AI engine.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1 space-y-6">
                    <Card title="Configuration">
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                                <input
                                    type="text"
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="e.g. Healthcare, SaaS"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Size</label>
                                <select
                                    value={formData.companySize}
                                    onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                                >
                                    <option value="">Select size...</option>
                                    <option value="Startup">Startup (1-10)</option>
                                    <option value="SME">SME (11-50)</option>
                                    <option value="Mid-Market">Mid-Market (51-200)</option>
                                    <option value="Enterprise">Enterprise (200+)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target Geography</label>
                                <input
                                    type="text"
                                    value={formData.geo}
                                    onChange={e => setFormData({ ...formData, geo: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="e.g. North America"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Business Model</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['B2B', 'B2C', 'D2C', 'Marketplace'].map(m => (
                                        <button
                                            type="button"
                                            key={m}
                                            onClick={() => setFormData({ ...formData, model: m })}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${formData.model === m
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full mt-4"
                                icon={isGenerating ? Loader2 : Rocket}
                            >
                                {isGenerating ? 'Analyzing Market...' : 'Generate Strategy'}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-2">
                    {!result && !isGenerating && (
                        <Card className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-dashed bg-slate-50/50">
                            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                <Rocket className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900">Ready to Launch</h3>
                            <p className="text-slate-500 max-w-sm mt-2">
                                Enter your business details to generate a comprehensive, AI-driven marketing roadmap tailored to your industry.
                            </p>
                        </Card>
                    )}

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Executive Summary */}
                            <Card className="bg-gradient-to-r from-indigo-50 to-white border-l-4 border-l-indigo-500">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Executive Strategy: {result.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{result.summary}</p>
                            </Card>

                            {/* Meta Targeting - Requested Feature */}
                            <Card className="border-sky-200 bg-sky-50/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-5 h-5 text-sky-600" />
                                    <h3 className="font-semibold text-sky-900">Meta Detailed Targeting</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                                        <strong className="block text-xs uppercase text-slate-600 dark:text-slate-300 font-semibold mb-2">Interests</strong>
                                        <div className="flex flex-wrap gap-1.5">
                                            {result.meta.interests.map((i: string) => (
                                                <span key={i} className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs font-medium">{i}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                                        <strong className="block text-xs uppercase text-slate-600 dark:text-slate-300 font-semibold mb-2">Behaviors</strong>
                                        <ul className="space-y-1">
                                            {result.meta.behaviors.map((b: string) => (
                                                <li key={b} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                                        <strong className="block text-xs uppercase text-slate-600 dark:text-slate-300 font-semibold mb-2">Demographics</strong>
                                        <p className="text-sm text-slate-600">{result.meta.demographics}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Channel Strategy */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.channels.map((ch: any) => (
                                    <Card key={ch.name} className="h-full">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-bold text-slate-900">{ch.name}</h4>
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{ch.focus}</span>
                                        </div>
                                        <ul className="text-sm space-y-2 text-slate-600">
                                            {ch.tactics.map((t: string) => (
                                                <li key={t} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                ))}
                            </div>

                            {/* Roadmap */}
                            <Card>
                                <div className="flex items-center gap-2 mb-6">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-slate-900">90-Day Growth Roadmap</h3>
                                </div>
                                <div className="space-y-0">
                                    {result.roadmap.map((phase: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-24 shrink-0 pt-1 text-right">
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{phase.duration}</span>
                                            </div>
                                            <div className="pb-8 relative border-l border-slate-200 pl-6 last:border-0 last:pb-0">
                                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-slate-50 group-hover:ring-indigo-50 transition-all"></div>
                                                <h4 className="font-semibold text-sm text-slate-900">{phase.phase}</h4>
                                                <p className="text-sm text-slate-600 mt-1">{phase.activities.join(', ')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Mock Logic Generator
function generateMockResult(data: any) {
    const isB2B = data.model === 'B2B';
    const industry = data.industry || 'General Business';

    return {
        title: `${industry} Global Dominance Plan`,
        summary: `To capture the ${data.companySize} market in ${data.geo || 'Global'}, we recommend a high-velocity ${isB2B ? 'Account Based Marketing (ABM)' : 'Viral Loop'} strategy. Focus on positioning as the premium thought leader.`,
        meta: {
            interests: [industry, isB2B ? 'B2B Marketing' : 'Online Shopping', 'Technology', 'Entrepreneurship', 'SaaS'],
            behaviors: isB2B ? ['Facebook Page Admins', 'Small Business Owners'] : ['Engaged Shoppers', 'Frequent Travelers'],
            demographics: isB2B ? 'Ages 28-55, Decision Makers' : 'Ages 18-34, Trend Setters'
        },
        channels: [
            { name: 'LinkedIn / Social', focus: 'Authority', tactics: ['Founder Stories', 'Industry Reports', 'Carousel Ads'] },
            { name: 'Content SEO', focus: 'Organic Traffic', tactics: ['Pillar Pages', 'Comparison Posts', 'Programmatic SEO'] },
            { name: 'Paid Acquisition', focus: 'Scale', tactics: ['Retargeting', 'Lookalike Audiences', 'Video Ads'] },
            { name: 'Email / Retention', focus: 'LTV', tactics: ['Drip Campaigns', 'Newsletter', 'Upsell Triggers'] }
        ],
        roadmap: [
            { phase: 'Foundation', duration: 'Month 1', activities: ['Audit Competitors', 'Setup Tracking', 'Launch MVP Ads'] },
            { phase: 'Validation & Scale', duration: 'Month 2', activities: ['Optimize Funnel', 'Increase Budget 20%', 'Content Blitz'] },
            { phase: 'Domination', duration: 'Month 3', activities: ['New Markets', 'Automate Ops', 'Maximize ROI'] }
        ]
    };
}


