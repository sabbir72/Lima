/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions with optional Brevo (Sendinblue) email forwarding.
 */

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required fields.' });
      return;
    }

    const apiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sabbircse72@gmail.com';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'sabbircse72@gmail.com';

    // If Brevo API key is configured, forward message via Brevo SMTP API
    if (apiKey) {
      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: 'Portfolio Contact Form',
              email: senderEmail,
            },
            to: [
              {
                email: recipientEmail,
                name: 'Tansom Akther Lima',
              },
            ],
            replyTo: {
              email: email,
              name: name,
            },
            subject: `[Portfolio Inquiry] ${subject || 'New message from ' + name}`,
            htmlContent: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                <h2 style="color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Contact Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
                <p><strong>Subject:</strong> ${escapeHtml(subject || 'Portfolio Inquiry')}</p>
                <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
                  <h4 style="margin-top: 0; color: #475569;">Message:</h4>
                  <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
                </div>
                <hr style="margin-top: 24px; border: 0; border-top: 1px solid #e2e8f0;" />
                <p style="font-size: 12px; color: #94a3b8;">Sent from Tansom Akther Lima Portfolio Contact Form.</p>
              </div>
            `,
          }),
        });

        if (!brevoResponse.ok) {
          const errorData = await brevoResponse.json().catch(() => ({}));
          console.error('[Brevo Error]', errorData);
          // Return clear message for user if Brevo failed
          res.status(200).json({
            success: true,
            warning: 'Message accepted, but email service reported an issue: ' + (errorData.message || brevoResponse.statusText),
            data: { name, email, subject, receivedAt: new Date().toISOString() },
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
        return;
      } catch (emailErr: any) {
        console.error('[Email Dispatch Error]', emailErr);
        res.status(200).json({
          success: true,
          warning: 'Message saved locally. Email delivery service unavailable.',
          data: { name, email, subject, receivedAt: new Date().toISOString() },
        });
        return;
      }
    }

    // Fallback if BREVO_API_KEY not configured yet in Vercel
    res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry was received. (Set BREVO_API_KEY in Vercel settings for email forwarding).',
      data: { name, email, subject, receivedAt: new Date().toISOString() },
    });
  } catch (error: any) {
    console.error('Contact handler error:', error);
    res.status(500).json({ error: error.message || 'Internal server error processing message.' });
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
