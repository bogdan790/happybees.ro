# Codebase Concerns

**Analysis Date:** 2026-03-25

## Tech Debt

**Inline styles throughout all layout templates:**
- Issue: Nearly every template uses `style="..."` attributes instead of CSS classes. Dozens of one-off inline styles scatter layout, spacing, and color decisions across HTML.
- Files: `layouts/index.html`, `layouts/_default/single.html`, `layouts/produse/single.html`, `layouts/produse/list.html`, `layouts/articole/list.html`, `layouts/articole/single.html`
- Impact: Impossible to restyle consistently from CSS. Any design change requires touching every template. Violates the project's own rule "CSS separat de logică".
- Fix approach: Extract recurring inline style patterns into named classes in `assets/css/main.css`. Start with padding/section patterns (`padding: var(--space-2xl) 0`), text alignment, and max-width wrappers.

**`_default/single.html` serves three unrelated page types:**
- Issue: The single layout at `layouts/_default/single.html` uses `{{ if .Params.poveste }}` / `{{ if .Params.intro }}` / `{{ if not (or .Params.poveste .Params.intro) }}` conditionals to render three different page structures (Despre, Contact, generic pages) in one file.
- Files: `layouts/_default/single.html`
- Impact: The template grows harder to maintain as new page types are added. A mistake in one branch can silently affect all page types.
- Fix approach: Create dedicated layout files `layouts/despre/single.html` and keep `layouts/_default/single.html` only for generic content pages.

**Contact form CSS and JavaScript embedded in content Markdown:**
- Issue: `content/contact.md` contains 280+ lines of inline `<style>` and `<script>` tags alongside form HTML. The `repositionPrivacyNote` JavaScript function that moves DOM elements between mobile and desktop is fragile and entirely within Markdown.
- Files: `content/contact.md`
- Impact: Content editors using Decap CMS may accidentally break the form layout when editing the contact page. CSS is not minified with the rest of the site's styles. The repositioning script silently fails if `.privacy-note-desktop-container` is missing.
- Fix approach: Move form CSS to `assets/css/main.css`. Move the repositioning script to `static/js/contact.js` or a new `static/js/layout.js`. Keep only form markup in the content file.

**Meta description is global only — no per-page override:**
- Issue: `layouts/_default/baseof.html` line 15 sets `<meta name="description" content="{{ .Site.Params.description }}">` with no fallback to page-level front matter or `.Summary`. Every page on the site shares the exact same meta description.
- Files: `layouts/_default/baseof.html`
- Impact: Hurts SEO — search engines index the same description for all pages. Product and article pages cannot describe themselves individually.
- Fix approach: Use `{{ with .Params.description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}` and add `description` fields to product and article CMS schemas in `static/admin/config.yml`.

**Open Graph tags not implemented:**
- Issue: `config.toml` defines `og_image = "/images/og-happybees.jpg"` but `layouts/_default/baseof.html` contains no `<meta property="og:*">` tags at all.
- Files: `layouts/_default/baseof.html`, `config.toml`
- Impact: Pages shared on social media (Facebook, WhatsApp) will render with no preview image or structured title/description.
- Fix approach: Add standard OG meta block to `baseof.html` head section.

**Menu defined in two places:**
- Issue: Navigation is defined statically in `config.toml` (`[[menu.main]]` blocks) AND managed via `data/menu.yaml` through Decap CMS. The header partial (`layouts/partials/header.html`) renders from `config.toml` via `.Site.Menus.main`, so CMS edits to `data/menu.yaml` have no effect on the rendered nav.
- Files: `config.toml`, `data/menu.yaml`, `layouts/partials/header.html`
- Impact: CMS editors believe they can edit the menu through the admin UI, but changes are never reflected on the live site. This is a silent disconnect.
- Fix approach: Either render the header nav from `data/menu.yaml` (using `$.Site.Data.menu.items`), or remove the menu from the CMS configuration to avoid confusion.

## Known Bugs

**`repositionPrivacyNote` fails silently on desktop when desktop container is absent:**
- Symptoms: On desktop, the function attempts to move `.privacy-note` into `.privacy-note-desktop-container`. If the desktop container doesn't exist (e.g., the Contact page rendered without the info column), the element is never moved and may be hidden by the CSS rule `.privacy-note-wrapper { display: none }` at 768px+.
- Files: `content/contact.md` (lines 76-97)
- Trigger: Load `/contact/` on a desktop viewport when `.Params.info` is not set.
- Workaround: Currently `.Params.info` is always present in `content/contact.md`.

**Product images not rendered anywhere in templates:**
- Symptoms: Every product has `imagine` and `galerie` front matter fields, but neither `layouts/produse/single.html` nor `layouts/produse/list.html` reads or renders these fields. Product pages and the product listing show no images.
- Files: `layouts/produse/single.html`, `layouts/produse/list.html`, `content/produse/*.md`
- Trigger: Visit any product page or `/produse/`.

**Article images (hero and card) not rendered in templates:**
- Symptoms: Each article front matter defines `imagine_hero` and `imagine_card` fields, but `layouts/articole/single.html` and `layouts/articole/list.html` never render them. Articles display with no images.
- Files: `layouts/articole/single.html`, `layouts/articole/list.html`, `content/articole/*.md`
- Trigger: Visit any article page or `/articole/`.

## Security Considerations

**CORS allows all origins on contact API:**
- Risk: `functions/api/contact.js` responds with `Access-Control-Allow-Origin: *` on both success and preflight. Any external site can POST to `/api/contact` and trigger email sends.
- Files: `functions/api/contact.js` (lines 306, 331)
- Current mitigation: Turnstile and honeypot reduce automated abuse; the API only sends email so there is no data exfiltration risk.
- Recommendations: Restrict `Access-Control-Allow-Origin` to `https://happybees.ro` to prevent cross-origin form submissions from other domains.

