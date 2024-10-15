const fs = require('fs');
const path = require('path');
const mql = require('@microlink/mql');

// Function to ensure the 'results' directory exists
function ensureResultsFolder() {
  const folderPath = path.join(__dirname, 'results');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return folderPath;
}

// Function to sanitize the title for use in filenames
function sanitizeTitle(title) {
  return title.replace(/[\/\\?%*:|"<>]/g, '_').replace(/\s+/g, '_');
}

// Function to fetch Open Graph data for each URL and store it in a separate JSON file
async function fetchOpenGraphData(type, urls, folderPath) {
  for (const url of urls) {
    try {
      const { data } = await mql(url); // Fetch Open Graph data using microlink API
      const title = data.title ? sanitizeTitle(data.title) : 'untitled'; // Sanitize the title or use 'untitled'

      const fileName = `${type}_${title}.json`; // Create a filename based on type and title
      const filePath = path.join(folderPath, fileName);

      // Write the Open Graph data to a JSON file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Data saved to ${filePath}`);
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error);
    }
  }
}

// Main function to handle the object with {type: array of urls}
async function fetchAllData(urlsByType) {
  const folderPath = ensureResultsFolder(); // Ensure the 'results' folder exists

  for (const type in urlsByType) {
    const urls = urlsByType[type];
    console.log(`Fetching data for type: ${type}`);
    await fetchOpenGraphData(type, urls, folderPath);
  }
}

// Example usage:
const urlsByType = {
  talk: ['https://youtu.be/0m_3FsQEiS4?si=S1Sgzv_reqZq_ECU'],
  // blogs: ['https://example.com/blog1', 'https://example.com/blog2'],
};

fetchAllData(urlsByType).catch((error) => console.error('Error:', error));
