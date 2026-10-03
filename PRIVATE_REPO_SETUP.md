# Private Repository Setup Guide

This guide explains how to set up your private repository to generate and push data to your public portfolio site (`abhijitdc.github.io`).

## 1. Create the Private Repository
Create a new private repository on GitHub (e.g., `portfolio-data-generator`).

## 2. Generate a Personal Access Token (PAT)
1. Go to your GitHub Settings -> Developer settings -> Personal access tokens -> Tokens (classic).
2. Generate a new token with the `repo` scope (this grants full control of private repositories).
3. Copy the token.

## 3. Configure the Secret in the Private Repository
1. Go to the Settings tab of your new private repository.
2. Navigate to Secrets and variables -> Actions.
3. Add a new repository secret:
   * **Name**: `PUBLIC_REPO_PAT`
   * **Secret**: (Paste the token you copied in step 2)

## 4. Add the Files

Add the following three files to your new private repository.

### `package.json`
```json
{
  "name": "portfolio-data-generator",
  "version": "1.0.0",
  "description": "Generates data for the public portfolio site",
  "main": "fetch_data.mjs",
  "type": "module",
  "dependencies": {
    "fast-xml-parser": "^4.3.5"
  }
}
```

### `fetch_data.mjs`
```javascript
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const MEDIUM_RSS_URL = 'https://medium.com/feed/@abhisaxj';

async function fetchMediumPosts() {
  console.log("Fetching Medium posts via RSS...");
  try {
    const res = await fetch(MEDIUM_RSS_URL);
    if (!res.ok) throw new Error(`Failed to fetch Medium RSS: ${res.status} ${res.statusText}`);
    const xmlData = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix : "@_" });
    const result = parser.parse(xmlData);
    const items = result.rss.channel.item || [];
    
    const posts = (Array.isArray(items) ? items : [items]).map(item => {
      let excerpt = "";
      const content = item['content:encoded'] || item.description || "";
      const pMatch = content.match(/<p>(.*?)<\\/p>/);
      if (pMatch && pMatch[1]) excerpt = pMatch[1].replace(/<[^>]*>?/gm, '').trim();
      else excerpt = content.replace(/<[^>]*>?/gm, '').trim();
      if (excerpt.length > 150) excerpt = excerpt.substring(0, 147) + "...";
      let categories = item.category || [];
      if (!Array.isArray(categories)) categories = [categories];
      
      return {
        title: item.title || "Untitled",
        excerpt: excerpt,
        link: item.link,
        tags: ["Medium", ...categories].slice(0, 3),
        date: new Date(item.pubDate).toISOString()
      };
    });
    return posts.filter(post => post.title !== "No title");
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}

async function fetchGitHubRepos() {
  console.log("Fetching GitHub repos...");
  try {
    const res = await fetch("https://api.github.com/users/abhijitdc/repos?per_page=100");
    if (!res.ok) throw new Error(`Failed to fetch GitHub API: ${res.status} ${res.statusText}`);
    const reposData = await res.json();
    return reposData
      .filter(r => !r.fork && r.name !== "abhijitdc.github.io")
      .map(r => ({
         name: r.name,
         description: r.description || "",
         link: r.html_url,
         stars: r.stargazers_count,
         tags: Array.from(new Set([...(r.topics || []), r.language].filter(Boolean))),
         updated_at: r.updated_at
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch(error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

async function main() {
  const posts = await fetchMediumPosts();
  
  // Inject Google Cloud Codelab manually
  posts.unshift({
    title: "Anti-Money Laundering & Fraud Prevention with BigQuery GraphRAG",
    excerpt: "Learn how to use BigQuery GraphRAG for Anti-Money Laundering and Fraud Prevention.",
    link: "https://codelabs.developers.google.com/codelabs/graphrag-with-bigquery",
    tags: ["Codelab", "BigQuery", "GraphRAG"],
    date: "2024-05-01T00:00:00.000Z"
  });
  const repos = await fetchGitHubRepos();
  const dataJs = \`export const PROFILE = {
  name: "Abhijit",
  title: "Software Engineer",
  bio: "I am a Software Engineer passionate about building scalable, secure, and intelligent systems. I specialize in cloud technologies, data engineering, and AI integrations, constantly exploring new ways to solve complex problems.",
  links: {
    github: "https://github.com/abhijitdc",
    medium: "https://medium.com/@abhisaxj",
    linkedin: "https://linkedin.com/in/abhijitdc",
    twitter: "https://twitter.com/abhisaxj"
  }
};\\n
export const MEDIUM_POSTS = \${JSON.stringify(posts, null, 2)};\\n
export const GITHUB_REPOS = \${JSON.stringify(repos, null, 2)};
\`;
  fs.writeFileSync("data.js", dataJs);
  console.log("Data written to data.js");
}

main().catch(console.error);
```

### `.github/workflows/push_data.yml`
```yaml
name: Generate and Push Data

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight UTC
  workflow_dispatch:

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout private repo
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Generate Data
        run: node fetch_data.mjs

      - name: Checkout public repo
        uses: actions/checkout@v4
        with:
          repository: abhijitdc/abhijitdc.github.io
          token: ${{ secrets.PUBLIC_REPO_PAT }}
          path: public-repo

      - name: Commit and push changes
        run: |
          cp data.js public-repo/src/data.js
          cd public-repo
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/data.js
          git diff-index --quiet HEAD || (git commit -m "Auto-update portfolio data" && git push)
```

## 5. First Run
Once the files are committed to the private repository, you can manually run the `Generate and Push Data` action from the "Actions" tab to trigger the first data sync!
