/**
 * Contact Form Handler
 * Sends form data to Cloudflare Pages Function via API
 * With anti-spam protection: Honeypot + Cloudflare Turnstile
 */

// Global variable to store Turnstile token
let turnstileToken = null;

// Callback function for Turnstile success
window.onTurnstileSuccess = function(token) {
  turnstileToken = token;
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = form?.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Se trimite...';
    }

    // Clear previous messages
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.className = '';
    }

    // Get form data including honeypot
    const formData = {
      name: form.querySelector('#name')?.value.trim(),
      email: form.querySelector('#email')?.value.trim(),
      phone: form.querySelector('#phone')?.value.trim(),
      message: form.querySelector('#message')?.value.trim(),
      // Honeypot field (should be empty for real users)
      website: form.querySelector('#website')?.value || '',
      // Turnstile token
      turnstileToken: turnstileToken || ''
    };

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      showMessage('error', 'Vă rugăm completați toate câmpurile obligatorii.');
      resetButton();
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage('error', 'Vă rugăm introduceți o adresă de email validă.');
      resetButton();
      return;
    }

    // Check Turnstile token (if widget is present)
    const turnstileWidget = document.querySelector('.cf-turnstile');
    if (turnstileWidget && !formData.turnstileToken) {
      showMessage('error', 'Vă rugăm să completați verificarea de securitate.');
      resetButton();
      return;
    }

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage('success', result.message || 'Mesajul a fost trimis cu succes!');
        form.reset();
        // Reset Turnstile widget
        if (window.turnstile && turnstileWidget) {
          window.turnstile.reset();
          turnstileToken = null;
        }
      } else {
        showMessage('error', result.error || 'A apărut o eroare. Vă rugăm încercați din nou.');
        // Reset Turnstile on error
        if (window.turnstile && turnstileWidget) {
          window.turnstile.reset();
          turnstileToken = null;
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('error', 'A apărut o eroare la trimiterea mesajului. Vă rugăm încercați din nou mai târziu.');
    } finally {
      resetButton();
    }
  });

  function showMessage(type, text) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetButton() {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Trimite mesaj';
    }
  }
});
