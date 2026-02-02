import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface BrandingSettings {
    companyName: string;
    logo?: string; // Base64 encoded image or URL
    colors: {
        primary: string;
        secondary: string;
        text: string;
        background: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    companyInfo: {
        industry: string;
        teamSize: string;
        foundedYear: string;
        website: string;
    };
}

interface BrandingContextType {
    branding: BrandingSettings;
    updateBranding: (updates: Partial<BrandingSettings>) => void;
    updateColors: (colors: Partial<BrandingSettings['colors']>) => void;
    updateFonts: (fonts: Partial<BrandingSettings['fonts']>) => void;
    updateCompanyInfo: (info: Partial<BrandingSettings['companyInfo']>) => void;
    uploadLogo: (file: File) => Promise<void>;
    removeLogo: () => void;
    resetToDefaults: () => void;
}

const DEFAULT_BRANDING: BrandingSettings = {
    companyName: 'My Company',
    logo: undefined,
    colors: {
        primary: '#6366f1', // Indigo-600
        secondary: '#8b5cf6', // Purple-600
        text: '#1e293b', // Slate-800
        background: '#ffffff', // White
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
    },
    companyInfo: {
        industry: '',
        teamSize: '',
        foundedYear: '',
        website: '',
    },
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
    const [branding, setBranding] = useState<BrandingSettings>(() => {
        // Load from localStorage on init
        const saved = localStorage.getItem('branding');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return DEFAULT_BRANDING;
            }
        }
        return DEFAULT_BRANDING;
    });

    // Save to localStorage whenever branding changes
    useEffect(() => {
        localStorage.setItem('branding', JSON.stringify(branding));

        // Apply CSS custom properties for theming
        const root = document.documentElement;
        root.style.setProperty('--color-primary', branding.colors.primary);
        root.style.setProperty('--color-secondary', branding.colors.secondary);
        root.style.setProperty('--color-text', branding.colors.text);
        root.style.setProperty('--color-background', branding.colors.background);
        root.style.setProperty('--font-heading', branding.fonts.heading);
        root.style.setProperty('--font-body', branding.fonts.body);
    }, [branding]);

    const updateBranding = (updates: Partial<BrandingSettings>) => {
        setBranding(prev => ({ ...prev, ...updates }));
    };

    const updateColors = (colors: Partial<BrandingSettings['colors']>) => {
        setBranding(prev => ({
            ...prev,
            colors: { ...prev.colors, ...colors },
        }));
    };

    const updateFonts = (fonts: Partial<BrandingSettings['fonts']>) => {
        setBranding(prev => ({
            ...prev,
            fonts: { ...prev.fonts, ...fonts },
        }));
    };

    const updateCompanyInfo = (info: Partial<BrandingSettings['companyInfo']>) => {
        setBranding(prev => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, ...info },
        }));
    };

    const uploadLogo = async (file: File) => {
        // Validate file type
        const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload SVG, PNG, or JPG');
        }

        // Validate file size (max 2MB)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File too large. Maximum size is 2MB');
        }

        // Convert to base64
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setBranding(prev => ({ ...prev, logo: base64 }));
                resolve();
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    };

    const removeLogo = () => {
        setBranding(prev => ({ ...prev, logo: undefined }));
    };

    const resetToDefaults = () => {
        setBranding(DEFAULT_BRANDING);
    };

    return (
        <BrandingContext.Provider
            value={{
                branding,
                updateBranding,
                updateColors,
                updateFonts,
                updateCompanyInfo,
                uploadLogo,
                removeLogo,
                resetToDefaults,
            }}
        >
            {children}
        </BrandingContext.Provider>
    );
}

export function useBranding() {
    const context = useContext(BrandingContext);
    if (!context) {
        throw new Error('useBranding must be used within BrandingProvider');
    }
    return context;
}
