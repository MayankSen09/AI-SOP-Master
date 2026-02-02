// Landing Page Templates
// Template-specific content generators for different landing page types

export interface TemplateData {
    productName: string;
    targetAudience: string;
    mainBenefit: string;
    secondaryBenefits: string;
}

// SaaS Product Template
export const generateSaaSContent = (data: TemplateData) => ({
    hero: {
        mainBenefit: data.mainBenefit || `Transform Your ${data.targetAudience || 'Business'} with AI-Powered ${data.productName}`,
        subheadline: `Join thousands of ${data.targetAudience || 'companies'} using ${data.productName} to automate workflows, boost productivity, and scale faster than ever before.`,
        ctaText: 'Start Free 14-Day Trial',
    },
    features: [
        {
            title: 'Lightning Fast Performance',
            description: `Experience blazing-fast speeds that keep your ${data.targetAudience || 'team'} productive. ${data.productName} is optimized for performance at scale.`,
            icon: '⚡'
        },
        {
            title: 'Enterprise-Grade Security',
            description: `Bank-level encryption and SOC 2 compliance ensure your data is always protected. Trust ${data.productName} with your most sensitive information.`,
            icon: '🔒'
        },
        {
            title: 'Seamless Integrations',
            description: `Connect ${data.productName} with your favorite tools. Works with Slack, Zapier, Google Workspace, and 100+ other apps.`,
            icon: '🔗'
        },
    ],
    testimonials: [
        {
            name: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechCorp',
            quote: `${data.productName} transformed how we work. We've seen a 300% increase in productivity and our team absolutely loves it.`,
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Product Manager',
            company: 'StartupXYZ',
            quote: `Best investment we've made this year. The ROI was visible within the first month. Highly recommend to any ${data.targetAudience || 'growing company'}.`,
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            role: 'Operations Director',
            company: 'Global Solutions',
            quote: `Game-changer for our operations. What used to take days now takes hours. The automation features are incredible.`,
            rating: 5
        },
    ],
    pricing: [
        {
            name: 'Starter',
            price: '$29',
            period: 'month',
            features: [
                'Up to 10 team members',
                '100 GB storage',
                'Basic integrations',
                'Email support',
                'Mobile apps',
            ]
        },
        {
            name: 'Professional',
            price: '$99',
            period: 'month',
            popular: true,
            features: [
                'Up to 50 team members',
                '1 TB storage',
                'Advanced integrations',
                'Priority support',
                'Advanced analytics',
                'Custom branding',
                'API access',
            ]
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'month',
            features: [
                'Unlimited team members',
                'Unlimited storage',
                'All integrations',
                'Dedicated support',
                'Advanced security (SSO, SAML)',
                'Custom contracts',
                'White-label options',
                '99.9% SLA',
            ]
        },
    ],
    stats: [
        { number: '50K+', label: 'Active Users', icon: '👥' },
        { number: '99.9%', label: 'Uptime SLA', icon: '⚡' },
        { number: '24/7', label: 'Support', icon: '💬' },
        { number: '150+', label: 'Countries', icon: '🌍' },
    ],
    faqs: [
        {
            question: 'How long is the free trial?',
            answer: 'Our free trial lasts 14 days with full access to all Professional features. No credit card required to start.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Yes! You can cancel your subscription at any time with no penalties. We offer a 30-day money-back guarantee on all annual plans.'
        },
        {
            question: 'Do you offer discounts for nonprofits or education?',
            answer: 'Absolutely! We offer 50% off for verified nonprofits and educational institutions. Contact our sales team for details.'
        },
        {
            question: 'What kind of support do you provide?',
            answer: 'All plans include email support. Professional and Enterprise plans get priority support with faster response times. Enterprise customers get a dedicated account manager.'
        },
        {
            question: 'Is my data secure?',
            answer: `Yes! ${data.productName} uses bank-level 256-bit encryption, is SOC 2 certified, and undergoes regular security audits. Your data is always protected.`
        },
        {
            question: 'Can I upgrade or downgrade my plan?',
            answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.'
        },
    ],
    cta: {
        headline: 'Ready to Transform Your Business?',
        subheadline: `Join 50,000+ ${data.targetAudience || 'companies'} already using ${data.productName}. Start your free trial today.`,
        ctaText: 'Start Free Trial - No Credit Card Required',
    },
});

