const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Basic CORS so the endpoint can be used from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET,OPTIONS');
    return res.end();
  }

  const profilePath = path.join(process.cwd(), 'profile.json');

  res.setHeader('Content-Type', 'application/json');

  fs.readFile(profilePath, 'utf8', (err, raw) => {
    if (err) {
      const code = err.code === 'ENOENT' ? 404 : 500;
      res.statusCode = code;
      return res.end(JSON.stringify({ error: err.code === 'ENOENT' ? 'profile.json not found' : 'failed to read profile.json' }));
    }

    try {
      const profile = JSON.parse(raw);
      res.statusCode = 200;
      return res.end(JSON.stringify(profile));
    } catch (parseErr) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: 'invalid JSON in profile.json' }));
    }
  });
};
