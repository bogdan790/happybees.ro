# Technology Stack

**Analysis Date:** 2026-03-25

## Languages

**Primary:**
- HTML (Go Templates) - Hugo layout templates in `layouts/`
- CSS - Site styling in `assets/css/main.css`
- JavaScript (ES Modules, vanilla) - Browser scripts in `static/js/`, Cloudflare Functions in `functions/`
- YAML/TOML - Configuration and content front-matter
- Markdown - Content files in `content/`

**Secondary:**
- Go Template syntax - Used inside all `.html` files under `layouts/`

## Runtime

**Environment:**
- Hugo static site generator (Go binary, no Node runtime for build)
- Cloudflare Pages Functions runtime (V8 isolates, Web APIs only - no Node.js globals)

**Package Manager:**
- npm (used only for dev tooling/testing)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Hugo v0.122.0 Extended - Static site generator; builds HTML from templates + Markdown content
- Decap CMS (self-hosted) - Git-based CMS UI served from `static/admin/`; no server required

**Testing:**
- `@playwright/test` (present in `node_modules`) - E2E testing
- `playwright` / `playwright-core` - Browser automation for tests

**Build/Dev:**
- Hugo CLI - Build command: `hugo --minify` (see `build.sh` and `package.json`)
- Cloudflare Pages - CI/CD and hosting; detects git commits and auto-deploys

## Key Dependencies

**Critical:**
- Hugo v0.122.0 - Must match the version deployed on Cloudflare Pages (set via `HUGO_VERSION` env var)
- Decap CMS - Loaded from `static/admin/index.html`; version pinned in that file
- Cloudflare Pages Functions - Serverless function runtime for the contact form API at `functions/api/contact.js`

**Infrastructure:**
- `uuid` - Present in node_modules (likely pulled in transitively by Playwright or testing)
- `resend` - Present in node_modules but NOT used in production code; contact form uses direct `fetch()` to Resend API instead

## Configuration

**Environment:**
- Cloudflare Pages env vars required for the contact function:
  - `RESEND_API_KEY` - Resend transactional email API key
  - `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile server-side secret for CAPTCHA verification
  - `EMAIL_FROM` - Sender email address (default: `site@happybees.ro`)
  - `EMAIL_TO` - Recipient email address (default: `bogdan.pavel@happybees.ro`)
- Hugo build env var:
  - `HUGO_VERSION=0.122.0` - Set in Cloudflare Pages build settings

**Build:**
- `config.toml` - Primary Hugo configuration (base URL, language, menus, image processing, minify)
- `build.sh` - Wrapper build script: runs `hugo --minify`
- `package.json` - Defines `build` script as `hugo --minify`

## Platform Requirements

**Development:**
- Hugo v0.122.0 Extended binary installed locally
- Node.js + npm (for Playwright tests only)
- Cloudflare Wrangler (optional, for local Pages Functions testing)

**Production:**
- Cloudflare Pages (Free plan)
- GitHub repository (`bogdan790/happybees.ro`, branch `main`) as source of truth
- Custom domain `happybees.ro` via Cloudflare DNS CNAME

---

*Stack analysis: 2026-03-25*
