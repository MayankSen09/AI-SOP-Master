import { type HTMLAttributes, type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    footer?: ReactNode;
    children?: ReactNode;
    noPadding?: boolean;
}

export function Card({
    title,
    description,
    footer,
    children,
    className,
    noPadding = false,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-architect-card border border-slate-200/60 dark:border-architect-border rounded-2xl shadow-sm",
                "hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 hover:-translate-y-1",
                "transition-all duration-500 ease-in-out backdrop-blur-md",
                className
            )}
            {...props}
        >
            {(title || description) && (
                <div className="p-6 border-b border-slate-100/50 dark:border-architect-border/50">
                    {title && <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>}
                    {description && <p className="text-sm text-slate-500 dark:text-architect-muted mt-1 leading-relaxed">{description}</p>}
                </div>
            )}
            <div className={cn(noPadding ? "" : "p-6")}>
                {children}
            </div>
            {footer && (
                <div className="bg-slate-50/50 dark:bg-architect-dark/50 border-t border-slate-100/50 dark:border-architect-border/50 p-4 rounded-b-2xl backdrop-blur-sm">
                    {footer}
                </div>
            )}
        </div>
    );
}
