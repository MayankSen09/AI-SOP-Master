import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Save, Eye, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';
import DOMPurify from 'dompurify';

const EMAIL_TEMPLATES = [
    { id: 'welcome', name: 'Welcome Email', icon: '👋', description: 'Onboard new subscribers' },
    { id: 'newsletter', name: 'Newsletter', icon: '📰', description: 'Regular updates' },
    { id: 'promotional', name: 'Promotional', icon: '🎁', description: 'Special offers' },
    { id: 'reengagement', name: 'Re-engagement', icon: '🔄', description: 'Win back inactive users' },
];

export function EmailCampaignBuilder() {
    const { emailCampaigns, createEmailCampaign } = useMarketing();
    const { success } = useToast();
    const [step, setStep] = useState<'templates' | 'create'>('templates');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [generating, setGenerating] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        previewText: '',
        content: '',
        targetAudience: '',
        productName: ''
    });

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId);
        setStep('create');
    };

    const handleGenerateWithAI = async () => {
        if (!formData.productName || !formData.targetAudience) {
            return;
        }

        setGenerating(true);
        try {
            // Simulate AI generation - in real app, call actual AI API
            await new Promise(resolve => setTimeout(resolve, 2000));

            const generatedContent = {
                subject: `Discover ${formData.productName} - Exclusive Offer Inside`,
                previewText: `${formData.targetAudience}, your personalized solution awaits!`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Welcome to ${formData.productName}!</h1>
                    <p>Hi there,</p>
                    <p>We're excited to introduce you to ${formData.productName}, specifically designed for ${formData.targetAudience}.</p>
                    <p style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
                        <strong>Special Offer:</strong> Get 20% off your first month. Use code WELCOME20 at checkout.
                    </p>
                    <a href="#" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Get Started Now</a>
                    <p>Best regards,<br/>The Team</p>
                </div>`
            };

            setFormData(prev => ({
                ...prev,
                ...generatedContent
            }));
            success('Email content generated successfully!');
        } catch (error) {
            // Handle error
        } finally {
            setGenerating(false);
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.subject) return;

        createEmailCampaign({
            name: formData.name,
            subject: formData.subject,
            previewText: formData.previewText,
            content: formData.content,
            template: selectedTemplate,
            status: 'draft'
        });

        success('Email campaign saved!');
        setStep('templates');
        setFormData({
            name: '',
            subject: '',
            previewText: '',
            content: '',
            targetAudience: '',
            productName: ''
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl text-white shadow-lg">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Email Campaign Builder</h1>
                        <p className="text-slate-500 dark:text-slate-400">Create high-converting email campaigns with AI</p>
                    </div>
                </div>
            </motion.div>

            {step === 'templates' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Template Selection */}
                    <Card>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Choose a Template</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {EMAIL_TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template.id)}
                                    className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                                >
                                    <div className="text-4xl mb-3">{template.icon}</div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600">{template.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{template.description}</p>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Saved Campaigns */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Saved Campaigns</h2>
                            <span className="text-sm text-slate-500">{emailCampaigns.length} campaigns</span>
                        </div>
                        {emailCampaigns.length > 0 ? (
                            <div className="space-y-3">
                                {emailCampaigns.map((campaign) => (
                                    <div key={campaign.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{campaign.name}</h3>
                                                <p className="text-sm text-slate-500">{campaign.subject}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.status === 'sent' ? 'bg-green-100 text-green-700' :
                                                campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Mail className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="text-slate-500 dark:text-slate-400">No campaigns yet. Create your first one!</p>
                            </div>
                        )}
                    </Card>
                </motion.div>
            )}

            {step === 'create' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Campaign Details</h2>
                                <Button variant="ghost" onClick={() => setStep('templates')}>← Back</Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Campaign Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                        placeholder="e.g., Spring 2024 Launch"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                            placeholder="Your product"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Audience</label>
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                            placeholder="e.g., Small business owners"
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerateWithAI}
                                    disabled={generating || !formData.productName || !formData.targetAudience}
                                    variant="gradient"
                                    icon={generating ? Loader2 : Sparkles}
                                    className="w-full"
                                >
                                    {generating ? 'Generating...' : 'Generate Email with AI'}
                                </Button>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject Line</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                        placeholder="Your compelling subject line"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview Text</label>
                                    <input
                                        type="text"
                                        value={formData.previewText}
                                        onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                        placeholder="Text shown in inbox preview"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Content (HTML)</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={12}
                                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm"
                                        placeholder="Email HTML content..."
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={handleSave} variant="gradient" icon={Save} className="flex-1">
                                        Save Campaign
                                    </Button>
                                    <Button variant="secondary" icon={Eye}>Preview</Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <Card className="sticky top-4">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Email Preview</h3>
                            <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                {/* Email Client Header */}
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700">
                                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{formData.subject || 'Subject Line'}</div>
                                    <div className="text-xs text-slate-500">{formData.previewText || 'Preview text...'}</div>
                                </div>
                                {/* Email Content */}
                                <div className="p-4 bg-white dark:bg-slate-900 min-h-[300px]">
                                    {formData.content ? (
                                        <div dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(formData.content, {
                                                ALLOWED_TAGS: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'br', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span'],
                                                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style', 'class', 'target', 'rel'],
                                                ALLOW_DATA_ATTR: false
                                            })
                                        }} />
                                    ) : (
                                        <p className="text-slate-400 dark:text-slate-500 text-sm text-center">Email content preview will appear here...</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
