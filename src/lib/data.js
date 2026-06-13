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

export async function saveJsonData(model, data) {
  if (!allowedModels.includes(model)) {
    throw new Error('Invalid model');
  }

  // 1. Save locally for instant updates (works immediately on localhost and current Lambda instance)
  try {
    const filePath = path.join(dataDir, `${model}.json`);
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
  } catch (err) {
    // On Vercel, the file system is read-only. We silently ignore this local write error
    // because the next step will push it to GitHub permanently!
  }
  
  const jsonString = JSON.stringify(data, null, 2);

  // 2. If GitHub Token is present, push a commit to permanently save the changes on Vercel
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'krpreliner';
  const repo = process.env.GITHUB_REPO || 'dentist';

  if (!token) {
    throw new Error('GITHUB_TOKEN is missing! If you are testing locally, add it to your .env.local file. If on Vercel, make sure you Redeployed!');
  }

  try {
      const gitPath = `data/${model}.json`;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitPath}`;
      
      // Step A: Get current file SHA (required by GitHub API to update a file)
      const getRes = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      let sha = null;
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // Step B: Commit the new file
      const contentBase64 = Buffer.from(jsonString).toString('base64');
      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `cms: update ${model} via Admin Panel`,
          content: contentBase64,
          sha: sha || undefined
        })
      });

      if (!putRes.ok) {
        const errorText = await putRes.text();
        console.error(`[GitHub API Error] Failed to commit to ${gitPath}:`, errorText);
        throw new Error(`GitHub API Error: ${putRes.status} - ${errorText}`);
      }
      
      console.log(`[GitHub Commit Success] Successfully pushed changes to ${gitPath}!`);
    } catch (err) {
      console.error(`[Git CMS Error] Complete failure while pushing ${model}:`, err);
      // Throw the error so the frontend UI can display exactly why GitHub rejected it
      throw new Error(`Git CMS Push Failed: ${err.message}`);
    }

  return true;
}
