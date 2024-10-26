// app/context/fetchAirtableData.ts
import Airtable, { FieldSet, Records } from 'airtable';

// Initialize Airtable client
const apiKey = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;
const baseId = 'appvr5KrgKiJo1E7M';

if (!apiKey) {
    throw new Error('Airtable API key is missing');
}

const base = new Airtable({ apiKey }).base(baseId);

export interface AirtableRecord {
    id: string;
    fields: FieldSet;
}

// Fetch data from the Projects table
async function fetchProjects(): Promise<Records<FieldSet>> {
    return base('Projects').select().all();
}

// Fetch data from the Companies table
async function fetchCompanies(): Promise<Records<FieldSet>> {
    return base('Companies').select().all();
}

// Fetch data from the Services table
async function fetchServices(): Promise<Records<FieldSet>> {
    return base('Services').select().all();
}

// Main function to fetch data from all tables
export async function fetchAirtableData() {
    try {
        const [projectsData, companiesData, servicesData] = await Promise.all([
            fetchProjects(),
            fetchCompanies(),
            fetchServices(),
        ]);

        return {
            projectsData,
            companiesData,
            servicesData,
        };
    } catch (error) {
        console.error('Error fetching Airtable data:', error);
        return {
            projectsData: [],
            companiesData: [],
            servicesData: [],
        };
    }
}
