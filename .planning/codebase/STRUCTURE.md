# Codebase Structure

**Analysis Date:** 2026-03-25

## Directory Layout

```
happybees/
├── archetypes/           # Hugo content scaffolding templates
├── assets/
│   └── css/
│       └── main.css      # Single CSS file — full design system
├── content/              # All site content as Markdown
│   ├── _index.md         # Homepage data (hero, CTAs, section copy)
│   ├── contact.md        # Contact page (includes HTML form inline)
│   ├── despre.md         # About page
│   ├── politica-de-confidentialitate.md
│   ├── articole/         # Blog-style seasonal beekeeping journal
│   │   ├── _index.md
│   │   ├── lucrari-primavara.md
│   │   ├── lucrari-vara.md
│   │   ├── lucrari-toamna.md
│   │   └── lucrari-iarna.md
│   └── produse/          # Product catalog
│       ├── _index.md
│       ├── miere-salcam.md
│       ├── miere-poliflora.md
│       ├── miere-faneata.md
│       ├── miere-rapita.md
│       ├── miere-floareasoarelui.md
│       ├── miere-manacutei.md
│       ├── ceara.md
│       └── tinctura-propolis.md
├── data/                 # Sitewide YAML data files
│   ├── footer.yaml
│   ├── menu.yaml
│   └── site.yaml
├── functions/            # Cloudflare Pages serverless functions
│   └── api/
│       └── contact.js    # Contact form API endpoint
├── layouts/              # Hugo HTML templates
│   ├── index.html        # Homepage template
│   ├── 404.html          # 404 error page
│   ├── baseof.html       # NOT PRESENT — base shell is missing (see CONCERNS)
│   ├── _default/
│   │   ├── baseof.html   # DOES NOT EXIST (layouts/baseof.html missing too)
│   │   ├── single.html   # Default single page (used for Despre, Contact, Privacy)
│   │   └── list.html     # Fallback list template
│   ├── partials/
│   │   ├── header.html   # Site header with mobile nav
│   │   └── footer.html   # Site footer
│   ├── articole/
│   │   ├── list.html     # Articles listing page
│   │   └── single.html   # Single article page
│   └── produse/
│       ├── list.html     # Products listing page
│       └── single.html   # Single product page
├── static/               # Files copied as-is to public/
│   ├── admin/
│   │   ├── config.yml    # Decap CMS schema and collections
│   │   └── index.html    # Decap CMS SPA entry point
│   ├── fonts/            # Self-hosted web fonts
│   ├── images/
│   │   ├── logo/         # Logo files (logo-HB.png)
│   │   └── uploads/      # CMS-managed media uploads
│   └── js/
│       ├── contact.js    # Contact form submission handler
│       └── menu.js       # Mobile navigation toggle
├── config.toml           # Hugo configuration (URL, menus, params, build)
├── package.json          # Minimal — only defines build script
├── build.sh              # Build script: runs hugo --minify
└── public/               # Hugo build output — DO NOT EDIT (git-ignored)
```

**Note on baseof.html:** The layouts directory contains `layouts/baseof.html` but exploration showed it does not exist as a file — the base template lookup may rely on `layouts/_default/baseof.html` if present, or Hugo's internal fallback. Partials `header.html` and `footer.html` are called from individual layout files. Verify with `hugo --templateMetrics` if base shell behaviour is unclear.

## Directory Purposes

**`content/`:**
- Purpose: All Markdown content files — the sole source of truth for page data
- Contains: `.md` files with YAML front matter (structured data) + Markdown body
- Key files: `content/_index.md` (homepage sections), `content/contact.md` (embedded HTML form + CSS + JS)

**`layouts/`:**
- Purpose: Go/Hugo templates that transform content into HTML
- Contains: Page-type templates, partial templates
- Key files: `layouts/index.html` (homepage), `layouts/_default/single.html` (Despre/Contact/Privacy), `layouts/produse/single.html`, `layouts/articole/single.html`

**`assets/css/`:**
- Purpose: CSS processed by Hugo Pipes
- Contains: Single file `main.css` with all styles (design tokens, reset, layout, components)
- Key files: `assets/css/main.css`

**`static/`:**
- Purpose: Files served verbatim — not processed by Hugo
- Contains: CMS admin SPA, fonts, images, client JS
- Key files: `static/admin/config.yml`, `static/js/contact.js`, `static/js/menu.js`

**`functions/`:**
- Purpose: Cloudflare Pages Functions — serverless endpoints
- Contains: JavaScript modules exported as `onRequestPost` / `onRequestOptions`
- Key files: `functions/api/contact.js` (mapped to `/api/contact`)

**`data/`:**
- Purpose: Structured YAML data accessible in templates as `.Site.Data.*`
- Contains: `menu.yaml`, `footer.yaml`, `site.yaml`

**`public/`:**
- Purpose: Hugo build output
- Generated: Yes
- Committed: No (in `.gitignore`)

