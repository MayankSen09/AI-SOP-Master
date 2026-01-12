import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, CheckCircle2, ArrowRight, Download, BrainCircuit, Loader2, Save, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { generateSOPContent } from '../lib/ai';
import { useData } from '../context/DataContext';
import { jsPDF } from 'jspdf';

export function SOPWizard() {
    const navigate = useNavigate();
    const { addSOP } = useData();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
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
        setError('');
        try {
            const aiResult = await generateSOPContent(formData.title, formData.purpose, formData.rawSteps);
            setGeneratedSOP({
                ...aiResult,
                category: formData.category
            });
            setStep(4);
        } catch (err: any) {
            setError('Failed to generate SOP. Please check your inputs and try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (!generatedSOP) return;
        addSOP({
            title: generatedSOP.title,
            department: formData.category,
            status: 'Draft',
            content: JSON.stringify(generatedSOP, null, 2),
            createdBy: 'Current User'
        });
        navigate('/dashboard');
    };

    const handleExportPDF = () => {
        if (!generatedSOP) return;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(generatedSOP.title, 20, 20);

        doc.setFontSize(12);
        doc.text(`Department: ${formData.category}`, 20, 30);
        doc.text(`Purpose: ${generatedSOP.purpose}`, 20, 40);

        doc.setFontSize(14);
        doc.text('Procedures:', 20, 55);

        doc.setFontSize(12);
        let y = 65;
        generatedSOP.steps.forEach((s: string, i: number) => {
            const splitText = doc.splitTextToSize(`${i + 1}. ${s}`, 170);
            doc.text(splitText, 20, y);
            y += (splitText.length * 7) + 5;
        });

        doc.save(`${generatedSOP.title.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {['Context', 'Details', 'Process', 'Review'].map((label, i) => (
                        <span key={i} className={`text-sm font-medium transition-colors ${step > i ? 'text-indigo-600' : 'text-slate-400'}`}>
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
                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.category === cat
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                                                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
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
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="e.g., Employee Onboarding Protocol"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleNext} disabled={!formData.title || !formData.category} icon={ArrowRight}>
                                        Next Step
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
                                        className="w-full p-3 border border-slate-200 rounded-xl h-24 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                                        placeholder="Why is this SOP being created?"
                                        value={formData.purpose}
                                        onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                                        placeholder="e.g., New Hires, IT Support"
                                        value={formData.audience}
                                        onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button variant="secondary" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleNext} disabled={!formData.purpose} icon={ArrowRight}>
                                        Next Step
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
                                        <span className="ml-2 text-xs text-indigo-600 font-normal bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">AI Enhanced</span>
                                    </label>
                                    <textarea
                                        className="w-full p-4 border border-slate-200 rounded-xl h-48 font-mono text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                                        placeholder="- Step 1: Login to portal&#10;- Step 2: Navigate to settings&#10;- Step 3: Click 'Update Profile'"
                                        value={formData.rawSteps}
                                        onChange={e => setFormData({ ...formData, rawSteps: e.target.value })}
                                    />
                                </div>
                                {error && (
                                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-lg flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        {error}
                                    </div>
                                )}
                                <div className="flex justify-between pt-4">
                                    <Button variant="secondary" onClick={handleBack}>Back</Button>
                                    <Button onClick={generateSOP} disabled={!formData.rawSteps || isGenerating} variant="gradient" className="shadow-lg shadow-indigo-500/20">
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
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
                            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-sm">
                                <CheckCircle2 className="w-8 h-8 text-teal-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">SOP Generated Successfully!</h2>
                            <p className="text-slate-500">Your standard operating procedure is ready for review.</p>
                        </div>

                        <Card className="mb-8 border-indigo-100 shadow-xl shadow-indigo-100/50 overflow-hidden" noPadding>
                            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-semibold text-slate-700">Preview</h3>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">v1.0</span>
                                </div>
                            </div>
                            <div className="prose prose-slate max-w-none p-8">
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">{generatedSOP.title}</h1>
                                <div className="flex gap-4 text-sm text-slate-500 mb-6">
                                    <span><strong>Dept:</strong> {formData.category}</span>
                                    <span><strong>Audience:</strong> {generatedSOP.audience}</span>
                                </div>

                                <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Purpose</h3>
                                <p className="text-slate-600">{generatedSOP.purpose}</p>

                                <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Procedures</h3>
                                <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                                    {generatedSOP.steps.map((step: string, i: number) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>

                                <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Compliance</h3>
                                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                    {generatedSOP.compliance.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        <div className="flex justify-center gap-4">
                            <Button variant="secondary" onClick={() => setStep(1)}>Create Another</Button>
                            <Button variant="secondary" icon={Download} onClick={handleExportPDF}>Download PDF</Button>
                            <Button onClick={handleSave} icon={Save} variant="gradient">Save to Dashboard</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
