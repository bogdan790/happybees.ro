/**
 * Cloudflare Pages Function - Contact Form Handler
 * Sends email via SMTP using credentials from environment variables
 */

// Nodemailer will be installed by Cloudflare Pages at build time
const nodemailer = require('nodemailer');

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

    // Create SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT || '587'),
      secure: env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: env.SMTP_FROM || env.SMTP_USER,
      to: env.SMTP_TO,
      replyTo: email,
      subject: `Contact Happy Bees: ${name}`,
      text: `
Nume: ${name}
Email: ${email}
${phone ? `Telefon: ${phone}` : ''}

Mesaj:
${message}
      `,
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
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mesajul a fost trimis cu succes! Vă vom contacta în curând.'
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
    console.error('Error sending email:', error);

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
