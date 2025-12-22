/**
 * Cloudflare Pages Function - Contact Form Handler
 * Sends email via Resend API (HTTP-based, Cloudflare Workers compatible)
 */

import { Resend } from 'resend';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse form data
    const formData = await request.json();
    const { name, email, phone, message } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Toate câmpurile obligatorii trebuie completate.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Adresa de email nu este validă.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Resend client with API key from environment
    const resend = new Resend(env.RESEND_API_KEY);

    // Send email using Resend API
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM || 'noreply@happybees.ro',
      to: env.EMAIL_TO || 'bogdan.pavel@happybees.ro',
      replyTo: email,
      subject: `Contact Happy Bees: ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E6B84E; color: #1a1a1a; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #E6B84E; }
    .message { background: white; padding: 15px; border-left: 3px solid #E6B84E; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 Mesaj nou de pe Happy Bees</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nume:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      ${phone ? `<div class="field"><span class="label">Telefon:</span> ${phone}</div>` : ''}
      <div class="message">
        <strong>Mesaj:</strong><br>
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    // Check for errors from Resend API
    if (error) {
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'A apărut o eroare la trimiterea mesajului. Vă rugăm încercați din nou mai târziu.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mesajul a fost trimis cu succes! Vă vom contacta în curând.',
        emailId: data?.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'A apărut o eroare la trimiterea mesajului. Vă rugăm încercați din nou mai târziu.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
