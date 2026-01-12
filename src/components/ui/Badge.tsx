import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
    const variants = {
        success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
        info: 'bg-sky-50 text-sky-700 ring-sky-600/20',
        default: 'bg-slate-50 text-slate-600 ring-slate-500/10',
    };

    return (
        <span className={`
      inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset
      ${variants[variant]} ${className}
    `}>
            {children}
        </span>
    );
};
