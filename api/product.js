import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), 'src', 'data', 'db.json'),
      path.join(process.cwd(), 'data', 'db.json'),
      path.join(process.cwd(), 'public', 'data', 'db.json'),
      './src/data/db.json',
      './data/db.json'
    ];

    let data = null;
    let lastError = null;

    for (const filePath of possiblePaths) {
      try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        data = JSON.parse(jsonData);
        break; // Success! Exit loop
      } catch (err) {
        lastError = err;
        continue; // Try next path
      }
    }

    if (!data) {
      throw lastError || new Error('File not found in any location');
    }

    res.status(200).json(data.products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to load data',
      details: error.message,
      cwd: process.cwd()
    });
  }
}