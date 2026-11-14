// Build-time data script: run with `npm run fetch-data`.
// Never import this file from app code; it runs immediately when loaded.
const fs = require('fs');
const path = require('path');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

// Server-only token. NEXT_PUBLIC_AIR_TABLE_TOKEN is read as a fallback for
// older environments, but that prefix would expose the token to the browser
// if it were ever referenced in client code, so prefer AIRTABLE_TOKEN.
const apiKey =
  process.env.AIRTABLE_TOKEN || process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;
const baseId = 'appvr5KrgKiJo1E7M';

if (!apiKey) {
  console.error('[ERROR] Missing AIRTABLE_TOKEN in .env.local.');
  process.exit(1);
}

const base = new Airtable({ apiKey }).base(baseId);
const dataDir = path.join(__dirname, 'data');

const RENDER_HERE = "OR({Render On}='billymitchell.design', {Render On}='Both')";

// Keep only what the site uses (the raw Airtable record doubles the file size)
const toPlainRecords = (records) =>
  records.map(({ id, fields }) => ({ id, fields }));

const save = (fileName, records) =>
  fs.writeFileSync(
    path.join(dataDir, fileName),
    JSON.stringify(toPlainRecords(records), null, 2)
  );

//https://airtable.com/appvr5KrgKiJo1E7M/api/docs#javascript/table:projects:list

const fetchAndSaveData = async () => {
  const projectsData = await base('Projects')
    .select({ filterByFormula: `AND({Published}, ${RENDER_HERE})` })
    .all();

  // All companies, not just featured ones: project pages look up "Made for"
  // names here. The home page filters to featured companies itself.
  const companiesData = await base('Companies').select().all();

  const servicesData = await base('Services')
    .select({ filterByFormula: `AND({Featured}, ${RENDER_HERE})` })
    .all();

  save('projectsData.json', projectsData);
  save('companiesData.json', companiesData);
  save('servicesData.json', servicesData);

  console.log(
    `[fetch-data] Saved ${projectsData.length} projects, ${companiesData.length} companies, ${servicesData.length} services.`
  );
};

fetchAndSaveData().catch((error) => {
  console.error('[ERROR] Airtable fetch failed:', error.message || error);
  process.exit(1);
});
