// Industry sub-types for granular targeting
export const INDUSTRY_SUBTYPES: Record<string, Array<{ id: string, name: string, icon: string }>> = {
    saas: [
        { id: 'crm', name: 'CRM Software', icon: '👥' },
        { id: 'project-mgmt', name: 'Project Management', icon: '📋' },
        { id: 'marketing-automation', name: 'Marketing Automation', icon: '📧' },
        { id: 'analytics', name: 'Analytics Platform', icon: '📊' },
        { id: 'collaboration', name: 'Team Collaboration', icon: '💬' },
        { id: 'dev-tools', name: 'Developer Tools', icon: '⚙️' }
    ],
    web3: [
        { id: 'defi', name: 'DeFi Protocol', icon: '💰' },
        { id: 'nft', name: 'NFT Platform', icon: '🎨' },
        { id: 'dao', name: 'DAO/Governance', icon: '🗳️' },
        { id: 'dex', name: 'Decentralized Exchange', icon: '🔄' },
        { id: 'gaming', name: 'Blockchain Gaming', icon: '🎮' }
    ],
    healthcare: [
        { id: 'hospital', name: 'Hospital/Clinic', icon: '🏥' },
        { id: 'telemedicine', name: 'Telemedicine', icon: '📱' },
        { id: 'medical-devices', name: 'Medical Devices', icon: '🩺' },
        { id: 'pharma', name: 'Pharmaceutical', icon: '💊' },
        { id: 'diagnostics', name: 'Diagnostics Lab', icon: '🔬' }
    ],
    education: [
        { id: 'k12', name: 'K-12 School', icon: '🎒' },
        { id: 'university', name: 'University/College', icon: '🎓' },
        { id: 'online-course', name: 'Online Course Platform', icon: '💻' },
        { id: 'tutoring', name: 'Tutoring Service', icon: '📚' },
        { id: 'edtech', name: 'EdTech Product', icon: '🖥️' }
    ],
    ecommerce: [
        { id: 'fashion', name: 'Fashion & Apparel', icon: '👔' },
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'food-beverage', name: 'Food & Beverage', icon: '🍔' },
        { id: 'beauty', name: 'Beauty & Cosmetics', icon: '💄' },
        { id: 'home-decor', name: 'Home & Decor', icon: '🏠' },
        { id: 'digital-products', name: 'Digital Products', icon: '📦' }
    ],
    fintech: [
        { id: 'payments', name: 'Payment Processing', icon: '💳' },
        { id: 'lending', name: 'Lending Platform', icon: '🏦' },
        { id: 'insurance', name: 'Insurance Tech', icon: '🛡️' },
        { id: 'wealth-mgmt', name: 'Wealth Management', icon: '💰' },
        { id: 'neo-bank', name: 'Neo Bank', icon: '🏧' }
    ],
    realestate: [
        { id: 'residential', name: 'Residential', icon: '🏡' },
        { id: 'commercial', name: 'Commercial', icon: '🏢' },
        { id: 'property-mgmt', name: 'Property Management', icon: '🔑' },
        { id: 'real-estate-tech', name: 'Real Estate Tech', icon: '📍' }
    ],
    manufacturing: [
        { id: 'solar', name: 'Solar Panel Manufacturing', icon: '☀️' },
        { id: 'automotive', name: 'Automotive Parts', icon: '🚗' },
        { id: 'electronics-mfg', name: 'Electronics Manufacturing', icon: '🔌' },
        { id: 'textiles', name: 'Textiles & Apparel', icon: '🧵' },
        { id: 'food-processing', name: 'Food Processing', icon: '🏭' },
        { id: 'chemicals', name: 'Chemicals', icon: '⚗️' }
    ],
    localbusiness: [
        { id: 'restaurant', name: 'Restaurant/Cafe', icon: '🍽️' },
        { id: 'retail-store', name: 'Retail Store', icon: '🛍️' },
        { id: 'salon', name: 'Salon/Spa', icon: '💇' },
        { id: 'fitness', name: 'Fitness Studio', icon: '💪' },
        { id: 'auto-service', name: 'Auto Service', icon: '🔧' }
    ],
    agency: [
        { id: 'marketing-agency', name: 'Marketing Agency', icon: '📢' },
        { id: 'design-agency', name: 'Design Agency', icon: '🎨' },
        { id: 'dev-agency', name: 'Development Agency', icon: '💻' },
        { id: 'consulting', name: 'Consulting Firm', icon: '📊' },
        { id: 'creative-agency', name: 'Creative Agency', icon: '✨' }
    ],
    startup: [
        { id: 'pre-seed', name: 'Pre-Seed Stage', icon: '🌱' },
        { id: 'seed', name: 'Seed Stage', icon: '🌿' },
        { id: 'series-a', name: 'Series A+', icon: '🚀' },
        { id: 'bootstrap', name: 'Bootstrapped', icon: '💪' }
    ]
};

// Export all other constants from industrySOPs.ts
export * from './industrySOPs';
