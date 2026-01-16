/**
 * Cloudflare Pages Function - Contact Form Handler
 * Sends email via Resend API (HTTP-based, Cloudflare Workers compatible)
 * With anti-spam protection: Honeypot + Cloudflare Turnstile + Gibberish Detection
 */

import { Resend } from 'resend';

/**
 * Detect gibberish/random text
 * Returns true if text appears to be gibberish
 */
function isGibberish(text) {
  if (!text || text.length < 2) return true;

  const lowerText = text.toLowerCase();

  // Vocale (inclusiv caractere românești)
  const vowels = 'aeiouăâî';
  const consonants = 'bcdfghjklmnpqrstvwxyz';

  // Numără vocale
  let vowelCount = 0;
  for (const char of lowerText) {
    if (vowels.includes(char)) vowelCount++;
  }

  // Calculează procentajul de vocale (textul normal are ~35-45% vocale)
  const letterCount = lowerText.replace(/[^a-zăâîșț]/g, '').length;
  if (letterCount === 0) return true;

  const vowelRatio = vowelCount / letterCount;

  // Dacă procentajul de vocale este prea mic (<15%) sau prea mare (>70%), e suspect
  if (vowelRatio < 0.15 || vowelRatio > 0.70) return true;

  // Verifică consoane consecutive (max 4 în română, ex: "strâ")
  const consonantSequence = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
  if (consonantSequence.test(lowerText)) return true;

  // Verifică dacă are cel puțin un cuvânt valid (2+ litere urmate de vocală)
  const hasValidWord = /[a-zăâîșț]{2,}/i.test(lowerText);
  if (!hasValidWord) return true;

  return false;
}

/**
 * Validate name - must be at least 2 chars and not gibberish
 */
function isValidName(name) {
  if (!name || name.trim().length < 2) return false;
  if (isGibberish(name)) return false;
  return true;
}

/**
 * Validate message - must be at least 10 chars and not gibberish
 */
function isValidMessage(message) {
  if (!message || message.trim().length < 10) return false;
  if (isGibberish(message)) return false;
  return true;
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token, secretKey, ip) {
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  if (ip) {
    formData.append('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const result = await response.json();
  return result;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse form data
    const formData = await request.json();
    const { name, email, phone, message, website, turnstileToken } = formData;

    // ============================================
    // ANTI-SPAM CHECK 1: Honeypot
    // If the honeypot field is filled, it's a bot
    // ============================================
    if (website && website.trim() !== '') {
      console.log('Honeypot triggered - spam detected');
      // Return success to not alert the bot, but don't send email
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mesajul a fost trimis cu succes!'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // ============================================
    // ANTI-SPAM CHECK 2: Cloudflare Turnstile
    // Verify the Turnstile token if secret key is configured
    // ============================================
    if (env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Verificarea de securitate lipsește. Vă rugăm reîncărcați pagina.'
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const clientIP = request.headers.get('CF-Connecting-IP') || '';
      const turnstileResult = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIP);

      if (!turnstileResult.success) {
        console.log('Turnstile verification failed:', turnstileResult['error-codes']);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Verificarea de securitate a eșuat. Vă rugăm încercați din nou.'
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

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

    // ============================================
    // ANTI-SPAM CHECK 3: Gibberish Detection
    // Block random/gibberish text in name and message
    // ============================================
    if (!isValidName(name)) {
      console.log('Gibberish name detected:', name);
      // Return success to not alert the bot, but don't send email
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mesajul a fost trimis cu succes!'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!isValidMessage(message)) {
      console.log('Gibberish message detected:', message);
      // Return success to not alert the bot, but don't send email
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mesajul a fost trimis cu succes!'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Resend client with API key from environment
    const resend = new Resend(env.RESEND_API_KEY);

    // Send email using Resend API
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM || 'site@happybees.ro',
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
