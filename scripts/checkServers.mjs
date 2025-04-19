// scripts/checkServers.js
import fetch from 'node-fetch';

const servers = [
  { name: "Auth API", url: process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5003" },
  { name: "User API", url: process.env.NEXT_PUBLIC_USER_API || "http://localhost:5002" },
  { name: "Comment API", url: process.env.NEXT_PUBLIC_COMMENT_API || "http://localhost:5004/api" },
  { name: "Tracking API", url: process.env.NEXT_PUBLIC_TRACKING_API || "http://localhost:5001" },
  { name: "Default API", url: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api" },
];

console.log("🔍 Checking backend server status...\n");

async function checkServer({ name, url }) {
  const fullUrl = `${url.replace(/\/+$/, '')}/health`;
  try {
    const res = await fetch(fullUrl, { timeout: 5000 });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log(`✅ ${name} is online at ${url}`);
  } catch (error) {
    console.error(`❌ ${name} failed: ${error.message}`);
  }
}

(async () => {
  await Promise.all(servers.map(checkServer));
})();
