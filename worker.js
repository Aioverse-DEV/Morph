// Cloudflare Worker for MORPH-UAV Requirements Form

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle API submission endpoint
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      try {
        const { data, emailHTML } = await request.json();
        
        // Send email using email service (configure via Cloudflare Email Workers or external service)
        const emailSent = await sendEmail(env, {
          to: 'shivansh@aiotize.com',
          subject: `MORPH-UAV Requirements - ${data.refId}`,
          html: emailHTML,
          formData: data
        });

        if (emailSent) {
          return new Response(JSON.stringify({ success: true, refId: data.refId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ success: false, error: 'Email sending failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve the HTML form for all other requests
    // For Workers Sites (bucket = "."), static content is served automatically
    // The __STATIC_CONTENT namespace is provided by Workers Sites
    try {
      const asset = await getAssetFromKV(
        {
          request,
          waitUntil(promise) {
            return Promise.resolve(promise);
          },
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT || {},
          ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST || {},
        }
      );
      return asset;
    } catch (e) {
      // Fallback to a simple response if asset serving fails
      return new Response('Please ensure the Worker is deployed with Workers Sites configuration.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};

// Import KV asset handler if using Workers Sites
// Note: When using wrangler, this is provided automatically
async function getAssetFromKV(event, options) {
  // This is a simplified version. In production, wrangler provides this via @cloudflare/kv-asset-handler
  // For now, return a placeholder that instructs to use proper deployment
  const url = new URL(event.request.url);
  const path = url.pathname === '/' ? '/index.html' : url.pathname;
  
  // In actual deployment, wrangler handles this via the __STATIC_CONTENT namespace
  throw new Error('Asset serving requires proper wrangler deployment with Workers Sites');
}

// Helper function to send email
async function sendEmail(env, emailData) {
  // TODO: Implement email sending logic
  // Options:
  // 1. Use Cloudflare Email Routing/Workers
  // 2. Use external API like SendGrid, Mailgun, etc.
  // 3. Use env bindings for API keys
  
  // Example using fetch to an external email API:
  // if (env.EMAIL_API_KEY) {
  //   const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${env.EMAIL_API_KEY}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       personalizations: [{ to: [{ email: emailData.to }] }],
  //       from: { email: 'noreply@aiotize.com' },
  //       subject: emailData.subject,
  //       content: [{ type: 'text/html', value: emailData.html }]
  //     })
  //   });
  //   return response.ok;
  // }
  
  // For now, log and return true as a placeholder
  console.log('Email would be sent:', emailData);
  return true;
}
