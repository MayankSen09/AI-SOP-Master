import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Sparkles, Copy, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';

const PLATFORMS = [
    { id: 'google', name: 'Google Ads', icon: '🔍', headlineMax: 30, descMax: 90 },
    { id: 'facebook', name: 'Facebook Ads', icon: '📘', headlineMax: 40, descMax: 125 },
    { id: 'linkedin', name: 'LinkedIn Ads', icon: '💼', headlineMax: 70, descMax: 150 },
    { id: 'twitter', name: 'Twitter Ads', icon: '🐦', headlineMax: 50, descMax: 280 },
];

export function AdCopyGenerator() {
    const { adCopyVariants, createAdCopyVariant } = useMarketing();
    const { success } = useToast();
    const [selectedPlatform, setSelectedPlatform] = useState('google');
    const [generating, setGenerating] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        targetAudience: '',
        keyBenefit: '',
        cta: 'Learn More'
    });
    const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);

    const handleGenerate = async () => {
        if (!formData.productName || !formData.targetAudience) return;

        setGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Generate multiple variants
        const variants = [
            {
                headline: `${formData.productName} - ${formData.keyBenefit || 'Transform Your Business'}`,
                description: `Perfect for ${formData.targetAudience}. Start free today and see results fast. ${formData.cta}.`,
                cta: formData.cta
            },
            {
                headline: `Get ${formData.productName} Today`,
                description: `Join ${formData.targetAudience} already using ${formData.productName}. ${formData.keyBenefit || 'See results in days, not months'}. Try risk-free.`,
                cta: formData.cta
            },
            {
                headline: `${formData.keyBenefit || 'Boost Performance'} with ${formData.productName}`,
                description: `Trusted by ${formData.targetAudience} worldwide. Simple, powerful, effective. ${formData.cta} →`,
                cta: formData.cta
            },
            {
                headline: `Why ${formData.targetAudience} Choose ${formData.productName}`,
                description: `${formData.keyBenefit || 'Industry-leading solution'} designed for your needs. Free trial available.`,
                cta: formData.cta
            },
            {
                headline: `${formData.productName}: The Smart Choice`,
                description: `Finally, a solution for ${formData.targetAudience}. ${formData.keyBenefit || 'Save time, increase ROI'}. ${formData.cta} now!`,
                cta: formData.cta
            }
        ];

        setGeneratedVariants(variants);
        setGenerating(false);
        success(`Generated ${variants.length} ad variations!`);
    };

    const handleSaveVariant = (variant: any) => {
        createAdCopyVariant({
            platform: selectedPlatform as any,
            headline: variant.headline,
            description: variant.description,
            cta: variant.cta,
            productName: formData.productName
        });
        success('Ad copy saved!');
    };

    const platform = PLATFORMS.find(p => p.id === selectedPlatform)!;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white shadow-lg">
                        <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Ad Copy Generator</h1>
                        <p className="text-slate-500 dark:text-slate-400">Generate high-converting ad copy with AI</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Platform Selection */}
                    <Card>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Select Platform</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {PLATFORMS.map(plat => (
                                <button
                                    key={plat.id}
                                    onClick={() => setSelectedPlatform(plat.id)}
                                    className={`p-4 border-2 rounded-xl transition-all ${selectedPlatform === plat.id
                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{plat.icon}</div>
                                    <div className="text-sm font-medium">{plat.name}</div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Input Form */}
                    <Card>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Product Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Product/Service Name</label>
                                    <input
                                        type="text"
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        placeholder="e.g., CloudifyPro"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                                    <input
                                        type="text"
                                        value={formData.targetAudience}
                                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                        placeholder="e.g., Small businesses"
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Key Benefit</label>
                                <input
                                    type="text"
                                    value={formData.keyBenefit}
                                    onChange={(e) => setFormData({ ...formData, keyBenefit: e.target.value })}
                                    placeholder="e.g., Increase sales by 3x"
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Call-to-Action</label>
                                <input
                                    type="text"
                                    value={formData.cta}
                                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                                    placeholder="e.g., Start Free Trial"
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark: bg-slate-800"
                                />
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={generating || !formData.productName || !formData.targetAudience}
                                variant="gradient"
                                icon={generating ? Loader2 : Sparkles}
                                className="w-full"
                            >
                                {generating ? 'Generating Variations...' : 'Generate Ad Copy'}
                            </Button>
                        </div>
                    </Card>

                    {/* Generated Variants */}
                    {generatedVariants.length > 0 && (
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                {generatedVariants.length} Variations for {platform.name}
                            </h2>
                            <div className="space-y-4">
                                {generatedVariants.map((variant, idx) => (
                                    <div key={idx} className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-orange-300 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-xs font-semibold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
                                                Variant {idx + 1}
                                            </span>
                                            <Button
                                                onClick={() => handleSaveVariant(variant)}
                                                variant="ghost"
                                                icon={Copy}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wide">Headline</label>
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {variant.headline}
                                                    <span className={`ml-2 text-xs ${variant.headline.length > platform.headlineMax ? 'text-red-500' : 'text-slate-400'}`}>
                                                        ({variant.headline.length}/{platform.headlineMax})
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wide">Description</label>
                                                <p className="text-slate-700 dark:text-slate-300">
                                                    {variant.description}
                                                    <span className={`ml-2 text-xs ${variant.description.length > platform.descMax ? 'text-red-500' : 'text-slate-400'}`}>
                                                        ({variant.description.length}/{platform.descMax})
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wide">CTA</label>
                                                <p className="font-medium text-orange-600">{variant.cta}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Saved Ad Copy */}
                <div>
                    <Card className="sticky top-4">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Saved Ad Copy</h3>
                        {adCopyVariants.length > 0 ? (
                            <div className="space-y-3">
                                {adCopyVariants.slice(0, 10).map(variant => (
                                    <div key={variant.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="flex items-start gap-2 mb-2">
                                            <span className="text-lg">
                                                {PLATFORMS.find(p => p.id === variant.platform)?.icon}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                                                    {variant.headline}
                                                </p>
                                                <p className="text-xs text-slate-500 line-clamp-2">
                                                    {variant.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm text-center py-8">No saved ads yet</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
