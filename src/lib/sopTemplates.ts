// Advanced SOP Templates Library
// Comprehensive templates for various industries and departments

export interface SOPTemplate {
    id: string;
    name: string;
    category: string;
    industry: string[];
    icon: string;
    description: string;
    estimatedPhases: number;

    // Template structure guidelines
    structure: {
        phases: PhaseTemplate[];
        defaultSections: string[];
    };

    // Customization parameters
    parameters: TemplateParameter[];
}

export interface PhaseTemplate {
    title: string;
    emoji: string;
    objective: string;
    hasTables?: boolean;
    hasChecklists?: boolean;
    subsections: string[];
}

export interface TemplateParameter {
    id: string;
    label: string;
    type: 'text' | 'select' | 'multiselect' | 'number' | 'textarea';
    required: boolean;
    options?: { value: string; label: string }[];
    placeholder?: string;
    defaultValue?: any;
}

// ============================================================================
// TEMPLATE DEFINITIONS
// ============================================================================

export const SOP_TEMPLATES: SOPTemplate[] = [
    // ------------------------------------------------------------------------
    // 1. SOCIAL MEDIA MANAGEMENT
    // ------------------------------------------------------------------------
    {
        id: 'social-media-management',
        name: 'Social Media Management',
        category: 'Marketing',
        industry: ['Marketing Agency', 'SaaS', 'E-commerce', 'Startup'],
        icon: '📱',
        description: 'End-to-end social media operations from client discovery to performance optimization',
        estimatedPhases: 10,

        structure: {
            phases: [
                {
                    title: 'Client Discovery & Requirement Understanding',
                    emoji: '🔹',
                    objective: 'Align the team with the client\'s business DNA and KPIs',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Business Overview', 'Objectives', 'Platform Priority', 'Brand Voice', 'Success Metrics']
                },
                {
                    title: 'Data Collection & Brand Research',
                    emoji: '🔹',
                    objective: 'Internalize existing assets to ensure brand continuity',
                    hasChecklists: false,
                    subsections: ['Asset Audit', 'Identity Extraction', 'Gap Analysis']
                },
                {
                    title: 'Competitive & Market Analysis',
                    emoji: '🔹',
                    objective: 'Identify "What Works" in the niche to skip the trial-and-error phase',
                    hasChecklists: false,
                    subsections: ['Selection', 'The Breakdown', 'The Gap Opportunity']
                },
                {
                    title: 'Brand & Content Pillars',
                    emoji: '🔹',
                    objective: 'Create a sustainable content ecosystem',
                    hasTables: true,
                    subsections: ['The Pillar Framework', 'Validation Rule']
                },
                {
                    title: 'Content Strategy Development',
                    emoji: '🔹',
                    objective: 'Translate pillars into platform-specific execution',
                    hasChecklists: false,
                    subsections: ['Format Mix', 'Hook Strategy', 'CTA Logic']
                },
                {
                    title: 'The Collaborative Production Pipeline',
                    emoji: '🔹',
                    objective: 'Streamline the transition from strategy to execution through a tiered hand-off system',
                    hasTables: true,
                    subsections: ['Strategy & Inspiration', 'Calendar Co-Creation']
                },
                {
                    title: 'Execution & Creative Design',
                    emoji: '🔹',
                    objective: 'Transforming the calendar into high-performing assets',
                    hasTables: true,
                    subsections: ['Content Drafting', 'Creative Visual Production']
                },
                {
                    title: 'Account Setup & Initial Growth',
                    emoji: '🔹',
                    objective: 'Optimize the "Storefront" and drive ethical traffic',
                    hasChecklists: true,
                    subsections: ['The Bio', 'Optimization', 'Growth', 'Strict Rule']
                },
                {
                    title: 'Publishing & Daily Engagement',
                    emoji: '🔹',
                    objective: 'Flawless execution and community nurturing',
                    hasChecklists: false,
                    subsections: ['Publishing', 'The Golden Hour', 'Stories']
                },
                {
                    title: 'Performance & Optimization',
                    emoji: '🔹',
                    objective: 'Turn data into better content',
                    hasChecklists: false,
                    subsections: ['Weekly Audit', 'The Pivot', 'Scaling']
                }
            ],
            defaultSections: [
                'Overview',
                'Objectives',
                'Requirements',
                'Procedures',
                'Checklists',
                'Responsibilities'
            ]
        },

        parameters: [
            {
                id: 'clientType',
                label: 'Client Type',
                type: 'select',
                required: true,
                options: [
                    { value: 'b2b', label: 'B2B' },
                    { value: 'b2c', label: 'B2C' },
                    { value: 'd2c', label: 'D2C' }
                ]
            },
            {
                id: 'platforms',
                label: 'Primary Platforms',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'instagram', label: 'Instagram' },
                    { value: 'facebook', label: 'Facebook' },
                    { value: 'twitter', label: 'Twitter/X' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'tiktok', label: 'TikTok' },
                    { value: 'youtube', label: 'YouTube' }
                ]
            },
            {
                id: 'teamSize',
                label: 'Team Size',
                type: 'select',
                required: true,
                options: [
                    { value: '1-5', label: '1-5 people' },
                    { value: '6-10', label: '6-10 people' },
                    { value: '11-20', label: '11-20 people' },
                    { value: '20+', label: '20+ people' }
                ]
            },
            {
                id: 'objectives',
                label: 'Primary Objectives',
                type: 'textarea',
                required: true,
                placeholder: 'e.g., Brand awareness, Lead generation, Community building'
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 2. SALES OPERATIONS
    // ------------------------------------------------------------------------
    {
        id: 'sales-operations',
        name: 'Sales Operations',
        category: 'Sales',
        industry: ['SaaS', 'B2B Services', 'Enterprise', 'Startup'],
        icon: '🎯',
        description: 'Complete sales process from lead qualification to closing and post-sale operations',
        estimatedPhases: 8,

        structure: {
            phases: [
                {
                    title: 'Lead Generation & Qualification',
                    emoji: '🔹',
                    objective: 'Build a consistent pipeline of qualified leads',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Lead Sources', 'Qualification Criteria', 'Scoring System']
                },
                {
                    title: 'Initial Contact & Discovery',
                    emoji: '🔹',
                    objective: 'Establish rapport and uncover client needs',
                    hasTables: false,
                    hasChecklists: true,
                    subsections: ['First Contact Protocol', 'Discovery Questions', 'Pain Point Identification']
                },
                {
                    title: 'Needs Analysis & Solution Mapping',
                    emoji: '🔹',
                    objective: 'Align product capabilities with client requirements',
                    hasTables: true,
                    subsections: ['Requirements Gathering', 'Solution Architecture', 'Value Proposition']
                },
                {
                    title: 'Proposal Development',
                    emoji: '🔹',
                    objective: 'Create compelling, customized proposals',
                    hasChecklists: true,
                    subsections: ['Proposal Structure', 'Pricing Strategy', 'ROI Calculation']
                },
                {
                    title: 'Presentation & Demo',
                    emoji: '🔹',
                    objective: 'Showcase value and handle objections effectively',
                    hasTables: false,
                    hasChecklists: true,
                    subsections: ['Demo Script', 'Objection Handling', 'Success Stories']
                },
                {
                    title: 'Negotiation & Closing',
                    emoji: '🔹',
                    objective: 'Navigate negotiations and secure commitment',
                    hasTables: true,
                    subsections: ['Negotiation Framework', 'Closing Techniques', 'Contract Finalization']
                },
                {
                    title: 'Onboarding & Handoff',
                    emoji: '🔹',
                    objective: 'Ensure smooth transition to delivery team',
                    hasChecklists: true,
                    subsections: ['Client Onboarding', 'Internal Handoff', 'Success Metrics']
                },
                {
                    title: 'Post-Sale Operations & Expansion',
                    emoji: '🔹',
                    objective: 'Nurture relationships and identify upsell opportunities',
                    hasTables: false,
                    subsections: ['Account Management', 'Upsell Strategy', 'Referral Program']
                }
            ],
            defaultSections: ['Overview', 'Objectives', 'Process', 'Tools', 'Metrics']
        },

        parameters: [
            {
                id: 'salesModel',
                label: 'Sales Model',
                type: 'select',
                required: true,
                options: [
                    { value: 'inbound', label: 'Inbound Sales' },
                    { value: 'outbound', label: 'Outbound Sales' },
                    { value: 'hybrid', label: 'Hybrid' }
                ]
            },
            {
                id: 'dealSize',
                label: 'Average Deal Size',
                type: 'select',
                required: true,
                options: [
                    { value: 'smb', label: 'SMB ($1K-$10K)' },
                    { value: 'mid-market', label: 'Mid-Market ($10K-$100K)' },
                    { value: 'enterprise', label: 'Enterprise ($100K+)' }
                ]
            },
            {
                id: 'salesCycle',
                label: 'Typical Sales Cycle Length',
                type: 'select',
                required: true,
                options: [
                    { value: '1-30', label: '1-30 days' },
                    { value: '31-90', label: '31-90 days' },
                    { value: '91-180', label: '91-180 days' },
                    { value: '180+', label: '180+ days' }
                ]
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 3. CUSTOMER SUPPORT
    // ------------------------------------------------------------------------
    {
        id: 'customer-support',
        name: 'Customer Support Operations',
        category: 'Support',
        industry: ['SaaS', 'E-commerce', 'Technology', 'Services'],
        icon: '💬',
        description: 'Comprehensive customer support workflow from ticket intake to resolution and quality assurance',
        estimatedPhases: 7,

        structure: {
            phases: [
                {
                    title: 'Ticket Intake & Categorization',
                    emoji: '🔹',
                    objective: 'Efficiently capture and classify customer issues',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Intake Channels', 'Categorization System', 'Priority Matrix']
                },
                {
                    title: 'Initial Response & Acknowledgment',
                    emoji: '🔹',
                    objective: 'Provide timely acknowledgment and set expectations',
                    hasTables: true,
                    hasChecklists: false,
                    subsections: ['Response Time SLAs', 'Templates', 'Tone Guidelines']
                },
                {
                    title: 'Investigation & Diagnosis',
                    emoji: '🔹',
                    objective: 'Accurately identify root causes and potential solutions',
                    hasChecklists: true,
                    subsections: ['Troubleshooting Framework', 'Knowledge Base Usage', 'Escalation Triggers']
                },
                {
                    title: 'Resolution & Communication',
                    emoji: '🔹',
                    objective: 'Deliver effective solutions with clear communication',
                    hasTables: false,
                    subsections: ['Resolution Strategies', 'Communication Protocol', 'Follow-up Procedures']
                },
                {
                    title: 'Escalation Management',
                    emoji: '🔹',
                    objective: 'Handle complex issues through proper escalation channels',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Escalation Criteria', 'Escalation Path', 'Handoff Procedures']
                },
                {
                    title: 'Quality Assurance & Feedback',
                    emoji: '🔹',
                    objective: 'Ensure consistent service quality and gather insights',
                    hasTables: true,
                    subsections: ['QA Process', 'Customer Satisfaction Surveys', 'Performance Metrics']
                },
                {
                    title: 'Knowledge Base & Continuous Improvement',
                    emoji: '🔹',
                    objective: 'Build institutional knowledge and optimize processes',
                    hasChecklists: true,
                    subsections: ['Documentation Standards', 'Process Optimization', 'Training Programs']
                }
            ],
            defaultSections: ['Overview', 'SLAs', 'Procedures', 'Escalation', 'Metrics']
        },

        parameters: [
            {
                id: 'supportChannels',
                label: 'Support Channels',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'email', label: 'Email' },
                    { value: 'chat', label: 'Live Chat' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'social', label: 'Social Media' },
                    { value: 'ticket', label: 'Ticket System' }
                ]
            },
            {
                id: 'supportHours',
                label: 'Support Hours',
                type: 'select',
                required: true,
                options: [
                    { value: 'business', label: 'Business Hours (9-5)' },
                    { value: 'extended', label: 'Extended (7am-10pm)' },
                    { value: '24/7', label: '24/7 Support' }
                ]
            },
            {
                id: 'ticketVolume',
                label: 'Monthly Ticket Volume',
                type: 'select',
                required: true,
                options: [
                    { value: 'low', label: 'Low (1-100)' },
                    { value: 'medium', label: 'Medium (101-500)' },
                    { value: 'high', label: 'High (501-2000)' },
                    { value: 'enterprise', label: 'Enterprise (2000+)' }
                ]
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 4. WEB DEVELOPMENT PROJECT
    // ------------------------------------------------------------------------
    {
        id: 'web-development',
        name: 'Web Development Project',
        category: 'Technology',
        industry: ['Agency', 'Startup', 'Software Development'],
        icon: '💻',
        description: 'Full web development lifecycle from discovery to deployment and maintenance',
        estimatedPhases: 9,

        structure: {
            phases: [
                {
                    title: 'Project Discovery & Requirements',
                    emoji: '🔹',
                    objective: 'Define project scope, goals, and technical requirements',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Stakeholder Interviews', 'Functional Requirements', 'Technical Constraints', 'Success Criteria']
                },
                {
                    title: 'Design & Wireframing',
                    emoji: '🔹',
                    objective: 'Create user-centered designs and information architecture',
                    hasChecklists: true,
                    subsections: ['User Research', 'Wireframes', 'Design System', 'Prototype']
                },
                {
                    title: 'Technical Architecture',
                    emoji: '🔹',
                    objective: 'Define system architecture and technology stack',
                    hasTables: true,
                    subsections: ['Stack Selection', 'Database Design', 'API Architecture', 'Infrastructure Planning']
                },
                {
                    title: 'Development Sprint Planning',
                    emoji: '🔹',
                    objective: 'Break down work into manageable sprints',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Sprint Structure', 'User Stories', 'Task Breakdown', 'Resource Allocation']
                },
                {
                    title: 'Frontend Development',
                    emoji: '🔹',
                    objective: 'Build responsive, accessible user interfaces',
                    hasChecklists: true,
                    subsections: ['Component Development', 'Responsive Design', 'Accessibility', 'Performance Optimization']
                },
                {
                    title: 'Backend Development',
                    emoji: '🔹',
                    objective: 'Implement server-side logic and data management',
                    hasChecklists: true,
                    subsections: ['API Development', 'Database Implementation', 'Authentication', 'Business Logic']
                },
                {
                    title: 'Testing & Quality Assurance',
                    emoji: '🔹',
                    objective: 'Ensure reliability, security, and performance',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Unit Testing', 'Integration Testing', 'User Acceptance Testing', 'Security Audit']
                },
                {
                    title: 'Deployment & Launch',
                    emoji: '🔹',
                    objective: 'Deploy to production and ensure smooth launch',
                    hasChecklists: true,
                    subsections: ['Environment Setup', 'Deployment Pipeline', 'Launch Checklist', 'Monitoring Setup']
                },
                {
                    title: 'Maintenance & Support',
                    emoji: '🔹',
                    objective: 'Provide ongoing support and iterative improvements',
                    hasTables: false,
                    subsections: ['Monitoring', 'Bug Fixes', 'Feature Requests', 'Performance Optimization']
                }
            ],
            defaultSections: ['Overview', 'Requirements', 'Timeline', 'Deliverables', 'Tools']
        },

        parameters: [
            {
                id: 'projectType',
                label: 'Project Type',
                type: 'select',
                required: true,
                options: [
                    { value: 'website', label: 'Marketing Website' },
                    { value: 'webapp', label: 'Web Application' },
                    { value: 'ecommerce', label: 'E-commerce Platform' },
                    { value: 'portal', label: 'Customer Portal' },
                    { value: 'saas', label: 'SaaS Product' }
                ]
            },
            {
                id: 'complexity',
                label: 'Project Complexity',
                type: 'select',
                required: true,
                options: [
                    { value: 'simple', label: 'Simple (Landing Page, Blog)' },
                    { value: 'medium', label: 'Medium (Multi-page, Basic Features)' },
                    { value: 'complex', label: 'Complex (Custom Features, Integrations)' },
                    { value: 'enterprise', label: 'Enterprise (Advanced, Scalable)' }
                ]
            },
            {
                id: 'timeline',
                label: 'Project Timeline',
                type: 'select',
                required: true,
                options: [
                    { value: '1-4', label: '1-4 weeks' },
                    { value: '1-3', label: '1-3 months' },
                    { value: '3-6', label: '3-6 months' },
                    { value: '6+', label: '6+ months' }
                ]
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 5. CONTENT PRODUCTION
    // ------------------------------------------------------------------------
    {
        id: 'content-production',
        name: 'Content Production Pipeline',
        category: 'Marketing',
        industry: ['Content Agency', 'Marketing', 'Media', 'Publishing'],
        icon: '✍️',
        description: 'End-to-end content creation workflow from ideation to publication and promotion',
        estimatedPhases: 8,

        structure: {
            phases: [
                {
                    title: 'Content Strategy & Planning',
                    emoji: '🔹',
                    objective: 'Define content themes, audience, and editorial calendar',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Audience Research', 'Content Pillars', 'Editorial Calendar', 'KPI Definition']
                },
                {
                    title: 'Ideation & Topic Research',
                    emoji: '🔹',
                    objective: 'Generate compelling topics backed by research',
                    hasChecklists: true,
                    subsections: ['Brainstorming Sessions', 'Keyword Research', 'Competitor Analysis', 'Topic Validation']
                },
                {
                    title: 'Content Briefs & Outlining',
                    emoji: '🔹',
                    objective: 'Create detailed briefs for content creators',
                    hasTables: true,
                    subsections: ['Brief Template', 'SEO Requirements', 'Tone Guidelines', 'Source Requirements']
                },
                {
                    title: 'Content Creation',
                    emoji: '🔹',
                    objective: 'Produce high-quality, engaging content',
                    hasChecklists: true,
                    subsections: ['Writing Process', 'Design Assets', 'Multimedia Integration', 'Brand Consistency']
                },
                {
                    title: 'Editing & Quality Control',
                    emoji: '🔹',
                    objective: 'Ensure content meets quality standards',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Editorial Review', 'Fact-Checking', 'SEO Optimization', 'Brand Compliance']
                },
                {
                    title: 'Approval & Finalization',
                    emoji: '🔹',
                    objective: 'Obtain stakeholder approval and finalize content',
                    hasChecklists: true,
                    subsections: ['Review Process', 'Feedback Integration', 'Final Approval', 'Publishing Preparation']
                },
                {
                    title: 'Publication & Distribution',
                    emoji: '🔹',
                    objective: 'Publish and distribute content across channels',
                    hasTables: true,
                    subsections: ['Publishing Checklist', 'Cross-Platform Distribution', 'Email Promotion', 'Social Sharing']
                },
                {
                    title: 'Performance Tracking & Optimization',
                    emoji: '🔹',
                    objective: 'Monitor performance and iterate for improvement',
                    hasTables: true,
                    subsections: ['Analytics Setup', 'Performance Metrics', 'Content Audits', 'Optimization Strategy']
                }
            ],
            defaultSections: ['Overview', 'Workflow', 'Guidelines', 'Tools', 'Metrics']
        },

        parameters: [
            {
                id: 'contentTypes',
                label: 'Content Types',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'blog', label: 'Blog Posts' },
                    { value: 'video', label: 'Video Content' },
                    { value: 'social', label: 'Social Media' },
                    { value: 'email', label: 'Email Newsletters' },
                    { value: 'ebook', label: 'eBooks/Whitepapers' },
                    { value: 'podcast', label: 'Podcasts' }
                ]
            },
            {
                id: 'frequency',
                label: 'Publishing Frequency',
                type: 'select',
                required: true,
                options: [
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'biweekly', label: 'Bi-weekly' },
                    { value: 'monthly', label: 'Monthly' }
                ]
            },
            {
                id: 'teamStructure',
                label: 'Team Structure',
                type: 'select',
                required: true,
                options: [
                    { value: 'solo', label: 'Solo Creator' },
                    { value: 'small', label: 'Small Team (2-5)' },
                    { value: 'medium', label: 'Medium Team (6-15)' },
                    { value: 'large', label: 'Large Team (15+)' }
                ]
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 6. HR ONBOARDING
    // ------------------------------------------------------------------------
    {
        id: 'hr-onboarding',
        name: 'Employee Onboarding',
        category: 'Human Resources',
        industry: ['All Industries'],
        icon: '👥',
        description: 'Comprehensive employee onboarding process from pre-arrival to 90-day integration',
        estimatedPhases: 7,

        structure: {
            phases: [
                {
                    title: 'Pre-Arrival Preparation',
                    emoji: '🔹',
                    objective: 'Ensure everything is ready before the employee\'s first day',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Documentation', 'Equipment Setup', 'Access Credentials', 'Team Notifications']
                },
                {
                    title: 'First Day Orientation',
                    emoji: '🔹',
                    objective: 'Create a welcoming first-day experience',
                    hasChecklists: true,
                    subsections: ['Welcome & Introduction', 'Office Tour', 'Company Overview', 'HR Paperwork']
                },
                {
                    title: 'Week One - Foundation',
                    emoji: '🔹',
                    objective: 'Establish foundational knowledge and relationships',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Team Introductions', 'System Training', 'Company Culture', 'Initial Tasks']
                },
                {
                    title: 'First Month - Role Integration',
                    emoji: '🔹',
                    objective: 'Deep dive into role responsibilities and workflows',
                    hasChecklists: true,
                    subsections: ['Role Training', 'Project Assignment', 'Mentor Program', 'Check-in Meetings']
                },
                {
                    title: 'Day 30 Review',
                    emoji: '🔹',
                    objective: 'Assess progress and address any concerns',
                    hasTables: true,
                    subsections: ['Performance Review', 'Feedback Session', 'Goal Setting', 'Development Plan']
                },
                {
                    title: 'Day 60 - Skill Development',
                    emoji: '🔹',
                    objective: 'Expand capabilities and increase autonomy',
                    hasChecklists: true,
                    subsections: ['Advanced Training', 'Ownership Transfer', 'Cross-functional Exposure', 'Progress Assessment']
                },
                {
                    title: 'Day 90 - Full Integration',
                    emoji: '🔹',
                    objective: 'Complete onboarding and transition to regular operations',
                    hasTables: true,
                    hasChecklists: true,
                    subsections: ['Final Assessment', 'Feedback Collection', 'Career Path Discussion', 'Onboarding Completion']
                }
            ],
            defaultSections: ['Overview', 'Timeline', 'Responsibilities', 'Resources', 'Checkpoints']
        },

        parameters: [
            {
                id: 'employeeLevel',
                label: 'Employee Level',
                type: 'select',
                required: true,
                options: [
                    { value: 'entry', label: 'Entry Level' },
                    { value: 'mid', label: 'Mid Level' },
                    { value: 'senior', label: 'Senior Level' },
                    { value: 'executive', label: 'Executive' }
                ]
            },
            {
                id: 'department',
                label: 'Department',
                type: 'select',
                required: true,
                options: [
                    { value: 'engineering', label: 'Engineering' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'support', label: 'Customer Support' },
                    { value: 'hr', label: 'Human Resources' },
                    { value: 'finance', label: 'Finance' }
                ]
            },
            {
                id: 'workMode',
                label: 'Work Mode',
                type: 'select',
                required: true,
                options: [
                    { value: 'onsite', label: 'On-site' },
                    { value: 'remote', label: 'Remote' },
                    { value: 'hybrid', label: 'Hybrid' }
                ]
            }
        ]
    }
];

// Helper function to get template by ID
export function getTemplateById(id: string): SOPTemplate | undefined {
    return SOP_TEMPLATES.find(template => template.id === id);
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): SOPTemplate[] {
    return SOP_TEMPLATES.filter(template => template.category === category);
}

// Helper function to get templates by industry
export function getTemplatesByIndustry(industry: string): SOPTemplate[] {
    return SOP_TEMPLATES.filter(template => template.industry.includes(industry));
}

// Export all template IDs
export const TEMPLATE_IDS = SOP_TEMPLATES.map(t => t.id);