## Key File Locations

**Entry Points:**
- `content/_index.md`: Homepage content and section data
- `layouts/index.html`: Homepage template
- `config.toml`: Site-wide configuration, menu items, global params

**Configuration:**
- `config.toml`: Hugo config — baseURL, language, params, menus, image processing, minification
- `static/admin/config.yml`: Decap CMS collection schemas
- `package.json`: Build script only (`hugo --minify`)

**Core Templates:**
- `layouts/_default/single.html`: Default single page — handles Despre, Contact, Privacy via `{{ if .Params.X }}` branching
- `layouts/produse/single.html`: Product detail page with price, availability badge, characteristics list
- `layouts/produse/list.html`: Products grid
- `layouts/articole/single.html`: Article with CTA box and prev/next nav
- `layouts/articole/list.html`: Articles list ordered by `weight`

**Partials:**
- `layouts/partials/header.html`: Navigation with active state, hamburger for mobile
- `layouts/partials/footer.html`: Footer nav, copyright

**JavaScript:**
- `static/js/menu.js`: Mobile nav toggle — uses `#hamburger`, `#main-nav`, `.mobile-overlay`
- `static/js/contact.js`: Form handler — POSTs to `/api/contact`, handles Turnstile widget

**Serverless:**
- `functions/api/contact.js`: Contact form handler with three-layer anti-spam

**Media:**
- `static/images/uploads/`: All CMS-uploaded images land here
- `static/images/logo/logo-HB.png`: Primary logo

## Naming Conventions

**Content files:**
- kebab-case slugs matching the URL path: `miere-salcam.md` → `/produse/miere-salcam/`
- Seasonal articles follow `lucrari-{sezon}.md` pattern

**Front matter keys:**
- Romanian snake_case for custom params: `pret`, `unitate`, `descriere_scurta`, `imagine_hero`, `imagine_card`
- Hugo built-in keys are English: `title`, `date`, `weight`

**Templates:**
- Hugo conventions: `_default/`, `baseof.html`, `single.html`, `list.html`
- Partials named by UI component: `header.html`, `footer.html`

**CSS classes:**
- BEM-like for components: `.site-header`, `.header-content`, `.main-nav`, `.footer-nav`
- Utility layout classes: `.container`, `.card`, `.layout-cards`, `.layout-split`, `.grid-3`
- State classes: `.active` (nav, hamburger, overlay)

**JavaScript files:**
- Named by feature: `contact.js`, `menu.js`

**Data files:**
- Named by sitewide concern: `menu.yaml`, `footer.yaml`, `site.yaml`

## Where to Add New Code

**New product:**
- Create: `content/produse/{slug}.md` with front matter matching `layouts/produse/single.html` expectations: `title`, `date`, `pret`, `unitate`, `disponibilitate`, `descriere_scurta`, `caratteristici[]`, `imagine`, `galerie[]`
- CMS: Add via Decap CMS `/admin/` — schema already defined in `static/admin/config.yml`

**New article:**
- Create: `content/articole/{slug}.md` with `title`, `date`, `weight`, `categorie`, `rezumat`, `imagine_hero`, `imagine_card`, body Markdown
- CMS: Add via Decap CMS `/admin/` — schema already defined

**New standalone page:**
- Create: `content/{slug}.md`
- If it needs a unique layout: add `layouts/{slug}/single.html` or `layouts/{type}/single.html`
- If content structure matches existing patterns (just `{{ .Content }}`): the `layouts/_default/single.html` fallback branch at line 83 handles it automatically
- Register in CMS: add a `files:` entry under the `pages` collection in `static/admin/config.yml`

**New API endpoint:**
- Create: `functions/api/{name}.js` exporting `onRequestPost` and/or `onRequestOptions`
- Automatically mapped to `/api/{name}` by Cloudflare Pages

**New CSS component:**
- Add to: `assets/css/main.css` — there is only one CSS file; add with a block comment header matching the existing section style
- Use existing CSS custom properties from `:root` (`--color-honey-gold`, `--space-xl`, etc.)

**New partial template:**
- Create: `layouts/partials/{name}.html`
- Call with: `{{ partial "{name}.html" . }}`

**New data file:**
- Create: `data/{name}.yaml`
- Access in templates with: `{{ .Site.Data.{name} }}`

## Special Directories

**`public/`:**
- Purpose: Full Hugo build output — HTML, CSS, JS, images
- Generated: Yes, by `hugo --minify`
- Committed: No

**`static/admin/`:**
- Purpose: Decap CMS single-page application
- Generated: No — maintained manually
- Committed: Yes

**`static/images/uploads/`:**
- Purpose: Media uploaded through the CMS; committed to the repository
- Generated: No (manually/CMS uploaded)
- Committed: Yes

**`.claude/`:**
- Purpose: Claude AI agent configuration, commands, and skills
- Generated: No
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning documents (phases, codebase analysis)
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-25*
