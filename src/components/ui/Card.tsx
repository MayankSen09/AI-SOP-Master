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
                "bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                "hover:border-indigo-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1",
                "transition-all duration-300 ease-out",
                className
            )}
            {...props}
        >
            {(title || description) && (
                <div className="p-6 border-b border-slate-100/50">
                    {title && <h3 className="text-lg font-semibold text-slate-900 tracking-tight">{title}</h3>}
                    {description && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{description}</p>}
                </div>
            )}
            <div className={cn(noPadding ? "" : "p-6")}>
                {children}
            </div>
            {footer && (
                <div className="bg-slate-50/50 border-t border-slate-100/50 p-4 rounded-b-2xl backdrop-blur-sm">
                    {footer}
                </div>
            )}
        </div>
    );
}
