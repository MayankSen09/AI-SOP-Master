import { AlertCircle, TrendingUp, Zap, Target } from 'lucide-react';
import type { Industry, FunnelGoal } from '../../lib/funnelTypes';
import { INDUSTRIES } from '../../lib/funnelTypes';
import React from 'react';

interface StrategyCoachProps {
    industry: Industry;
    goal: FunnelGoal;
    answers: any;
}

export const StrategyCoach: React.FC<StrategyCoachProps> = ({ industry, goal, answers }) => {
    const benchmarks = INDUSTRIES[industry]?.benchmarks;

    const getAdvice = () => {
        const advice = [];

        if (industry === 'luxury' && goal === 'leads') {
            advice.push({
                type: 'warning',
                icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
                title: 'Quality over Quantity',
                text: 'Luxury audiences respond poorly to high-volume lead gen. Shift focus to exclusive membership or white-glove discovery calls.'
            });
        }

        if (benchmarks?.convRate > 0.04) {
            advice.push({
                type: 'opportunity',
                icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
                title: 'High Conversion Sector',
                text: `${INDUSTRIES[industry].name} typically sees ${benchmarks.convRate * 100}%+ conversion. Aggressive retargeting is recommended.`
            });
        }

        if (answers.trafficSource === 'Ads') {
            advice.push({
                type: 'tip',
                icon: <Zap className="w-4 h-4 text-blue-400" />,
                title: 'Ad Fatigue Guard',
                text: 'Rotate creative every 7 days for this industry to maintain its 3D depth and engagement.'
            });
        }

        if (advice.length === 0) {
            advice.push({
                type: 'neutral',
                icon: <Target className="w-4 h-4 text-indigo-400" />,
                title: 'Base Strategy Active',
                text: 'Focus on TOFU (Top of Funnel) volume to feed the conversion peak.'
            });
        }

        return advice;
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Strat.AI Analysis</h3>
            <div className="space-y-3">
                {getAdvice().map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                                <div className="text-white/60 text-xs leading-relaxed">{item.text}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Industry Benchmark</div>
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-2xl font-bold text-white">{(benchmarks?.convRate || 0.03) * 100}%</div>
                        <div className="text-[10px] text-white/40">Avg. Conversion</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-white">${benchmarks?.avgOrderValue || 150}</div>
                        <div className="text-[10px] text-white/40">Expected AOV</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