**No rate limiting on contact form API:**
- Risk: A determined attacker can bypass Turnstile (e.g., by solving it manually in a loop) and send unlimited emails. There is no server-side request throttling per IP or time window.
- Files: `functions/api/contact.js`
- Current mitigation: Turnstile, honeypot, and gibberish detection reduce casual spam.
- Recommendations: Implement Cloudflare's built-in rate limiting rule on `POST /api/contact`, or use a KV store to track submission counts per IP.

**Hardcoded fallback email address in API:**
- Risk: `functions/api/contact.js` line 271 falls back to `'bogdan.pavel@happybees.ro'` if `env.EMAIL_TO` is not set. If the environment variable is ever misconfigured, a real personal email address still receives all contact submissions.
- Files: `functions/api/contact.js` (line 271)
- Current mitigation: The `.env` file is gitignored.
- Recommendations: Remove hardcoded fallback; fail explicitly if `RESEND_API_KEY` or `EMAIL_TO` are absent.

**`markup.goldmark.renderer.unsafe = true` in Hugo config:**
- Risk: Raw HTML is allowed in all Markdown content files. A CMS editor who pastes malicious HTML into any content field would have it rendered as-is.
- Files: `config.toml` (line 80)
- Current mitigation: CMS access is authenticated via GitHub OAuth. Only trusted users can edit content.
- Recommendations: Acceptable for current setup. Note: if CMS access is ever widened, this setting must be revisited.

## Performance Bottlenecks

**Google Fonts loaded without resource hints optimization:**
- Problem: `baseof.html` includes two `<link rel="preconnect">` tags for Google Fonts, but no `<link rel="preload">` for the actual font files. Fonts are render-blocking on first load.
- Files: `layouts/_default/baseof.html` (lines 18-20)
- Cause: Standard Google Fonts embed without font-display strategy.
- Improvement path: Add `&display=swap` to the font URL (already present via `display=swap` in the href), and consider self-hosting fonts in `static/fonts/` to eliminate third-party DNS lookups.

**Homepage loads products by date — unordered and potentially stale:**
- Problem: `layouts/index.html` line 32 fetches products with `(where $.Site.RegularPages "Section" "produse").ByDate` — showing the four oldest products rather than a curated featured set.
- Files: `layouts/index.html`
- Cause: No `weight` or `featured` front matter on products; sort falls back to date.
- Improvement path: Add a `featured` boolean field to product front matter and filter on `where .Params.featured true`.

## Fragile Areas

**`content/contact.md` layout depends on specific DOM structure:**
- Files: `content/contact.md`, `layouts/_default/single.html`
- Why fragile: The JavaScript `repositionPrivacyNote` function uses `querySelector('.privacy-note-desktop-container')` which is rendered conditionally by `layouts/_default/single.html` only when `.Params.info` exists. If the template or content structure changes, the element relocation silently breaks. The feature relies on JS DOM manipulation instead of CSS-only responsive layout.
- Safe modification: Always keep both `.privacy-note-wrapper` and `.Params.info` populated in `content/contact.md`, and test on both mobile and desktop breakpoints after any contact page edit.
- Test coverage: None — no automated tests exist.

**Decap CMS `data/menu.yaml` disconnected from rendered nav:**
- Files: `data/menu.yaml`, `layouts/partials/header.html`, `config.toml`
- Why fragile: An editor making menu changes through the CMS admin commits to `data/menu.yaml`, but the live site renders from `config.toml`. The site looks unchanged, and the editor has no feedback that their action had no effect.
- Safe modification: Do not edit menu via CMS until the template is updated to read from `data/menu.yaml`.

## Missing Critical Features

**No product images displayed:**
- Problem: Product image and gallery fields are defined in CMS schema and stored in front matter, but no layout template renders them.
- Blocks: Product pages look text-only; the site cannot present products visually despite having the content infrastructure.
- Files: `layouts/produse/single.html`, `layouts/produse/list.html`

**No article images displayed:**
- Problem: Hero and card images are defined in front matter for all four articles, but templates ignore them.
- Blocks: Articles have no visual identity; the article listing page is pure text.
- Files: `layouts/articole/single.html`, `layouts/articole/list.html`

**No Open Graph / social sharing metadata:**
- Problem: Sharing any page on Facebook, WhatsApp, or LinkedIn produces no preview card.
- Blocks: Social media sharing is ineffective.
- Files: `layouts/_default/baseof.html`

**Phone number is a placeholder on the live site:**
- Problem: `config.toml` line 28 and `content/contact.md` line 6 both contain `+40 7XX XXX XXX` — a placeholder that has never been replaced with the real number.
- Blocks: Visitors cannot call from the contact page. The `tel:` link on the contact card dials a non-existent number.
- Files: `config.toml`, `content/contact.md`

**Hero and "Despre preview" sections use placeholder images:**
- Problem: `content/_index.md` references `hero-homepage-placeholder.jpg` and `despre-preview-placeholder.jpg` which do not exist in `static/images/uploads/`. The homepage renders broken image areas.
- Files: `content/_index.md`

## Test Coverage Gaps

**No testing of any kind:**
- What's not tested: All Hugo templates, the Cloudflare Pages Function contact handler, client-side form validation, menu toggle behavior, and all content rendering paths.
- Files: entire codebase
- Risk: Regressions in template rendering, form submission, or spam filtering go undetected until reported by users.
- Priority: Medium — the codebase is small and primarily static; highest-risk area is `functions/api/contact.js` since it handles live email delivery.

---

*Concerns audit: 2026-03-25*
