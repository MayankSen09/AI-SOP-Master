// SOP Templates - Ready-made prompts for common SOPs
export const SOP_TEMPLATES = [
    {
        id: 'employee-onboarding',
        title: 'Employee Onboarding',
        category: 'HR',
        icon: '👥',
        purpose: 'Systematically onboard new employees to ensure smooth integration into the company culture and workflows',
        rawSteps: `
1. Pre-boarding: Send welcome email with first-day details, equipment setup, and paperwork
2. Day 1: Office tour, IT setup, team introductions, and company overview
3. Week 1: Department-specific training, assign mentor, review key policies
4. Month 1: Regular check-ins, goal setting, feedback sessions
5. Month 3: Performance review, integration assessment, career development plan
        `.trim(),
        tags: ['HR', 'People Operations', 'Training']
    },
    {
        id: 'customer-support',
        title: 'Customer Support Ticket Resolution',
        category: 'Support',
        icon: '🎧',
        purpose: 'Handle customer support tickets efficiently while maintaining high satisfaction rates',
        rawSteps: `
1. Acknowledge: Respond within 1 hour with ticket number and expected resolution time
2. Investigate: Review customer history, replicate issue, check knowledge base
3. Diagnose: Identify root cause, categorize issue type and priority
4. Resolve: Provide solution, escalate if needed, document steps taken
5. Follow-up: Confirm resolution, request feedback, update knowledge base
        `.trim(),
        tags: ['Support', 'Customer Service', 'Operations']
    },
    {
        id: 'social-media-post',
        title: 'Social Media Content Publishing',
        category: 'Marketing',
        icon: '📱',
        purpose: 'Create, approve, and publish engaging social media content across platforms',
        rawSteps: `
1. Content Creation: Draft post copy, design visuals, include relevant hashtags
2. Review: Check brand guidelines, verify facts, ensure compliance
3. Approval: Submit for marketing manager review, implement feedback
4. Schedule: Use scheduling tool, optimize posting time for audience
5. Publish: Post content, monitor for first 2 hours, respond to early engagement
6. Track: Record analytics, note performance, update strategy based on results
        `.trim(),
        tags: ['Marketing', 'Social Media', 'Content']
    },
    {
        id: 'code-deployment',
        title: 'Production Code Deployment',
        category: 'Engineering',
        icon: '🚀',
        purpose: 'Deploy code changes to production safely with zero downtime',
        rawSteps: `
1. Pre-deployment: Run full test suite, code review approval, backup database
2. Staging: Deploy to staging environment, run smoke tests, QA verification
3. Communication: Notify team of deployment window, post in deployment channel
4. Deploy: Use CI/CD pipeline, monitor deployment logs, run health checks
5. Verify: Test critical paths, check error rates, monitor performance metrics
6. Rollback Plan: Document rollback procedure, keep previous version ready
        `.trim(),
        tags: ['Engineering', 'DevOps', 'Deployment']
    },
    {
        id: 'sales-discovery-call',
        title: 'Sales Discovery Call',
        category: 'Sales',
        icon: '💼',
        purpose: 'Conduct effective discovery calls to understand prospect needs and qualify leads',
        rawSteps: `
1. Preparation: Research company, review CRM notes, prepare questions
2. Introduction: Build rapport, set agenda, confirm time availability
3. Discovery: Ask open-ended questions, identify pain points, understand budget
4. Present: Share relevant case studies, demonstrate value proposition
5. Next Steps: Schedule demo/follow-up, send summary email, update CRM
        `.trim(),
        tags: ['Sales', 'Business Development', 'Lead Qualification']
    },
    {
        id: 'financial-month-end',
        title: 'Month-End Financial Close',
        category: 'Finance',
        icon: '💰',
        purpose: 'Complete accurate month-end financial closing and reporting',
        rawSteps: `
1. Reconciliation: Reconcile all bank accounts, credit cards, and payment processors
2. Invoicing: Send outstanding invoices, follow up on overdue payments
3. Expenses: Review and categorize all expenses, approve expense reports
4. Accruals: Record accrued expenses and deferred revenue
5. Reports: Generate P&L, balance sheet, cash flow statements
6. Review: Finance manager approval, distribute reports to stakeholders
        `.trim(),
        tags: ['Finance', 'Accounting', 'Reporting']
    }
];

