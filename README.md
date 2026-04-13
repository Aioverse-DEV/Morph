# Morph

MORPH-UAV Requirements Intelligence Form - A Cloudflare Worker application for collecting UAV system requirements.

## Overview

This is a Cloudflare Worker-powered web application that serves a requirements intelligence form for MORPH-UAV systems. The form collects detailed specifications from requesting authorities and sends structured briefs to the Aiotize Advanced Programmes team.

## Structure

- `worker.js` - Cloudflare Worker script that handles requests and API endpoints
- `index.html` - Main form interface with embedded styling and JavaScript
- `wrangler.toml` - Cloudflare Workers configuration file
- `package.json` - Node.js project configuration

## Deployment

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed
- Cloudflare account

### Setup

1. Install dependencies:
```bash
npm install
```

2. Configure wrangler (if not already logged in):
```bash
wrangler login
```

3. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

### Local Development

Run the worker locally:
```bash
npm run dev
```

This will start a local development server, typically at `http://localhost:8787`.

## Configuration

### Email Service

The worker includes a placeholder for email functionality. To enable email submissions:

1. Choose an email service (SendGrid, Mailgun, Cloudflare Email Routing, etc.)
2. Add your API key as a secret:
```bash
wrangler secret put EMAIL_API_KEY
```
3. Update the `sendEmail` function in `worker.js` with your email service integration

### Custom Domain

To use a custom domain, update `wrangler.toml` with your route configuration:

```toml
routes = [
  { pattern = "morph.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## Features

- Comprehensive UAV requirements collection form
- Real-time form validation
- Progress tracking
- Responsive design with Aiotize branding
- Email notification system (requires configuration)
- Reference ID generation for tracking

## License

See LICENSE file for details.

## Contact

- Website: [aiotize.com](https://aiotize.com)
- Email: shivansh@aiotize.com
- Phone: +91 97630 00088