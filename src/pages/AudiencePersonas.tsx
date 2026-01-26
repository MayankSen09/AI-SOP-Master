import React, { useState } from 'react';
import { Users, UserPlus, Heart, Brain, Lightbulb, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { generatePersona } from '../lib/ai';

export const AudiencePersonas: React.FC = () => {
    const [inputs, setInputs] = useState({ role: '', industry: '', problem: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [persona, setPersona] = useState<any>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const result = await generatePersona(inputs);
            setPersona(result);
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
                    <Users className="w-8 h-8 text-indigo-600" />
                    Audience Persona Engine
                </h1>
                <p className="text-slate-500">
                    Deep dive into your target audience mechanics with AI-generated detailed personas.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1">
                    <Card title="Define Target" className="sticky top-24">
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target Role</label>
                                <input
                                    type="text"
                                    value={inputs.role}
                                    onChange={e => setInputs({ ...inputs, role: e.target.value })}
                                    placeholder="e.g. CMO, busy mom, student"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Industry / Niche</label>
                                <input
                                    type="text"
                                    value={inputs.industry}
                                    onChange={e => setInputs({ ...inputs, industry: e.target.value })}
                                    placeholder="e.g. SaaS, Fitness"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Core Problem</label>
                                <textarea
                                    value={inputs.problem}
                                    onChange={e => setInputs({ ...inputs, problem: e.target.value })}
                                    placeholder="What keeps them up at night?"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 h-24 resize-none"
                                />
                            </div>
                            <Button type="submit" disabled={isGenerating} className="w-full" icon={isGenerating ? Loader2 : UserPlus}>
                                {isGenerating ? 'Building Persona...' : 'Generate Persona'}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Persona Card */}
                <div className="lg:col-span-2">
                    {!persona ? (
                        <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                            <Users className="w-16 h-16 mb-4 opacity-50" />
                            <p>Your AI persona will appear here</p>
                        </div>
                    ) : (
                        <Card className="overflow-hidden border-t-4 border-t-indigo-500">
                            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full border-2 border-indigo-100 flex items-center justify-center text-2xl shadow-sm">
                                    👤
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{persona.name}</h2>
                                    <p className="text-slate-500 font-medium">{persona.role} • {persona.demographics}</p>
                                </div>
                            </div>

                            <div className="p-6 grid gap-6">
                                <section>
                                    <h3 className="flex items-center gap-2 text-red-600 font-semibold mb-3">
                                        <Heart className="w-4 h-4" /> Pain Points
                                    </h3>
                                    <div className="bg-red-50 rounded-lg p-4 space-y-2">
                                        {persona.painPoints.map((p: string, i: number) => (
                                            <p key={i} className="text-sm text-red-900">• {p}</p>
                                        ))}
                                    </div>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <section>
                                        <h3 className="flex items-center gap-2 text-purple-600 font-semibold mb-3">
                                            <Brain className="w-4 h-4" /> Emotional Triggers
                                        </h3>
                                        <div className="bg-purple-50 rounded-lg p-4 flex flex-wrap gap-2">
                                            {persona.emotionalTriggers.map((t: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-white text-purple-700 text-xs font-medium rounded border border-purple-100 shadow-sm">{t}</span>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="flex items-center gap-2 text-amber-600 font-semibold mb-3">
                                            <Lightbulb className="w-4 h-4" /> Content Strategy
                                        </h3>
                                        <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                                            {persona.contentPreferences.map((c: string, i: number) => (
                                                <p key={i} className="text-sm text-amber-900">• {c}</p>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudiencePersonas;
