# Morph

MORPH-UAV Requirements Intelligence Form - A modern HTML form for capturing UAV system requirements for Aiotize Inc.

## Project Structure

```
├── index.html       # Main HTML form
├── styles.css       # Stylesheet with Aiotize branding
├── script.js        # Client-side JavaScript
├── wrangler.toml    # Cloudflare Workers configuration
├── worker.js        # Original combined file (legacy)
└── README.md        # This file
```

## Features

- Modern, responsive design with Aiotize Inc. branding
- Custom Nebula2 font integration
- Progress tracking for form completion
- File upload support for sketches and documents
- Client-side form validation
- Real-time visual feedback

## Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Aioverse-DEV/Morph.git
cd Morph
```

2. Open `index.html` in your web browser:
```bash
# Using npx serve (recommended)
npx serve -p 8000

# Or using Python
python3 -m http.server 8000

# then visit http://localhost:8000
```

### Cloudflare Workers Deployment

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Authenticate with Cloudflare:
```bash
wrangler login
```

3. Deploy to Cloudflare Workers:
```bash
wrangler deploy
```

## Development

The project uses:
- **HTML5** for structure
- **CSS3** with custom properties for styling
- **Vanilla JavaScript** for interactivity
- **Google Fonts** (Orbitron, Share Tech Mono, Barlow)
- **Custom Nebula2 font** from Aiotize branding

## Links

- Framer Project: https://framer.com/projects/Untitled--Ut6C3jE0vqBg2NYzl4si-9sqnw
- Cloudflare Dashboard: https://dash.cloudflare.com/048e409496db06a280a582b5749a6170/workers/services/edit/morph-uav-form/production

## License

See LICENSE file for details.

## Contact

Aiotize Inc.
- Website: https://branding.aio3.ai
- Email: shivansh@aiotize.com
- Location: Chandigarh, India · UAE Operations
