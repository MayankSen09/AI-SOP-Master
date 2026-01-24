import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Download, BrainCircuit, Loader2, Save, AlertCircle, RefreshCw, FileText, Wand2, ChevronRight, ArrowLeft, Shield, Globe, Cpu } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { generateSOPContent } from '../lib/ai';
import { SOPDisplay } from '../components/SOPDisplay';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { useTeam } from '../context/TeamContext';
import { useAnalytics } from '../context/AnalyticsContext';
// import { jsPDF } from 'jspdf';
import { SOP_CATEGORIES, INDUSTRIES } from '../lib/industrySubtypes';

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.4 }
    }
};

export function SOPWizard() {
    const navigate = useNavigate();
    const { createSOP } = useData();
    const { success, error: showError } = useToast();
    const { currentTeam } = useTeam();
    const { trackEvent } = useAnalytics();

    const [mode, setMode] = useState<'prompts' | 'freetext' | null>(null);
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<string>('');

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        purpose: '',
        rawSteps: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [generatedSOP, setGeneratedSOP] = useState<any>(null);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleReset = () => {
        setMode(null);
        setStep(1);
        setSelectedCategory('');
        setSelectedPrompt(null);
        setSelectedIndustry('');
        setGeneratedSOP(null);
        setFormData({ title: '', category: '', purpose: '', rawSteps: '' });
    };

    const generateFromPrompts = async () => {
        if (!selectedPrompt || !selectedIndustry) {
            showError('Initialization parameters incomplete');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const industry = INDUSTRIES.find(i => i.id === selectedIndustry);
            const enhancedPrompt = selectedPrompt.systemPrompt
                .replace(/\[INDUSTRY\]/g, industry?.name || selectedIndustry)
                .replace(/\[Current Date\]/g, new Date().toLocaleDateString());

            const aiResult = await generateSOPContent(
                selectedPrompt.name,
                'Architect Protocol Generation',
                enhancedPrompt
            );

            setGeneratedSOP({
                title: selectedPrompt.name,
                industry: industry?.name,
                category: selectedCategory,
                content: aiResult,
                metadata: {
                    industry: selectedIndustry,
                    compliance: industry?.compliance
                }
            });

            setStep(4);
            success('Strategic Protocol Synthesized.');

            if (currentTeam) {
                trackEvent({
                    teamId: currentTeam.id,
                    userId: 'architect',
                    eventType: 'sop_created',
                    resourceId: 'neural-link',
                    metadata: { status: 'Draft', title: selectedPrompt.name, mode: 'prompts' }
                });
            }
        } catch (err: any) {
            setError(err.message || 'Neural link failure');
            showError('Neural Link Error');
        } finally {
            setIsGenerating(false);
        }
    };

    const generateFromFreeText = async () => {
        if (!formData.title || !formData.rawSteps) {
            showError('Title and Raw Input required');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const result = await generateSOPContent(
                formData.title,
                formData.purpose || 'Architect Protocol',
                formData.rawSteps
            );

            setGeneratedSOP({
                title: formData.title,
                category: formData.category || 'General',
                content: result
            });

            setStep(4);
            success('Custom Protocol Synchronized.');
        } catch (err) {
            showError('Synchronization Error');
            setError('Failed to synthesize custom protocol');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (!generatedSOP) return;

        createSOP({
            title: generatedSOP.title,
            departmentId: generatedSOP.category || selectedCategory || formData.category,
            status: 'Draft',
            content: JSON.stringify(generatedSOP.content, null, 2),
            createdBy: 'Architect System',
            teamId: currentTeam?.id
        });

        success('Architecture committed to ledger.');
        navigate('/sops');
    };

    const handleExportPDF = () => {
        if (!generatedSOP) return;
        import('../lib/pdfExport').then(({ generateSOPPDF }) => {
            const doc = generateSOPPDF(generatedSOP.title, generatedSOP.content);
            doc.save(`${generatedSOP.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
            success('Professional PDF exported.');
        }).catch(err => {
            console.error("Failed to load pdfExport", err);
            showError("Failed to load PDF generator");
        });
    };

    const selectedCategoryData = SOP_CATEGORIES.find(c => c.id === selectedCategory);

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
            {/* Header Area */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <h1 className="text-5xl font-black text-primary tracking-tighter uppercase">
                    Strategic <span className="architect-gradient">Architect</span>
                </h1>
                <p className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs">
                    Synthesize mission-critical operational systems
                </p>
            </motion.div>

            {/* Mode Selection */}
            {!mode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                        onClick={() => setMode('prompts')}
                        className="group relative p-10 rounded-[2.5rem] bg-surface dark:bg-architect-card border border-default dark:border-architect-border hover:border-brand-primary transition-all duration-500 overflow-hidden text-left shadow-lg"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity" />
                        <div className="p-5 bg-brand-primary/10 rounded-2xl mb-8 w-fit text-brand-primary group-hover:scale-110 transition-transform duration-500">
                            <Wand2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-primary uppercase tracking-widest mb-4">Neural Presets</h3>
                        <p className="text-tertiary font-medium mb-8 leading-relaxed">
                            Initialize validated strategic patterns from high-performance industry frameworks.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                            Deploy Presets <ChevronRight className="w-4 h-4" />
                        </div>
                    </button>

                    <button
                        onClick={() => setMode('freetext')}
                        className="group relative p-10 rounded-[2.5rem] bg-surface dark:bg-architect-card border border-default dark:border-architect-border hover:border-blue-500 transition-all duration-500 overflow-hidden text-left shadow-lg"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity" />
                        <div className="p-5 bg-blue-500/10 rounded-2xl mb-8 w-fit text-blue-500 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-primary uppercase tracking-widest mb-4">Custom Vector</h3>
                        <p className="text-tertiary font-medium mb-8 leading-relaxed">
                            Synthesize a unique operational architecture from raw data or unstructured inputs.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                            Initialize Vector <ChevronRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            )}

            {/* Wizard Steps */}
            {mode === 'prompts' && !generatedSOP && (
                <div className="space-y-12">
                    {/* Stealth Progress Bar */}
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-4">
                                <div className={`h-1 w-24 rounded-full transition-all duration-700 ${step >= s ? 'bg-architect-gradient' : 'bg-architect-border'}`} />
                                <div className={`w-3 h-3 rounded-full border-2 transition-all duration-700 ${step >= s ? 'bg-brand-primary border-brand-primary scale-125' : 'bg-transparent border-architect-border'}`} />
                            </div>
                        ))}
                        <div className="h-1 w-24 rounded-full bg-architect-border" />
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {SOP_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); handleNext(); }}
                                        className="p-8 rounded-3xl bg-surface dark:bg-architect-card border border-default dark:border-architect-border hover:border-brand-primary transition-all duration-500 text-left group shadow-md"
                                    >
                                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
                                        <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-2">{cat.name}</h3>
                                        <p className="text-xs text-tertiary font-bold uppercase tracking-tighter">{cat.prompts.length} Neural Protocols</p>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === 2 && selectedCategoryData && (
                            <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-primary">Select Template</h2>
                                    <Button variant="ghost" icon={ArrowLeft} onClick={handleBack} className="font-bold text-xs">Back</Button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {selectedCategoryData.prompts.map(prompt => (
                                        <button
                                            key={prompt.id}
                                            onClick={() => { setSelectedPrompt(prompt); handleNext(); }}
                                            className="w-full p-8 rounded-3xl bg-surface dark:bg-architect-card border border-default dark:border-architect-border hover:border-blue-500 transition-all duration-500 text-left group flex items-center justify-between shadow-md"
                                        >
                                            <div className="flex-1">
                                                <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-2 group-hover:text-blue-400 transition-colors">{prompt.name}</h3>
                                                <p className="text-sm text-tertiary font-medium">{prompt.description}</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-architect-border group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-primary">Select Industry</h2>
                                    <Button variant="ghost" icon={ArrowLeft} onClick={handleBack} className="font-bold text-xs">Back</Button>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {INDUSTRIES.map(industry => (
                                        <button
                                            key={industry.id}
                                            onClick={() => setSelectedIndustry(industry.id)}
                                            className={`p-6 rounded-3xl border transition-all duration-500 text-center flex flex-col items-center group shadow-md ${selectedIndustry === industry.id
                                                ? 'border-brand-primary bg-brand-primary/10 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]'
                                                : 'border-default dark:border-architect-border bg-surface dark:bg-architect-card hover:border-slate-400 dark:hover:border-architect-muted'
                                                }`}
                                        >
                                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{industry.icon}</div>
                                            <p className="font-black text-primary text-[10px] uppercase tracking-[0.2em] mb-2">{industry.name}</p>
                                            <div className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${selectedIndustry === industry.id ? 'bg-brand-primary/20 text-brand-primary' : 'bg-architect-dark text-architect-muted'}`}>
                                                {industry.compliance}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <Button
                                    onClick={generateFromPrompts}
                                    disabled={!selectedIndustry || isGenerating}
                                    variant="gradient"
                                    icon={isGenerating ? Loader2 : Cpu}
                                    className="w-full py-8 text-lg font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-brand-primary/20"
                                >
                                    {isGenerating ? 'Neural Linking...' : 'Initialize Synthesis'}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Custom Mode Input Form */}
            {mode === 'freetext' && !generatedSOP && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
                    <Card className="p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-primary">Custom SOP Details</h2>
                            <Button variant="ghost" onClick={() => setMode(null)} className="font-bold text-xs">Cancel</Button>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wider">SOP Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border text-slate-900 dark:text-white focus:border-brand-primary outline-none transition-colors font-bold"
                                    placeholder="e.g. Sales Protocol"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Department</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border text-slate-900 dark:text-white focus:border-brand-primary outline-none transition-colors font-bold"
                                        placeholder="Sales"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Objective</label>
                                    <input
                                        type="text"
                                        value={formData.purpose}
                                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border text-slate-900 dark:text-white focus:border-brand-primary outline-none transition-colors font-bold"
                                        placeholder="Maximize Retention"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Instructions</label>
                                <textarea
                                    value={formData.rawSteps}
                                    onChange={(e) => setFormData({ ...formData, rawSteps: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-architect-dark/50 border border-slate-200 dark:border-architect-border text-slate-900 dark:text-white focus:border-brand-primary outline-none transition-colors font-medium min-h-[200px]"
                                    placeholder="Paste raw process documentation or instructions..."
                                />
                            </div>
                            <Button
                                onClick={generateFromFreeText}
                                disabled={isGenerating}
                                variant="gradient"
                                icon={isGenerating ? Loader2 : BrainCircuit}
                                className="w-full py-6 text-sm font-bold uppercase tracking-wider rounded-xl"
                            >
                                {isGenerating ? 'Generating...' : 'Create SOP'}
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Final Generation Preview */}
            {generatedSOP && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                    <Card className="relative overflow-hidden p-0 border-none">
                        <div className="absolute top-0 left-0 w-full h-1 bg-architect-gradient" />

                        <div className="p-10 border-b border-architect-border/30 flex items-center justify-between bg-architect-card/50">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                                        <Shield className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Protocol Synthesized</h2>
                                </div>
                                <p className="text-tertiary font-bold uppercase text-[10px] tracking-[0.2em] ml-14">Architecture Code: {generatedSOP.title}</p>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleSave} variant="gradient" icon={Save} className="px-8 font-black uppercase tracking-widest text-xs">Commit</Button>
                                <Button onClick={handleExportPDF} variant="secondary" icon={Download} className="font-black uppercase tracking-widest text-xs">Export</Button>
                            </div>
                        </div>

                        <div className="p-10 bg-architect-dark/50 backdrop-blur-3xl">
                            <div className="rounded-[2rem] border border-architect-border bg-architect-dark p-8 overflow-hidden relative group">
                                <div className="absolute top-4 right-6 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Preview</span>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                                    <SOPDisplay content={generatedSOP.content} />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-architect-border/30 flex justify-center gap-6 bg-architect-card/30">
                            <button onClick={handleReset} className="text-[10px] font-black text-tertiary uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2">
                                <RefreshCw className="w-3 h-3" /> New Architecture
                            </button>
                            <button onClick={() => navigate('/sops')} className="text-[10px] font-black text-tertiary uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2">
                                <Globe className="w-3 h-3" /> View Operational Ledger
                            </button>
                        </div>
                    </Card>
                </motion.div>
            )}

            {error && (
                <div className="flex items-center gap-4 p-6 bg-rose-500/10 border border-rose-500/30 rounded-[2rem] max-w-2xl mx-auto">
                    <AlertCircle className="w-6 h-6 text-rose-500" />
                    <div>
                        <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1">Neural Fault</p>
                        <p className="text-sm font-medium text-white/80">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
