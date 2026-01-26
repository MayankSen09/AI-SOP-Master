import React, { useState } from 'react';
import { Repeat, Twitter, Instagram, Linkedin, ArrowRight, Loader2, Copy, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { repurposeContent } from '../lib/ai';

export const ContentRepurposing: React.FC = () => {
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async () => {
        if (!content) return;
        setIsGenerating(true);
        try {
            const data = await repurposeContent(content, ['Twitter', 'Instagram', 'LinkedIn']);
            setResults(data.variations || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                    <Repeat className="w-8 h-8 text-indigo-600" />
                    Content Repurposing Engine
                </h1>
                <p className="text-slate-500">
                    Turn one piece of content into multiple platform-optimized posts instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-4">
                    <Card title="Source Content" className="h-full">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your blog post, video script, or long-form content here..."
                            className="w-full h-96 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none text-slate-700 leading-relaxed"
                        />
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleGenerate} disabled={isGenerating || !content} icon={isGenerating ? Loader2 : ArrowRight}>
                                {isGenerating ? 'Repurposing...' : 'Generate Variations'}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Output Area */}
                <div className="space-y-6">
                    {results.length === 0 ? (
                        <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                            <Repeat className="w-12 h-12 mb-4 opacity-50" />
                            <p>Generated content will appear here</p>
                        </div>
                    ) : (
                        results.map((item, idx) => (
                            <Card key={idx} className="relative group hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                                        {item.platform === 'Twitter' && <Twitter className="w-4 h-4 text-black" />}
                                        {item.platform === 'Instagram' && <Instagram className="w-4 h-4 text-pink-600" />}
                                        {item.platform === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-700" />}
                                        {item.platform}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(item.content, idx)}
                                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                        {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="prose prose-sm max-w-none text-slate-600">
                                    <p className="whitespace-pre-wrap">{item.content}</p>
                                </div>
                                {item.hashtags && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.hashtags.map((tag: string, i: number) => (
                                            <span key={i} className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentRepurposing;
