# External Integrations

**Analysis Date:** 2026-03-25

## APIs & External Services

**Transactional Email:**
- Resend API - Sends contact form submissions as HTML emails
  - SDK/Client: Direct `fetch()` to `https://api.resend.com/emails` (no npm package)
  - Auth: `RESEND_API_KEY` env var (Cloudflare Pages secret)
  - Implementation: `functions/api/contact.js` lines 264-277

**CAPTCHA / Bot Protection:**
- Cloudflare Turnstile - Client-side widget + server-side token verification
  - Client script: `https://challenges.cloudflare.com/turnstile/v0/api.js` (loaded inline in `content/contact.md`)
  - Site key (public): `0x4AAAAAACM6BCOrJAhBbWuw` (embedded in contact page markup)
  - Server verify endpoint: `https://challenges.cloudflare.com/turnstile/v0/siteverify`
  - Auth: `TURNSTILE_SECRET_KEY` env var (Cloudflare Pages secret)
  - Implementation: `functions/api/contact.js` lines 81-99 (verify), 132-162 (guard)

**Web Fonts:**
- Google Fonts - Loads Caveat (400/600/700) and Inter (400/600/700)
  - Loaded via `<link>` in `layouts/_default/baseof.html` lines 18-20
  - Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`

## Data Storage

**Databases:**
- None - fully static site; no database

**File Storage:**
- GitHub repository (`bogdan790/happybees.ro`) - content files, images, and all site source committed to git
- Uploaded media via Decap CMS is committed to `static/images/uploads/` in the repo

**Caching:**
- Cloudflare CDN (automatic edge caching as part of Cloudflare Pages hosting)

## Authentication & Identity

**Auth Provider:**
- GitHub OAuth via Decap CMS backend
  - CMS backend config: `static/admin/config.yml` lines 2-7
  - OAuth proxy/worker: `https://happybees-auth.pavel-bogdann.workers.dev` (custom Cloudflare Worker acting as OAuth intermediary)
  - Auth endpoint: `/auth`
  - Repo: `bogdan790/happybees.ro`, branch `main`
  - Only used for CMS access at `/admin/`; public site has no authentication

## Monitoring & Observability

**Error Tracking:**
- None configured

**Analytics:**
- Google Analytics is commented out in `config.toml` (line 33): `# google_analytics = "G-XXXXXXXXXX"`
- No active analytics currently deployed

**Logs:**
- `console.log` / `console.error` in `functions/api/contact.js` - visible in Cloudflare Pages Functions log dashboard

## CI/CD & Deployment

**Hosting:**
- Cloudflare Pages (Free plan)
  - Auto-deploys on every push to `main` branch
  - Build command: `hugo --minify`
  - Build output directory: `public/`
  - Env var required: `HUGO_VERSION=0.122.0`

**CI Pipeline:**
- No separate CI pipeline; Cloudflare Pages handles build and deploy automatically

## Environment Configuration

**Required env vars (set in Cloudflare Pages dashboard):**
- `RESEND_API_KEY` - Resend API key for sending emails
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key for server-side verification
- `HUGO_VERSION` - Must be `0.122.0` to match local development version
- `EMAIL_FROM` - (optional) Sender address, defaults to `site@happybees.ro`
- `EMAIL_TO` - (optional) Recipient address, defaults to `bogdan.pavel@happybees.ro`

**Secrets location:**
- All secrets stored as Cloudflare Pages environment variables (encrypted)
- No `.env` file committed to repository

## Webhooks & Callbacks

**Incoming:**
- `/api/contact` (POST) - Contact form handler; implemented as Cloudflare Pages Function at `functions/api/contact.js`
  - Accepts JSON body: `{ name, email, phone, message, website (honeypot), turnstileToken }`
  - Returns JSON: `{ success, message|error, emailId }`
  - CORS preflight handled by `onRequestOptions` export in same file

**Outgoing:**
- Resend API (`https://api.resend.com/emails`) - Called by contact function on valid form submission
- Cloudflare Turnstile verify (`https://challenges.cloudflare.com/turnstile/v0/siteverify`) - Called per form submission to verify CAPTCHA token

---

*Integration audit: 2026-03-25*
