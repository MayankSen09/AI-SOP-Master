import { useState } from 'react';
import { motion } from 'framer-motion';
import { SOP_TEMPLATES, MARKETING_STRATEGY_TEMPLATES } from '../lib/templates';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, Rocket, Search, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { useTeam } from '../context/TeamContext';
import { useAuth } from '../context/AuthContext';

export function Templates() {
    const navigate = useNavigate();
    const { createSOP } = useData();
    const { success, error: showError } = useToast();
    const { currentTeam } = useTeam();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'sop' | 'marketing'>('sop');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCustomBuilder, setShowCustomBuilder] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [customPrompt, setCustomPrompt] = useState('');
    const [customType, setCustomType] = useState<'sop' | 'strategy'>('sop');

    const filteredSOPTemplates = SOP_TEMPLATES.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredMarketingTemplates = MARKETING_STRATEGY_TEMPLATES.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const useSOPTemplate = (template: typeof SOP_TEMPLATES[0]) => {
        // Create comprehensive SOP from template with full details
        const sopContent = {
            title: template.title,
            purpose: template.purpose,
            scope: `This SOP covers all procedures related to ${template.title.toLowerCase()}`,
            audience: `${template.category} team members and stakeholders`,
            steps: template.rawSteps.split('\n').filter(s => s.trim()),
            responsibleParties: [
                {
                    role: `${template.category} Lead`,
                    responsibilities: [`Oversee ${template.title.toLowerCase()}`, "Ensure compliance", "Review outcomes"],
                    authority: "Approve exceptions and make final decisions"
                }
            ],
            toolsRequired: [
                {
                    name: "Standard business tools",
                    purpose: "Execute procedures efficiently",
                    accessLevel: "Team members"
                }
            ],
            qualityChecks: [
                "Verify all steps completed accurately",
                "Ensure compliance with company policies",
                "Review outputs for quality standards",
                "Document any deviations"
            ],
            kpis: [
                {
                    metric: "Completion Rate",
                    target: "95%",
                    measurement: "Weekly tracking"
                },
                {
                    metric: "Error Rate",
                    target: "<5%",
                    measurement: "Monthly review"
                }
            ],
            commonErrors: [
                {
                    error: "Skipping quality checkpoints",
                    consequences: "Reduced output quality",
                    prevention: "Use mandatory checklists",
                    resolution: "Implement automated reminders"
                }
            ],
            compliance: [`${template.category} compliance requirements`, "Data privacy standards", "Company policies"],
            approvalChain: [`${template.category} Manager`, "Department Head"],
            revisionHistory: {
                version: "1.0",
                date: new Date().toISOString().split('T')[0],
                author: "Template System",
                changes: "Initial creation from template"
            },
            relatedDocuments: ["Company handbook", `${template.category} guidelines`],
            appendix: {
                definitions: {},
                templates: [template.title],
                contacts: [{ role: "Support", contact: `${template.category} Team` }]
            }
        };

        createSOP({
            title: template.title,
            departmentId: template.category.toLowerCase(),
            status: 'Draft',
            content: JSON.stringify(sopContent, null, 2),
            createdBy: user?.name || 'Current User',
            teamId: currentTeam?.id
        });
        success(`Professional SOP "${template.title}" created from template!`);
        navigate('/sops');
    };

    const useMarketingTemplate = (template: typeof MARKETING_STRATEGY_TEMPLATES[0]) => {
        // Create COMPREHENSIVE marketing strategy document with ALL template details
        const strategyContent = {
            title: template.title,
            industry: template.industry,
            businessModel: template.businessModel,
            targetGeography: template.targetGeo,
            companySize: template.companySize,

            executiveSummary: `This marketing strategy is designed specifically for ${template.industry} businesses operating in the ${template.businessModel} model, targeting ${template.targetGeo} markets with company size of ${template.companySize}. The strategy leverages ${template.channels.length} primary marketing channels with advanced Meta platform targeting to achieve measurable business objectives over a 90-day implementation period.`,

            objectives: template.objectives.map((obj, idx) => ({
                id: `OBJ-${idx + 1}`,
                objective: obj,
                priority: idx === 0 ? 'Critical' : idx === 1 ? 'High' : 'Medium',
                timeline: idx === 0 ? '30 days' : idx === 1 ? '60 days' : '90 days',
                owner: 'Marketing Director',
                budget: idx === 0 ? '40%' : idx === 1 ? '35%' : '25%'
            })),

            marketingChannels: template.channels.map((channel, idx) => ({
                channelName: channel.name,
                priority: idx + 1,
                focus: channel.focus,
                tactics: channel.tactics,
                budget: {
                    monthly: `$${(5000 + idx * 2000).toLocaleString()}`,
                    quarterly: `$${((5000 + idx * 2000) * 3).toLocaleString()}`
                },
                team: {
                    lead: `${channel.name} Specialist`,
                    support: ['Content Creator', 'Designer', 'Analyst'],
                    external: channel.name.includes('Ads') ? ['Ad Agency Partner'] : []
                },
                kpis: [
                    { metric: 'Impressions', target: `${(100000 + idx * 50000).toLocaleString()}/month` },
                    { metric: 'Engagement Rate', target: `${3 + idx}%` },
                    { metric: 'Conversions', target: `${500 + idx * 200}/month` },
                    { metric: 'Cost Per Acquisition', target: `$${50 - idx * 10}` }
                ],
                contentCalendar: [
                    { week: 'Week 1-2', theme: 'Brand Awareness', posts: 6 },
                    { week: 'Week 3-4', theme: 'Lead Generation', posts: 8 },
                    { week: 'Week 5-6', theme: 'Product Features', posts: 6 },
                    { week: 'Week 7-8', theme: 'Customer Stories', posts: 7 },
                    { week: 'Week 9-10', theme: 'Industry Insights', posts: 6 },
                    { week: 'Week 11-12', theme: 'Promotions', posts: 10 }
                ]
            })),

            metaTargeting: {
                platform: 'Facebook & Instagram Ads',
                totalAudience: `Estimated ${(template.metaTargeting.interests.length * 500000).toLocaleString()} people`,
                interests: template.metaTargeting.interests.map(interest => ({
                    name: interest,
                    estimatedReach: `${Math.floor(Math.random() * 2000000 + 500000).toLocaleString()} people`,
                    relevanceScore: `${Math.floor(Math.random() * 3 + 7)}/10`
                })),
                behaviors: template.metaTargeting.behaviors.map(behavior => ({
                    name: behavior,
                    estimatedReach: `${Math.floor(Math.random() * 1500000 + 300000).toLocaleString()} people`,
                    intent: behavior.includes('buyer') ? 'High' : behavior.includes('engaged') ? 'Medium' : 'Medium-High'
                })),
                demographics: {
                    ...template.metaTargeting.demographics,
                    householdIncome: template.businessModel === 'B2B' ? 'Not applicable' : '$75,000+',
                    education: template.businessModel === 'B2B' ? 'Bachelor\'s degree or higher' : 'High school or higher',
                    jobTitles: template.businessModel === 'B2B' ? ['Manager', 'Director', 'VP', 'C-Level'] : []
                },
                customAudiences: template.metaTargeting.customAudiences.map(aud => ({
                    name: aud,
                    size: `${Math.floor(Math.random() * 50000 + 10000).toLocaleString()} contacts`,
                    source: aud.includes('Website') ? 'Pixel Data' : aud.includes('Email') ? 'CRM Upload' : 'Engagement Data',
                    retention: '180 days'
                })),
                lookalikesAudiences: template.metaTargeting.lookalikes.map(la => ({
                    name: la,
                    similarity: la.includes('1%') ? '1% - Highest similarity' : la.includes('3%') ? '3% - High similarity' : '5% - Moderate similarity',
                    estimatedSize: la.includes('1%') ? '2.1M' : la.includes('3%') ? '6.3M' : '10.5M',
                    seedAudience: la.replace(' Lookalike', '').replace('1% ', '').replace('3% ', '').replace('5% ', '')
                })),
                adFormats: [
                    { format: 'Single Image', usage: '40%', purpose: 'Brand awareness, quick messages' },
                    { format: 'Carousel', usage: '30%', purpose: 'Product showcases, feature highlights' },
                    { format: 'Video', usage: '20%', purpose: 'Storytelling, tutorials, testimonials' },
                    { format: 'Stories', usage: '10%', purpose: 'Time-sensitive offers, behind-the-scenes' }
                ],
                bidStrategy: 'Lowest Cost with Bid Cap',
                optimizationGoal: 'Conversions',
                attribution: '7-day click, 1-day view'
            },

            implementationRoadmap: template.roadmap.map((phase, idx) => ({
                phaseNumber: idx + 1,
                phaseName: phase.phase,
                duration: phase.duration,
                startDate: idx === 0 ? 'Week 1' : idx === 1 ? 'Week 5' : 'Week 9',
                endDate: idx === 0 ? 'Week 4' : idx === 1 ? 'Week 8' : 'Week 12',
                activities: phase.activities,
                deliverables: [
                    `${phase.activities.length} marketing campaigns launched`,
                    'Performance dashboard updated',
                    'Weekly status reports',
                    idx === 0 ? 'Brand guidelines finalized' : idx === 1 ? 'Lead scoring model' : 'Scale-up plan'
                ],
                milestones: [
                    { milestone: phase.activities[0], dueDate: `End of Week ${idx * 4 + 1}` },
                    { milestone: phase.activities[Math.floor(phase.activities.length / 2)], dueDate: `End of Week ${idx * 4 + 2}` },
                    { milestone: phase.activities[phase.activities.length - 1], dueDate: `End of Week ${idx * 4 + 4}` }
                ],
                budget: idx === 0 ? '$15,000' : idx === 1 ? '$20,000' : '$25,000',
                team: ['Marketing Manager', 'Content Specialist', 'Ads Manager', 'Designer', 'Analyst']
            })),

            budgetAllocation: {
                totalQuarterlyBudget: '$60,000',
                breakdown: [
                    { category: 'Paid Advertising', amount: '$30,000', percentage: '50%' },
                    { category: 'Content Creation', amount: '$12,000', percentage: '20%' },
                    { category: 'Tools & Software', amount: '$6,000', percentage: '10%' },
                    { category: 'Design & Creative', amount: '$6,000', percentage: '10%' },
                    { category: 'Analytics & Reporting', amount: '$3,000', percentage: '5%' },
                    { category: 'Contingency', amount: '$3,000', percentage: '5%' }
                ],
                byChannel: template.channels.map((ch, idx) => ({
                    channel: ch.name,
                    monthly: `$${(5000 + idx * 2000).toLocaleString()}`,
                    quarterly: `$${((5000 + idx * 2000) * 3).toLocaleString()}`,
                    percentage: `${Math.floor(100 / template.channels.length)}%`
                }))
            },

            kpisAndMetrics: {
                primary: [
                    { kpi: 'Qualified Leads Generated', target: '10,000 over 90 days', measurement: 'CRM tracking', reportingFrequency: 'Weekly' },
                    { kpi: 'Conversion Rate', target: '15% lead-to-customer', measurement: 'Sales funnel analytics', reportingFrequency: 'Weekly' },
                    { kpi: 'Return on Ad Spend (ROAS)', target: '4:1 minimum', measurement: 'Ad platform + revenue', reportingFrequency: 'Daily' }
                ],
                secondary: [
                    { kpi: 'Brand Awareness', target: '5M impressions', measurement: 'Social media analytics' },
                    { kpi: 'Engagement Rate', target: '3.5% average', measurement: 'Platform analytics' },
                    { kpi: 'Cost Per Lead', target: '$25 or less', measurement: 'Ad spend / leads' },
                    { kpi: 'Customer Acquisition Cost', target: '$150 or less', measurement: 'Total spend / customers' }
                ],
                dashboards: [
                    { name: 'Executive Dashboard', audience: 'C-Level', frequency: 'Weekly', metrics: ['Revenue', 'ROAS', 'CAC', 'LTV'] },
                    { name: 'Campaign Performance', audience: 'Marketing Team', frequency: 'Daily', metrics: ['Spend', 'Leads', 'CPL', 'CTR'] },
                    { name: 'Channel Analytics', audience: 'Channel Managers', frequency: 'Real-time', metrics: ['Impressions', 'Clicks', 'Conversions', 'Engagement'] }
                ]
            },

            competitiveAnalysis: {
                approach: `Monitor ${template.industry} competitors using SEMrush, SimilarWeb, and social listening tools`,
                competitorTracking: [
                    'Track competitor ad campaigns and messaging',
                    'Monitor pricing and promotional strategies',
                    'Analyze content themes and engagement',
                    'Benchmark performance metrics'
                ],
                differentiators: [
                    `Unique value proposition for ${template.businessModel} model`,
                    'Advanced targeting using Meta\'s full capabilities',
                    'Multi-channel integrated approach',
                    'Data-driven optimization methodology'
                ]
            },

            riskManagement: [
                {
                    risk: 'Ad account suspension',
                    probability: 'Low',
                    impact: 'High',
                    mitigation: 'Follow Meta policies strictly; maintain backup account; diversify channels',
                    contingency: 'Shift budget to Google Ads and organic channels within 24 hours'
                },
                {
                    risk: 'Low conversion rates',
                    probability: 'Medium',
                    impact: 'High',
                    mitigation: 'A/B testing program; landing page optimization; regular creative refresh',
                    contingency: 'Increase top-of-funnel activities; adjust targeting; review value proposition'
                },
                {
                    risk: 'Budget overruns',
                    probability: 'Medium',
                    impact: 'Medium',
                    mitigation: 'Daily spend monitoring; automated bid caps; weekly budget reviews',
                    contingency: 'Pause underperforming campaigns; reallocate to high-performers'
                }
            ],

            revisionHistory: {
                version: "1.0",
                date: new Date().toISOString().split('T')[0],
                author: user?.name || 'Marketing Strategy System',
                changes: "Initial comprehensive strategy creation from professional template"
            }
        };

        createSOP({
            title: template.title,
            departmentId: 'marketing',
            status: 'Draft',
            content: JSON.stringify(strategyContent, null, 2),
            createdBy: user?.name || 'Current User',
            teamId: currentTeam?.id
        });
        success(`Comprehensive Marketing Strategy "${template.title}" created with full details!`);
        navigate('/sops');
    };

    const generateCustomTemplate = async () => {
        if (!customPrompt.trim()) {
            showError('Please describe what you want to create');
            return;
        }

        setIsGenerating(true);

        try {
            if (customType === 'sop') {
                // Generate custom SOP
                const { generateSOPContent } = await import('../lib/ai');
                const result = await generateSOPContent(
                    'Custom SOP',
                    'User-defined standard operating procedure',
                    customPrompt
                );

                createSOP({
                    title: result.title || 'Custom SOP',
                    departmentId: 'custom',
                    status: 'Draft',
                    content: JSON.stringify(result, null, 2),
                    createdBy: user?.name || 'Current User',
                    teamId: currentTeam?.id
                });

                success('Custom SOP created with AI! Check your SOPs list.');
                setShowCustomBuilder(false);
                setCustomPrompt('');
                navigate('/sops');
            } else {
                // Generate custom marketing strategy
                const { generateSOPContent } = await import('../lib/ai');

                const strategyPrompt = `Create a comprehensive marketing strategy based on this:
${customPrompt}

Include:
- Clear objectives with KPIs
- Recommended marketing channels with specific tactics
- Target audience details
- Budget allocation recommendations
- 90-day implementation roadmap
- Success metrics

Make it professional and actionable.`;

                const result = await generateSOPContent(
                    'Custom Marketing Strategy',
                    'User-defined marketing strategy',
                    strategyPrompt
                );

                createSOP({
                    title: result.title || 'Custom Marketing Strategy',
                    departmentId: 'marketing',
                    status: 'Draft',
                    content: JSON.stringify(result, null, 2),
                    createdBy: user?.name || 'Current User',
                    teamId: currentTeam?.id
                });

                success('Custom Marketing Strategy created with AI!');
                setShowCustomBuilder(false);
                setCustomPrompt('');
                navigate('/sops');
            }
        } catch (error) {
            console.error('Generation error:', error);
            showError('Failed to generate. Please check your API key in .env file');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Templates Library</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Ready-made templates to jumpstart your work</p>
            </div>

            {/* Search & Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('sop')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'sop'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        SOP Templates ({SOP_TEMPLATES.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('marketing')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'marketing'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Marketing Strategies ({MARKETING_STRATEGY_TEMPLATES.length})
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                </div>
            </div>

            {/* SOP Templates Grid */}
            {activeTab === 'sop' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredSOPTemplates.map((template, idx) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card className="h-full flex flex-col hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-4xl">{template.icon}</div>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                        {template.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {template.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
                                    {template.purpose}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    onClick={() => useSOPTemplate(template)}
                                    variant="gradient"
                                    size="sm"
                                    className="w-full"
                                    icon={Sparkles}
                                >
                                    Use Template
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Marketing Templates Grid */}
            {activeTab === 'marketing' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {filteredMarketingTemplates.map((template, idx) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="h-full flex flex-col hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{template.icon}</div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                                            {template.businessModel}
                                        </span>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                                            {template.industry}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {template.title}
                                </h3>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Key Objectives</p>
                                        <ul className="space-y-1">
                                            {template.objectives.slice(0, 3).map((obj, i) => (
                                                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                    <ArrowRight className="w-3 h-3 mt-0.5 text-indigo-500 flex-shrink-0" />
                                                    <span className="line-clamp-1">{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Channels ({template.channels.length})</p>
                                        <div className="flex flex-wrap gap-2">
                                            {template.channels.map((channel, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
                                                    {channel.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">✨ Includes Meta Targeting</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs px-2 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-md">
                                                {template.metaTargeting.interests.length} Interests
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md">
                                                {template.metaTargeting.behaviors.length} Behaviors
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-md">
                                                Custom Audiences
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => useMarketingTemplate(template)}
                                    variant="gradient"
                                    icon={Rocket}
                                    className="w-full"
                                >
                                    Use Marketing Strategy
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Empty State */}
            {((activeTab === 'sop' && filteredSOPTemplates.length === 0) ||
                (activeTab === 'marketing' && filteredMarketingTemplates.length === 0)) && (
                    <div className="text-center py-12">
                        <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">No templates found matching "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

            {/* AI Custom Builder Modal */}
            {showCustomBuilder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                        <Sparkles className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                                        AI Custom Builder
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                                        Describe what you need and AI will create a professional {customType === 'sop' ? 'SOP' : 'marketing strategy'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setShowCustomBuilder(false); setCustomPrompt(''); }}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setCustomType('sop')}
                                            className={`p-4 rounded-xl border-2 transition-all ${customType === 'sop'
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">📋</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">SOP</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Standard Operating Procedure</div>
                                        </button>
                                        <button
                                            onClick={() => setCustomType('strategy')}
                                            className={`p-4 rounded-xl border-2 transition-all ${customType === 'strategy'
                                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">🎯</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Marketing Strategy</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Complete marketing plan</div>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Describe What You Need
                                    </label>
                                    <textarea
                                        value={customPrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        placeholder={customType === 'sop'
                                            ? "Example: I need an SOP for handling customer refunds in an e-commerce business. Include approval workflow, timeframes, and quality checks."
                                            : "Example: I need a marketing strategy to launch a new fitness app targeting millennials. Focus on Instagram and TikTok with influencer partnerships."
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        rows={8}
                                    />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        💡 Be specific! Mention your industry, goals, tools, challenges, or any special requirements.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                                        AI will create a {customType === 'sop' ? '15-section professional SOP' : 'comprehensive marketing strategy with channels, targeting, and roadmap'}
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={generateCustomTemplate}
                                        disabled={isGenerating || !customPrompt.trim()}
                                        variant="gradient"
                                        icon={isGenerating ? undefined : Rocket}
                                        className="flex-1"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Generating...
                                            </>
                                        ) : (
                                            'Generate with AI'
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => { setShowCustomBuilder(false); setCustomPrompt(''); }}
                                        variant="secondary"
                                        disabled={isGenerating}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
