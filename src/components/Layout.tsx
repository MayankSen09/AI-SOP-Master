import React from 'react';
import { Sidebar } from './Layout/Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-architect-dark text-architect-muted font-sans selection:bg-brand-primary/30">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-8 lg:p-12 overflow-auto scrollbar-hide">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
