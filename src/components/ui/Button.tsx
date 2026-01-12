import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon: Icon, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow active:bg-primary-800',
            secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm active:bg-slate-100',
            ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm active:bg-red-800',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {Icon && <Icon className={cn("mr-2 h-4 w-4", size === 'lg' && "h-5 w-5")} />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
