import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout as LayoutIcon, Sparkles, Save, Download, Loader2, Palette, Type } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';
import {
    generateHeroSection,
    generateFeaturesSection,
    generateTestimonialsSection,
    generatePricingSection,
    generateStatsSection,
    generateFAQSection,
    generateCTASection,
    generateFooter,
    type SectionConfig,
} from '../lib/landingPageSections';
import {
    generateSaaSContent,
    generateLeadMagnetContent,
    generateProductLaunchContent,
    generateWebinarContent,
    generateEcommerceContent,
    type TemplateData,
} from '../lib/landingPageTemplates';

const TEMPLATES = [
    { id: 'saas', name: 'SaaS Product', icon: '💼', description: 'Free trial & features' },
    { id: 'leadmagnet', name: 'Lead Magnet', icon: '🎁', description: 'Guide download page' },
    { id: 'launch', name: 'Product Launch', icon: '🚀', description: 'Limited-time urgency' },
    { id: 'webinar', name: 'Webinar', icon: '🎓', description: 'Registration page' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️', description: 'Product sales page' },
];

const GOOGLE_FONTS = [
    'Inter',
    'Poppins',
    'Roboto',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Raleway',
    'Playfair Display',
];

export function LandingPageBuilder() {
    const { landingPages, createLandingPage } = useMarketing();
    const { success } = useToast();
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [generating, setGenerating] = useState(false);
    const [showCustomization, setShowCustomization] = useState(false);

    const [formData, setFormData] = useState({
        pageName: '',
        productName: '',
        targetAudience: '',
        mainBenefit: '',
        secondaryBenefits: '',
    });

    const [customization, setCustomization] = useState<SectionConfig>({
        colors: {
            primary: 'indigo-600',
            secondary: 'purple-600',
            accent: 'green-500',
            background: 'white',
        },
        fonts: {
            heading: 'Inter',
            body: 'Inter',
        },
    });

    const [sections, setSections] = useState({
        hero: true,
        features: true,
        testimonials: true,
        pricing: true,
        stats: true,
        faq: true,
        cta: true,
    });

    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = async () => {
        if (!selectedTemplate || !formData.productName) return;

        setGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        const templateData: TemplateData = {
            productName: formData.productName,
            targetAudience: formData.targetAudience,
            mainBenefit: formData.mainBenefit,
            secondaryBenefits: formData.secondaryBenefits,
        };

        // Get template-specific content
        let templateContent;
        switch (selectedTemplate) {
            case 'saas':
                templateContent = generateSaaSContent(templateData);
                break;
            case 'leadmagnet':
                templateContent = generateLeadMagnetContent(templateData);
                break;
            case 'launch':
                templateContent = generateProductLaunchContent(templateData);
                break;
            case 'webinar':
                templateContent = generateWebinarContent(templateData);
                break;
            case 'ecommerce':
                templateContent = generateEcommerceContent(templateData);
                break;
            default:
                templateContent = generateSaaSContent(templateData);
        }

        // Generate sections based on customization
        const sectionsList = [];

        if (sections.hero) {
            sectionsList.push(generateHeroSection(
                templateData.productName,
                templateContent.hero.mainBenefit,
                templateContent.hero.subheadline,
                templateContent.hero.ctaText,
                customization
            ));
        }

        if (sections.features && templateContent.features) {
            sectionsList.push(generateFeaturesSection(
                templateData.productName,
                templateContent.features,
                customization
            ));
        }

        if (sections.stats && templateContent.stats) {
            sectionsList.push(generateStatsSection(
                templateContent.stats,
                customization
            ));
        }

        if (sections.testimonials && templateContent.testimonials) {
            sectionsList.push(generateTestimonialsSection(
                templateContent.testimonials,
                customization
            ));
        }

        if (sections.pricing && templateContent.pricing) {
            sectionsList.push(generatePricingSection(
                templateContent.pricing,
                customization
            ));
        }

        if (sections.faq && templateContent.faqs) {
            sectionsList.push(generateFAQSection(
                templateContent.faqs,
                customization
            ));
        }

        if (sections.cta && templateContent.cta) {
            sectionsList.push(generateCTASection(
                templateContent.cta.headline,
                templateContent.cta.subheadline,
                templateContent.cta.ctaText,
                customization
            ));
        }

        // Add footer
        sectionsList.push(generateFooter(templateData.productName, customization));

        // Build complete HTML
        const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.mainBenefit || formData.productName} - ${formData.targetAudience || 'Transform Your Business'}</title>
    <meta name="description" content="${templateContent.hero.subheadline}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${customization.fonts.heading.replace(' ', '+')}:wght@400;600;700;800;900&family=${customization.fonts.body.replace(' ', '+')}:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body class="antialiased">
${sectionsList.join('\n\n')}
</body>
</html>`;

        setGeneratedContent(content);
        setGenerating(false);
        success(`${TEMPLATES.find(t => t.id === selectedTemplate)?.name} landing page generated!`);
    };

    const handleSave = () => {
        if (!formData.pageName || !generatedContent) return;

        createLandingPage({
            name: formData.pageName,
            template: selectedTemplate,
            content: generatedContent,
            status: 'draft',
        });

        success('Landing page saved!');
    };

    const handleExport = () => {
        const blob = new Blob([generatedContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.pageName || 'landing-page'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        success('HTML file downloaded!');
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
                        <p className="text-slate-600 dark:text-slate-300">Create high-converting landing pages with AI & customization</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Template Selection */}
                    {!selectedTemplate && (
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Choose Template Type</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TEMPLATES.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-cyan-500 hover:shadow-lg transition-all text-left group"
                                    >
                                        <div className="text-4xl mb-3">{template.icon}</div>
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-cyan-600">{template.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{template.description}</p>
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

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Page Name *</label>
                                    <input
                                        type="text"
                                        value={formData.pageName}
                                        onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                                        placeholder="e.g., Product Launch 2024"
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Name *</label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            placeholder="Your Product"
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Audience</label>
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            placeholder="e.g., Startups, Agencies"
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Main Benefit (Headline)</label>
                                    <input
                                        type="text"
                                        value={formData.mainBenefit}
                                        onChange={(e) => setFormData({ ...formData, mainBenefit: e.target.value })}
                                        placeholder="e.g., 10x Your Sales in 90 Days"
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Customization Toggle */}
                            <button
                                onClick={() => setShowCustomization(!showCustomization)}
                                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold mb-4"
                            >
                                <Palette className="w-5 h-5" />
                                {showCustomization ? 'Hide' : 'Show'} Customization Options
                            </button>

                            {/* Customization Panel */}
                            {showCustomization && (
                                <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6">
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                        <Palette className="w-5 h-5" />
                                        Customize Your Page
                                    </h3>

                                    {/* Color Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Brand Colors</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { key: 'primary', label: 'Primary', options: ['indigo-600', 'blue-600', 'purple-600', 'pink-600', 'red-600'] },
                                                { key: 'secondary', label: 'Secondary', options: ['purple-600', 'indigo-600', 'blue-600', 'teal-600', 'cyan-600'] },
                                                { key: 'accent', label: 'Accent', options: ['green-500', 'emerald-500', 'teal-500', 'cyan-500', 'blue-500'] },
                                            ].map(colorGroup => (
                                                <div key={colorGroup.key}>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1">{colorGroup.label}</span>
                                                    <div className="flex gap-2">
                                                        {colorGroup.options.map(color => (
                                                            <button
                                                                key={color}
                                                                onClick={() => setCustomization(prev => ({
                                                                    ...prev,
                                                                    colors: { ...prev.colors, [colorGroup.key]: color }
                                                                }))}
                                                                className={`w-8 h-8 rounded-lg bg-${color} border-2 ${customization.colors[colorGroup.key as keyof typeof customization.colors] === color
                                                                        ? 'border-slate-900 dark:border-white scale-110'
                                                                        : 'border-transparent hover:scale-105'
                                                                    } transition-all`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Font Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <Type className="w-4 h-4" />
                                            Typography
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Heading Font</span>
                                                <select
                                                    value={customization.fonts.heading}
                                                    onChange={(e) => setCustomization(prev => ({
                                                        ...prev,
                                                        fonts: { ...prev.fonts, heading: e.target.value }
                                                    }))}
                                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white text-sm"
                                                >
                                                    {GOOGLE_FONTS.map(font => (
                                                        <option key={font} value={font}>{font}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Body Font</span>
                                                <select
                                                    value={customization.fonts.body}
                                                    onChange={(e) => setCustomization(prev => ({
                                                        ...prev,
                                                        fonts: { ...prev.fonts, body: e.target.value }
                                                    }))}
                                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white text-sm"
                                                >
                                                    {GOOGLE_FONTS.map(font => (
                                                        <option key={font} value={font}>{font}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Toggles */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Page Sections</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(sections).map(([key, enabled]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={enabled}
                                                        onChange={(e) => setSections(prev => ({ ...prev, [key]: e.target.checked }))}
                                                        className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                                                        disabled={key === 'hero'}
                                                    />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">{key}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Hero section is always included</p>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleGenerate}
                                disabled={generating || !formData.productName}
                                variant="gradient"
                                icon={generating ? Loader2 : Sparkles}
                                className="w-full"
                            >
                                {generating ? 'Generating Landing Page...' : 'Generate with AI'}
                            </Button>
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
                                    <Button variant="secondary" icon={Download} onClick={handleExport}>Export HTML</Button>
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

                {/* Saved Pages Sidebar */}
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
                                                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{page.template} • {page.status}</p>
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

export default LandingPageBuilder;
