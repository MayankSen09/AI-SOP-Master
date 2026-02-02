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

// Template-specific content generators
const generateTemplateContent = (templateId: string, productName: string, targetAudience: string) => {
    switch (templateId) {
        case 'welcome':
            return {
                subject: `Welcome to ${productName} - Let's Get Started! 👋`,
                previewText: `${targetAudience}, we're thrilled to  have you on board!`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1; font-size: 28px;">Welcome to ${productName}! 👋</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Hi there,</p>
                    <p style="font-size: 16px; line-height: 1.6;">We're absolutely thrilled to have you join our community! You've just taken the first step toward ${targetAudience} success.</p>
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 12px; margin: 24px 0; color: white;">
                        <h3 style="margin: 0 0 12px 0;">🎉 Welcome Bonus</h3>
                        <p style="margin: 0; font-size: 14px;">As a special thank you, enjoy <strong>30% off</strong> your first month. Use code <strong style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">WELCOME30</strong> at checkout.</p>
                    </div>
                    <h3 style="color: #334155;">Quick Start Guide:</h3>
                    <ul style="line-height: 1.8;">
                        <li>Complete your profile setup</li>
                        <li>Explore our key features</li>
                        <li>Join our community forum</li>
                    </ul>
                    <a href="#" style="display: inline-block; background: #6366f1; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 24px 0; font-weight: 600;">Get Started Now →</a>
                    <p style="color: #64748b; font-size: 14px;">Questions? We're here to help 24/7.<br/>The ${productName} Team</p>
                </div>`
            };

        case 'newsletter':
            return {
                subject: `📰 ${productName} Monthly Digest - What's New for ${targetAudience}`,
                previewText: `Updates, tips, and exclusive insights for ${targetAudience}`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                        <h1 style="color: #1e293b; margin: 0;">📰 Monthly Digest</h1>
                        <p style="color: #64748b; margin: 8px 0 0 0;">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    
                    <h2 style="color: #334155; margin-top: 32px;">🎯 Top Stories This Month</h2>
                    
                    <div style="border-left: 4px solid #6366f1; padding-left: 16px; margin: 24px 0;">
                        <h3 style="color: #1e293b; margin: 0 0 8px 0;">New Feature Launch</h3>
                        <p style="color: #475569; margin: 0; line-height: 1.6;">We've added powerful new tools specifically designed for ${targetAudience}. See what's possible now.</p>
                    </div>
                    
                    <div style="border-left: 4px solid #10b981; padding-left: 16px; margin: 24px 0;">
                        <h3 style="color: #1e293b; margin: 0 0 8px 0;">Success Story</h3>
                        <p style="color: #475569; margin: 0; line-height: 1.6;">Discover how one customer achieved 300% growth using ${productName}.</p>
                    </div>
                    
                    <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 24px 0;">
                        <h3 style="color: #334155; margin: 0 0 12px 0;">💡 Pro Tip of the Month</h3>
                        <p style="color: #475569; margin: 0; line-height: 1.6;">Maximize your ROI by combining feature X with feature Y. Learn more in our latest guide.</p>
                    </div>
                    
                    <a href="#" style="display: inline-block; background: #6366f1; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 500;">Read Full Newsletter →</a>
                    <p style="color: #94a3b8; font-size: 13px; margin-top: 32px;">Stay informed,<br/>The ${productName} Team</p>
                </div>`
            };

        case 'promotional':
            return {
                subject: `🎁 Exclusive ${productName} Offer - Limited Time for ${targetAudience}!`,
                previewText: `Don't miss out! Special pricing ends soon.`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; border-radius: 12px; text-align: center; color: white;">
                        <h1 style="margin: 0 0 12px 0; font-size: 32px;">🎁 Exclusive Offer Inside!</h1>
                        <p style="margin: 0; font-size: 18px; opacity: 0.95;">Specially curated for ${targetAudience}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 32px 0;">
                        <div style="background: #fef3c7; border: 3px dashed #f59e0b; padding: 24px; border-radius: 12px; display: inline-block;">
                            <div style="font-size: 48px; font-weight: 800; color: #ea580c; margin: 0;">50% OFF</div>
                            <p style="margin: 8px 0 0 0; color: #92400e; font-weight: 600;">All ${productName} Plans</p>
                        </div>
                    </div>
                    
                    <h2 style="color: #1e293b; text-align: center;">Why ${targetAudience} Love Us:</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
                        <div style="text-align: center; padding: 16px;">
                            <div style="font-size: 36px;">⚡</div>
                            <p style="margin: 8px 0 0 0; font-weight: 600; color: #334155; font-size: 14px;">Lightning Fast</p>
                        </div>
                        <div style="text-align: center; padding: 16px;">
                            <div style="font-size: 36px;">🛡️</div>
                            <p style="margin: 8px 0 0 0; font-weight: 600; color: #334155; font-size: 14px;">Secure & Safe</p>
                        </div>
                        <div style="text-align: center; padding: 16px;">
                            <div style="font-size: 36px;">💰</div>
                            <p style="margin: 8px 0 0 0; font-weight: 600; color: #334155; font-size: 14px;">Best Value</p>
                        </div>
                    </div>
                    
                    <div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; margin: 24px 0; border-radius: 4px;">
                        <p style="margin: 0; color: #991b1b; font-weight: 600; font-size: 14px;">⏰ Hurry! Offer expires in 48 hours</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="#" style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 18px 48px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 14px rgba(245, 87, 108, 0.4);">Claim Your Discount →</a>
                        <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Use code: <strong>SAVE50</strong> at checkout</p>
                    </div>
                    
                    <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 32px;">Happy Shopping! 🎉<br/>The ${productName} Team</p>
                </div>`
            };

        case 'reengagement':
            return {
                subject: `We Miss You! Come Back to ${productName} 🔄`,
                previewText: `Your exclusive comeback offer awaits, ${targetAudience}`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; padding: 32px 20px;">
                        <div style="font-size: 64px; margin-bottom: 16px;">👋</div>
                        <h1 style="color: #1e293b; margin: 0; font-size: 28px;">We Miss You!</h1>
                        <p style="color: #64748b; margin: 12px 0 0 0; font-size: 16px;">It's been a while since we've seen you around</p>
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #475569;">Hey there,</p>
                    <p style="font-size: 16px; line-height: 1.6; color: #475569;">We noticed you haven't been active lately, and we wanted to reach out personally. The ${productName} community isn't the same without you!</p>
                    
                    <div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); padding: 28px; border-radius: 16px; margin: 32px 0; text-align: center;">
                        <h3 style="margin: 0 0 16px 0; color: #064e3b; font-size: 22px;">🎁 Welcome Back Gift</h3>
                        <div style="background: white; padding: 16px 24px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <p style="margin: 0; font-size: 32px; font-weight: 800; color: #10b981;">40% OFF</p>
                            <p style="margin: 8px 0 0 0; color: #64748b; font-size: 14px;">Your next 3 months</p>
                        </div>
                    </div>
                    
                    <h3 style="color: #334155;">Here's What You've Been Missing:</h3>
                    <ul style="line-height: 2; color: #475569;">
                        <li><strong>3 New Features</strong> specifically for ${targetAudience}</li>
                        <li><strong>Improved Performance</strong> - 50% faster than before</li>
                        <li><strong>1000+ New Users</strong> joined our community</li>
                    </ul>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 4px;">
                        <p style="margin: 0; color: #92400e; font-size: 14px;">⏰ <strong>This offer expires in 7 days</strong> - Don't miss out!</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="#" style="display: inline-block; background: #10b981; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 24px 0; font-weight: 600; font-size: 16px;">Welcome Me Back →</a>
                    </div>
                    
                    <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 32px;">No pressure - we'll be here whenever you're ready.<br/><br/>Warmly,<br/>The ${productName} Team 💙</p>
                </div>`
            };

        default:
            return {
                subject: `Discover ${productName} - Exclusive Offer Inside`,
                previewText: `${targetAudience}, your personalized solution awaits!`,
                content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Welcome to ${productName}!</h1>
                    <p>Hi there,</p>
                    <p>We're excited to introduce you to ${productName}, specifically designed for ${targetAudience}.</p>
                    <p style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
                        <strong>Special Offer:</strong> Get 20% off your first month. Use code WELCOME20 at checkout.
                    </p>
                    <a href="#" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Get Started Now</a>
                   <p>Best regards,<br/>The Team</p>
                </div>`
            };
    }
};

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
        // Set default name based on template
        const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
        setFormData(prev => ({ ...prev, name: template?.name || '' }));
    };

    const handleGenerateWithAI = async () => {
        if (!formData.productName || !formData.targetAudience) {
            return;
        }

        setGenerating(true);
        try {
            // Simulate AI generation
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate template-specific content using the selected template
            const generatedContent = generateTemplateContent(
                selectedTemplate,
                formData.productName,
                formData.targetAudience
            );

            setFormData(prev => ({
                ...prev,
                ...generatedContent
            }));
            success(`${EMAIL_TEMPLATES.find(t => t.id === selectedTemplate)?.name} content generated successfully!`);
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
        setSelectedTemplate('');
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
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Email Campaign Builder</h1>
                        <p className="text-slate-500 dark:text-slate-400">Create stunning email campaigns with AI-powered content generation</p>
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
                                                    'bg-gray-100 text-gray-700'}`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>No campaigns yet. Choose a template to get started!</p>
                            </div>
                        )}
                    </Card>
                </motion.div>
            )}

            {step === 'create' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {EMAIL_TEMPLATES.find(t => t.id === selectedTemplate)?.icon} {EMAIL_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                            </h2>
                            <Button variant="secondary" onClick={() => { setStep('templates'); setSelectedTemplate(''); }}>
                                ← Back to Templates
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Form */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Campaign Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                                        placeholder="My Campaign"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                                            placeholder="SaaS Platform"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Target Audience *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                                            placeholder="Small Businesses"
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerateWithAI}
                                    disabled={!formData.productName || !formData.targetAudience || generating}
                                    className="w-full"
                                    icon={generating ? Loader2 : Sparkles}
                                >
                                    {generating ? 'Generating...' : 'Generate with AI'}
                                </Button>

                                {formData.content && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Subject Line
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Preview Text
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.previewText}
                                                onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <Button onClick={handleSave} icon={Save} className="flex-1">
                                                Save Campaign
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Preview */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Eye className="w-5 h-5 text-slate-500" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Email Preview</h3>
                                </div>

                                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                    {/* Email Header */}
                                    <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Subject</div>
                                        <div className="font-semibold text-slate-900 dark:text-slate-100">{formData.subject || 'Your email subject will appear here'}</div>
                                        {formData.previewText && (
                                            <>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-1">Preview Text</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{formData.previewText}</div>
                                            </>
                                        )}
                                    </div>

                                    {/* Email Content */}
                                    <div className="p-4 bg-white dark:bg-slate-900 min-h-[300px]">
                                        {formData.content ? (
                                            <div dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(formData.content, {
                                                    ALLOWED_TAGS: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'span'],
                                                    ALLOWED_ATTR: ['style', 'href', 'target', 'class']
                                                })
                                            }} />
                                        ) : (
                                            <div className="flex items-center justify-center h-64 text-slate-400">
                                                <div className="text-center">
                                                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                                    <p>Generate content to see preview</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}

export default EmailCampaignBuilder;
