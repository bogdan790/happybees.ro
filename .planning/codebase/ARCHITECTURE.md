# Architecture

**Analysis Date:** 2026-03-25

## Pattern Overview

**Overall:** Static Site Generation (SSG) with serverless API

**Key Characteristics:**
- Hugo generates all HTML at build time; no server-side rendering at request time
- Content is decoupled from templates: Markdown front matter drives all page data
- The only dynamic runtime component is a single Cloudflare Pages Function (`/api/contact`) for form handling
- Decap CMS provides a browser-based editing interface that commits directly to GitHub, triggering Cloudflare Pages to rebuild and redeploy

## Layers

**Content Layer:**
- Purpose: All site content stored as Markdown files with YAML front matter
- Location: `content/`
- Contains: Page data (text, prices, availability flags, structured objects) and body Markdown
- Depends on: Nothing — pure data
- Used by: Hugo template layer at build time

**Data Layer:**
- Purpose: Sitewide configuration data consumed by templates
- Location: `data/`
- Contains: `menu.yaml`, `footer.yaml`, `site.yaml`
- Depends on: Nothing
- Used by: Hugo templates via `.Site.Data.*`

**Template Layer:**
- Purpose: Transforms content into HTML using Hugo's Go template language
- Location: `layouts/`
- Contains: Base shell (`baseof.html`), page-type layouts, section layouts, partials
- Depends on: Content Layer, Data Layer, `config.toml`
- Used by: Hugo build process

**Asset Layer:**
- Purpose: CSS design system and client-side JavaScript
- Location: `assets/css/main.css`, `static/js/`
- Contains: Single CSS file with CSS custom properties design tokens; two JS files for UI behaviour
- Depends on: Nothing (CSS) / DOM (JS)
- Used by: All rendered HTML pages

**Serverless Function Layer:**
- Purpose: Handle contact form POST submissions at runtime
- Location: `functions/api/contact.js`
- Contains: Anti-spam logic (honeypot, Turnstile, gibberish detection), Resend API email dispatch
- Depends on: Cloudflare Workers runtime, `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` environment secrets
- Used by: `static/js/contact.js` via `fetch('/api/contact', { method: 'POST' })`

**CMS Layer:**
- Purpose: Visual editing interface for non-technical users
- Location: `static/admin/` (served at `/admin/`)
- Contains: `config.yml` (Decap CMS schema), `index.html` (SPA entry point)
- Depends on: GitHub OAuth (via external Cloudflare Worker auth proxy at `https://happybees-auth.pavel-bogdann.workers.dev`)
- Used by: Content editors — saves directly to GitHub repo, triggering rebuild

## Data Flow

**Page Rendering (build time):**

1. Hugo reads `config.toml` for global params, menu definitions, and build settings
2. Hugo reads each Markdown file in `content/` — front matter becomes `.Params`, body becomes `.Content`
3. Hugo selects the matching template from `layouts/` based on content type and kind (home, single, list, section)
4. Templates render to HTML by interpolating `.Params`, `.Content`, and `.Site.*` data
5. CSS (`assets/css/main.css`) is processed and written to `public/css/`
6. Output HTML + assets written to `public/` (not committed; generated on Cloudflare Pages)

**Contact Form (runtime):**

1. User submits `#contact-form` on `/contact/`
2. `static/js/contact.js` intercepts submit, validates client-side, collects Turnstile token
3. JS POSTs JSON `{ name, email, phone, message, website, turnstileToken }` to `/api/contact`
4. Cloudflare Pages routes `/api/contact` to `functions/api/contact.js`
5. Function checks honeypot → verifies Turnstile → validates fields → checks for gibberish
6. On pass: calls Resend API via `fetch('https://api.resend.com/emails')` with HTML email
7. Returns JSON `{ success, message }` — JS shows feedback to user

**CMS Content Edit (runtime):**

