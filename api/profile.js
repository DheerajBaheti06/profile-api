const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // CORS headers - must be set FIRST, before any other response
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // Only allow GET and HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, OPTIONS, HEAD');
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
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
