# Profile API (Vercel-ready)

This repository exposes your `profile.json` via a Vercel Serverless Function and includes a simple frontend to fetch it.

Files added:
- `api/profile.js` — serverless API that returns the contents of `profile.json` as JSON
- `index.html` — simple frontend which fetches `/api/profile`
- `package.json` — minimal manifest with a `start` script for local dev with Vercel CLI

How to deploy

1. Push this repository to GitHub.
2. In Vercel, import the GitHub repo and deploy (Vercel detects the `api/` folder automatically).

How to test locally

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Run local dev server:

```bash
vercel dev
```

3. Open `http://localhost:3000` to view the frontend, or `http://localhost:3000/api/profile` to view raw JSON.

Fetch example (from any client):

```bash
curl https://<your-vercel-project>.vercel.app/api/profile
```

Notes

- The API reads `profile.json` at startup. If you update `profile.json` after deployment, redeploy to Vercel to pick up changes.
- CORS is enabled so you can fetch the API from other origins.