// Lead Magnet Template
export const generateLeadMagnetContent = (data: TemplateData) => ({
    hero: {
        mainBenefit: data.mainBenefit || `Free Guide: ${data.productName}`,
        subheadline: `Download our comprehensive guide and discover the exact strategies ${data.targetAudience || 'successful companies'} use to achieve incredible results.`,
        ctaText: 'Download Free Guide',
    },
    features: [
        {
            title: 'Proven Strategies',
            description: `Learn the exact frameworks and tactics that have generated millions in revenue for ${data.targetAudience || 'businesses'} like yours.`,
            icon: '📊'
        },
        {
            title: 'Step-by-Step Guides',
            description: 'No fluff, just actionable steps you can implement immediately. See results in as little as 7 days.',
            icon: '📝'
        },
        {
            title: 'Real Case Studies',
            description: 'Learn from real examples and see exactly how other companies achieved massive  growth using these strategies.',
            icon: '💡'
        },
    ],
    testimonials: [
        {
            name: 'David Lee',
            role: 'Founder',
            company: 'Growth Agency',
            quote: 'This guide completely changed my approach. Implemented the strategies and saw a 200% increase in conversions within 30 days.',
            rating: 5
        },
        {
            name: 'Jennifer Park',
            role: 'Marketing Director',
            company: 'SaaS Startup',
            quote: 'Incredibly valuable content. Worth way more than free. This should be a paid course!',
            rating: 5
        },
        {
            name: 'Alex Thompson',
            role: 'Entrepreneur',
            company: 'E-commerce Store',
            quote: 'Best free resource I\'ve found. Practical, actionable, and results-driven. Highly recommend!',
            rating: 5
        },
    ],
    stats: [
        { number: '100K+', label: 'Downloads', icon: '📥' },
        { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
        { number: '95%', label: 'Would Recommend', icon: '👍' },
        { number: '50+', label: 'Pages of Value', icon: '📚' },
    ],
    pricing: undefined as any,
    faqs: undefined as any,
    cta: {
        headline: 'Get Your Free Guide Now',
        subheadline: 'Join 100,000+ people who have already downloaded this game-changing resource.',
        ctaText: 'Download Now - 100% Free',
    },
});

// Product Launch Template
export const generateProductLaunchContent = (data: TemplateData) => ({
    hero: {
        mainBenefit: data.mainBenefit || `🚀 Launching Soon: ${data.productName}`,
        subheadline: `Be among the first to experience the future of ${data.targetAudience || 'productivity'}. Early bird pricing ends in 7 days!`,
        ctaText: 'Reserve Your Spot - 50% Off',
    },
    features: [
        {
            title: 'Revolutionary Technology',
            description: `${data.productName} uses cutting-edge AI to deliver results that were impossible until now. Be on the forefront of innovation.`,
            icon: '🚀'
        },
        {
            title: 'Early Bird Exclusive',
            description: 'Lock in lifetime pricing at 50% off. Price will never increase for early adopters. This is a limited-time opportunity.',
            icon: '🎯'
        },
        {
            title: 'Shape the Future',
            description: 'As an early adopter, your feedback directly influences our roadmap. Help us build the perfect solution.',
            icon: '💎'
        },
    ],
    testimonials: [
        {
            name: 'Beta Tester #1',
            role: 'Early Access User',
            company: 'Tech Company',
            quote: 'Been using the beta for 2 months. This is going to change the industry. Can\'t wait for the official launch!',
            rating: 5
        },
        {
            name: 'Beta Tester #2',
            role: 'Power User',
            company: 'Startup',
            quote: 'Already saved 20+ hours per week. The early bird price is an absolute steal. Don\'t miss this!',
            rating: 5
        },
        {
            name: 'Beta Tester #3',
            role: 'Team Lead',
            company: 'Agency',
            quote: 'Game-changer. My whole team is switching over. Best decision we\'ve made this year.',
            rating: 5
        },
    ],
    pricing: [
        {
            name: 'Early Bird',
            price: '$49',
            period: 'month',
            popular: true,
            features: [
                '✨ 50% OFF Launch Pricing',
                '🔒 Lifetime Price Lock',
                '🎁 Exclusive Bonuses ($500 value)',
                '👑 VIP Support Access',
                '📈 Priority Feature Requests',
                '🏆 Founder\'s Badge',
            ]
        },
        {
            name: 'Regular Price',
            price: '$99',
            period: 'month',
            features: [
                'Standard pricing (after launch)',
                'All core features',
                'Email support',
                'Regular updates',
            ]
        },
    ],
    stats: [
        { number: '5K+', label: 'Waitlist Members', icon: '👥' },
        { number: '7 Days', label: 'Until Launch', icon: '⏰' },
        { number: '50% OFF', label: 'Early Bird Savings', icon: '💰' },
        { number: '100%', label: 'Satisfaction Guarantee', icon: '✅' },
    ],
    faqs: undefined as any,
    cta: {
        headline: '⏰ Early Bird Pricing Ends in 7 Days',
        subheadline: 'Don\'t miss your chance to lock in 50% off for life. Join 5,000+ smart people who\'ve already reserved their spot.',
        ctaText: 'Claim My Early Bird Discount Now',
    },
});

// Webinar Registration Template
export const generateWebinarContent = (data: TemplateData) => ({
    hero: {
        mainBenefit: data.mainBenefit || `Free Masterclass: ${data.productName}`,
        subheadline: `Join our live training and discover the proven system ${data.targetAudience || 'professionals'} use to achieve breakthrough results.`,
        ctaText: 'Save My Spot - Free Registration',
    },
    features: [
        {
            title: 'Learn From Experts',
            description: 'Get insider knowledge from industry leaders who have achieved what you want to accomplish. Real experience, real results.',
            icon: '🎓'
        },
        {
            title: 'Live Q&A Session',
            description: 'Get your specific questions answered live. Bring your challenges and get personalized advice from our experts.',
            icon: '💬'
        },
        {
            title: 'Exclusive Resources',
            description: 'Download premium templates, checklists, and tools (worth $500) available only to webinar attendees.',
            icon: '🎁'
        },
    ],
    testimonials: [
        {
            name: 'Previous Attendee #1',
            role: 'Marketing Manager',
            company: 'Tech Startup',
            quote: 'Best webinar I\'ve  attended. Practical strategies I implemented immediately. Saw results within a week!',
            rating: 5
        },
        {
            name: 'Previous Attendee #2',
            role: 'Business Owner',
            company: 'E-commerce',
            quote: 'Mind-blowing content. The Q&A alone was worth hours of consulting. Can\'t recommend enough!',
            rating: 5
        },
        {
            name: 'Previous Attendee #3',
            role: 'Consultant',
            company: 'Agency',
            quote: 'Incredibly valuable. The frameworks shared are pure gold. Already recommended to my entire network.',
            rating: 5
        },
    ],
    stats: [
        { number: '10K+', label: 'Past Attendees', icon: '👥' },
        { number: '60 Min', label: 'Live Training', icon: '⏰' },
        { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
        { number: '$0', label: 'Completely Free', icon: '💵' },
    ],
    pricing: undefined as any,
    faqs: [
        {
            question: 'When is the webinar?',
            answer: 'The next live session is on [DATE] at [TIME]. Can\'t make it live? Register anyway and we\'ll send you the recording.'
        },
        {
            question: 'How long is the webinar?',
            answer: 'The training is 60 minutes followed by a 30-minute live Q&A session. Plan for about 90 minutes total.'
        },
        {
            question: 'Will I get a replay?',
            answer: 'Yes! All registered attendees receive a recording within 24 hours. However, live Q&A is only available during the session.'
        },
        {
            question: 'Is  this really free?',
            answer: 'Yes, completely free! No hidden costs, no credit card required. We just want to provide value and help you succeed.'
        },
    ],
    cta: {
        headline: 'Limited Seats Available',
        subheadline: 'Our webinars fill up fast. Register now to secure your spot in this exclusive training.',
        ctaText: 'Register Free - Save My Seat',
    },
});

// E-commerce Product Template
export const generateEcommerceContent = (data: TemplateData) => ({
    hero: {
        mainBenefit: data.mainBenefit || `Premium ${data.productName} - Engineered for ${data.targetAudience || 'Excellence'}`,
        subheadline: `Experience the perfect blend of quality, performance, and style. Trusted by ${data.targetAudience || 'thousands of satisfied customers'} worldwide.`,
        ctaText: 'Buy Now - Free Shipping',
    },
    features: [
        {
            title: 'Premium Quality',
            description: 'Crafted from the finest materials with meticulous attention to detail. Built to last and backed by our lifetime warranty.',
            icon: '💎'
        },
        {
            title: 'Fast & Free Shipping',
            description: 'Free 2-day shipping on all orders. Orders placed before 2 PM ship same day. Track your package in real-time.',
            icon: '🚚'
        },
        {
            title: '30-Day Money-Back',
            description: 'Not satisfied? Return it within 30 days for a full refund, no questions asked. We stand behind our product 100%.',
            icon: '✅'
        },
    ],
    testimonials: [
        {
            name: 'Happy Customer #1',
            role: 'Verified Buyer',
            company: '★★★★★',
            quote: 'Absolutely love it! Quality exceeded my expectations. Worth every penny. Already ordered one for my friend!',
            rating: 5
        },
        {
            name: 'Happy Customer #2',
            role: 'Verified Buyer',
            company: '★★★★★',
            quote: 'Best purchase this year. Shipping was super fast and customer service is amazing. Highly recommend!',
            rating: 5
        },
        {
            name: 'Happy Customer #3',
            role: 'Verified Buyer',
            company: '★★★★★',
            quote: 'Game-changer! Can\'t imagine life without it now. If you\'re on the fence, just buy it. You won\'t regret it!',
            rating: 5
        },
    ],
    pricing: [
        {
            name: 'Single',
            price: '$99',
            period: 'one-time',
            features: [
                `1x ${data.productName}`,
                'Free shipping',
                '30-day money-back guarantee',
                'Lifetime warranty',
            ]
        },
        {
            name: 'Bundle (Best Value)',
            price: '$249',
            period: 'one-time',
            popular: true,
            features: [
                `3x ${data.productName}`,
                '🎁 Save $48 (16% off)',
                'Free shipping',
                '30-day money-back guarantee',
                'Lifetime warranty',
                'Priority support',
            ]
        },
        {
            name: 'Family Pack',
            price: '$399',
            period: 'one-time',
            features: [
                `5x ${data.productName}`,
                '🎁 Save $96 (20% off)',
                'Free shipping',
                '30-day money-back guarantee',
                'Lifetime warranty',
                'VIP support',
                'Exclusive bonuses',
            ]
        },
    ],
    stats: [
        { number: '50K+', label: 'Happy Customers', icon: '😊' },
        { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
        { number: '98%', label: 'Would Buy Again', icon: '🔄' },
        { number: '24/7', label: 'Customer Support', icon: '💬' },
    ],
    faqs: [
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day money-back guarantee. If you\'re not 100% satisfied, return it for a full refund, no questions asked.'
        },
        {
            question: 'How long does shipping take?',
            answer: 'We offer free 2-day shipping on all orders. Orders placed before 2 PM ship the same day.'
        },
        {
            question: 'Do you ship internationally?',
            answer: 'Yes! We ship to over 150  countries worldwide. International shipping takes 7-14 days.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.'
        },
        {
            question: 'Is there a warranty?',
            answer: `Yes! All ${data.productName} products come with a lifetime warranty against defects in materials and workmanship.`
        },
    ],
    cta: {
        headline: '🔥 Limited Stock - Order Now',
        subheadline: 'Over 1,000 sold this week. Don\'t miss out on this premium product. Free shipping + 30-day guarantee.',
        ctaText: 'Add to Cart - Free Shipping',
    },
});
