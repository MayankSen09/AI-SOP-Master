import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Download, FileText, CheckSquare, Layout, FileSpreadsheet, Video, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';

const LEAD_MAGNET_TYPES = [
    { id: 'ebook', name: 'eBook', icon: FileText, description: 'Comprehensive guide or report' },
    { id: 'checklist', name: 'Checklist', icon: CheckSquare, description: 'Step-by-step checklist' },
    { id: 'template', name: 'Template', icon: Layout, description: 'Ready-to-use template' },
    { id: 'worksheet', name: 'Worksheet', icon: FileSpreadsheet, description: 'Interactive worksheet' },
    { id: 'webinar', name: 'Webinar Slides', icon: Video, description: 'Presentation deck' },
];

const INDUSTRIES = [
    'SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Real Estate',
    'Education', 'Marketing Agency', 'Consulting', 'Other'
];

export function LeadMagnetGenerator() {
    const { leadMagnets, createLeadMagnet } = useMarketing();
    const { success } = useToast();
    const [selectedType, setSelectedType] = useState('');
    const [generating, setGenerating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        industry: '',
        targetAudience: '',
        painPoint: ''
    });
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = async () => {
        if (!selectedType || !formData.title || !formData.industry) return;

        setGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        const TypeIcon = LEAD_MAGNET_TYPES.find(t => t.id === selectedType)?.name || 'Resource';

        const content = `# ${formData.title}

## Introduction
Welcome to this comprehensive ${TypeIcon.toLowerCase()} designed specifically for ${formData.targetAudience || 'professionals'} in the ${formData.industry} industry.

${formData.painPoint ? `### The Challenge\n${formData.painPoint}\n\n` : ''}

## Key Takeaways

${selectedType === 'checklist' ?
                `☐ Step 1: Identify your target market
☐ Step 2: Create your unique value proposition  
☐ Step 3: Build your minimum viable product
☐ Step 4: Test with early adopters
☐ Step 5: Iterate based on feedback
☐ Step 6: Scale your operations
☐ Step 7: Optimize for growth
☐ Step 8: Measure and analyze results` :
                selectedType === 'ebook' ?
                    `### Chapter 1: Understanding the Landscape
Deep dive into current ${formData.industry} trends and opportunities.

### Chapter 2: Strategic Framework  
Proven methodologies for success in ${formData.industry}.

### Chapter 3: Implementation Guide
Step-by-step process to achieve your goals.

### Chapter 4: Tools and Resources
Essential resources for ${formData.targetAudience}.

### Chapter 5: Case Studies
Real-world examples from successful ${formData.industry} companies.` :
                    selectedType === 'template' ?
                        `## Template Structure

1. **Header Section**
   - Company branding
   - Contact information

2. **Main Content**
   - Fill in your information
   - Customize for your needs

3. **Action Items**
   - Next steps
   - Timeline

## How to Use This Template
[Instructions for customization]` :
                        `### Section 1: Assessment
Rate your current state and identify gaps.

### Section 2: Planning
Define your objectives and action plan.

### Section 3: Execution
Track progress with our structured framework.

### Section 4: Review
Measure results and iterate for improvement.`}

## Conclusion
This ${TypeIcon.toLowerCase()} provides you with actionable insights to excel in ${formData.industry}. 

## Next Steps
1. Download and save this resource
2. Share with your team
3. Implement the strategies outlined
4. Track your progress

---
© ${new Date().getFullYear()} | For more resources, visit our website.`;

        setGeneratedContent(content);
        setGenerating(false);
        success('Lead magnet generated successfully!');
    };

    const handleSave = () => {
        if (!formData.title || !selectedType || !generatedContent) return;

        createLeadMagnet({
            title: formData.title,
            type: selectedType as any,
            content: generatedContent,
            industry: formData.industry
        });

        success('Lead magnet saved!');
        // Reset form
        setFormData({ title: '', industry: '', targetAudience: '', painPoint: '' });
        setGeneratedContent('');
        setSelectedType('');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg">
                        <Gift className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Lead Magnet Generator</h1>
                        <p className="text-slate-500 dark:text-slate-400">Create high-value lead magnets with AI</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Type Selection */}
                    {!selectedType && (
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Choose Lead Magnet Type</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {LEAD_MAGNET_TYPES.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id)}
                                        className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
                                    >
                                        <type.icon className="w-10 h-10 text-emerald-600 mb-3" />
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{type.name}</h3>
                                        <p className="text-sm text-slate-500">{type.description}</p>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Generator Form */}
                    {selectedType && !generatedContent && (
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    Create {LEAD_MAGNET_TYPES.find(t => t.id === selectedType)?.name}
                                </h2>
                                <Button variant="ghost" onClick={() => setSelectedType('')}>← Change Type</Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., The Ultimate Guide to Growth Marketing"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Industry</label>
                                        <select
                                            value={formData.industry}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                        >
                                            <option value="">Select industry</option>
                                            {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Audience</label>
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            placeholder="e.g., Marketing managers"
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Main Pain Point (Optional)</label>
                                    <textarea
                                        value={formData.painPoint}
                                        onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                                        rows={3}
                                        placeholder="What problem does this solve?"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={generating || !formData.title || !formData.industry}
                                    variant="gradient"
                                    icon={generating ? Loader2 : Sparkles}
                                    className="w-full"
                                >
                                    {generating ? 'Generating Content...' : 'Generate With AI'}
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Generated Content */}
                    {generatedContent && (
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Generated Content</h2>
                                <div className="flex gap-2">
                                    <Button variant="secondary" onClick={() => setGeneratedContent('')}>← Regenerate</Button>
                                    <Button variant="gradient" icon={Download} onClick={handleSave}>Save & Download</Button>
                                </div>
                            </div>
                            <div className="prose dark:prose-invert max-w-none p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                <pre className="whitespace-pre-wrap font-sans text-sm">{generatedContent}</pre>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Saved Lead Magnets */}
                <div>
                    <Card className="sticky top-4">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Saved Lead Magnets</h3>
                        {leadMagnets.length > 0 ? (
                            <div className="space-y-3">
                                {leadMagnets.map(magnet => (
                                    <div key={magnet.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-300 transition-colors">
                                        <div className="flex items-start gap-2">
                                            {(() => {
                                                const Icon = LEAD_MAGNET_TYPES.find(t => t.id === magnet.type)?.icon || FileText;
                                                return <Icon className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />;
                                            })()}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{magnet.title}</h4>
                                                <p className="text-xs text-slate-500">{magnet.industry}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm text-center py-8">No lead magnets yet</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
