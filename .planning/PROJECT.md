# HappyBees.ro

## What This Is

Site static de prezentare și vânzare pentru HappyBees.ro — o afacere apicolă românească ce oferă miere și derivate apicole. Vizitatorii pot explora produsele, citi articole educative despre apicultură, și contacta producătorul prin formular. Conținutul este editat prin Decap CMS de către proprietar fără cunoștințe tehnice.

## Core Value

Vizitatorii înțeleg calitatea produselor și pot contacta ușor producătorul — toate celelalte sunt secundare.

## Requirements

### Validated

- ✓ Secțiunea "Știați că?" creată cu primul articol (hidromel) — Phase 1
- ✓ Site static generat cu Hugo — existing
- ✓ Hosting pe Cloudflare Pages cu deploy automat la push — existing
- ✓ Catalog produse (8 produse apicole) cu pagini individuale — existing
- ✓ Secțiune articole (jurnal apicol sezonier, 4 articole) — existing
- ✓ Formular de contact cu anti-spam (Turnstile + honeypot) și email via Resend — existing
- ✓ CMS Decap cu autentificare GitHub OAuth — existing
- ✓ Design system consistent (culori, fonturi, butoane) în `assets/css/main.css` — existing
- ✓ Site în limba română, ton calm și educativ — existing

### Active

- [ ] Buton de navigare nou în header pentru secțiunea "Știați că?..."
- [ ] Template-uri Hugo pentru secțiunea "Știați că?" (list + single), consistente cu tema
- [ ] Integrare secțiunii în CMS Decap pentru editare conținut fără cod
- [ ] Design consistent cu tema existentă a site-ului (culori, butoane, layout)

### Out of Scope

- Autentificare utilizatori — site de prezentare, nu platformă
- Coș de cumpărături / plăți online — vânzare prin contact direct
- Comentarii / forum — nu e cerut, complexitate nejustificată pentru v1
- App mobil — web-first

## Context

Proiect brownfield. Codebase existent funcțional cu câteva probleme cunoscute:
- Imaginile produselor și articolelor nu sunt redate în template-uri (bug cunoscut)
- Meniul este definit în două locuri (config.toml și data/menu.yaml) — CMS-ul nu afectează nav-ul live
- Open Graph lipsă — sharing social fără preview
- Număr de telefon placeholder în config.toml și content/contact.md
- CSS inline în template-uri (violează principiul "CSS separat de logică")
- Meta description globală — fără override per pagină

Stack: Hugo v0.122.0 Extended + Decap CMS + Cloudflare Pages + Cloudflare Functions.
Design system: `assets/css/main.css` cu CSS custom properties ca design tokens.
Limbă: română, fără englezisme în paginile publice.

## Constraints

- **Tech stack**: Hugo + Decap CMS + Cloudflare Pages — nu se modifică fără confirmare
- **Design**: Tema existentă (culori, butoane, tipografie) trebuie respectată — consistență vizuală totală cu restul site-ului
- **Limbă**: Română în toate paginile publice
- **Ton**: Calm, educativ, prietenos — fără alarmism, fără termenul "periculoase" pentru albine
- **CMS**: Noua secțiune trebuie să fie editabilă 100% din Decap CMS

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hugo SSG în loc de CMS dinamic | Viteză, securitate, cost zero hosting | ✓ Good |
| Cloudflare Pages pentru hosting | Free tier, deploy automat, CDN global | ✓ Good |
| Decap CMS cu GitHub auth | Nu necesită server propriu, editare simplă | ✓ Good |
| Resend via fetch() direct (fără SDK npm) | Compatibilitate cu Workers V8 isolates | ✓ Good |
| Secțiune "Știați că?..." modelată după articole | Pattern deja existent în codebase, consistență | — Pending |

## Evolution

Acest document evoluează la tranziții de fază și limite de milestone.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-25 after Phase 1 completion*
