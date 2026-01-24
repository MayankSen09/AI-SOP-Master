import React, { useState, useEffect } from 'react';
import { Activity, DollarSign, Users } from 'lucide-react';

interface FunnelSimulatorProps {
    onSimulate: (data: any) => void;
    baseConvRate: number;
    baseAOV: number;
}

export const FunnelSimulator: React.FC<FunnelSimulatorProps> = ({ onSimulate, baseConvRate, baseAOV }) => {
    const [traffic, setTraffic] = useState(10000);
    const [convRate, setConvRate] = useState(baseConvRate || 0.03);
    const [aov, setAov] = useState(baseAOV || 100);

    useEffect(() => {
        calculateMetrics();
    }, [traffic, convRate, aov]);

    const calculateMetrics = () => {
        const revenue = traffic * convRate * aov;
        const leads = traffic * (convRate * 2.5); // Assume lead rate is higher than sale rate

        // Generate scaling factors for 3D funnel stages
        // Higher traffic -> wider top
        // Higher conv rate -> wider bottom (less taper)
        const scales = [
            1 + (traffic / 50000), // Awareness scale
            1 + (leads / 20000),   // Consideration scale
            1 + (leads / 25000),   // Conversion scale
            1 + (convRate * 10),    // Loyalty scale
            1 + (convRate * 12)     // Advocacy scale
        ];

        onSimulate({
            projectedRevenue: new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1
            }).format(revenue),
            scales: scales,
            metrics: { revenue, leads, traffic }
        });
    };

    return (
        <div className="space-y-8">
            <h3 className="text-sm font-bold text-slate-400 dark:text-white/40 uppercase tracking-[0.2em]">Simulation Controls</h3>

            <div className="space-y-6">
                {/* Traffic Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-white/70">
                            <Users className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                            Monthly Traffic
                        </div>
                        <span className="font-mono text-slate-900 dark:text-white text-sm">{traffic.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={traffic}
                        onChange={(e) => setTraffic(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                </div>

                {/* Conversion Rate Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-white/70">
                            <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                            Conversion Rate
                        </div>
                        <span className="font-mono text-slate-900 dark:text-white text-sm">{(convRate * 100).toFixed(1)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0.001"
                        max="0.1"
                        step="0.001"
                        value={convRate}
                        onChange={(e) => setConvRate(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                    />
                </div>

                {/* AOV Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-white/70">
                            <DollarSign className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                            Avg. Order Value
                        </div>
                        <span className="font-mono text-slate-900 dark:text-white text-sm">${aov}</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="5000"
                        step="10"
                        value={aov}
                        onChange={(e) => setAov(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                    />
                </div>
            </div>

            {/* Tactical Brief */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Live Projection Insights
                </div>
                <div className="text-xs text-slate-600 dark:text-white/60 leading-relaxed italic">
                    "Scaling traffic to <span className="text-slate-900 dark:text-white font-bold">{traffic.toLocaleString()}</span> at this AOV could yield a potential peak revenue of <span className="text-emerald-600 dark:text-emerald-400 font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(traffic * convRate * aov)}</span> per month."
                </div>
            </div>
        </div>
    );
};
