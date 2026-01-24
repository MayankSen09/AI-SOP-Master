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
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 rounded-xl border';

    const variants = {
        primary: 'bg-brand-primary text-white border-transparent shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 hover:shadow-brand-primary/30',
        gradient: 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:brightness-110',
        secondary: 'bg-surface border-default text-primary hover:bg-elevated shadow-sm hover:shadow-md transition-shadow',
        ghost: 'bg-transparent border-transparent text-secondary hover:bg-elevated hover:text-primary',
        danger: 'bg-surface text-rose-600 dark:text-rose-400 border-default hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:border-rose-300 dark:hover:border-rose-900/20'
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
