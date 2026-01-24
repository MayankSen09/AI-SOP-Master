import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Types
export interface EmailCampaign {
    id: string;
    name: string;
    subject: string;
    previewText: string;
    content: string;
    template: string;
    status: 'draft' | 'scheduled' | 'sent';
    createdAt: string;
    scheduledFor?: string;
}

export interface SocialPost {
    id: string;
    platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok';
    content: string;
    scheduledFor: string;
    status: 'draft' | 'scheduled' | 'published';
    mediaUrl?: string;
    campaign?: string;
}

export interface LeadMagnet {
    id: string;
    title: string;
    type: 'ebook' | 'checklist' | 'template' | 'worksheet' | 'webinar';
    content: string;
    industry: string;
    createdAt: string;
}

export interface ABTest {
    id: string;
    name: string;
    type: 'email' | 'landing-page' | 'ad-copy' | 'cta';
    variantA: any;
    variantB: any;
    status: 'running' | 'completed' | 'paused';
    winner?: 'A' | 'B' | null;
    metricsA: {
        impressions: number;
        conversions: number;
        conversionRate: number;
    };
    metricsB: {
        impressions: number;
        conversions: number;
        conversionRate: number;
    };
    confidence?: number;
    createdAt: string;
}

export interface ContentItem {
    id: string;
    title: string;
    type: 'blog' | 'social' | 'email' | 'webinar' | 'video';
    channel: string;
    scheduledDate: string;
    status: 'planned' | 'in-progress' | 'completed';
    assignedTo?: string;
    campaign?: string;
}

export interface AdCopyVariant {
    id: string;
    platform: 'google' | 'facebook' | 'linkedin' | 'twitter';
    headline: string;
    description: string;
    cta: string;
    productName: string;
    createdAt: string;
}

export interface LandingPage {
    id: string;
    name: string;
    template: string;
    content: any;
    status: 'draft' | 'published';
    url?: string;
    createdAt: string;
}

interface MarketingContextType {
    // Email Campaigns
    emailCampaigns: EmailCampaign[];
    createEmailCampaign: (campaign: Omit<EmailCampaign, 'id' | 'createdAt'>) => void;
    updateEmailCampaign: (id: string, campaign: Partial<EmailCampaign>) => void;
    deleteEmailCampaign: (id: string) => void;

    // Social Posts
    socialPosts: SocialPost[];
    createSocialPost: (post: Omit<SocialPost, 'id'>) => void;
    updateSocialPost: (id: string, post: Partial<SocialPost>) => void;
    deleteSocialPost: (id: string) => void;

    // Lead Magnets
    leadMagnets: LeadMagnet[];
    createLeadMagnet: (magnet: Omit<LeadMagnet, 'id' | 'createdAt'>) => void;
    deleteLeadMagnet: (id: string) => void;

    // A/B Tests
    abTests: ABTest[];
    createABTest: (test: Omit<ABTest, 'id' | 'createdAt'>) => void;
    updateABTest: (id: string, test: Partial<ABTest>) => void;
    deleteABTest: (id: string) => void;

    // Content Calendar
    contentItems: ContentItem[];
    createContentItem: (item: Omit<ContentItem, 'id'>) => void;
    updateContentItem: (id: string, item: Partial<ContentItem>) => void;
    deleteContentItem: (id: string) => void;

    // Ad Copy
    adCopyVariants: AdCopyVariant[];
    createAdCopyVariant: (variant: Omit<AdCopyVariant, 'id' | 'createdAt'>) => void;
    deleteAdCopyVariant: (id: string) => void;

    // Landing Pages
    landingPages: LandingPage[];
    createLandingPage: (page: Omit<LandingPage, 'id' | 'createdAt'>) => void;
    updateLandingPage: (id: string, page: Partial<LandingPage>) => void;
    deleteLandingPage: (id: string) => void;
}

const MarketingContext = createContext<MarketingContextType | undefined>(undefined);

export const useMarketing = () => {
    const context = useContext(MarketingContext);
    if (!context) {
        throw new Error('useMarketing must be used within MarketingProvider');
    }
    return context;
};

