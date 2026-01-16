---
title: "Contact"
intro: "Ai întrebări sau vrei să comanzi? Completează formularul sau contactează-ne direct."
info:
  email: "bogdan.pavel@happybees.ro"
  telefon: "+40 7XX XXX XXX"
  locatie: "Brătășani, județul Teleorman"
  program: |
    Luni - Vineri: 9:00 - 18:00
    Sâmbătă - Duminică: La programare
  maps_embed: ""
---

Pentru comenzi, întrebări sau orice nelămurire, nu ezita să ne contactezi!

## Formular de contact

<!-- Cloudflare Turnstile Script - trebuie încărcat ÎNAINTE de widget -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<div class="form-wrapper">
<form id="contact-form" class="contact-form">
  <div class="form-group">
    <label for="name">Nume *</label>
    <input type="text" id="name" name="name" required placeholder="Ion Popescu">
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required placeholder="ion@email.ro">
  </div>

  <div class="form-group">
    <label for="phone">Telefon</label>
    <input type="tel" id="phone" name="phone" placeholder="+40 7XX XXX XXX">
  </div>

  <div class="form-group">
    <label for="message">Mesaj *</label>
    <textarea id="message" name="message" rows="6" required placeholder="Scrie mesajul tău aici..."></textarea>
  </div>

  <!-- Honeypot anti-spam (ascuns pentru utilizatori, vizibil pentru boți) -->
  <div class="form-group-hp" aria-hidden="true">
    <label for="website">Website</label>
    <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
  </div>

  <!-- Cloudflare Turnstile -->
  <div class="cf-turnstile" data-sitekey="0x4AAAAAACM0m9V4SkT8FMWq" data-callback="onTurnstileSuccess" data-theme="light"></div>

  <div id="form-message" class="form-message" style="display: none;"></div>

  <button type="submit" class="btn btn-primary">Trimite mesaj</button>
</form>
</div>

<div class="privacy-note-wrapper">
<p class="privacy-note">
  Datele transmise sunt folosite exclusiv pentru a răspunde solicitării tale. Pentru detalii consultă <a href="/politica-de-confidentialitate">Politica de confidențialitate</a>.
</p>
</div>

<script src="/js/contact.js"></script>

<script>
// Mută privacy note în funcție de viewport
function repositionPrivacyNote() {
  const privacyNote = document.querySelector('.privacy-note');
  const desktopContainer = document.querySelector('.privacy-note-desktop-container');
  const submitButton = document.querySelector('.contact-form button[type="submit"]');
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  if (!privacyNote) return;

  if (isDesktop && desktopContainer) {
    // Desktop: mută în container-ul din coloana dreaptă (sub card)
    if (!desktopContainer.contains(privacyNote)) {
      desktopContainer.appendChild(privacyNote);
    }
  } else if (!isDesktop && submitButton) {
    // Mobil: mută înainte de butonul "Trimite mesaj"
    if (privacyNote.nextElementSibling !== submitButton) {
      submitButton.parentNode.insertBefore(privacyNote, submitButton);
    }
  }
}

// Rulează la încărcare și la resize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', repositionPrivacyNote);
} else {
  repositionPrivacyNote();
}

window.addEventListener('resize', repositionPrivacyNote);
</script>

<style>
/* Honeypot - ascuns pentru utilizatori, vizibil pentru boți */
.form-group-hp {
  position: absolute;
  left: -9999px;
  top: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Turnstile widget */
.cf-turnstile {
  margin-bottom: 1rem;
}

.contact-form {
  max-width: 600px;
  margin: 2rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-black, #1a1a1a);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-honey-gold, #E6B84E);
}

.form-message {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  font-weight: 500;
}

.form-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--color-honey-gold, #E6B84E);
  color: var(--color-black, #1a1a1a);
}

.btn-primary:hover {
  background-color: #d4a63e;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.privacy-note {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-gray-medium, #4a4a4a);
  line-height: 1.6;
}

.privacy-note a {
  color: var(--color-honey-gold, #E6B84E);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.privacy-note a:hover {
  color: var(--color-honey-hover, #FFCC5C);
}

/* Ascunde wrapper-ul privacy-note-wrapper pe desktop (elementul va fi mutat) */
@media (min-width: 768px) {
  .privacy-note-wrapper {
    display: none;
  }

  /* Container pentru privacy note pe desktop */
  .privacy-note-desktop-container {
    margin-top: var(--space-lg);
  }

  /* Stilizare pentru privacy-note ca element distinct pe desktop */
  .privacy-note-desktop-container .privacy-note {
    padding: 1rem 1.25rem;
    background-color: var(--color-cream-light, #FFFBF0);
    border-left: 3px solid var(--color-honey-gold, #E6B84E);
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--color-gray-medium, #4a4a4a);
    line-height: 1.6;
    text-align: left;
    margin: 0;
  }

  .privacy-note-desktop-container .privacy-note a {
    color: var(--color-honey-gold, #E6B84E);
    font-weight: 600;
  }

  .privacy-note-desktop-container .privacy-note a:hover {
    color: var(--color-honey-hover, #FFCC5C);
  }
}

/* Pe mobil, privacy-note este mutat înainte de butonul submit */
@media (max-width: 767px) {
  /* Ascunde wrapper-ul original și container-ul desktop pe mobil */
  .privacy-note-wrapper,
  .privacy-note-desktop-container {
    display: none;
  }

  /* Stilizare pentru privacy-note când este în formular (înainte de submit) */
  .contact-form .privacy-note {
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    background-color: var(--color-cream-light, #FFFBF0);
    border-left: 3px solid var(--color-honey-gold, #E6B84E);
    border-radius: 4px;
    font-size: 0.85rem;
    color: var(--color-gray-medium, #4a4a4a);
    line-height: 1.6;
    text-align: left;
  }

  .contact-form .privacy-note a {
    color: var(--color-honey-gold, #E6B84E);
    font-weight: 600;
  }

  .contact-form .privacy-note a:hover {
    color: var(--color-honey-hover, #FFCC5C);
  }
}
</style>
