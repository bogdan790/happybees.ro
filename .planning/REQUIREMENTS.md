# Requirements: HappyBees.ro — Secțiunea "Știați că?..."

**Defined:** 2026-03-25
**Core Value:** Vizitatorii înțeleg calitatea produselor și pot contacta ușor producătorul

## v1 Requirements

### Structură conținut (Hugo)

- [x] **STRUCT-01**: Secțiunea `content/stiati-ca/` este creată cu `_index.md` (titlu, descriere secțiune)
- [x] **STRUCT-02**: Primul articol „Hidromelul – băutura vie din miere" este creat ca `content/stiati-ca/hidromelul-bautura-vie-din-miere.md` cu front matter complet
- [x] **STRUCT-03**: Schema front matter include: `title`, `date`, `descriere_scurta`, `imagine_card`, `draft`

### Template-uri Hugo

- [ ] **TMPL-01**: `layouts/stiati-ca/list.html` — pagina de listing a tuturor articolelor "Știați că?", vizual consistent cu `layouts/articole/list.html`
- [ ] **TMPL-02**: `layouts/stiati-ca/single.html` — pagina unui articol individual, vizual consistent cu `layouts/articole/single.html`
- [ ] **TMPL-03**: Template-urile folosesc exclusiv clasele CSS existente din `assets/css/main.css` (fără stiluri inline noi)

### Navigație

- [ ] **NAV-01**: Buton nou „Știați că?" adăugat în `config.toml` în `[[menu.main]]` (weight 3.5 → reordonat)
- [ ] **NAV-02**: Link activ (`active` class) funcționează corect pentru secțiunea `/stiati-ca/`

### CMS Decap

- [ ] **CMS-01**: Colecție nouă `stiati-ca` adăugată în `static/admin/config.yml` cu câmpurile: title, date, descriere_scurta, imagine_card, body
- [ ] **CMS-02**: Colecția este de tip `folder` (permite adăugarea de articole noi din CMS)
- [ ] **CMS-03**: Câmpul `imagine_card` are `media_library` configurat pentru upload imagini

### Homepage

- [ ] **HOME-01**: Secțiunea homepage afișează cel mai recent articol "Știați că?" (1 card) ca preview, consistent cu secțiunea de articole existentă
- [ ] **HOME-02**: CTA „Vezi toate" direcționează spre `/stiati-ca/`

## v2 Requirements

### Îmbunătățiri viitoare

- **ENH-01**: Taguri / categorii pentru articolele "Știați că?" (ex: „albine", „miere", „apicultură")
- **ENH-02**: Articole corelate (related posts) pe pagina unui articol
- **ENH-03**: Preview "Știați că?" ca widget în sidebar pe pagini de produse

## Out of Scope

| Feature | Reason |
|---------|--------|
| Comentarii pe articole | Complexitate, moderare necesară — nu e cerut |
| Paginare listing | Puține articole inițial — nu e necesar pentru v1 |
| RSS feed separat pentru "Știați că?" | Hugo generează RSS automat; feed dedicat e overkill pentru v1 |
| Traducere EN | Scoped explicit pentru viitor |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRUCT-01 | Phase 1 | Complete |
| STRUCT-02 | Phase 1 | Complete |
| STRUCT-03 | Phase 1 | Complete |
| TMPL-01 | Phase 2 | Pending |
| TMPL-02 | Phase 2 | Pending |
| TMPL-03 | Phase 2 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| CMS-01 | Phase 3 | Pending |
| CMS-02 | Phase 3 | Pending |
| CMS-03 | Phase 3 | Pending |
| HOME-01 | Phase 4 | Pending |
| HOME-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-25*
*Last updated: 2026-03-25 after initial definition*
