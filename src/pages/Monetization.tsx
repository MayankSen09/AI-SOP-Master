import React, { useState } from 'react';
import { DollarSign, Gift, Filter, ShoppingBag, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { generateMonetizationStrategy } from '../lib/ai';

export const Monetization: React.FC = () => {
    const [niche, setNiche] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [strategy, setStrategy] = useState<any>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const result = await generateMonetizationStrategy(niche);
            setStrategy(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-indigo-600" />
                    Monetization Layer
                </h1>
                <p className="text-slate-500">
                    Unlock revenue streams by mapping content to high-converting offers.
                </p>
            </div>

            <Card className="p-6">
                <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Your Niche / Industry</label>
                        <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Personal Finance, Fitness Coaching, DIY Crafts"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isGenerating} className="h-[50px] px-8 w-full md:w-auto" icon={isGenerating ? Loader2 : DollarSign}>
                        {isGenerating ? 'Strategizing...' : 'Generate Roadmap'}
                    </Button>
                </form>
            </Card>

            {strategy && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
                    {/* Lead Magnets */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Gift className="w-24 h-24 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                            <Gift className="w-5 h-5 text-indigo-600" /> Lead Magnets
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            {strategy.leadMagnets.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-lg">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                    <span className="text-sm font-medium text-indigo-900">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Funnel Steps */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Filter className="w-24 h-24 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                            <Filter className="w-5 h-5 text-purple-600" /> Funnel Flow
                        </h3>
                        <div className="space-y-4 relative z-10">
                            {strategy.funnelSteps.map((step: string, i: number) => (
                                <div key={i} className="relative">
                                    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm text-center font-medium text-slate-700">
                                        {step}
                                    </div>
                                    {i < strategy.funnelSteps.length - 1 && (
                                        <div className="h-6 w-0.5 bg-slate-300 mx-auto my-1"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Core Offers */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShoppingBag className="w-24 h-24 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                            <ShoppingBag className="w-5 h-5 text-emerald-600" /> Core Offers
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            {strategy.offers.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                                    <span className="text-emerald-500 font-bold">$</span>
                                    <span className="text-sm font-bold text-slate-800">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Monetization;
