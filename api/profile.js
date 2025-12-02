const fs = require('fs');
const path = require('path');

// Read profile.json once at startup
const profilePath = path.join(__dirname, '..', 'profile.json');
let profile = {};
try {
  const raw = fs.readFileSync(profilePath, 'utf8');
  profile = JSON.parse(raw);
} catch (err) {
  // keep profile empty and return an error in handler if needed
  console.error('Failed to read profile.json:', err.message);
}

module.exports = (req, res) => {
  // Basic CORS so the endpoint can be used from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (!profile || Object.keys(profile).length === 0) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'profile.json not found or invalid' }));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(profile));
};
