// Funnel Types and Data Models for AI Marketing Funnel Builder

export type FunnelType =
    | 'lead-generation'
    | 'sales'
    | 'app-install'
    | 'saas-trial'
    | 'ecommerce'
    | 'community-growth'
    | 'brand-awareness';

export type Industry =
    | 'saas'
    | 'web3'
    | 'healthcare'
    | 'education'
    | 'ecommerce'
    | 'fintech'
    | 'realestate'
    | 'local-business'
    | 'startup'
    | 'agency'
    | 'healthtech'
    | 'edtech'
    | 'luxury'
    | 'b2b-services';

export type FunnelGoal =
    | 'revenue'
    | 'leads'
    | 'brand'
    | 'expansion'
    | 'retention'
    | 'infiltration';

export type TargetCustomer = 'B2B' | 'B2C' | 'Local';
export type SalesCycle = 'Instant' | 'Short' | 'Long';
export type TrafficSource = 'Ads' | 'Organic' | 'Social' | 'Referral' | 'Mixed';
export type BusinessStage = 'New' | 'Growing' | 'Scaling';

export interface IndustryBenchmark {
    convRate: number;
    avgOrderValue: number;
    trafficMix: Record<string, number>;
}

export interface IndustryData {
    name: string;
    icon: string;
    description: string;
    benchmarks: IndustryBenchmark;
}

export interface FunnelStage {
    name: string;
    label: string;
    objective: string;
    channels: string[];
    contentTypes: string[];
    adFormats?: string[];
    kpis: string[];
    color: string; // For visual funnel
}

export interface FunnelTemplate {
    id: FunnelType;
    name: string;
    description: string;
    icon: string;
    stages: FunnelStage[];
    bestFor: string[];
}

export interface UserAnswers {
    targetCustomer: TargetCustomer;
    priceRange: string;
    salesCycle: SalesCycle;
    trafficSource: TrafficSource;
    businessStage: BusinessStage;
    hasRetargeting?: boolean;
    currentCPA?: string;
}

export interface GeneratedFunnel {
    id: string;
    type: FunnelType;
    industry: Industry;
    goal: FunnelGoal;
    answers: UserAnswers;
    stages: FunnelStageDetail[];
    channelStrategy: ChannelStrategy;
    conversionPlan: ConversionPlan;
    toolsStack: ToolsStack;
    kpis: KPIMetrics;
    visual: string; // SVG string
    createdAt: Date;
}

export interface FunnelStageDetail extends FunnelStage {
    tactics: string[];
    budget: string;
    timeline: string;
    optimizationTips: string[];
}

export interface ChannelStrategy {
    paid: {
        primary: string[];
        secondary: string[];
        budget: string;
    };
    organic: {
        channels: string[];
        focusAreas: string[];
    };
    retargeting: {
        platforms: string[];
        audiences: string[];
        strategy: string;
    };
}

export interface ConversionPlan {
    dropOffPoints: { stage: string; solution: string }[];
    abTests: string[];
    improvementChecklist: string[];
}

export interface ToolsStack {
    ads: string[];
    crm: string[];
    analytics: string[];
    automation: string[];
}

export interface KPIMetrics {
    primary: { metric: string; target: string; measurement: string }[];
    secondary: { metric: string; target: string }[];
    funnelLeakage: string[];
}

