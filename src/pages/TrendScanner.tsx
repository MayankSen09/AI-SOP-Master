import React, { useState } from 'react';
import { TrendingUp, Search, Instagram, Linkedin, Twitter, Loader2, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { scanTrends } from '../lib/ai';

export const TrendScanner: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [trends, setTrends] = useState<any[]>([]);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScanning(true);
        try {
            const result = await scanTrends(query);
            setTrends(result.trends || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsScanning(false);
        }
    };

    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
            case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-700" />;
            case 'x': return <Twitter className="w-5 h-5 text-black" />;
            default: return <TrendingUp className="w-5 h-5" />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                    AI Trend Scanner
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    Predict upcoming trends and get brand-fit content ideas for every platform.
                </p>
            </div>

            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-white border-indigo-100">
                <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter industry or topic (e.g., 'SaaS'"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isScanning} className="h-[46px] w-full md:w-auto px-8" icon={isScanning ? Loader2 : Sparkles}>
                        {isScanning ? 'Scanning...' : 'Scan Trends'}
                    </Button>
                </form>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trends.map((trend, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-all border-l-4 border-l-indigo-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                {getIcon(trend.platform)}
                                <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 tracking-wider ">{trend.platform}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${trend.volume === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                {trend.volume} Volume
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">{trend.topic}</h3>

                        <div className="bg-slate-50 rounded-lg p-3">
                            <strong className="text-xs text-slate-500 uppercase block mb-2">Brand Fit Ideas</strong>
                            <ul className="space-y-2">
                                {trend.brandFitIdeas?.map((idea: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                        {idea}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TrendScanner;
