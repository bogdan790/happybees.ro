# Happy Bees - Stupina Bogdănel

Site de prezentare pentru stupina Happy Bees - miere naturală și produse apicole.

## Stack Tehnologic

- **Hugo** (Static Site Generator) - v0.122.0
- **Decap CMS** (Content Management) - Git-based CMS
- **Cloudflare Pages** (Hosting) - Deploy automat, SSL gratuit

## Status Proiect

**BMAD Method - Phases:**

- ✅ Phase 1: Analysis - Brainstorming și cercetare (COMPLETĂ)
- ✅ Phase 2: Architecture - Decizie stack tehnologic (COMPLETĂ)
- ✅ Phase 3: Planning - PRD cu design system (COMPLETĂ)
- 🚧 Phase 4: Implementation - În curs

## Documentație

Toată documentația proiectului se află în folder-ul `/docs/`:

- `00-brand-identity.md` - Identitate vizuală Happy Bees (logo, culori)
- `01-analysis.md` - Phase 1: Analysis (cerințe, cercetare)
- `02-architecture.md` - Phase 2: Architecture (comparație Hugo vs Astro vs Eleventy)
- `03-prd.md` - Phase 3: Planning - Product Requirements Document
- `03-prd-approval.md` - Aprobare PRD și răspunsuri review

## Structură Site

```
happybees.ro/
├── / (Homepage)
├── /despre/
├── /produse/
├── /articole/
└── /contact/
```

## Dezvoltare Locală

```bash
# Install dependencies
npm install

# Run Hugo dev server
hugo server -D

# Build site
npm run build
```

### Acces CMS

Accesează `/admin/` pentru Decap CMS (necesită autentificare GitHub)

## Deploy

Site-ul se deploy-ează automat pe Cloudflare Pages la fiecare commit pe branch `main`.

### Cloudflare Pages Build Settings

- **Build command:** `npm run build` (detectat automat din package.json)
- **Build output:** `public`
- **Node version:** 18 (din .node-version)
- **Environment:** Production branch = `main`

---

**© 2025 Happy Bees - Stupina Bogdănel**
