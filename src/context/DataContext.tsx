import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SOP, Department } from '../types';

interface DataContextType {
    sops: SOP[];
    departments: Department[];
    createSOP: (sop: Partial<SOP>) => void;
    updateSOP: (id: string, updates: Partial<SOP>) => void;
    deleteSOP: (id: string) => void;
    getSOP: (id: string) => SOP | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_DEPARTMENTS: Department[] = [
    { id: 'dept1', name: 'Operations', description: 'Daily operational procedures' },
    { id: 'dept2', name: 'HR', description: 'Human Resources policies' },
    { id: 'dept3', name: 'IT', description: 'Technical support and security' },
    { id: 'dept4', name: 'Marketing', description: 'Brand and outreach strategies' },
];

const INITIAL_SOPS: SOP[] = [
    {
        id: 'sop1',
        title: 'New Employee Onboarding',
        departmentId: 'dept2',
        status: 'Approved', // Ensure string literal match
        currentVersion: 1,
        content: '<h2>Purpose</h2><p>To ensure smooth integration of new hires.</p><h2>Steps</h2><ol><li>Prepare workstation</li><li>Grant system access</li><li>Welcome meeting</li></ol>',
        createdBy: 'u2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'sop2',
        title: 'Server Maintenance Protocol',
        departmentId: 'dept3',
        status: 'Draft',
        currentVersion: 0,
        content: '<h2>Purpose</h2><p>Weekly server health check.</p>',
        createdBy: 'u2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sops, setSops] = useState<SOP[]>(() => {
        const saved = localStorage.getItem('sop_sops');
        return saved ? JSON.parse(saved) : INITIAL_SOPS;
    });

    const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);

    useEffect(() => {
        localStorage.setItem('sop_sops', JSON.stringify(sops));
    }, [sops]);

    const createSOP = (sopData: Partial<SOP>) => {
        const newSOP: SOP = {
            id: crypto.randomUUID(),
            title: sopData.title || 'Untitled SOP',
            departmentId: sopData.departmentId || 'dept1',
            status: 'Draft',
            currentVersion: 1,
            content: sopData.content || '',
            createdBy: sopData.createdBy || 'unknown',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...sopData
        };
        setSops(prev => [newSOP, ...prev]);
    };

    const updateSOP = (id: string, updates: Partial<SOP>) => {
        setSops(prev => prev.map(sop =>
            sop.id === id ? { ...sop, ...updates, updatedAt: new Date().toISOString() } : sop
        ));
    };

    const deleteSOP = (id: string) => {
        setSops(prev => prev.filter(sop => sop.id !== id));
    };

    const getSOP = (id: string) => sops.find(s => s.id === id);

    return (
        <DataContext.Provider value={{ sops, departments, createSOP, updateSOP, deleteSOP, getSOP }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
