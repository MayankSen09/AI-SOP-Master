import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, CheckCircle2, ArrowRight, Download, BrainCircuit } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function SOPWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSOP, setGeneratedSOP] = useState<any>(null);

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        purpose: '',
        audience: '',
        rawSteps: ''
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const generateSOP = async () => {
        setIsGenerating(true);
        // Simulate AI Processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        setGeneratedSOP({
            title: formData.title,
            id: 'SOP-' + Math.floor(Math.random() * 1000),
            version: '1.0',
            content: `
# ${formData.title}

## Purpose
${formData.purpose}

## Target Audience
${formData.audience}

## Procedure
${formData.rawSteps.split('\n').map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Compliance Verification
- [ ] User has read and understood the document.
- [ ] Manager approval required.
            `
        });
        setIsGenerating(false);
        setStep(4);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {['Context', 'Details', 'Process', 'Review'].map((label, i) => (
                        <span key={i} className={`text-sm font-medium ${step > i ? 'text-indigo-600' : 'text-slate-400'}`}>
                            {label}
                        </span>
                    ))}
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card title="Step 1: Context" description="Let's categorize this SOP.">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Department / Category</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['HR', 'IT', 'Marketing', 'Sales', 'Operations', 'Legal'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setFormData({ ...formData, category: cat })}
                                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.category === cat
                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                    : 'border-slate-200 hover:border-indigo-300'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">SOP Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        placeholder="e.g., Employee Onboarding Protocol"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleNext} disabled={!formData.title || !formData.category}>
                                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card title="Step 2: Details" description="Define the purpose and audience.">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Purpose</label>
                                    <textarea
                                        className="w-full p-3 border border-slate-200 rounded-lg h-24 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="Why is this SOP being created?"
                                        value={formData.purpose}
                                        onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="e.g., New Hires, IT Support"
                                        value={formData.audience}
                                        onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button variant="secondary" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleNext} disabled={!formData.purpose}>
                                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card title="Step 3: Process" description="List the key steps. Our AI will format them.">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Rough Steps / Notes
                                        <span className="ml-2 text-xs text-indigo-600 font-normal bg-indigo-50 px-2 py-0.5 rounded-full">AI Enhanced</span>
                                    </label>
                                    <textarea
                                        className="w-full p-4 border border-slate-200 rounded-lg h-48 font-mono text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="- Step 1: Login to portal&#10;- Step 2: Navigate to settings&#10;- Step 3: Click 'Update Profile'"
                                        value={formData.rawSteps}
                                        onChange={e => setFormData({ ...formData, rawSteps: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button variant="secondary" onClick={handleBack}>Back</Button>
                                    <Button onClick={generateSOP} disabled={!formData.rawSteps || isGenerating} className="bg-gradient-to-r from-indigo-600 to-violet-600 border-none">
                                        {isGenerating ? (
                                            <>
                                                <Wand2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                                            </>
                                        ) : (
                                            <>
                                                <BrainCircuit className="w-4 h-4 mr-2" /> Generate with AI
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {step === 4 && generatedSOP && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-teal-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">SOP Generated Successfully!</h2>
                            <p className="text-slate-500">Your standard operating procedure is ready for review.</p>
                        </div>

                        <Card className="mb-8 border-indigo-100 shadow-lg">
                            <div className="prose prose-slate max-w-none p-4">
                                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                                    {generatedSOP.content}
                                </pre>
                            </div>
                        </Card>

                        <div className="flex justify-center gap-4">
                            <Button variant="secondary" onClick={() => setStep(1)}>Create Another</Button>
                            <Button icon={Download} onClick={() => alert('Downloading PDF...')}>Download PDF</Button>
                            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
