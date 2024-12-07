const fs = require('fs');
const path = require('path');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

// Initialize Airtable client
const apiKey = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;
const baseId = 'appvr5KrgKiJo1E7M';

if (!apiKey) {
  throw new Error(
    'Missing Airtable API key. Check your environment variables.'
  );
}

const base = new Airtable({ apiKey }).base(baseId);

const fetchAndSaveData = async () => {
  try {
    const projectsData = await base('Projects').select().all();
    const companiesData = await base('Companies').select().all();
    const servicesData = await base('Services').select().all();

    const projectsPath = path.join(
      __dirname,
      '../utilities/data/projectsData.json'
    );
    const companiesPath = path.join(
      __dirname,
      '../utilities/data/companiesData.json'
    );
    const servicesPath = path.join(
      __dirname,
      '../utilities/data/servicesData.json'
    );

    fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));
    fs.writeFileSync(companiesPath, JSON.stringify(companiesData, null, 2));
    fs.writeFileSync(servicesPath, JSON.stringify(servicesData, null, 2));
  } catch (error) {}
};

fetchAndSaveData();
