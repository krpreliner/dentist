import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

const allowedModels = ['services', 'faqs', 'testimonials', 'contact', 'gallery', 'seo'];

export function getJsonData(model) {
  if (!allowedModels.includes(model)) {
    throw new Error('Invalid model');
  }

  const filePath = path.join(dataDir, `${model}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (e) {
    return null;
  }
}

export function saveJsonData(model, data) {
  if (!allowedModels.includes(model)) {
    throw new Error('Invalid model');
  }

  const filePath = path.join(dataDir, `${model}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  return true;
}
