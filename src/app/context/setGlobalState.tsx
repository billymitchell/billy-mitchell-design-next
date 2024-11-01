// app/context/setGlobalState.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchAirtableData, AirtableRecord } from "../context/fetchAirtableData"

// Define the shape of global state
interface GlobalState {
    projectsData: AirtableRecord[];
    companiesData: AirtableRecord[];
    servicesData: AirtableRecord[];
    selectedPortfolioItem: string | null; // Add this line
}

interface GlobalStateContextType {
    globalState: GlobalState;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalStateProviderProps {
    children: ReactNode;
}

// Provider with client-side fetching
export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
    const [globalState, setGlobalState] = useState<GlobalState>({
        projectsData: [],
        companiesData: [],
        servicesData: [],
        selectedPortfolioItem: null, // Initialize with null
    });

    useEffect(() => {
        const loadAirtableData = async () => {
            const data = await fetchAirtableData();
            setGlobalState(data);
        };

        loadAirtableData();
    }, []);

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalStateContextType => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
