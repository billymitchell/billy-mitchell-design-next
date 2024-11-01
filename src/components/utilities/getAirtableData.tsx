// lib/fetchAirtableData.ts
import Airtable, { FieldSet, Records } from 'airtable';

// Initialize Airtable client
const apiKey = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;
const baseId = 'appvr5KrgKiJo1E7M';

if (!apiKey) {
    throw new Error('Airtable API key is missing');
}

const base = new Airtable({ apiKey }).base(baseId);

async function fetchProjects(): Promise<Records<FieldSet>> {
    return base('Projects').select().all();
}

async function fetchCompanies(): Promise<Records<FieldSet>> {
    return base('Companies').select().all();
}

async function fetchServices(): Promise<Records<FieldSet>> {
    return base('Services').select().all();
}

// Fetch all data and export it
async function fetchData() {
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

// Immediately fetch data and export it
export const airtableData = await fetchData();
