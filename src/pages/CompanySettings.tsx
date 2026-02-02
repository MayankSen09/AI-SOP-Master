import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Upload, Palette, Type, Info, RotateCcw, Check, X, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useBranding } from '../context/BrandingContext';
import { useToast } from '../context/ToastContext';

const GOOGLE_FONTS = [
    'Inter',
    'Poppins',
    'Roboto',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Raleway',
    'Playfair Display',
];

const INDUSTRIES = [
    'SaaS / Software',
    'E-commerce',
    'Marketing Agency',
    'Consulting',
    'Healthcare',
    'Education',
    'Finance',
    'Real Estate',
    'Manufacturing',
    'Other',
];

const TEAM_SIZES = [
    '1-10 employees',
    '11-50 employees',
    '51-100 employees',
    '101-500 employees',
    '500+ employees',
];

export function CompanySettings() {
    const { branding, updateBranding, updateColors, updateFonts, updateCompanyInfo, uploadLogo, removeLogo, resetToDefaults } = useBranding();
    const { success, error } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            await uploadLogo(file);
            success(`Logo uploaded successfully!`);
        } catch (err) {
            error(err instanceof Error ? err.message : 'Failed to upload logo');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveLogo = () => {
        removeLogo();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        success('Logo removed');
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all branding to defaults? This cannot be undone.')) {
            resetToDefaults();
            success('Branding reset to defaults');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Company Branding</h1>
                            <p className="text-slate-600 dark:text-slate-300">Customize your company's appearance across the platform</p>
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        icon={RotateCcw}
                        onClick={handleReset}
                        size="sm"
                    >
                        Reset to Defaults
                    </Button>
                </div>
            </motion.div>

            {/* Company Logo */}
            <Card>
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Company Logo</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Your logo will appear on the dashboard, exported documents, and PDFs</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Area */}
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Upload className="w-12 h-12 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                            <div className="text-center">
                                <p className="font-semibold text-slate-700 dark:text-slate-300">
                                    {uploading ? 'Uploading...' : 'Click to upload logo'}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    SVG, PNG or JPG (max 2MB)
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Logo Preview */}
                    <div className="flex flex-col justify-center">
                        {branding.logo ? (
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                    <img
                                        src={branding.logo}
                                        alt="Company Logo"
                                        className="max-h-32 max-w-full object-contain"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        icon={X}
                                        onClick={handleRemoveLogo}
                                        className="flex-1"
                                        size="sm"
                                    >
                                        Remove Logo
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        icon={Upload}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex-1"
                                        size="sm"
                                    >
                                        Replace
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-sm text-slate-500 dark:text-slate-400">No logo uploaded</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload a logo to see preview</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-300">
                            <p className="font-semibold">Logo Guidelines</p>
                            <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                                <li>Recommended: Square logo (1:1 aspect ratio) at least 512x512px</li>
                                <li>SVG format is preferred for best quality at any size</li>
                                <li>Transparent background works best for both light and dark modes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Brand Colors */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Brand Colors</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Customize the color scheme used throughout the platform</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Primary Color */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={branding.colors.primary}
                                onChange={(e) => updateColors({ primary: e.target.value })}
                                className="h-12 w-20 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={branding.colors.primary}
                                    onChange={(e) => updateColors({ primary: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                                    placeholder="#6366f1"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used for buttons, links, and main accents</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Secondary Color
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={branding.colors.secondary}
                                onChange={(e) => updateColors({ secondary: e.target.value })}
                                className="h-12 w-20 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={branding.colors.secondary}
                                    onChange={(e) => updateColors({ secondary: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                                    placeholder="#8b5cf6"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used for backgrounds and secondary elements</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Color */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Text Color
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={branding.colors.text}
                                onChange={(e) => updateColors({ text: e.target.value })}
                                className="h-12 w-20 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={branding.colors.text}
                                    onChange={(e) => updateColors({ text: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                                    placeholder="#1e293b"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Primary text color for headings and content</p>
                            </div>
                        </div>
                    </div>

                    {/* Background Color */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Background Color
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={branding.colors.background}
                                onChange={(e) => updateColors({ background: e.target.value })}
                                className="h-12 w-20 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={branding.colors.background}
                                    onChange={(e) => updateColors({ background: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                                    placeholder="#ffffff"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Main background color for documents</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Color Preview */}
                <div className="mt-6 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700" style={{ backgroundColor: branding.colors.background }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold" style={{ color: branding.colors.text }}>Color Preview</h3>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: branding.colors.primary }}>
                                Primary Button
                            </button>
                            <button className="px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: branding.colors.secondary }}>
                                Secondary Button
                            </button>
                        </div>
                    </div>
                    <p style={{ color: branding.colors.text }}>This is how your brand colors will look in documents and throughout the platform.</p>
                </div>
            </Card>

            {/* Typography */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Type className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Typography</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Choose the fonts for your brand</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Heading Font */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Heading Font
                        </label>
                        <select
                            value={branding.fonts.heading}
                            onChange={(e) => updateFonts({ heading: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            {GOOGLE_FONTS.map(font => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <p className="text-2xl font-bold" style={{ fontFamily: branding.fonts.heading }}>
                                Heading Preview
                            </p>
                        </div>
                    </div>

                    {/* Body Font */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Body Font
                        </label>
                        <select
                            value={branding.fonts.body}
                            onChange={(e) => updateFonts({ body: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            {GOOGLE_FONTS.map(font => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <p style={{ fontFamily: branding.fonts.body }}>
                                This is how your body text will appear in documents and throughout the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Company Information */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Company Information</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Basic information about your company</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={branding.companyName}
                            onChange={(e) => updateBranding({ companyName: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            placeholder="Acme Corporation"
                        />
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Industry
                        </label>
                        <select
                            value={branding.companyInfo.industry}
                            onChange={(e) => updateCompanyInfo({ industry: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            <option value="">Select industry...</option>
                            {INDUSTRIES.map(industry => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Team Size */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Team Size
                        </label>
                        <select
                            value={branding.companyInfo.teamSize}
                            onChange={(e) => updateCompanyInfo({ teamSize: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            <option value="">Select team size...</option>
                            {TEAM_SIZES.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    {/* Founded Year */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Founded Year
                        </label>
                        <input
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={branding.companyInfo.foundedYear}
                            onChange={(e) => updateCompanyInfo({ foundedYear: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            placeholder="2024"
                        />
                    </div>

                    {/* Website */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Website
                        </label>
                        <input
                            type="url"
                            value={branding.companyInfo.website}
                            onChange={(e) => updateCompanyInfo({ website: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>
            </Card>

            {/* Save Confirmation */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-800 dark:text-green-300">
                    All changes are saved automatically and will be applied immediately across the platform.
                </p>
            </div>
        </div>
    );
}

export default CompanySettings;
