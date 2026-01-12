import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <Header
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-20 lg:pl-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};