// Marketing Strategy Templates with detailed targeting
export const MARKETING_STRATEGY_TEMPLATES = [
    {
        id: 'saas-b2b-launch',
        title: 'SaaS B2B Product Launch',
        industry: 'Technology',
        companySize: 'Startup',
        targetGeo: 'United States',
        businessModel: 'B2B',
        icon: '🚀',
        objectives: [
            'Generate 10,000 qualified leads in 90 days',
            'Achieve 15% trial-to-paid conversion rate',
            'Build brand awareness in target market',
            'Establish thought leadership'
        ],
        channels: [
            {
                name: 'LinkedIn Ads',
                focus: 'B2B Decision Makers',
                tactics: [
                    'Sponsored content targeting C-level executives',
                    'InMail campaigns for enterprise accounts',
                    'Retargeting website visitors',
                    'Lead gen forms for content downloads'
                ]
            },
            {
                name: 'Content Marketing',
                focus: 'SEO & Thought Leadership',
                tactics: [
                    'Weekly blog posts optimized for search',
                    'Monthly whitepapers and case studies',
                    'Guest posts on industry publications',
                    'Webinar series with industry experts'
                ]
            },
            {
                name: 'Email Marketing',
                focus: 'Nurture & Conversion',
                tactics: [
                    'Drip campaigns for trial users',
                    'Weekly newsletter with product updates',
                    'Automated workflows for lead scoring',
                    'Re-engagement campaigns for churned users'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Business software',
                'Enterprise technology',
                'Productivity tools',
                'Cloud computing',
                'SaaS solutions',
                'Digital transformation'
            ],
            behaviors: [
                'Business decision makers',
                'IT purchase behavior',
                'Technology early adopters',
                'Frequent business travelers',
                'Professional networking active'
            ],
            demographics: [
                'Age: 30-55',
                'Job titles: Director, VP, C-level',
                'Company size: 100-10,000 employees',
                'Industries: Technology, Finance, Healthcare',
                'Education: Bachelor\'s degree or higher',
                'Income: $75,000+'
            ],
            customAudiences: [
                'Website visitors (last 30 days)',
                'Engaged with previous content',
                'Downloaded lead magnets',
                'Attended webinars',
                'Email subscribers',
                'CRM contact list'
            ],
            lookalikes: [
                'Based on trial users',
                'Based on high-value customers',
                'Based on engaged email list'
            ]
        },
        roadmap: [
            {
                phase: 'Pre-Launch (Weeks 1-2)',
                duration: '2 weeks',
                activities: [
                    'Set up tracking pixels and analytics',
                    'Build landing pages and lead magnets',
                    'Create ad creatives and copy variations',
                    'Set up email automation workflows'
                ]
            },
            {
                phase: 'Soft Launch (Weeks 3-4)',
                duration: '2 weeks',
                activities: [
                    'Launch limited ad campaigns for testing',
                    'A/B test messaging and creatives',
                    'Gather initial feedback and optimize',
                    'Begin content publication schedule'
                ]
            },
            {
                phase: 'Scale (Weeks 5-12)',
                duration: '8 weeks',
                activities: [
                    'Increase ad spend on winning campaigns',
                    'Expand to additional channels',
                    'Launch partner and affiliate programs',
                    'Host monthly webinars and demos'
                ]
            }
        ]
    },
    {
        id: 'ecommerce-growth',
        title: 'E-commerce Growth Strategy',
        industry: 'Retail',
        companySize: 'Small Business',
        targetGeo: 'Global',
        businessModel: 'B2C',
        icon: '🛒',
        objectives: [
            'Increase online revenue by 200% in 6 months',
            'Achieve 3:1 ROAS on paid advertising',
            'Build email list to 50,000 subscribers',
            'Reduce cart abandonment rate to under 60%'
        ],
        channels: [
            {
                name: 'Facebook & Instagram Ads',
                focus: 'Product Discovery & Remarketing',
                tactics: [
                    'Dynamic product ads for catalog',
                    'Collection ads showcasing product lines',
                    'Stories ads with swipe-up to shop',
                    'Carousel ads highlighting bestsellers'
                ]
            },
            {
                name: 'Google Shopping',
                focus: 'High Intent Shoppers',
                tactics: [
                    'Optimize product feed for Shopping ads',
                    'Smart Shopping campaigns',
                    'Remarketing lists for search ads (RLSA)',
                    'Performance Max campaigns'
                ]
            },
            {
                name: 'Influencer Marketing',
                focus: 'Social Proof & UGC',
                tactics: [
                    'Partner with micro-influencers (10k-100k followers)',
                    'Create affiliate program with tracking',
                    'Run UGC contests and campaigns',
                    'Build long-term brand ambassador relationships'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Online shopping',
                'Fashion and apparel',
                'Home decor',
                'Beauty and cosmetics',
                'Lifestyle brands',
                'Sustainable products'
            ],
            behaviors: [
                'Online shoppers',
                'Frequent purchasers',
                'Engaged shoppers',
                'Mobile shoppers',
                'Cart abandoners'
            ],
            demographics: [
                'Age: 25-45',
                'Gender: Customizable by product line',
                'Income: $40,000+',
                'Relationship status: All',
                'Parents with children (optional)',
                'Urban and suburban dwellers'
            ],
            customAudiences: [
                'Website visitors - product pages',
                'Add to cart but didn\'t purchase',
                'Previous customers',
                'Email list subscribers',
                'Instagram/Facebook page engagers'
            ],
            lookalikes: [
                'Top 25% purchasers by value',
                'High LTV customers',
                'Repeat buyers',
                'Email engagement leaders'
            ]
        },
        roadmap: [
            {
                phase: 'Foundation (Month 1)',
                duration: '4 weeks',
                activities: [
                    'Install Facebook Pixel and Google Analytics 4',
                    'Set up product catalog feeds',
                    'Create campaign structure',
                    'Design ad creatives and write copy'
                ]
            },
            {
                phase: 'Test & Learn (Months 2-3)',
                duration: '8 weeks',
                activities: [
                    'Test multiple ad formats and placements',
                    'Identify winning audiences and products',
                    'Launch email welcome series',
                    'Begin influencer outreach'
                ]
            },
            {
                phase: 'Scale & Optimize (Months 4-6)',
                duration: '12 weeks',
                activities: [
                    'Scale winning campaigns horizontally',
                    'Expand international shipping',
                    'Launch loyalty program',
                    'Implement advanced automation'
                ]
            }
        ]
    },
    {
        id: 'local-business-domination',
        title: 'Local Business Domination',
        industry: 'Local Services',
        companySize: 'Small Business',
        targetGeo: 'Local Area (50-mile radius)',
        businessModel: 'B2C',
        icon: '🏪',
        objectives: [
            'Dominate local search results',
            'Generate 100+ qualified leads per month',
            'Achieve 4.8+ star rating across platforms',
            'Build community brand recognition'
        ],
        channels: [
            {
                name: 'Google My Business',
                focus: 'Local SEO Domination',
                tactics: [
                    'Optimize GMB profile with photos, posts, reviews',
                    'Regular updates and special offers',
                    'Q&A management and customer interaction',
                    'Local pack optimization'
                ]
            },
            {
                name: 'Facebook Local Ads',
                focus: 'Geographic Targeting',
                tactics: [
                    'Radius targeting around business location',
                    'Boost local events and promotions',
                    'Facebook Marketplace listings',
                    'Community group engagement'
                ]
            },
            {
                name: 'Review Marketing',
                focus: 'Social Proof',
                tactics: [
                    'Automated review request system',
                    'Multi-platform review monitoring',
                    'Respond to all reviews within 24 hours',
                    'Showcase testimonials on website'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Local businesses',
                'Home services',
                'Community events',
                'Local shopping'
            ],
            behaviors: [
                'Frequent local shoppers',
                'Community engaged',
                'Local services searchers'
            ],
            demographics: [
                'Location: Within 25 miles',
                'Age: 30-65',
                'Homeowners',
                'Local residents'
            ],
            customAudiences: [
                'Past customers',
                'Phone inquiries',
                'Website visitors'
            ],
            lookalikes: [
                'Best customers by zip code',
                'High-value clients'
            ]
        },
        roadmap: [
            {
                phase: 'Local SEO Setup (Weeks 1-2)',
                duration: '2 weeks',
                activities: [
                    'Claim and optimize all local listings',
                    'Set up review management system',
                    'Create location pages on website'
                ]
            },
            {
                phase: 'Launch Campaigns (Weeks 3-6)',
                duration: '4 weeks',
                activities: [
                    'Start local ad campaigns',
                    'Begin review generation program',
                    'Community engagement initiatives'
                ]
            },
            {
                phase: 'Dominate (Weeks 7-12)',
                duration: '6 weeks',
                activities: [
                    'Expand service area targeting',
                    'Launch referral program',
                    'Partner with local businesses'
                ]
            }
        ]
    },
    {
        id: 'mobile-app-user-acquisition',
        title: 'Mobile App User Acquisition',
        industry: 'Technology',
        companySize: 'Startup',
        targetGeo: 'United States',
        businessModel: 'B2C',
        icon: '📱',
        objectives: [
            'Acquire 500,000 app installs in 6 months',
            'Achieve $1.50 or lower CPI',
            'Hit 40% D7 retention rate',
            'Generate 100,000 DAU'
        ],
        channels: [
            {
                name: 'Google App Campaigns',
                focus: 'Android User Acquisition',
                tactics: [
                    'Universal App Campaigns (UAC)',
                    'In-app event optimization',
                    'Creative asset testing',
                    'Automated bidding strategies'
                ]
            },
            {
                name: 'Apple Search Ads',
                focus: 'iOS High-Intent Users',
                tactics: [
                    'Search Match campaigns',
                    'Keyword targeting',
                    'Discovery campaigns',
                    'Product page optimization'
                ]
            },
            {
                name: 'TikTok Ads',
                focus: 'Viral Growth',
                tactics: [
                    'Spark Ads with UGC',
                    'Hashtag challenges',
                    'Influencer partnerships',
                    'App install campaigns'
                ]
            },
            {
                name: 'ASO (App Store Optimization)',
                focus: 'Organic Growth',
                tactics: [
                    'Keyword optimization',
                    'Screenshot and video testing',
                    'Rating and review management',
                    'Localization for top markets'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Mobile apps',
                'Technology early adopters',
                'App category specific',
                'Digital services'
            ],
            behaviors: [
                'Mobile app installers',
                'In-app purchasers',
                'Mobile gamers',
                'Power app users'
            ],
            demographics: [
                'Age: 18-34',
                'Mobile-first users',
                'Urban areas',
                'Tech-savvy'
            ],
            customAudiences: [
                'Existing users for retargeting',
                'Website visitors',
                'Video viewers',
                'Engaged social followers'
            ],
            lookalikes: [
                'Top 10% active users',
                'In-app purchasers',
                'High engagement users'
            ]
        },
        roadmap: [
            {
                phase: 'Pre-Launch (Weeks 1-3)',
                duration: '3 weeks',
                activities: [
                    'ASO optimization',
                    'Install tracking setup',
                    'Creative production',
                    'Pre-registration campaigns'
                ]
            },
            {
                phase: 'Soft Launch (Weeks 4-6)',
                duration: '3 weeks',
                activities: [
                    'Limited geo testing',
                    'CPI optimization',
                    'Retention analysis',
                    'Creative iteration'
                ]
            },
            {
                phase: 'Scale (Weeks 7-24)',
                duration: '18 weeks',
                activities: [
                    'Global expansion',
                    'Influencer campaigns',
                    'Referral program launch',
                    'Performance marketing scale'
                ]
            }
        ]
    },
    {
        id: 'b2b-enterprise-abm',
        title: 'B2B Enterprise ABM Strategy',
        industry: 'Enterprise Software',
        companySize: 'Mid-Market',
        targetGeo: 'North America',
        businessModel: 'B2B',
        icon: '🎯',
        objectives: [
            'Penetrate 50 target enterprise accounts',
            'Generate $5M+ in pipeline',
            'Achieve 25% account engagement rate',
            'Close 10 enterprise deals'
        ],
        channels: [
            {
                name: 'LinkedIn ABM',
                focus: 'Account-Based Targeting',
                tactics: [
                    'Company list targeting',
                    'Matched audiences',
                    'Executive InMail campaigns',
                    'Thought leadership content'
                ]
            },
            {
                name: 'Direct Mail',
                focus: 'Executive Engagement',
                tactics: [
                    'Personalized gift packages',
                    'Event invitations',
                    'Custom research reports',
                    'VIP experiences'
                ]
            },
            {
                name: 'Events & Webinars',
                focus: 'Relationship Building',
                tactics: [
                    'Executive roundtables',
                    'Private dinners',
                    'Industry conferences',
                    'Account-specific webinars'
                ]
            },
            {
                name: 'Content Personalization',
                focus: 'Account-Level Messaging',
                tactics: [
                    'Custom landing pages',
                    'Industry-specific case studies',
                    'Personalized video messages',
                    'Account intelligence reports'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Enterprise software',
                'Digital transformation',
                'Business intelligence',
                'Executive leadership'
            ],
            behaviors: [
                'Enterprise decision makers',
                'Technology budget holders',
                'Industry conference attendees'
            ],
            demographics: [
                'Job titles: VP+, C-level',
                'Company size: 1,000+ employees',
                'Industries: Fortune 1000',
                'Revenue: $100M+'
            ],
            customAudiences: [
                'Target account lists',
                'Existing customer expansion',
                'Intent data signals',
                'Engaged content viewers'
            ],
            lookalikes: [
                'Current enterprise customers',
                'High-value accounts',
                'Industry leaders'
            ]
        },
        roadmap: [
            {
                phase: 'Account Selection (Month 1)',
                duration: '4 weeks',
                activities: [
                    'Build target account list',
                    'Identify key stakeholders',
                    'Research account needs',
                    'Create account playbooks'
                ]
            },
            {
                phase: 'Engagement (Months 2-4)',
                duration: '12 weeks',
                activities: [
                    'Multi-channel outreach',
                    'Executive engagement',
                    'Thought leadership',
                    'Account nurturing'
                ]
            },
            {
                phase: 'Conversion (Months 5-6)',
                duration: '8 weeks',
                activities: [
                    'Custom proposals',
                    'Proof of concepts',
                    'Executive presentations',
                    'Contract negotiations'
                ]
            }
        ]
    },
    {
        id: 'content-creator-monetization',
        title: 'Content Creator Monetization',
        industry: 'Media & Entertainment',
        companySize: 'Individual/Small Team',
        targetGeo: 'Global',
        businessModel: 'B2C',
        icon: '🎬',
        objectives: [
            'Grow to 100,000 subscribers/followers',
            'Generate $10,000/month in revenue',
            'Build email list of 25,000',
            'Launch successful digital product'
        ],
        channels: [
            {
                name: 'YouTube',
                focus: 'Long-Form Content',
                tactics: [
                    'SEO-optimized video titles',
                    'Consistent upload schedule',
                    'Engagement optimization',
                    'Shorts for discovery'
                ]
            },
            {
                name: 'Instagram & TikTok',
                focus: 'Short-Form Viral Content',
                tactics: [
                    'Trend participation',
                    'Reels strategy',
                    'Cross-platform repurposing',
                    'Community engagement'
                ]
            },
            {
                name: 'Email & Newsletter',
                focus: 'Owned Audience',
                tactics: [
                    'Lead magnets',
                    'Weekly value-driven emails',
                    'Product launches',
                    'Exclusive content'
                ]
            },
            {
                name: 'Digital Products',
                focus: 'Revenue Diversification',
                tactics: [
                    'Online courses',
                    'Templates and resources',
                    'Membership community',
                    'Sponsored content'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Niche-specific interests',
                'Personal development',
                'Online learning',
                'Content consumption'
            ],
            behaviors: [
                'Video viewers',
                'Course purchasers',
                'Digital product buyers',
                'Community joiners'
            ],
            demographics: [
                'Age: 18-45',
                'Interests aligned with niche',
                'Digital-native',
                'Self-improvement focused'
            ],
            customAudiences: [
                'Video viewers (75%+)',
                'Profile visitors',
                'Email subscribers',
                'Past customers'
            ],
            lookalikes: [
                'Top fans',
                'Course purchasers',
                'High engagement followers'
            ]
        },
        roadmap: [
            {
                phase: 'Foundation (Months 1-2)',
                duration: '8 weeks',
                activities: [
                    'Define content pillars',
                    'Build content calendar',
                    'Set up monetization tools',
                    'Create lead magnet'
                ]
            },
            {
                phase: 'Growth (Months 3-5)',
                duration: '12 weeks',
                activities: [
                    'Consistent content publishing',
                    'Viral content experiments',
                    'Collaborations',
                    'Email list building'
                ]
            },
            {
                phase: 'Monetization (Months 6+)',
                duration: 'Ongoing',
                activities: [
                    'Digital product launch',
                    'Sponsored partnerships',
                    'Membership launch',
                    'Scale revenue streams'
                ]
            }
        ]
    },
    {
        id: 'healthcare-patient-acquisition',
        title: 'Healthcare Patient Acquisition',
        industry: 'Healthcare',
        companySize: 'Small-Mid Practice',
        targetGeo: 'Local + Regional',
        businessModel: 'B2C',
        icon: '🏥',
        objectives: [
            'Acquire 200 new patients per month',
            'Fill appointment calendar to 90% capacity',
            'Increase patient LTV by 40%',
            'Build 5-star online reputation'
        ],
        channels: [
            {
                name: 'Google Local Services Ads',
                focus: 'High-Intent Local Searches',
                tactics: [
                    'Google Guaranteed badge',
                    'Location-based targeting',
                    'Service-specific campaigns',
                    'Call tracking and optimization'
                ]
            },
            {
                name: 'Healthcare Directories',
                focus: 'Provider Listings',
                tactics: [
                    'Healthgrades optimization',
                    'Zocdoc premium placement',
                    'Vitals profile management',
                    'WebMD local listings'
                ]
            },
            {
                name: 'Facebook Health Awareness',
                focus: 'Education & Trust Building',
                tactics: [
                    'Health tips and education',
                    'Patient testimonials (HIPAA compliant)',
                    'Virtual consultation offers',
                    'Community health events'
                ]
            },
            {
                name: 'Patient Retention',
                focus: 'Lifetime Value',
                tactics: [
                    'Appointment reminders',
                    'Birthday and wellness emails',
                    'Referral incentive program',
                    'Telehealth options'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Health and wellness',
                'Medical care',
                'Family health',
                'Preventive care'
            ],
            behaviors: [
                'Healthcare seekers',
                'Insurance holders',
                'Active health researchers'
            ],
            demographics: [
                'Location: Practice area',
                'Age: Based on specialty',
                'Families with children',
                'Insured individuals'
            ],
            customAudiences: [
                'Current patients',
                'Website visitors',
                'Form starters',
                'Phone callers'
            ],
            lookalikes: [
                'Best patients',
                'High LTV patients',
                'Regular visitors'
            ]
        },
        roadmap: [
            {
                phase: 'Setup (Weeks 1-2)',
                duration: '2 weeks',
                activities: [
                    'HIPAA-compliant tracking',
                    'Directory listings',
                    'Review generation system',
                    'Online booking setup'
                ]
            },
            {
                phase: 'Launch (Weeks 3-8)',
                duration: '6 weeks',
                activities: [
                    'Local ad campaigns',
                    'Content marketing',
                    'Patient testimonials',
                    'Community outreach'
                ]
            },
            {
                phase: 'Optimize (Weeks 9-24)',
                duration: '16 weeks',
                activities: [
                    'Retention programs',
                    'Referral system',
                    'Reputation management',
                    'Service expansion'
                ]
            }
        ]
    },
    {
        id: 'nonprofit-fundraising',
        title: 'Nonprofit Fundraising Campaign',
        industry: 'Nonprofit',
        companySize: 'Any Size',
        targetGeo: 'Regional/National',
        businessModel: 'B2C',
        icon: '💝',
        objectives: [
            'Raise $500,000 in 90 days',
            'Acquire 2,000 new monthly donors',
            'Achieve 60% donor retention',
            'Build awareness for cause'
        ],
        channels: [
            {
                name: 'Meta (Facebook/Instagram) Non profit Ads',
                focus: 'Donor Acquisition & Awareness',
                tactics: [
                    'Facebook Fundraisers',
                    'Story-driven video ads',
                    'Donation button optimization',
                    'Impact storytelling'
                ]
            },
            {
                name: 'Email Fundraising',
                focus: 'Donor Nurture & Conversion',
                tactics: [
                    'Personal impact stories',
                    'Recurring donation promotion',
                    'Matching gift campaigns',
                    'Year-end appeals'
                ]
            },
            {
                name: 'Peer-to-Peer Fundraising',
                focus: 'Community Activation',
                tactics: [
                    'Ambassador programs',
                    'Fundraising events',
                    'Personal fundraising pages',
                    'Social fundraising challenges'
                ]
            },
            {
                name: 'Grant Writing & Major Donors',
                focus: 'Large Gifts',
                tactics: [
                    'Foundation research',
                    'Grant proposals',
                    'Major donor cultivation',
                    'Corporate partnerships'
                ]
            }
        ],
        metaTargeting: {
            interests: [
                'Charitable causes',
                'Social good',
                'Philanthropy',
                'Cause-specific interests'
            ],
            behaviors: [
                'Donors to charities',
                'Volunteers',
                'Socially conscious',
                'Community activists'
            ],
            demographics: [
                'Age: 35-70',
                'Income: $50,000+',
                'Education: College+',
                'Aligned with cause values'
            ],
            customAudiences: [
                'Past donors',
                'Event attendees',
                'Volunteers',
                'Email subscribers'
            ],
            lookalikes: [
                'High-value donors',
                'Monthly recurring donors',
                'Major gift prospects'
            ]
        },
        roadmap: [
            {
                phase: 'Planning (Weeks 1-2)',
                duration: '2 weeks',
                activities: [
                    'Set fundraising goals',
                    'Create campaign messaging',
                    'Build donation pages',
                    'Recruit ambassadors'
                ]
            },
            {
                phase: 'Launch (Weeks 3-6)',
                duration: '4 weeks',
                activities: [
                    'Kickoff event',
                    'Multi-channel campaigns',
                    'Story collection',
                    'Early donor engagement'
                ]
            },
            {
                phase: 'Push & Close (Weeks 7-12)',
                duration: '6 weeks',
                activities: [
                    'Mid-campaign push',
                    'Matching gift period',
                    'Final week urgency',
                    'Thank you stewardship'
                ]
            }
        ]
    }
];
