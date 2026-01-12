import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    icon: Icon,
    children,
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl border';

    const variants = {
        primary: 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30',
        gradient: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:brightness-110',
        secondary: 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
        ghost: 'bg-transparent text-slate-600 border-transparent hover:bg-indigo-50 hover:text-indigo-600',
        danger: 'bg-white text-rose-600 border-slate-200 hover:bg-rose-50 hover:border-rose-200'
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
    };

    return (
        <button
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : Icon ? (
                <Icon className={cn("w-4 h-4 mr-2", size === 'lg' && "w-5 h-5")} />
            ) : null}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
