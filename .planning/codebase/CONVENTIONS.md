# Coding Conventions

**Analysis Date:** 2026-03-25

## Overview

This is a Hugo static site with a Cloudflare Pages Function for the contact form. There is no build-time linting or formatting toolchain configured. Conventions are applied manually and consistently throughout the two JavaScript files and HTML templates.

## Naming Patterns

**Files:**
- Hugo content files: lowercase kebab-case Romanian words — `miere-salcam.md`, `lucrari-primavara.md`
- Hugo layout files: lowercase, matching content section names — `produse/single.html`, `articole/list.html`
- JavaScript files: lowercase kebab-case — `contact.js`, `menu.js`
- CSS: single file `main.css` in `assets/css/`
- Data files: lowercase YAML — `site.yaml`, `menu.yaml`, `footer.yaml`
- Cloudflare Function: `functions/api/contact.js`

**Functions (JavaScript):**
- camelCase for all function names: `isGibberish()`, `isValidName()`, `isValidMessage()`, `verifyTurnstile()`, `toggleMenu()`, `closeMenu()`, `showMessage()`, `resetButton()`
- Named exports use the Cloudflare Pages naming convention: `onRequestPost`, `onRequestOptions`

**Variables:**
- camelCase throughout: `turnstileToken`, `vowelCount`, `letterCount`, `vowelRatio`, `resendResponse`, `submitButton`, `formMessage`
- Descriptive names that explain intent — `consonantSequence`, `hasValidWord`

**CSS Classes:**
- BEM-inspired but flat kebab-case: `.site-header`, `.header-content`, `.main-nav`, `.btn-primary`, `.layout-cards`, `.card-article`
- State modifier classes use `.active` suffix
- Layout utility classes: `.grid-2`, `.grid-3`, `.layout-split`, `.layout-cards`
- Component classes: `.card`, `.btn-primary`, `.hero`, `.back-link`

**Hugo Templates:**
- Template block names: `"title"`, `"main"` (lowercase, matching Hugo convention)
- Partial files: `header.html`, `footer.html`
- Front matter keys: Romanian words, snake_case — `pret`, `unitate`, `disponibilitate`, `descriere_scurta`, `imagine_hero`, `imagine_card`

**Data (YAML front matter):**
- Top-level keys: camelCase or snake_case Romanian — `titlu`, `subtitlu`, `cta_text`, `cta_link`, `despre_preview`, `produse_featured`
- List items: single-key objects with `item:` key for characteristics

## Code Style

**Formatting:**
- No formatter configured (no `.prettierrc`, no `biome.json`)
- 2-space indentation in JavaScript files
- 2-space indentation in HTML templates
- Single blank lines between logical blocks
- Trailing newline at end of files

**Linting:**
- No ESLint or other linter configured
- No `lint` script in `package.json`

## Import Organization

**JavaScript:**
- No ES module imports in front-end scripts (`static/js/`) — browser-loaded scripts, no bundler
- `functions/api/contact.js` uses `export` syntax but no imports (uses native `fetch`)
- `package.json` sets `"type": "module"` for the project

**Hugo Templates:**
- No imports — Hugo partials loaded via `{{ partial "header.html" . }}`
- CSS loaded via Hugo Pipes: `{{ $css := resources.Get "css/main.css" }}`
- JS loaded via plain `<script src="/js/menu.js">` in `baseof.html`
- Contact JS loaded inline in `content/contact.md` via raw HTML in Markdown

## Error Handling

**JavaScript (contact.js — front-end):**
- `try/catch` wraps the `fetch` call
- Errors displayed to user via `showMessage('error', '...')` helper
- Button always re-enabled in `finally` block
- Guard clauses at top of event handler with early `return`

```javascript
try {
  const response = await fetch('/api/contact', { ... });
  const result = await response.json();
  if (response.ok && result.success) {
    showMessage('success', result.message || 'Fallback message');
  } else {
    showMessage('error', result.error || 'Fallback error');
  }
} catch (error) {
  console.error('Error submitting form:', error);
  showMessage('error', 'User-facing Romanian error message');
} finally {
  resetButton();
}
```

**JavaScript (contact.js — Cloudflare Function):**
- `try/catch` wraps entire handler body
- Returns `new Response(JSON.stringify({...}), { status: NNN, headers: {...} })` pattern consistently
- Early returns for each validation failure — no nested conditionals
- Spam false positives return HTTP 200 with `success: true` to avoid alerting bots
- Real errors return HTTP 400 or 500 with `success: false` and Romanian `error:` message

```javascript
// Error response pattern
return new Response(
  JSON.stringify({ success: false, error: 'Romanian message.' }),
  { status: 400, headers: { 'Content-Type': 'application/json' } }
);
```

**Hugo Templates:**
- Null-safe access via `{{ with .Params.hero }}...{{ end }}` pattern — sections only render if front matter key exists
- Navigation prev/next uses `{{ with .PrevInSection }}...{{ else }}<span></span>{{ end }}`

## Logging

**Pattern:** `console.log()` for non-critical events (honeypot triggered, spam detected), `console.error()` for API failures.

```javascript
console.log('Honeypot triggered - spam detected');
console.error('Resend API error:', resendResult);
console.error('Error processing contact form:', error);
```

## Comments

**When to Comment:**
- Block-level section headers in CSS using `/* ======== SECTION NAME ======== */` delimiters
- JSDoc-style block comments above each function explaining purpose
- Inline comments in Romanian for business logic (`// Numără vocale`, `// Calculează procentajul`)
- `{{/* Comment */}}` syntax in Hugo templates for structural notes

**CSS Sections:**
Comments divide `main.css` into named regions: DESIGN SYSTEM, RESET & BASE, TYPOGRAPHY, LAYOUT, HEADER, FOOTER, BUTTONS, CARDS, HAMBURGER MENU, RESPONSIVE.

## Hugo Template Patterns

**Section rendering:** Always guarded with `{{ with .Params.section_key }}`:
```html
{{ with .Params.hero }}
<section>...</section>
{{ end }}
```

**Active nav link detection:** Combined check using `IsMenuCurrent` and `HasMenuCurrent`:
```html
class="{{ if or (eq .URL $currentPage.RelPermalink) ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}active{{ end }}"
```

**Inline styles:** Used directly on `<section>` and container `<div>` elements for one-off spacing/color — CSS classes used only for reusable components.

## CSS Design System

**CSS Custom Properties** defined in `:root` — always prefer variables over hard-coded values:
- Colors: `--color-honey-gold`, `--color-cream`, `--color-gray-dark`, etc.
- Spacing (8px grid): `--space-xs` through `--space-2xl`
- Typography: `--font-heading` (Caveat), `--font-body` (Inter)
- Container: `--container-max`, `--container-padding`

**Responsive breakpoints:**
- Mobile: `max-width: 767px` (default — mobile-first)
- Tablet: `min-width: 768px and max-width: 1024px`
- Desktop only: `min-width: 1024px`
- Large desktop: `min-width: 1400px`

## Language

All user-facing text is in Romanian. Error messages, button labels, front matter values, and CMS field labels are Romanian. Code identifiers (variables, functions, CSS classes) are English.

---

*Convention analysis: 2026-03-25*
