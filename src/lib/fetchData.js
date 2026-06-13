export async function fetchJsonDataFromGit(model) {
  // Always fetch fresh data directly from the GitHub repository to bypass Vercel builds.
  // This completely solves the "stale state" issue when Vercel fails to build.
  
  const owner = process.env.GITHUB_OWNER || 'krpreliner';
  const repo = process.env.GITHUB_REPO || 'dentist';
  
  // Use the raw GitHubusercontent URL for ultra-fast, unauthenticated public read access.
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/data/${model}.json`;

  console.log(`[Dynamic Fetch] Fetching latest ${model}.json from GitHub: ${url}`);
  
  try {
    // cache: 'no-store' ensures Next.js does NOT cache this request and ALWAYS fetches live data
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`[Dynamic Fetch Error] GitHub returned status ${res.status} for ${model}.json`);
      return null;
    }
    
    const data = await res.json();
    console.log(`[Dynamic Fetch Success] Successfully loaded ${data?.length || Object.keys(data || {}).length} items from ${model}.json`);
    return data;
  } catch (error) {
    console.error(`[Dynamic Fetch Exception] Failed to parse or fetch ${model}.json from GitHub:`, error);
    return null;
  }
}