1. Editor opens `https://happybees.ro/admin/`
2. Decap CMS authenticates via GitHub OAuth (proxied through external Cloudflare Worker)
3. Editor modifies content via the GUI, Decap CMS commits the changed Markdown file to `main` branch
4. Cloudflare Pages detects the push and triggers a full Hugo rebuild and deploy

**State Management:**
- No client-side state beyond transient UI state (mobile nav open/closed, form submit status)
- All persistent state lives in the GitHub repository as Markdown/YAML files

## Key Abstractions

**Hugo Front Matter as Data Model:**
- Purpose: Replaces a database — every page's structured data lives in YAML front matter
- Examples: `content/produse/miere-salcam.md` (price, availability, gallery), `content/_index.md` (hero, CTAs, section titles)
- Pattern: Templates use `.Params.fieldname` to access any front matter key; `{{ with .Params.hero }}` guards optional sections

**Block-based Homepage Sections:**
- Purpose: Homepage is composed of named sections, each driven by its own front matter object
- Examples: `hero`, `despre_preview`, `produse_featured`, `articole_recente`, `cta_final` in `content/_index.md`
- Pattern: `{{ with .Params.sectionname }}...{{ end }}` in `layouts/index.html` — section only renders if data is present

**Hugo Template Inheritance:**
- Purpose: All pages share a single HTML shell without duplication
- Examples: `layouts/baseof.html` defines `<html>`, `<head>`, header partial, footer partial, and `{{ block "main" }}` slot
- Pattern: Section-specific layouts use `{{ define "main" }}...{{ end }}` to inject content into the shell

**Decap CMS Collection Schema:**
- Purpose: Maps CMS UI fields 1:1 to front matter keys in Markdown files
- Examples: `static/admin/config.yml` collections `produse`, `articole`, `pages`, `settings_menu`, `settings_footer`, `settings_site`
- Pattern: `file:` collections for singleton pages; `folder:` collections for repeatable items

## Entry Points

**Hugo Build:**
- Location: `config.toml` (global config) + `content/_index.md` (homepage data)
- Triggers: `hugo --minify` run by Cloudflare Pages on every push to `main`
- Responsibilities: Reads all content and templates, writes `public/` with minified HTML/CSS/JS

**Homepage:**
- Location: `layouts/index.html` + `content/_index.md`
- Triggers: Request to `/`
- Responsibilities: Renders hero, about preview, 4 featured products (queried live from `produse` section), 3 recent articles, final CTA

**Contact API:**
- Location: `functions/api/contact.js`
- Triggers: POST to `/api/contact` from `static/js/contact.js`
- Responsibilities: Anti-spam pipeline, email dispatch via Resend, JSON response

**CMS Admin:**
- Location: `static/admin/index.html` + `static/admin/config.yml`
- Triggers: Request to `/admin/`
- Responsibilities: Loads Decap CMS SPA, handles GitHub auth, provides editing UI

## Error Handling

**Strategy:** Silent fail-safe for spam (return fake success), explicit errors for legitimate failures

**Patterns:**
- Honeypot and gibberish detection return HTTP 200 with `{ success: true }` to avoid alerting bots
- Turnstile failure and invalid fields return HTTP 400 with Romanian error text
- Resend API failure returns HTTP 500 with generic Romanian error text
- All API errors are wrapped in `try/catch` in `functions/api/contact.js`
- Client JS catches `fetch` network errors and surfaces them to the user in `#form-message`

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` in `functions/api/contact.js` — visible only in Cloudflare Pages Function logs
**Validation:** Duplicated between client (`static/js/contact.js`) and server (`functions/api/contact.js`) for security
**Authentication:** GitHub OAuth for CMS only; site itself has no user authentication
**Minification:** Hugo `--minify` flag minifies all HTML/CSS/JS output at build time (configured in `config.toml` `[minify]` block)
**Privacy:** GPS EXIF data stripped from all processed images (`config.toml` `[imaging.exif]` `disableLatLong = true`)

---

*Architecture analysis: 2026-03-25*
