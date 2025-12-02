# Profile API (Vercel-ready)

This repository exposes your `profile.json` via serverless functions under the `api/` folder. It's intended to be an API-only project (no frontend served from the root).

Endpoints

- `GET /api/profile` — returns the contents of `profile.json` as JSON with `Content-Type: application/json`.
- `GET /api/profile.json` — alias that returns the same JSON payload (convenient for direct API consumption).

Local testing

1. Install Vercel CLI (optional but recommended for local serverless testing):

```bash
npm install -g vercel
```

2. Run the local dev server:

```bash
vercel dev
```

3. Test the API:

```bash
# raw JSON
curl -i http://localhost:3000/api/profile.json

# or
curl -i http://localhost:3000/api/profile
```

Deploy

1. Push this repository to GitHub.
2. Import the repo into Vercel (or connect the GitHub repo) and deploy; Vercel will detect the `api/` folder and create serverless functions.

Notes

- `api/profile.js` reads `profile.json` from the repository root per-request and returns proper HTTP status codes:
	- `200` — success
	- `404` — `profile.json` not found
	- `405` — method not allowed
	- `500` — server error / invalid JSON
- CORS is enabled so the endpoints can be called from browsers or external services.
- If you want the repository to be purely API (no static files), keep `index.html` removed so the root won't serve an HTML page.

