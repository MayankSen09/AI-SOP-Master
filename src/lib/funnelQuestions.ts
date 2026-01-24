// Smart Question Engine for AI Marketing Funnel Builder
import type { FunnelType, Industry, FunnelGoal } from './funnelTypes';

export interface FunnelQuestion {
    id: string;
    question: string;
    type: 'select' | 'radio' | 'text' | 'range';
    options?: { value: string; label: string; description?: string }[];
    placeholder?: string;
    required: boolean;
    conditional?: {
        dependsOn: string;
        values: string[];
    };
}

// Generate contextual questions based on funnel type, industry, and goal
export function getSmartQuestions(
    funnelType: FunnelType,
    industry: Industry,
    goal: FunnelGoal
): FunnelQuestion[] {
    const baseQuestions: FunnelQuestion[] = [
        {
            id: 'targetCustomer',
            question: 'Who is your target customer?',
            type: 'radio',
            options: [
                { value: 'B2B', label: 'B2B', description: 'Selling to businesses' },
                { value: 'B2C', label: 'B2C', description: 'Selling to consumers' },
                { value: 'Local', label: 'Local', description: 'Local customers in specific geography' }
            ],
            required: true
        },
        {
            id: 'priceRange',
            question: 'What is your average product/service price range?',
            type: 'select',
            options: [
                { value: 'under-50', label: 'Under $50', description: 'Low-ticket' },
                { value: '50-200', label: '$50 - $200', description: 'Mid-tier' },
                { value: '200-1000', label: '$200 - $1,000', description: 'Premium' },
                { value: '1000-5000', label: '$1,000 - $5,000', description: 'High-ticket' },
                { value: '5000-plus', label: '$5,000+', description: 'Enterprise' }
            ],
            required: true
        },
        {
            id: 'salesCycle',
            question: 'How long is your typical sales cycle?',
            type: 'radio',
            options: [
                { value: 'Instant', label: 'Instant', description: 'Immediate purchase (e-commerce, impulse buys)' },
                { value: 'Short', label: 'Short (1-7 days)', description: 'Quick decision-making' },
                { value: 'Long', label: 'Long (7+ days)', description: 'Considered purchase or B2B sales' }
            ],
            required: true
        },
        {
            id: 'trafficSource',
            question: 'What is your main traffic source?',
            type: 'select',
            options: [
                { value: 'Ads', label: 'Paid Advertising', description: 'Meta, Google, etc.' },
                { value: 'Organic', label: 'Organic (SEO)', description: 'Search engine traffic' },
                { value: 'Social', label: 'Social Media', description: 'Organic social' },
                { value: 'Referral', label: 'Referrals/Word-of-mouth', description: 'Customer referrals' },
                { value: 'Mixed', label: 'Mixed Sources', description: 'Multiple channels' }
            ],
            required: true
        },
        {
            id: 'businessStage',
            question: 'What stage is your business in?',
            type: 'radio',
            options: [
                { value: 'New', label: 'New (0-6 months)', description: 'Just starting out' },
                { value: 'Growing', label: 'Growing (6-24 months)', description: 'Have some traction' },
                { value: 'Scaling', label: 'Scaling (2+ years)', description: 'Looking to scale' }
            ],
            required: true
        }
    ];

    const conditionalQuestions: FunnelQuestion[] = [];

    // Add funnel-specific questions
    if (funnelType === 'lead-generation' || funnelType === 'saas-trial') {
        conditionalQuestions.push({
            id: 'hasRetargeting',
            question: 'Do you currently have retargeting set up?',
            type: 'radio',
            options: [
                { value: 'yes', label: 'Yes, we have retargeting campaigns' },
                { value: 'no', label: 'No, not yet' },
                { value: 'planning', label: 'Planning to implement' }
            ],
            required: false
        });
    }

    if (funnelType === 'sales' || funnelType === 'ecommerce') {
        conditionalQuestions.push({
            id: 'currentCPA',
            question: 'What is your current cost per acquisition (if known)?',
            type: 'text',
            placeholder: 'e.g., $25 or "Not tracking yet"',
            required: false
        });
    }

    if (funnelType === 'app-install') {
        conditionalQuestions.push({
            id: 'appPlatform',
            question: 'Which platform is your app on?',
            type: 'select',
            options: [
                { value: 'ios', label: 'iOS (App Store)' },
                { value: 'android', label: 'Android (Google Play)' },
                { value: 'both', label: 'Both iOS and Android' }
            ],
            required: true
        });
    }

    if (industry === 'web3') {
        conditionalQuestions.push({
            id: 'web3Focus',
            question: 'What is your primary Web3 focus?',
            type: 'select',
            options: [
                { value: 'nft', label: 'NFT Project' },
                { value: 'defi', label: 'DeFi Platform' },
                { value: 'dao', label: 'DAO / Community' },
                { value: 'token', label: 'Token Launch' },
                { value: 'infrastructure', label: 'Infrastructure / Tools' }
            ],
            required: true
        });
    }

    if (industry === 'local-business') {
        conditionalQuestions.push({
            id: 'serviceArea',
            question: 'How large is your service area?',
            type: 'select',
            options: [
                { value: 'neighborhood', label: 'Single neighborhood' },
                { value: 'city', label: 'Single city' },
                { value: 'metro', label: 'Metro area / Multiple cities' },
                { value: 'region', label: 'Regional (state/province)' }
            ],
            required: true
        });
    }

    // Goal-specific questions
    if (goal === 'leads') {
        conditionalQuestions.push({
            id: 'currentCPA',
            question: 'What is your current CPA / CAC target?',
            type: 'text',
            placeholder: 'e.g., $150',
            required: false
        });
    }

    // Return base questions + relevant conditional questions
    return [
        ...baseQuestions,
        ...conditionalQuestions,
        {
            id: 'valueProposition',
            question: 'What is your core UVP (Unique Value Proposition)?',
            type: 'text',
            placeholder: 'e.g., We help SaaS companies reduce churn by 30% using AI-driven insights.',
            required: true
        },
        {
            id: 'competitorAdvantage',
            question: 'What is your primary competitive edge?',
            type: 'select',
            options: [
                { value: 'price', label: 'Price Leadership', description: 'Lowest cost in market' },
                { value: 'quality', label: 'Premium Quality', description: 'Best-in-class performance' },
                { value: 'innovation', label: 'Innovation', description: 'Unique features or tech' },
                { value: 'service', label: 'Customer Experience', description: 'Superior support and care' }
            ],
            required: true
        }
    ];
}

