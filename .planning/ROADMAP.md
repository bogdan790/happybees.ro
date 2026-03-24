# Roadmap: HappyBees.ro — Secțiunea "Știați că?..."

**Milestone:** v1 — Secțiunea "Știați că?..." live
**Created:** 2026-03-25
**Target:** Site funcțional cu secțiunea nouă complet integrată

## Phases

### Phase 1: Structură conținut Hugo
**Goal:** Secțiunea `stiati-ca` există în Hugo cu primul articol publicat și accesibil la URL

**Requirements covered:** STRUCT-01, STRUCT-02, STRUCT-03

**Plans:** 1 plan

Plans:
- [ ] 01-PLAN-continut-stiati-ca.md — Creare _index.md secțiune și articol hidromel cu front matter complet

**Deliverables:**
- `content/stiati-ca/_index.md` — index secțiune cu titlu și descriere
- `content/stiati-ca/hidromelul-bautura-vie-din-miere.md` — primul articol complet
- Hugo recunoaște secțiunea și generează URL-urile `/stiati-ca/` și `/stiati-ca/hidromelul-bautura-vie-din-miere/`

**Success criteria:**
- `hugo server` rulează fără erori
- `/stiati-ca/` returnează pagina (chiar dacă folosește template default temporar)
- Articolul hidromel este accesibil la URL-ul său

---

### Phase 2: Template-uri și navigație
**Goal:** Paginile de listing și articol individual au design consistent cu restul site-ului; butonul de nav funcționează

**Requirements covered:** TMPL-01, TMPL-02, TMPL-03, NAV-01, NAV-02

**Deliverables:**
- `layouts/stiati-ca/list.html` — listing consistent cu `articole/list.html`
- `layouts/stiati-ca/single.html` — articol consistent cu `articole/single.html`
- `config.toml` actualizat cu `[[menu.main]]` pentru „Știați că?"
- Zero stiluri inline noi — doar clase CSS existente

**Success criteria:**
- Pagina `/stiati-ca/` arată consistent cu `/articole/`
- Pagina articolului individual are același layout ca un articol din jurnal
- Butonul apare în header și are clasa `active` pe paginile secțiunii
- Niciun style="" nou în template-uri

---

### Phase 3: Integrare CMS Decap
**Goal:** Proprietarul poate crea și edita articole "Știați că?" direct din `/admin/` fără să atingă codul

**Requirements covered:** CMS-01, CMS-02, CMS-03

**Deliverables:**
- `static/admin/config.yml` actualizat cu colecția `stiati-ca`
- Câmpuri CMS: title, date, descriere_scurta, imagine_card (cu media library), body (markdown editor)
- Colecția funcționează: creare articol nou din CMS → commit → deploy → apare pe site

**Success criteria:**
- Colecția „Știați că?" apare în panoul admin Decap
- Se poate crea un articol nou din admin și el apare pe site după deploy
- Câmpul imagine_card permite upload

---

### Phase 4: Secțiune preview pe homepage
**Goal:** Homepage-ul prezintă cel mai recent articol "Știați că?" pentru vizibilitate maximă

**Requirements covered:** HOME-01, HOME-02

**Deliverables:**
- `layouts/index.html` actualizat cu secțiune nouă „Știați că?"
- `content/_index.md` actualizat cu datele secțiunii (titlu, CTA text)
- Card consistent cu design-ul celorlalte carduri de pe homepage
- Link „Vezi toate →" spre `/stiati-ca/`

**Success criteria:**
- Homepage afișează 1 card cu cel mai recent articol "Știați că?"
- Secțiunea este vizual consistentă cu restul homepage-ului
- CTA funcționează și duce la `/stiati-ca/`

---

## Phase Status

| Phase | Name | Status | Requirements |
|-------|------|--------|--------------|
| 1 | Structură conținut Hugo | ○ Pending | STRUCT-01, 02, 03 |
| 2 | Template-uri și navigație | ○ Pending | TMPL-01, 02, 03, NAV-01, 02 |
| 3 | Integrare CMS Decap | ○ Pending | CMS-01, 02, 03 |
| 4 | Preview homepage | ○ Pending | HOME-01, 02 |

**Progress:** ░░░░░░░░░░ 0%

---
*Roadmap created: 2026-03-25*
*Last updated: 2026-03-25 after phase 1 planned*