export const MarketingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([]);
    const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
    const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([]);
    const [abTests, setABTests] = useState<ABTest[]>([]);
    const [contentItems, setContentItems] = useState<ContentItem[]>([]);
    const [adCopyVariants, setAdCopyVariants] = useState<AdCopyVariant[]>([]);
    const [landingPages, setLandingPages] = useState<LandingPage[]>([]);

    // Email Campaigns
    const createEmailCampaign = (campaign: Omit<EmailCampaign, 'id' | 'createdAt'>) => {
        const newCampaign: EmailCampaign = {
            ...campaign,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setEmailCampaigns([...emailCampaigns, newCampaign]);
    };

    const updateEmailCampaign = (id: string, campaign: Partial<EmailCampaign>) => {
        setEmailCampaigns(emailCampaigns.map(c => c.id === id ? { ...c, ...campaign } : c));
    };

    const deleteEmailCampaign = (id: string) => {
        setEmailCampaigns(emailCampaigns.filter(c => c.id !== id));
    };

    // Social Posts
    const createSocialPost = (post: Omit<SocialPost, 'id'>) => {
        const newPost: SocialPost = {
            ...post,
            id: Date.now().toString(),
        };
        setSocialPosts([...socialPosts, newPost]);
    };

    const updateSocialPost = (id: string, post: Partial<SocialPost>) => {
        setSocialPosts(socialPosts.map(p => p.id === id ? { ...p, ...post } : p));
    };

    const deleteSocialPost = (id: string) => {
        setSocialPosts(socialPosts.filter(p => p.id !== id));
    };

    // Lead Magnets
    const createLeadMagnet = (magnet: Omit<LeadMagnet, 'id' | 'createdAt'>) => {
        const newMagnet: LeadMagnet = {
            ...magnet,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setLeadMagnets([...leadMagnets, newMagnet]);
    };

    const deleteLeadMagnet = (id: string) => {
        setLeadMagnets(leadMagnets.filter(m => m.id !== id));
    };

    // A/B Tests
    const createABTest = (test: Omit<ABTest, 'id' | 'createdAt'>) => {
        const newTest: ABTest = {
            ...test,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setABTests([...abTests, newTest]);
    };

    const updateABTest = (id: string, test: Partial<ABTest>) => {
        setABTests(abTests.map(t => t.id === id ? { ...t, ...test } : t));
    };

    const deleteABTest = (id: string) => {
        setABTests(abTests.filter(t => t.id !== id));
    };

    // Content Calendar
    const createContentItem = (item: Omit<ContentItem, 'id'>) => {
        const newItem: ContentItem = {
            ...item,
            id: Date.now().toString(),
        };
        setContentItems([...contentItems, newItem]);
    };

    const updateContentItem = (id: string, item: Partial<ContentItem>) => {
        setContentItems(contentItems.map(i => i.id === id ? { ...i, ...item } : i));
    };

    const deleteContentItem = (id: string) => {
        setContentItems(contentItems.filter(i => i.id !== id));
    };

    // Ad Copy
    const createAdCopyVariant = (variant: Omit<AdCopyVariant, 'id' | 'createdAt'>) => {
        const newVariant: AdCopyVariant = {
            ...variant,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setAdCopyVariants([...adCopyVariants, newVariant]);
    };

    const deleteAdCopyVariant = (id: string) => {
        setAdCopyVariants(adCopyVariants.filter(v => v.id !== id));
    };

    // Landing Pages
    const createLandingPage = (page: Omit<LandingPage, 'id' | 'createdAt'>) => {
        const newPage: LandingPage = {
            ...page,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setLandingPages([...landingPages, newPage]);
    };

    const updateLandingPage = (id: string, page: Partial<LandingPage>) => {
        setLandingPages(landingPages.map(p => p.id === id ? { ...p, ...page } : p));
    };

    const deleteLandingPage = (id: string) => {
        setLandingPages(landingPages.filter(p => p.id !== id));
    };

    const value: MarketingContextType = {
        emailCampaigns,
        createEmailCampaign,
        updateEmailCampaign,
        deleteEmailCampaign,
        socialPosts,
        createSocialPost,
        updateSocialPost,
        deleteSocialPost,
        leadMagnets,
        createLeadMagnet,
        deleteLeadMagnet,
        abTests,
        createABTest,
        updateABTest,
        deleteABTest,
        contentItems,
        createContentItem,
        updateContentItem,
        deleteContentItem,
        adCopyVariants,
        createAdCopyVariant,
        deleteAdCopyVariant,
        landingPages,
        createLandingPage,
        updateLandingPage,
        deleteLandingPage,
    };

    return <MarketingContext.Provider value={value}>{children}</MarketingContext.Provider>;
};