// Validate answers
export function validateAnswers(answers: Record<string, any>, questions: FunnelQuestion[]): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    questions.forEach(q => {
        if (q.required && !answers[q.id]) {
            errors.push(`Please answer: ${q.question}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Get question defaults based on context
export function getQuestionDefaults(
    funnelType: FunnelType,
    industry: Industry
): Record<string, string> {
    const defaults: Record<string, string> = {};

    // Set intelligent defaults
    if (funnelType === 'lead-generation' || funnelType === 'saas-trial') {
        defaults.targetCustomer = 'B2B';
        defaults.salesCycle = 'Long';
    }

    if (funnelType === 'sales' || funnelType === 'ecommerce') {
        defaults.targetCustomer = 'B2C';
        defaults.salesCycle = 'Instant';
    }

    if (funnelType === 'app-install') {
        defaults.targetCustomer = 'B2C';
        defaults.salesCycle = 'Instant';
    }

    if (industry === 'local-business') {
        defaults.targetCustomer = 'Local';
        defaults.salesCycle = 'Short';
    }

    if (industry === 'saas' || industry === 'fintech') {
        defaults.targetCustomer = 'B2B';
    }

    return defaults;
}

// Get example answers for testing
export function getExampleAnswers(funnelType: FunnelType, industry: Industry): Record<string, any> {
    return {
        targetCustomer: funnelType.includes('saas') ? 'B2B' : 'B2C',
        priceRange: industry === 'saas' ? '1000-5000' : '50-200',
        salesCycle: funnelType === 'ecommerce' ? 'Instant' : 'Short',
        trafficSource: 'Ads',
        businessStage: 'Growing',
        hasRetargeting: 'yes',
        currentCPA: '$75'
    };
}
