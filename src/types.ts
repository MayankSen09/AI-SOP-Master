export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    departmentId?: string;
    avatarUrl?: string;
}

export type SOPStatus = 'Draft' | 'Review' | 'Approved' | 'Archived';

export interface SOP {
    id: string;
    title: string;
    departmentId: string;
    status: SOPStatus;
    currentVersion: number;
    content: string; // HTML/RichText
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    tags?: string[];
}

export interface SOPVersion {
    id: string;
    sopId: string;
    versionNumber: number;
    content: string;
    changeSummary: string;
    createdBy: string;
    createdAt: string;
}

export interface Department {
    id: string;
    name: string;
    description?: string;
}

export interface Comment {
    id: string;
    sopId: string;
    userId: string;
    text: string;
    createdAt: string;
}

// Marketing Strategy Types
export interface MarketingStrategy {
    id: string;
    industry: string;
    companySize: string;
    targetGeo: string;
    businessModel: string;
    generatedAt: string;
    objectives: string[];
    channels: {
        name: string;
        focus: string;
        tactics: string[];
    }[];
    metaTargeting: {
        interests: string[];
        behaviors: string[];
        demographics: string[];
    };
    roadmap: {
        phase: string;
        duration: string;
        activities: string[];
    }[];
}
