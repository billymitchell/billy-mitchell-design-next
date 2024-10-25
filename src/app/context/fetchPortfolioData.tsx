// app/context/GlobalStateContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const GlobalStateContext = createContext();

async function fetchPortfolioButtons() {
    const airtable_base_api_URL = "https://api.airtable.com/v0";
    const airtable_base_id = "appvr5KrgKiJo1E7M";
    const portfolio_table_id = "tbl3ySVeDHggX6AnR";
    const api_token = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;

    if (!api_token) {
        console.error("API token is missing.");
        return [];
    }

    try {
        const response = await fetch(`${airtable_base_api_URL}/${airtable_base_id}/${portfolio_table_id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${api_token}`,
            },
            redirect: "follow",
        });

        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return [];
        }

        const data = await response.json();
        return data.records || []; // Check for the 'records' key if that's how the data is structured
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Create provider
export const GlobalStateProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({ portfolioData: [] });

    useEffect(() => {
        const loadPortfolioData = async () => {
            const portfolioData = await fetchPortfolioButtons();
            setGlobalState(prevState => ({ ...prevState, portfolioData }));
        };

        loadPortfolioData();
    }, []);

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook for easier usage
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};
