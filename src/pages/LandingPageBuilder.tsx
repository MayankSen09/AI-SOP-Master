import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout as LayoutIcon, Sparkles, Save, Download, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';

const TEMPLATES = [
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Bold headline with CTA' },
    { id: 'features', name: 'Feature Grid', icon: '⭐', description: '3-column feature showcase' },
    { id: 'pricing', name: 'Pricing Table', icon: '💰', description: 'Comparison pricing' },
    { id: 'testimonial', name: 'Testimonials', icon: '💬', description: 'Social proof section' },
    { id: 'cta', name: 'CTA Banner', icon: '🚀', description: 'Conversion-focused banner' },
];

export function LandingPageBuilder() {
    const { landingPages, createLandingPage } = useMarketing();
    const { success } = useToast();
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [generating, setGenerating] = useState(false);
    const [formData, setFormData] = useState({
        pageName: '',
        productName: '',
        targetAudience: '',
        mainBenefit: '',
        secondaryBenefits: ''
    });
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = async () => {
        if (!selectedTemplate || !formData.productName) return;

        setGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.productName} - ${formData.mainBenefit || 'Transform Your Business'}</title>
    <meta name="description" content="${formData.mainBenefit || 'Discover our solution'}">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl font-bold mb-6">
                ${formData.mainBenefit || `Revolutionize Your ${formData.targetAudience || 'Business'}`}
            </h1>
            <p class="text-xl mb-8 opacity-90">
                ${formData.productName} helps ${formData.targetAudience || 'professionals'} achieve incredible results faster than ever before.
            </p>
            <div class="flex gap-4 justify-center">
                <a href="#signup" class="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
                    Start Free Trial
                </a>
                <a href="#learn-more" class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition text-lg">
                    Learn More
                </a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose ${formData.productName}?</h2>
            <div class="grid md:grid-cols-3 gap-8">
                ${(formData.secondaryBenefits || 'Fast,Reliable,Secure').split(',').slice(0, 3).map((benefit, idx) => `
                <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                        ${['⚡', '🎯', '🔒'][idx]}
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">${benefit.trim()}</h3>
                    <p class="text-gray-600">
                        Experience ${benefit.trim().toLowerCase()} performance that sets ${formData.productName} apart from the competition.
                    </p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-indigo-600 text-white py-16 px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-xl mb-8 opacity-90">Join thousands of ${formData.targetAudience || 'users'} already using ${formData.productName}</p>
            <a href="#signup" class="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-block">
                Start Your Free Trial →
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <p>&copy; ${new Date().getFullYear()} ${formData.productName}. All rights reserved.</p>
    </footer>
</body>
</html>`;

        setGeneratedContent(content);
        setGenerating(false);
        success('Landing page generated!');
    };

    const handleSave = () => {
        if (!formData.pageName || !generatedContent) return;

        createLandingPage({
            name: formData.pageName,
            template: selectedTemplate,
            content: generatedContent,
            status: 'draft'
        });

        success('Landing page saved!');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg">
                        <LayoutIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Landing Page Builder</h1>
                        <p className="text-slate-500 dark:text-slate-400">Create high-converting landing pages with AI</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Template Selection */}
                    {!selectedTemplate && (
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Choose Template</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TEMPLATES.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-cyan-500 hover:shadow-lg transition-all text-left group"
                                    >
                                        <div className="text-4xl mb-3">{template.icon}</div>
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{template.name}</h3>
                                        <p className="text-sm text-slate-500">{template.description}</p>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Page Builder */}
                    {selectedTemplate && !generatedContent && (
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Page Details</h2>
                                <Button variant="ghost" onClick={() => setSelectedTemplate('')}>← Change Template</Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Page Name</label>
                                    <input
                                        type="text"
                                        value={formData.pageName}
                                        onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                                        placeholder="e.g., Product Launch 2024"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            placeholder="Your product"
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Target Audience</label>
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            placeholder="e.g., Startups"
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Main Benefit</label>
                                    <input
                                        type="text"
                                        value={formData.mainBenefit}
                                        onChange={(e) => setFormData({ ...formData, mainBenefit: e.target.value })}
                                        placeholder="e.g., 10x Your Sales"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Secondary Benefits (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.secondaryBenefits}
                                        onChange={(e) => setFormData({ ...formData, secondaryBenefits: e.target.value })}
                                        placeholder="e.g., Fast, Reliable, Secure"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={generating || !formData.productName}
                                    variant="gradient"
                                    icon={generating ? Loader2 : Sparkles}
                                    className="w-full"
                                >
                                    {generating ? 'Generating Landing Page...' : 'Generate with AI'}
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Generated Page */}
                    {generatedContent && (
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Generated Landing Page</h2>
                                <div className="flex gap-2">
                                    <Button variant="secondary" onClick={() => setGeneratedContent('')}>← Regenerate</Button>
                                    <Button variant="gradient" icon={Save} onClick={handleSave}>Save Page</Button>
                                    <Button variant="secondary" icon={Download}>Export HTML</Button>
                                </div>
                            </div>
                            <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                <iframe
                                    srcDoc={generatedContent}
                                    className="w-full h-[600px] bg-white"
                                    title="Landing Page Preview"
                                />
                            </div>
                        </Card>
                    )}
                </div>

                {/* Saved Pages */}
                <div>
                    <Card className="sticky top-4">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Saved Landing Pages</h3>
                        {landingPages.length > 0 ? (
                            <div className="space-y-3">
                                {landingPages.map(page => (
                                    <div key={page.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-cyan-300 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <LayoutIcon className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{page.name}</h4>
                                                <p className="text-xs text-slate-500 capitalize">{page.template} • {page.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm text-center py-8">No pages yet</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