// Funnel Templates Library
export const FUNNEL_TEMPLATES: Record<FunnelType, FunnelTemplate> = {
    'lead-generation': {
        id: 'lead-generation',
        name: 'Lead Generation Funnel',
        description: 'Capture and qualify leads for your sales team',
        icon: '🎯',
        bestFor: ['B2B services', 'High-ticket offers', 'Consulting', 'Agency services'],
        stages: [
            {
                name: 'awareness',
                label: 'Awareness',
                objective: 'Attract target audience and create brand visibility',
                channels: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'SEO', 'Content Marketing'],
                contentTypes: ['Blog posts', 'Video content', 'Social media posts', 'Infographics'],
                adFormats: ['Single image', 'Video ads', 'Carousel'],
                kpis: ['Impressions', 'Reach', 'CTR', 'CPM'],
                color: '#3B82F6'
            },
            {
                name: 'interest',
                label: 'Interest',
                objective: 'Engage prospects with valuable content and solutions',
                channels: ['Landing pages', 'Webinars', 'Lead magnets', 'Email sequences'],
                contentTypes: ['Case studies', 'Whitepapers', 'Webinars', 'Free tools'],
                kpis: ['Landing page views', 'Download rate', 'Webinar registrations'],
                color: '#8B5CF6'
            },
            {
                name: 'consideration',
                label: 'Consideration',
                objective: 'Nurture leads and demonstrate value proposition',
                channels: ['Email marketing', 'Retargeting ads', 'Sales calls', 'Demos'],
                contentTypes: ['Email series', 'Product demos', 'ROI calculators', 'Testimonials'],
                kpis: ['Email open rate', 'Demo requests', 'Engagement score'],
                color: '#EC4899'
            },
            {
                name: 'intent',
                label: 'Intent',
                objective: 'Qualify leads and move to sales conversations',
                channels: ['CRM', 'Sales outreach', 'Personalized emails', 'Consultations'],
                contentTypes: ['Personalized proposals', 'Custom presentations', 'Trial offers'],
                kpis: ['SQL rate', 'Meeting bookings', 'Trial starts'],
                color: '#F59E0B'
            },
            {
                name: 'evaluation',
                label: 'Evaluation',
                objective: 'Address objections and close deals',
                channels: ['Sales calls', 'Negotiation', 'Custom demos'],
                contentTypes: ['Proposals', 'Contracts', 'Testimonials', 'Case studies'],
                kpis: ['Proposal acceptance', 'Deal velocity', 'Close rate'],
                color: '#10B981'
            },
            {
                name: 'purchase',
                label: 'Conversion',
                objective: 'Convert qualified leads to customers',
                channels: ['Sales team', 'Contract signing', 'Onboarding'],
                contentTypes: ['Contracts', 'Welcome materials', 'Onboarding guides'],
                kpis: ['Conversion rate', 'CAC', 'Deal size'],
                color: '#059669'
            },
            {
                name: 'retention',
                label: 'Retention',
                objective: 'Ensure customer success and identify upsell opportunities',
                channels: ['Email', 'Customer success', 'Account management'],
                contentTypes: ['Success guides', 'Training', 'Upsell offers'],
                kpis: ['Retention rate', 'LTV', 'Upsell rate'],
                color: '#0EA5E9'
            }
        ]
    },

    'sales': {
        id: 'sales',
        name: 'Sales Funnel',
        description: 'Convert prospects into paying customers directly',
        icon: '💰',
        bestFor: ['E-commerce', 'Digital products', 'Direct sales', 'Online courses'],
        stages: [
            {
                name: 'awareness',
                label: 'Awareness',
                objective: 'Drive traffic and product discovery',
                channels: ['Meta Ads', 'Google Shopping', 'Pinterest Ads', 'Influencer marketing'],
                contentTypes: ['Product showcases', 'Lifestyle content', 'User-generated content'],
                adFormats: ['Carousel', 'Collection ads', 'Video ads'],
                kpis: ['Traffic', 'Product views', 'Add to cart rate'],
                color: '#3B82F6'
            },
            {
                name: 'interest',
                label: 'Interest',
                objective: 'Showcase product benefits and value',
                channels: ['Product pages', 'Retargeting ads', 'Email marketing'],
                contentTypes: ['Product demonstrations', 'Customer reviews', 'Comparison guides'],
                kpis: ['Time on page', 'Product engagement', 'Email CTR'],
                color: '#8B5CF6'
            },
            {
                name: 'consideration',
                label: 'Decision',
                objective: 'Overcome objections and build trust',
                channels: ['Retargeting', 'Email', 'Chat support', 'Comparison pages'],
                contentTypes: ['Social proof', 'Guarantees', 'Limited offers', 'FAQs'],
                kpis: ['Cart abandonment rate', 'Support queries', 'Review reads'],
                color: '#EC4899'
            },
            {
                name: 'purchase',
                label: 'Purchase',
                objective: 'Complete the transaction smoothly',
                channels: ['Checkout page', 'Payment gateway', 'Order confirmation'],
                contentTypes: ['Trust badges', 'Urgency elements', 'Upsell offers'],
                kpis: ['Conversion rate', 'AOV', 'Cart recovery rate'],
                color: '#10B981'
            },
            {
                name: 'retention',
                label: 'Post-Purchase',
                objective: 'Drive repeat purchases and referrals',
                channels: ['Email', 'SMS', 'Loyalty programs', 'Referral programs'],
                contentTypes: ['Thank you emails', 'Cross-sell offers', 'Loyalty rewards'],
                kpis: ['Repeat purchase rate', 'LTV', 'Referral rate'],
                color: '#0EA5E9'
            }
        ]
    },

    'app-install': {
        id: 'app-install',
        name: 'App Install Funnel',
        description: 'Drive app installations and active users',
        icon: '📱',
        bestFor: ['Mobile apps', 'Gaming apps', 'SaaS mobile apps'],
        stages: [
            {
                name: 'awareness',
                label: 'Discovery',
                objective: 'Create awareness and drive app store visits',
                channels: ['App Store Optimization', 'Social ads', 'Influencer marketing', 'PR'],
                contentTypes: ['App previews', 'Feature highlights', 'User testimonials'],
                adFormats: ['App install ads', 'Video ads', 'Playable ads'],
                kpis: ['App store views', 'Impressions', 'Install rate'],
                color: '#3B82F6'
            },
            {
                name: 'install',
                label: 'Installation',
                objective: 'Maximize app installations',
                channels: ['App stores', 'Install campaigns', 'QR codes'],
                contentTypes: ['App screenshots', 'Ratings & reviews', 'Feature list'],
                kpis: ['Install rate', 'CPI', 'Install velocity'],
                color: '#8B5CF6'
            },
            {
                name: 'onboarding',
                label: 'Onboarding',
                objective: 'Activate users and demonstrate value',
                channels: ['In-app messaging', 'Push notifications', 'Email'],
                contentTypes: ['Tutorials', 'Quick start guides', 'Welcome bonuses'],
                kpis: ['Activation rate', 'Tutorial completion', 'First action rate'],
                color: '#EC4899'
            },
            {
                name: 'engagement',
                label: 'Engagement',
                objective: 'Drive regular app usage and feature adoption',
                channels: ['Push notifications', 'In-app messages', 'Email'],
                contentTypes: ['Feature tips', 'Achievement notifications', 'Content updates'],
                kpis: ['DAU', 'Session length', 'Feature usage'],
                color: '#F59E0B'
            },
            {
                name: 'monetization',
                label: 'Monetization',
                objective: 'Convert users to paying customers (if applicable)',
                channels: ['In-app purchases', 'Subscription prompts', 'Premium features'],
                contentTypes: ['Value propositions', 'Limited offers', 'Feature unlocks'],
                kpis: ['Conversion to paid', 'ARPU', 'Purchase frequency'],
                color: '#10B981'
            },
            {
                name: 'retention',
                label: 'Retention',
                objective: 'Maintain active user base and reduce churn',
                channels: ['Push notifications', 'Email', 'In-app engagement'],
                contentTypes: ['Re-engagement campaigns', 'New features', 'Rewards'],
                kpis: ['Retention rate', 'Churn rate', 'LTV'],
                color: '#0EA5E9'
            }
        ]
    },

    'saas-trial': {
        id: 'saas-trial',
        name: 'SaaS Trial Funnel',
        description: 'Convert free trial users to paying subscribers',
        icon: '🚀',
        bestFor: ['B2B SaaS', 'B2C SaaS', 'Productivity tools', 'Software platforms'],
        stages: [
            {
                name: 'awareness',
                label: 'Awareness',
                objective: 'Attract potential users to your SaaS solution',
                channels: ['SEO', 'Content marketing', 'Paid ads', 'Partnerships'],
                contentTypes: ['Blog posts', 'Comparison pages', 'Feature pages', 'Video demos'],
                adFormats: ['Search ads', 'Display ads', 'Video ads'],
                kpis: ['Website visits', 'Demo requests', 'Trial signups'],
                color: '#3B82F6'
            },
            {
                name: 'trial-signup',
                label: 'Trial Signup',
                objective: 'Convert visitors to trial users',
                channels: ['Landing pages', 'Product pages', 'Comparison pages'],
                contentTypes: ['Value propositions', 'Social proof', 'No credit card required'],
                kpis: ['Signup rate', 'Form completion', 'Trial starts'],
                color: '#8B5CF6'
            },
            {
                name: 'activation',
                label: 'Activation',
                objective: 'Get users to experience core value',
                channels: ['Onboarding emails', 'In-app guides', 'Chat support'],
                contentTypes: ['Quick start guides', 'Video tutorials', 'Templates'],
                kpis: ['Activation rate', 'Time to value', 'Feature adoption'],
                color: '#EC4899'
            },
            {
                name: 'engagement',
                label: 'Engagement',
                objective: 'Drive consistent product usage during trial',
                channels: ['Email sequences', 'In-app notifications', 'Webinars'],
                contentTypes: ['Use case guides', 'Success stories', 'Best practices'],
                kpis: ['Usage frequency', 'Features used', 'Engagement score'],
                color: '#F59E0B'
            },
            {
                name: 'conversion',
                label: 'Conversion',
                objective: 'Convert trial users to paid subscribers',
                channels: ['Sales outreach', 'Email campaigns', 'In-app prompts'],
                contentTypes: ['ROI calculators', 'Upgrade offers', 'Limited discounts'],
                kpis: ['Trial-to-paid rate', 'Upgrade timing', 'Plan selection'],
                color: '#10B981'
            },
            {
                name: 'retention',
                label: 'Retention',
                objective: 'Reduce churn and expand accounts',
                channels: ['Customer success', 'Email', 'Account management'],
                contentTypes: ['Success guides', 'Advanced features', 'Upsell opportunities'],
                kpis: ['MRR', 'Churn rate', 'NPS', 'Expansion revenue'],
                color: '#0EA5E9'
            }
        ]
    },

    'ecommerce': {
        id: 'ecommerce',
        name: 'E-commerce Funnel',
        description: 'Optimize online store for maximum conversions',
        icon: '🛒',
        bestFor: ['Online stores', 'D2C brands', 'Marketplaces', 'Dropshipping'],
        stages: [
            {
                name: 'awareness',
                label: 'Traffic Generation',
                objective: 'Drive qualified visitors to your store',
                channels: ['Meta Ads', 'Google Shopping', 'Pinterest', 'TikTok', 'SEO'],
                contentTypes: ['Product ads', 'Lifestyle content', 'Collections'],
                adFormats: ['Collection ads', 'Dynamic product ads', 'Shopping ads'],
                kpis: ['Store visits', 'Product views', 'CTR'],
                color: '#3B82F6'
            },
            {
                name: 'product-discovery',
                label: 'Product Discovery',
                objective: 'Help customers find the right products',
                channels: ['Product pages', 'Search', 'Recommendations', 'Collections'],
                contentTypes: ['Product images', 'Descriptions', 'Reviews', 'Videos'],
                kpis: ['Products viewed', 'Search usage', 'Category clicks'],
                color: '#8B5CF6'
            },
            {
                name: 'consideration',
                label: 'Consideration',
                objective: 'Build confidence and overcome objections',
                channels: ['Product pages', 'Reviews', 'Comparison tools', 'Live chat'],
                contentTypes: ['Detailed specs', 'Customer photos', 'Size guides', 'FAQs'],
                kpis: ['Time on product page', 'Reviews read', 'Add to cart rate'],
                color: '#EC4899'
            },
            {
                name: 'cart',
                label: 'Add to Cart',
                objective: 'Move products to cart',
                channels: ['Product pages', 'Quick view', 'Wishlist'],
                contentTypes: ['Clear CTAs', 'Stock indicators', 'Urgency elements'],
                kpis: ['Add to cart rate', 'Cart value', 'Items per cart'],
                color: '#F59E0B'
            },
            {
                name: 'checkout',
                label: 'Checkout',
                objective: 'Complete purchase with minimal friction',
                channels: ['Checkout flow', 'Payment options', 'Security badges'],
                contentTypes: ['Trust signals', 'Shipping options', 'Discounts'],
                kpis: ['Checkout initiation', 'Payment success', 'Cart abandonment'],
                color: '#10B981'
            },
            {
                name: 'post-purchase',
                label: 'Post-Purchase',
                objective: 'Drive repeat purchases and loyalty',
                channels: ['Email', 'SMS', 'Retargeting', 'Loyalty program'],
                contentTypes: ['Order updates', 'Cross-sells', 'Loyalty rewards', 'Referrals'],
                kpis: ['Repeat purchase rate', 'LTV', 'Referral rate'],
                color: '#0EA5E9'
            }
        ]
    },

    'community-growth': {
        id: 'community-growth',
        name: 'Community Growth Funnel',
        description: 'Build and engage an active community',
        icon: '👥',
        bestFor: ['Web3 projects', 'Creator communities', 'Membership sites', 'Discord/Telegram groups'],
        stages: [
            {
                name: 'awareness',
                label: 'Discovery',
                objective: 'Attract people to your community',
                channels: ['Social media', 'Content', 'Partnerships', 'Events'],
                contentTypes: ['Thought leadership', 'Value content', 'Community highlights'],
                kpis: ['Reach', 'Profile visits', 'Website traffic'],
                color: '#3B82F6'
            },
            {
                name: 'interest',
                label: 'Interest',
                objective: 'Demonstrate community value',
                channels: ['Landing pages', 'Social proof', 'Preview content'],
                contentTypes: ['Member testimonials', 'Benefits overview', 'Success stories'],
                kpis: ['Landing page visits', 'Time on site', 'Content engagement'],
                color: '#8B5CF6'
            },
            {
                name: 'join',
                label: 'Join',
                objective: 'Convert visitors to community members',
                channels: ['Signup forms', 'Discord invite', 'Membership pages'],
                contentTypes: ['Join benefits', 'Getting started guide', 'Welcome message'],
                kpis: ['Join rate', 'Signup completion', 'Invitation clicks'],
                color: '#EC4899'
            },
            {
                name: 'onboarding',
                label: 'Onboarding',
                objective: 'Activate new members',
                channels: ['Welcome sequence', 'Onboarding channels', 'Intro posts'],
                contentTypes: ['Community guidelines', 'Intro templates', 'First tasks'],
                kpis: ['First post', 'Profile completion', 'Channel visits'],
                color: '#F59E0B'
            },
            {
                name: 'engagement',
                label: 'Engagement',
                objective: 'Drive active participation',
                channels: ['Community platform', 'Events', 'Challenges', 'Rewards'],
                contentTypes: ['Discussions', 'Events', 'Contests', 'Recognition'],
                kpis: ['Daily active members', 'Posts', 'Event attendance'],
                color: '#10B981'
            },
            {
                name: 'advocacy',
                label: 'Advocacy',
                objective: 'Turn members into ambassadors',
                channels: ['Referral programs', 'Ambassador programs', 'Social sharing'],
                contentTypes: ['Referral incentives', 'Share templates', 'Ambassador perks'],
                kpis: ['Referral rate', 'UGC', 'Social mentions'],
                color: '#0EA5E9'
            }
        ]
    },

    'brand-awareness': {
        id: 'brand-awareness',
        name: 'Brand Awareness Funnel',
        description: 'Build brand recognition and mindshare',
        icon: '✨',
        bestFor: ['New brands', 'Product launches', 'Brand repositioning', 'Market expansion'],
        stages: [
            {
                name: 'reach',
                label: 'Reach',
                objective: 'Maximize brand visibility',
                channels: ['Meta Ads', 'YouTube', 'TikTok', 'Display ads', 'PR'],
                contentTypes: ['Brand videos', 'Stories', 'Sponsored content'],
                adFormats: ['Video ads', 'Brand campaigns', 'Reach campaigns'],
                kpis: ['Impressions', 'Reach', 'Brand lift'],
                color: '#3B82F6'
            },
            {
                name: 'engagement',
                label: 'Engagement',
                objective: 'Create brand interactions',
                channels: ['Social media', 'Content marketing', 'Influencer partnerships'],
                contentTypes: ['Engaging posts', 'Interactive content', 'User campaigns'],
                kpis: ['Engagement rate', 'Shares', 'Comments', 'Saves'],
                color: '#8B5CF6'
            },
            {
                name: 'consideration',
                label: 'Consideration',
                objective: 'Build brand preference',
                channels: ['Content hubs', 'Brand storytelling', 'Thought leadership'],
                contentTypes: ['Brand stories', 'Values content', 'Behind-the-scenes'],
                kpis: ['Time on content', 'Return visitors', 'Brand searches'],
                color: '#EC4899'
            },
            {
                name: 'affinity',
                label: 'Affinity',
                objective: 'Develop emotional connection',
                channels: ['Community', 'Email', 'Events', 'Experiences'],
                contentTypes: ['Community content', 'Event experiences', 'Exclusive access'],
                kpis: ['Community joins', 'Event attendance', 'Sentiment score'],
                color: '#F59E0B'
            },
            {
                name: 'advocacy',
                label: 'Advocacy',
                objective: 'Turn audience into brand advocates',
                channels: ['UGC campaigns', 'Referral programs', 'Brand partnerships'],
                contentTypes: ['Share campaigns', 'Testimonials', 'Brand content'],
                kpis: ['UGC volume', 'Referrals', 'Brand mentions'],
                color: '#10B981'
            }
        ]
    }
};

