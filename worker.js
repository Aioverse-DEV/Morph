// Cloudflare Worker for MORPH-UAV Requirements Form

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API submission endpoint
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      try {
        const { data, emailHTML } = await request.json();
        
        // Send email using email service (configure via Cloudflare Email Workers or external service)
        // TODO: This is placeholder behavior until email service is configured
        const emailResult = await sendEmail(env, {
          to: 'shivansh@aiotize.com',
          subject: `MORPH-UAV Requirements - ${data.refId}`,
          html: emailHTML,
          formData: data
        });

        if (emailResult) {
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

    // Serve static assets - Workers Sites handles this automatically
    // When deployed with wrangler and [site] config, static files are served from __STATIC_CONTENT
    // This is a fallback response - in production, wrangler injects asset serving code
    return new Response('Worker is running. Deploy with `wrangler deploy` to enable full functionality.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

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
  
  // Placeholder: log and return true until email service is configured
  console.log('Email would be sent:', emailData);
  return true;
}
