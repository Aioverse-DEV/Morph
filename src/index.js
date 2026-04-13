/**
 * Cloudflare Worker for MORPH-UAV Form
 * Handles form submissions and serves static assets
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle form submission
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        
        // TODO: Process form data
        // - Send email notification
        // - Store in database
        // - Generate PDF
        
        // For now, return success response
        return new Response(JSON.stringify({
          success: true,
          message: 'Form submitted successfully',
          refId: 'MU-' + Date.now().toString(36).toUpperCase()
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Serve static files
    // In production, configure Workers Sites in wrangler.toml to serve from bucket
    return new Response('Static file serving configured via Workers Sites', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
