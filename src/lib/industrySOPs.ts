// Industry-Aware SOP Generation System

export const INDUSTRIES = [
    { id: 'saas', name: 'SaaS', icon: '💻', compliance: 'SOC2, GDPR' },
    { id: 'web3', name: 'Web3 / Blockchain', icon: '⛓️', compliance: 'SEC, AML/KYC' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', compliance: 'HIPAA, FDA' },
    { id: 'education', name: 'Education', icon: '🎓', compliance: 'FERPA, COPPA' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒', compliance: 'PCI-DSS, CCPA' },
    { id: 'fintech', name: 'Fintech', icon: '💳', compliance: 'PCI-DSS, SOX, GLBA' },
    { id: 'realestate', name: 'Real Estate', icon: '🏢', compliance: 'FHA, HUD' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', compliance: 'ISO 9001, OSHA' },
    { id: 'localbusiness', name: 'Local Business', icon: '🏪', compliance: 'Local permits' },
    { id: 'agency', name: 'Agency / Services', icon: '🎨', compliance: 'Client contracts' },
    { id: 'startup', name: 'Startup (Generic)', icon: '🚀', compliance: 'Lean compliance' }
];

export const SOP_CATEGORIES = [
    {
        id: 'operations',
        name: 'Operations SOP',
        icon: '⚙️',
        color: 'indigo',
        prompts: [
            {
                id: 'daily-ops',
                name: 'Daily Operations SOP',
                description: 'Daily task execution, escalation matrix, approval workflows',
                systemPrompt: `Create a comprehensive Daily Operations SOP for a [INDUSTRY] organization.

Structure the SOP with these mandatory sections:

1. SOP OVERVIEW
   - Purpose: Define the goal of daily operations
   - Scope: What this SOP covers
   - Applicable Teams: Who must follow this

2. ROLES & RESPONSIBILITIES
   - List each role involved
   - Define ownership and accountability
   - Clear delegation matrix

3. TOOLS & ACCESS
   - Software/platforms used
   - Required permissions and access levels
   - Login credentials management

4. STEP-BY-STEP PROCESS
   Daily operations workflow:
   Step 1: Morning setup and checklist
   Step 2: Task prioritization
   Step 3: Execution workflow
   Step 4: Escalation procedures
   Step 5: End-of-day procedures
   
   For each step, include:
   - Clear action items
   - Decision points
   - Time estimates
   - Responsible parties

5. QUALITY CHECKS
   - Review checkpoints
   - Approval process
   - Quality standards

6. KPIs & METRICS
   - Daily productivity metrics
   - Error rates
   - Completion times
   - Success indicators

7. COMMON ERRORS & FIXES
   - List 5-7 frequent mistakes
   - Root causes
   - Resolution steps
   - Prevention measures

8. REVISION HISTORY
   - Version: 1.0
   - Date: [Current Date]
   - Changes: Initial creation

Industry-specific adaptations for [INDUSTRY]:
- Use [INDUSTRY]-specific terminology
- Include [INDUSTRY]-relevant tools
- Reference [INDUSTRY] compliance requirements
- Adjust workflow complexity for [INDUSTRY] context

Format: Professional, actionable, no AI disclaimers.`
            },
            {
                id: 'inventory-mgmt',
                name: 'Inventory Management SOP',
                description: 'Stock tracking, ordering, quality control',
                systemPrompt: `Generate an Inventory Management SOP for [INDUSTRY] covering stock tracking, reordering, quality control, and supplier management with industry-specific tools and compliance.`
            },
            {
                id: 'vendor-mgmt',
                name: 'Vendor Management SOP',
                description: 'Vendor selection, contracts, performance tracking',
                systemPrompt: `Create a Vendor Management SOP for [INDUSTRY] including vendor selection criteria, contract negotiation, performance monitoring, and renewal processes.`
            }
        ]
    },
    {
        id: 'marketing',
        name: 'Marketing SOP',
        icon: '📈',
        color: 'teal',
        prompts: [
            {
                id: 'end-to-end-marketing',
                name: 'End-to-End Marketing SOP',
                description: 'Complete marketing workflow from planning to reporting',
                systemPrompt: `Create a complete Marketing SOP for a [INDUSTRY] business.

The SOP must be step-by-step, role-based, tool-driven, and KPI-oriented.

1. SOP OVERVIEW
   - Purpose: Streamline marketing execution
   - Scope: All marketing campaigns
   - Applicable Teams: Marketing, Content, Design

2. ROLES & RESPONSIBILITIES
   - Marketing Manager: Strategy & oversight
   - Content Creator: Asset production
   - Designer: Visual assets
   - Analyst: Performance tracking

3. TOOLS & ACCESS
   - [INDUSTRY]-specific marketing tools
   - Analytics platforms
   - Design software
   - Collaboration tools

4. STEP-BY-STEP PROCESS
   
   PHASE 1: Campaign Planning
   Step 1: Define campaign objectives
   Step 2: audience research and segmentation
   Step 3: Budget allocation
   Step 4: Timeline creation
   
   PHASE 2: Content Creation Workflow
   Step 1: Content brief development
   Step 2: Draft creation
   Step 3: Design asset production
   Step 4: Review and approval
   
   PHASE 3: Paid Ads Execution
   Step 1: Platform selection
   Step 2: Audience targeting setup
   Step 3: Ad creative upload
   Step 4: Budget configuration
   Step 5: Campaign launch
   
   PHASE 4: SEO & Organic Marketing
   Step 1: Keyword research
   Step 2: Content optimization
   Step 3: Link building
   Step 4: Technical SEO checks
   
   PHASE 5: Reporting & Review Cycle
   Step 1: Data collection
   Step 2: Performance analysis
   Step 3: Stakeholder reporting
   Step 4: Strategy adjustments

5. QUALITY CHECKS
   - Content approval workflow
   - Brand guideline compliance
   - Legal review (if needed)

6. KPIs & METRICS
   - Reach and impressions
   - Engagement rate
   - Conversion rate
   - ROI and ROAS
   - Cost per acquisition

7. COMMON ERRORS & FIXES
   Error 1: Misaligned messaging
   Fix: Use brand voice checklist
   
   Error 2: Poor targeting
   Fix: Audience validation process
   
   Error 3: Budget overspend
   Fix: Daily monitoring protocols

8. REVISION HISTORY
   - Version 1.0 - Initial SOP

Include [INDUSTRY]-specific:
- Channel priorities (e.g., LinkedIn for B2B SaaS, Instagram for E-commerce)
- Compliance requirements
- Industry benchmarks`
            },
            {
                id: 'content-calendar',
                name: 'Content Calendar Management SOP',
                description: 'Planning, scheduling, and publishing content',
                systemPrompt: `Build a Content Calendar Management SOP for [INDUSTRY] including editorial planning, approval workflows, scheduling, and performance tracking.`
            },
            {
                id: 'social-media',
                name: 'Social Media Management SOP',
                description: 'Daily posting, engagement, community management',
                systemPrompt: `Create a Social Media Management SOP for [INDUSTRY] with posting schedules, engagement protocols, crisis management, and analytics.`
            }
        ]
    },
    {
        id: 'sales',
        name: 'Sales SOP',
        icon: '💼',
        color: 'violet',
        prompts: [
            {
                id: 'sales-process',
                name: 'End-to-End Sales Process SOP',
                description: 'Lead qualification to deal closure',
                systemPrompt: `Generate a comprehensive Sales Process SOP for [INDUSTRY] covering lead qualification, discovery calls, demos, proposal creation, negotiation, and deal closure with role-specific actions.`
            },
            {
                id: 'lead-qualification',
                name: 'Lead Qualification SOP',
                description: 'Scoring, routing, and nurturing leads',
                systemPrompt: `Create a Lead Qualification SOP for [INDUSTRY] with scoring criteria, routing rules, nurture sequences, and handoff protocols to sales team.`
            },
            {
                id: 'deal-closing',
                name: 'Deal Closing & Handoff SOP',
                description: 'Contract negotiation to customer success handoff',
                systemPrompt: `Build a Deal Closing & Handoff SOP for [INDUSTRY] including contract finalization, payment processing, customer onboarding handoff, and documentation.`
            }
        ]
    },
    {
        id: 'hr',
        name: 'HR & Hiring SOP',
        icon: '👥',
        color: 'rose',
        prompts: [
            {
                id: 'hiring-onboarding',
                name: 'Hiring & Onboarding SOP',
                description: 'Complete recruitment and onboarding process',
                systemPrompt: `Create a Hiring & Employee Onboarding SOP tailored for [INDUSTRY] including:

1. SOP OVERVIEW
2. ROLES & RESPONSIBILITIES
3. TOOLS & ACCESS (ATS, HRIS, etc.)

4. STEP-BY-STEP PROCESS

PHASE 1: Job Requirement Creation
- Define role requirements
- Create job description
- Set compensation range
- Get approval

PHASE 2: Screening Process
- Resume review criteria
- Initial phone screen
- Skills assessment

PHASE 3: Interview Stages
- First round: Culture fit
- Second round: Technical assessment
- Final round: Leadership interview

PHASE 4: Offer & Documentation
- Offer letter preparation
- Background check
- Contract signing

PHASE 5: Onboarding (30-60-90 Days)
- Day 1: Welcome and setup
- Week 1: Systems training
- Month 1: Role-specific training
- Month 2: Project involvement
- Month 3: Performance check-in

5. QUALITY CHECKS
6. KPIs (Time to hire, quality of hire, retention)
7. COMMON ERRORS & FIXES
8. REVISION HISTORY

[INDUSTRY]-specific adaptations for compliance and team structure.`
            },
            {
                id: 'performance-review',
                name: 'Performance Review SOP',
                description: 'Annual/quarterly review process',
                systemPrompt: `Generate a Performance Review SOP for [INDUSTRY] with goal setting, feedback collection, review meetings, and development planning.`
            },
            {
                id: 'offboarding',
                name: 'Employee Offboarding SOP',
                description: 'Exit process and knowledge transfer',
                systemPrompt: `Create an Employee Offboarding SOP for [INDUSTRY] covering resignation handling, knowledge transfer, asset return, access revocation, and exit interviews.`
            }
        ]
    },
    {
        id: 'support',
        name: 'Customer Support SOP',
        icon: '🎧',
        color: 'amber',
        prompts: [
            {
                id: 'ticket-resolution',
                name: 'Ticket Resolution SOP',
                description: 'From ticket creation to resolution',
                systemPrompt: `Build a Ticket Resolution SOP for [INDUSTRY] customer support with ticket categorization, priority levels, SLA targets, escalation paths, and resolution tracking.`
            },
            {
                id: 'escalation-management',
                name: 'Escalation Management SOP',
                description: 'Handling complex customer issues',
                systemPrompt: `Create an Escalation Management SOP for [INDUSTRY] defining escalation triggers, escalation paths, stakeholder communication, and resolution protocols.`
            },
            {
                id: 'customer-feedback',
                name: 'Customer Feedback Collection SOP',
                description: 'Surveys, reviews, and feedback loop',
                systemPrompt: `Generate a Customer Feedback Collection SOP for [INDUSTRY] with survey design, distribution timing, analysis methods, and action planning.`
            }
        ]
    },
    {
        id: 'finance',
        name: 'Finance & Compliance SOP',
        icon: '💰',
        color: 'emerald',
        prompts: [
            {
                id: 'expense-approval',
                name: 'Expense Approval SOP',
                description: 'Expense submission and approval workflow',
                systemPrompt: `Create an Expense Approval SOP for [INDUSTRY] with submission guidelines, approval hierarchies, reimbursement timelines, and audit trails.`
            },
            {
                id: 'invoice-processing',
                name: 'Invoice Processing SOP',
                description: 'Accounts payable workflow',
                systemPrompt: `Build an Invoice Processing SOP for [INDUSTRY] covering invoice receipt, verification, approval routing, payment processing, and record-keeping.`
            },
            {
                id: 'financial-reporting',
                name: 'Financial Reporting SOP',
                description: 'Monthly/quarterly financial close',
                systemPrompt: `Generate a Financial Reporting SOP for [INDUSTRY] with month-end close procedures, reconciliation steps, report generation, and stakeholder distribution including compliance requirements.`
            }
        ]
    },
    {
        id: 'it',
        name: 'IT / Security SOP',
        icon: '🔒',
        color: 'cyan',
        prompts: [
            {
                id: 'incident-response',
                name: 'Security Incident Response SOP',
                description: 'Detecting and responding to security incidents',
                systemPrompt: `Create a Security Incident Response SOP for [INDUSTRY] with detection protocols, containment steps, investigation procedures, remediation actions, and post-incident review.`
            },
            {
                id: 'access-management',
                name: 'Access Management SOP',
                description: 'User provisioning and deprovisioning',
                systemPrompt: `Build an Access Management SOP for [INDUSTRY] covering user account creation, permission assignment, access reviews, and deactivation procedures with security best practices.`
            },
            {
                id: 'data-backup',
                name: 'Data Backup & Recovery SOP',
                description: 'Regular backups and disaster recovery',
                systemPrompt: `Generate a Data Backup & Recovery SOP for [INDUSTRY] with backup schedules, storage locations, testing procedures, and disaster recovery protocols.`
            }
        ]
    },
    {
        id: 'startup',
        name: 'Startup / MVP SOP',
        icon: '🚀',
        color: 'pink',
        prompts: [
            {
                id: 'mvp-launch',
                name: 'MVP Launch SOP',
                description: 'From idea to first customer',
                systemPrompt: `Create an MVP Launch SOP for [INDUSTRY] startups with lean methodology, rapid iteration, customer validation, feedback loops, and pivot decision-making.`
            },
            {
                id: 'product-iteration',
                name: 'Product Iteration SOP',
                description: 'Feature development and deployment',
                systemPrompt: `Build a Product Iteration SOP for [INDUSTRY] startups covering feature prioritization, sprint planning, development, testing, and deployment with founder approval workflows.`
            },
            {
                id: 'fundraising-prep',
                name: 'Fundraising Preparation SOP',
                description: 'Pitch deck, data room, investor outreach',
                systemPrompt: `Generate a Fundraising Preparation SOP for [INDUSTRY] startups including data room setup, financial projections, pitch deck creation, and investor outreach strategy.`
            }
        ]
    }
];

export const INDUSTRY_ADAPTATIONS = {
    saas: {
        terminology: ['User', 'Subscription', 'Churn', 'MRR', 'ARR', 'Trial'],
        tools: ['Stripe', 'Intercom', 'HubSpot', 'Mixpanel', 'Segment'],
        compliance: 'SOC2, GDPR compliance required',
        teamRoles: ['Product Manager', 'Engineer', 'Customer Success'],
        workflowComplexity: 'High - Fast-paced iteration',
        documentation: 'Living documentation, frequent updates'
    },
    web3: {
        terminology: ['Wallet', 'Smart Contract', 'Gas Fees', 'DAO', 'Token'],
        tools: ['MetaMask', 'Etherscan', 'Discord', 'Snapshot'],
        compliance: 'SEC regulations, AML/KYC protocols',
        teamRoles: ['Blockchain Developer', 'Community Manager', 'Tokenomics Lead'],
        workflowComplexity: 'Very High - Decentralized coordination',
        documentation: 'On-chain documentation, transparency-first'
    },
    healthcare: {
        terminology: ['Patient', 'EHR', 'PHI', 'Clinical Trial', 'Diagnosis'],
        tools: ['EPIC', 'Cerner', 'Meditech', 'Athenahealth'],
        compliance: 'HIPAA mandatory, FDA approval for devices',
        teamRoles: ['Physician', 'Nurse', 'Compliance Officer', 'Patient Coordinator'],
        workflowComplexity: 'Very High - Patient safety critical',
        documentation: 'Extensive documentation, audit trails mandatory'
    },
    education: {
        terminology: ['Student', 'Curriculum', 'LMS', 'Assessment', 'Enrollment'],
        tools: ['Canvas', 'Blackboard', 'Google Classroom', 'Zoom'],
        compliance: 'FERPA, COPPA for student data',
        teamRoles: ['Instructor', 'Administrator', 'Registrar', 'Counselor'],
        workflowComplexity: 'Medium - Academic calendar driven',
        documentation: 'Structured, semester-based updates'
    },
    ecommerce: {
        terminology: ['SKU', 'Cart', 'Checkout', 'Fulfillment', 'Returns'],
        tools: ['Shopify', 'WooCommerce', 'ShipStation', 'Klaviyo'],
        compliance: 'PCI-DSS for payments, CCPA for data',
        teamRoles: ['Operations Manager', 'Logistics Coordinator', 'Customer Service'],
        workflowComplexity: 'High - Inventory and logistics focus',
        documentation: 'Process-driven, seasonal adjustments'
    },
    fintech: {
        terminology: ['Transaction', 'KYC', 'Fraud Detection', 'Settlement', 'Compliance'],
        tools: ['Plaid', 'Stripe', 'Jumio', 'Chainalysis'],
        compliance: 'PCI-DSS, SOX, GLBA, banking regulations',
        teamRoles: ['Compliance Officer', 'Risk Analyst', 'Product Manager'],
        workflowComplexity: 'Very High - Regulatory heavy',
        documentation: 'Exhaustive, audit-ready at all times'
    },
    realestate: {
        terminology: ['Listing', 'Escrow', 'Closing', 'Commission', 'Property'],
        tools: ['MLS', 'Zillow', 'DocuSign', 'Dotloop'],
        compliance: 'FHA, HUD, local real estate laws',
        teamRoles: ['Agent', 'Broker', 'Escrow Officer', 'Appraiser'],
        workflowComplexity: 'Medium - Transaction lifecycle',
        documentation: 'Contract-heavy, legal compliance'
    },
    manufacturing: {
        terminology: ['Production', 'Assembly Line', 'Quality Control', 'Inventory', 'SKU'],
        tools: ['ERP Systems', 'MES', 'SCADA', 'SAP'],
        compliance: 'ISO 9001, OSHA safety standards',
        teamRoles: ['Production Manager', 'QA Inspector', 'Supply Chain Coordinator'],
        workflowComplexity: 'High - Production optimization',
        documentation: 'Technical specifications, safety protocols'
    },
    localbusiness: {
        terminology: ['Customer', 'Service', 'Appointment', 'Invoice', 'Receipt'],
        tools: ['Square', 'QuickBooks', 'Calendly', 'Mailchimp'],
        compliance: 'Local business permits, health codes (if applicable)',
        teamRoles: ['Owner', 'Manager', 'Employee', 'Contractor'],
        workflowComplexity: 'Low - Streamlined operations',
        documentation: 'Simple, practical, easy-to-follow'
    },
    agency: {
        terminology: ['Client', 'Deliverable', 'Retainer', 'Scope', 'Milestone'],
        tools: ['Asana', 'Figma', 'Slack', 'Harvest', 'Notion'],
        compliance: 'Client contracts, NDAs, IP agreements',
        teamRoles: ['Account Manager', 'Creative Director', 'Designer', 'Developer'],
        workflowComplexity: 'Medium - Client-driven timelines',
        documentation: 'Project-based, client-facing deliverables'
    },
    startup: {
        terminology: ['MVP', 'Pivot', 'Runway', 'Product-Market Fit', 'Growth'],
        tools: ['Notion', 'Linear', 'Figma', 'Vercel', 'PostHog'],
        compliance: 'Lean compliance, foundational legal setup',
        teamRoles: ['Founder', 'Engineer', 'Designer', 'Generalist'],
        workflowComplexity: 'Variable - Rapid experimentation',
        documentation: 'Minimal, agile, iteration-focused'
    }
};
