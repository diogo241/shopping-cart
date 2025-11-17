import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    res.status(200).json(data.products); // Adjust to your structure
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
}
