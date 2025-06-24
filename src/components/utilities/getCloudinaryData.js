// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const axios = require('axios');

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
  const auth = {
    username: API_KEY,
    password: API_SECRET,
  };
  const data = {
    expression: `folder:"portfolio/${folder}"`,
    sort_by: [{ public_id: "desc" }],
    max_results: 500,
  };
  try {
    const res = await axios.post(url, data, { auth, headers: { "Content-Type": "application/json" } });
    return res.data.resources;
  } catch (err) {
    if (err.response) {
      console.error(`[ERROR] Cloudinary Search API error for folder "${folder}":`, err.response.data);
    } else {
      console.error(`[ERROR] Network or Axios error for folder "${folder}":`, err.message);
    }
    return [];
  }
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

  const result = {};

  for (const project of projects) {
    // Use item.fields['Gallery Folder Name'] if your JSON structure has a 'fields' object
    const folder = project.fields ? project.fields['Gallery Folder Name'] : project['Gallery Folder Name'];
    if (folder) {
      try {
        const resources = await fetchFolderResources(folder);
        result[folder] = resources;
      } catch (err) {
        console.error(`[ERROR] Unexpected error fetching resources for folder "${folder}":`, err.message);
        result[folder] = [];
      }
    }
  }

  try {
    // Write the fetched data to the output file
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`[ERROR] Failed to write to "${outputPath}":`, err.message);
    process.exit(1);
  }
}

// Run the main function
main();