// Industry configurations
export const INDUSTRIES: Record<Industry, IndustryData> = {
    'saas': {
        name: 'SaaS',
        icon: '💻',
        description: 'Software as a Service companies',
        benchmarks: { convRate: 0.03, avgOrderValue: 120, trafficMix: { ads: 0.4, organic: 0.4, social: 0.2 } }
    },
    'web3': {
        name: 'Web3 / Blockchain',
        icon: '⛓️',
        description: 'Crypto, NFT, DeFi projects',
        benchmarks: { convRate: 0.015, avgOrderValue: 500, trafficMix: { social: 0.6, referral: 0.3, ads: 0.1 } }
    },
    'healthcare': {
        name: 'Healthcare',
        icon: '🏥',
        description: 'Medical & wellness services',
        benchmarks: { convRate: 0.05, avgOrderValue: 250, trafficMix: { seo: 0.5, ads: 0.3, referral: 0.2 } }
    },
    'education': {
        name: 'Education',
        icon: '🎓',
        description: 'EdTech, courses, training',
        benchmarks: { convRate: 0.04, avgOrderValue: 150, trafficMix: { ads: 0.5, social: 0.3, organic: 0.2 } }
    },
    'ecommerce': {
        name: 'E-commerce',
        icon: '🛒',
        description: 'Online retail & marketplaces',
        benchmarks: { convRate: 0.02, avgOrderValue: 85, trafficMix: { ads: 0.6, social: 0.2, email: 0.2 } }
    },
    'fintech': {
        name: 'FinTech',
        icon: '🏦',
        description: 'Financial technology & banking',
        benchmarks: { convRate: 0.025, avgOrderValue: 300, trafficMix: { ads: 0.4, seo: 0.4, partners: 0.2 } }
    },
    'realestate': {
        name: 'Real Estate',
        icon: '🏠',
        description: 'Property & urban development',
        benchmarks: { convRate: 0.01, avgOrderValue: 5000, trafficMix: { ads: 0.5, portals: 0.4, referral: 0.1 } }
    },
    'local-business': {
        name: 'Local Business',
        icon: '🏪',
        description: 'Physical services & retail',
        benchmarks: { convRate: 0.08, avgOrderValue: 60, trafficMix: { maps: 0.4, ads: 0.3, social: 0.3 } }
    },
    'startup': {
        name: 'High-Growth Startup',
        icon: '🚀',
        description: 'Early-stage venture-backed',
        benchmarks: { convRate: 0.02, avgOrderValue: 100, trafficMix: { viral: 0.4, ads: 0.3, social: 0.3 } }
    },
    'agency': {
        name: 'Agency',
        icon: '🏢',
        description: 'Marketing & professional services',
        benchmarks: { convRate: 0.03, avgOrderValue: 2500, trafficMix: { referral: 0.4, linkedin: 0.4, ads: 0.2 } }
    },
    'healthtech': {
        name: 'HealthTech',
        icon: '🏥',
        description: 'Medical tech & health services',
        benchmarks: { convRate: 0.035, avgOrderValue: 400, trafficMix: { content: 0.5, ads: 0.3, events: 0.2 } }
    },
    'edtech': {
        name: 'EdTech',
        icon: '🎓',
        description: 'Education & learning platforms',
        benchmarks: { convRate: 0.045, avgOrderValue: 120, trafficMix: { ads: 0.4, organic: 0.4, referral: 0.2 } }
    },
    'luxury': {
        name: 'Luxury Goods',
        icon: '💎',
        description: 'High-end premium products',
        benchmarks: { convRate: 0.008, avgOrderValue: 1500, trafficMix: { social: 0.5, pr: 0.3, ads: 0.2 } }
    },
    'b2b-services': {
        name: 'B2B Services',
        icon: '🤝',
        description: 'Strategic business solutions',
        benchmarks: { convRate: 0.02, avgOrderValue: 3000, trafficMix: { linkedin: 0.5, ads: 0.2, referral: 0.3 } }
    }
};

// Goal configurations
export const GOALS: Record<FunnelGoal, { name: string; icon: string; description: string }> = {
    'revenue': { name: 'Revenue Growth', icon: '📈', description: 'Maximize total income & LTV' },
    'leads': { name: 'Lead Velocity', icon: '⚡', description: 'High-speed prospect acquisition' },
    'brand': { name: 'Market Authority', icon: '🌟', description: 'Dominant brand positioning' },
    'expansion': { name: 'Viral Expansion', icon: '🚀', description: 'Network-effect driven growth' },
    'retention': { name: 'Loyalty Engine', icon: '🛡️', description: 'Minimize churn & maximize retention' },
    'infiltration': { name: 'Market Infiltration', icon: '🎯', description: 'Disrupting competitor market share' }
};
