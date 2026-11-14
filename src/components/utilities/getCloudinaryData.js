// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// Define paths for input and output data files
const projectsDataPath = path.join(__dirname, 'data', 'projectsData.json');
const outputPath = path.join(__dirname, 'data', 'cloudinaryData.json');

// Read Cloudinary credentials from environment variables
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Check for missing credentials and exit if any are missing
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('[ERROR] Missing Cloudinary credentials in environment variables.');
  console.error(`CLOUDINARY_CLOUD_NAME: ${CLOUD_NAME ? 'set' : 'missing'}`);
  console.error(`CLOUDINARY_API_KEY: ${API_KEY ? 'set' : 'missing'}`);
  console.error(`CLOUDINARY_API_SECRET: ${API_SECRET ? 'set' : 'missing'}`);
  process.exit(1);
}

/**
 * Fetches all image resources from a specific Cloudinary folder using the Search API.
 * @param {string} folder - The folder name to fetch resources from.
 * @returns {Promise<Array>} - Array of resource objects.
 */
async function fetchFolderResources(folder) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;
  const authHeader = `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')}`;
  const data = {
    expression: `folder:"portfolio/${folder}"`,
    sort_by: [{ public_id: "desc" }],
    max_results: 500,
  };
  // Cloudinary's Search API occasionally returns a 5xx; retry before giving up.
  // Returns null on failure so the caller can keep the previously saved data.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // Built-in fetch (Node 18+), so no extra HTTP dependency is needed
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify(data),
      });
      if (res.ok) return (await res.json()).resources || [];
      console.error(`[WARN] Cloudinary ${res.status} for folder "${folder}" (attempt ${attempt}/3)`);
      if (res.status < 500 && res.status !== 429) break;
    } catch (err) {
      console.error(`[WARN] Network error for folder "${folder}" (attempt ${attempt}/3):`, err.message);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
  return null;
}

/**
 * Main function to orchestrate reading project folders and fetching Cloudinary data.
 */
async function main() {
  let projects;
  try {
    // Read and parse the projects data file
    const rawData = fs.readFileSync(projectsDataPath, 'utf8');
    projects = JSON.parse(rawData);
  } catch (err) {
    console.error(`[ERROR] Failed to read or parse "${projectsDataPath}":`, err.message);
    process.exit(1);
  }

  // Previously saved data, used as a fallback for any folder that fails
  let previous = {};
  try {
    previous = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  } catch {}

  const result = {};
  const failed = [];

  for (const project of projects) {
    // Use item.fields['Gallery Folder Name'] if your JSON structure has a 'fields' object
    const folder = project.fields ? project.fields['Gallery Folder Name'] : project['Gallery Folder Name'];
    if (!folder) continue;
    const resources = await fetchFolderResources(folder);
    if (resources) {
      result[folder] = resources;
    } else {
      failed.push(folder);
      result[folder] = previous[folder] || [];
    }
  }

  if (failed.length) {
    console.error(`[ERROR] Kept previous data for ${failed.length} folder(s) that failed: ${failed.join(', ')}`);
  }

  try {
    // Write the fetched data to the output file
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`[fetch-cloudinary] Saved ${Object.keys(result).length} gallery folders.`);
  } catch (err) {
    console.error(`[ERROR] Failed to write to "${outputPath}":`, err.message);
    process.exit(1);
  }
}

// Run the main function
main();