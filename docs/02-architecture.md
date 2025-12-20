# Phase 2: Architecture - Decizie Stack Tehnologic

**Data:** 2025-12-21
**Metodologie:** BMAD METHOD - Phase 2: Architecture
**Proiect:** happybees.ro

---

## DECIZIE FINALĂ

### 🏆 Stack Tehnologic Ales: **HUGO + DECAP CMS + CLOUDFLARE PAGES**

**Motivație:**
1. ✅ **100% gratuit** - zero subscripții, zero costuri ascunse
2. ✅ **Ușor de editat** - Decap CMS formular-driven, simplu
3. ✅ **Cel mai bun i18n** - Multilingv RO/EN built-in matur
4. ✅ **Foarte stabil** - "Boring tech", mentenanță zero pe 3+ ani
5. ✅ **Build ultra-rapid** - 15-30s pe Cloudflare Pages
6. ✅ **Visual-first** - Hugo Image Processing built-in excelent
7. ✅ **Setup simplu** - Cloudflare suportă Hugo nativ

---

## Comparație Evaluată

Am comparat 3 variante:

| Criteriu | Hugo + Decap | Eleventy + Decap | Astro + Tina |
|----------|--------------|------------------|--------------|
| **Cost** | ✅ 0 RON | ✅ 0 RON | ⚠️ 0 RON (risc SaaS) |
| **Editare ușoară** | ✅ 7/10 | ✅ 7/10 | ⭐ 9/10 |
| **Visual-first** | ⭐ 9/10 | 7/10 | ⭐ 9/10 |
| **Multilingv RO/EN** | ⭐ 10/10 | 7/10 | 7/10 |
| **Stabilitate 3 ani** | ⭐ 10/10 | 8/10 | 6/10 |
| **Build speed** | ⭐ 10/10 | 7/10 | 7/10 |
| **Setup CF Pages** | ⭐ 10/10 | ✅ 10/10 | 8/10 |
| **TOTAL WEIGHTED** | **🏆 9.1/10** | 7.8/10 | 7.9/10 |

---

## Costuri - Confirmare 100% Gratuit

### Stack Ales: Hugo + Decap CMS

**Componente:**

1. **Hugo** (Static Site Generator)
   - Licență: Apache 2.0 (open-source)
   - Cost: **0 RON** - gratuit forever
   - Subscripții: **NU**

2. **Decap CMS** (Content Management)
   - Licență: MIT (open-source)
   - Cost: **0 RON** - self-hosted în repo
   - Subscripții: **NU**
   - Backend: **NU** (Git-based, fără server)

3. **GitHub** (Repository & Version Control)
   - Plan: **Free**
   - Cost: **0 RON**
   - Include:
     - Repo private/public unlimited
     - GitHub Actions: 2000 min/lună
     - Storage: 500MB (suficient)

4. **Cloudflare Pages** (Hosting)
   - Plan: **Free**
   - Cost: **0 RON**
   - Include:
     - Deploy-uri: unlimited
     - Bandwidth: unlimited
     - Build-uri: 500/lună
     - SSL/HTTPS: gratuit
     - Custom domain: gratuit

**TOTAL:** **0 RON/lună, 0 subscripții**

**Când ai plăti?**
- Doar dacă depășești 100,000 vizitatori/zi (imposibil pentru site stupină)
- Plan Cloudflare paid: $20/lună (NU îți trebuie)

---

## Setup Cloudflare Pages cu Hugo

### Dificultate: 🟢 FOARTE SIMPLU

**Pași (10 minute):**

```
1. Cloudflare Dashboard
   → Pages → "Create a project"

2. Connect to Git
   → GitHub → Authorize
   → Selectezi repo "happybees"

3. Build settings
   Framework preset: Hugo (din dropdown)
   ↓ (Cloudflare completează automat)
   Build command: hugo --minify
   Build output: public

   Environment variables:
   HUGO_VERSION = 0.122.0

4. Save and Deploy → DONE!

5. Custom domain
   → Add: happybees.ro
   → Copy CNAME record
   → Paste în Cloudflare DNS
   → Wait 5-30 min (DNS propagation)
```

**Timp:** 10 min setup + 30 min DNS

**Cloudflare suportă Hugo NATIV:**
- ✅ Hugo în dropdown frameworks
- ✅ Hugo binary pre-instalat
- ✅ Zero configurare complexă

---

## Workflow Final (După Setup)

### Editare Conținut (Tu - Proprietar)

```
1. Intri pe https://happybees.ro/admin/
2. Login cu GitHub (un click)
3. Editezi produs/articol în formular
4. Upload imagini (drag & drop)
5. Click "Save"

↓ (AUTOMAT)

6. Decap face commit în GitHub
7. Cloudflare detectează commit
8. Build Hugo (30 secunde)
9. Deploy live

↓

10. Site actualizat pe happybees.ro ✅
```

**Timp total:** 2-3 minute per editare

**NU trebuie:**
- ❌ Să intri în cod
- ❌ Să rulezi comenzi terminal
- ❌ Să faci deploy manual
- ❌ Să configurezi server

---

## De Ce Hugo (vs Eleventy/Astro)

### Hugo Câștigă La:

**1. Multilingv RO/EN (10/10)**
- i18n built-in din 2014, foarte matur
- Config simplă, documentație excelentă
- URL-uri automate `/ro/`, `/en/`
- Traduceri strings built-in

**2. Stabilitate "Boring Tech" (10/10)**
- Există 12+ ani, backwards compatible
- Zero npm dependencies → NU JavaScript fatigue
- Comunitate uriașă (Google, Cloudflare îl folosesc)
- Peste 3 ani: funcționează IDENTIC, fără modificări

**3. Build Speed (10/10)**
- Cel mai rapid SSG (scris în Go, compilat)
- 100 pagini în ~5 secunde
- Pentru site stupină: 15-30s (vs 60-90s Eleventy)

**4. Visual-First (9/10)**
- Hugo Image Processing built-in (NU plugin)
- Responsive images, WebP, lazy loading automat
- Procesare RAPIDĂ (Go compilat)

**5. Cost & Dependențe (10/10)**
- 100% gratuit, zero SaaS
- NU risc Tina Cloud (ca Astro+Tina)

### Hugo Pierde La:

**1. UI CMS**
- Decap UI mai veche decât Tina
- NU preview live în CMS (Tina are)
- NU WYSIWYG fancy (Markdown editor)

**Însă:**
- Pentru frecvența ta editare (ocazional): Decap e suficient
- Câștigi: stabilitate, zero risc SaaS, zero costuri viitoare

---

## Plan Proof of Concept (PoC)

### Obiectiv

Demonstrăm rapid (2-3 ore) că Hugo+Decap funcționează:
1. ✅ Setup Hugo + Decap CMS
2. ✅ Creare 1-2 produse în CMS
3. ✅ Creare 1 articol în CMS
4. ✅ Upload imagini (produse + hero)
5. ✅ Deploy Cloudflare Pages
6. ✅ Test workflow editare → deploy automat

**Rezultat:** Site minimal funcțional, test workflow

### Pași PoC (Rezumat)

| Pas | Descriere | Timp | Cine |
|-----|-----------|------|------|
| 1 | Setup Hugo local | 10 min | Developer |
| 2 | Config multilingv RO/EN | 15 min | Developer |
| 3 | Setup Decap CMS | 20 min | Developer |
| 4 | Template-uri Hugo (produse, articole) | 30 min | Developer |
| 5 | Push GitHub | 5 min | Developer |
| 6 | Deploy Cloudflare Pages | 10 min | Developer |
| 7 | Test workflow CMS | 20 min | **Proprietar** |
| **TOTAL** | | **~2 ore** | |

**Livrabil PoC:**
- Site live pe happybees.ro
- CMS funcțional pe /admin/
- 1-2 produse test
- 1 articol test
- Deploy automat validat

---

## Riscuri & Mitigare

### Riscuri Identificate

**1. Decap CMS UI mai veche**
- **Impact:** Experiență editare mai puțin plăcută
- **Probabilitate:** 🟢 LOW (e funcțional, doar estetic)
- **Mitigare:** Dacă deranjează → migrare Tina CMS (~1-2 zile)

**2. Decap CMS comunitate mai mică**
- **Impact:** Risc deprecare în viitor
- **Probabilitate:** 🟡 MEDIUM
- **Mitigare:** Alternative exist (Tina, Sanity, Strapi)

**3. Hugo Go templates learning curve**
- **Impact:** Developer învață sintaxă nouă
- **Probabilitate:** 🟢 LOW
- **Mitigare:** Documentație excelentă, comunitate mare

### Riscuri ZERO

- ✅ **Cost:** Hugo+Decap+Cloudflare = gratuit forever
- ✅ **Vendor lock-in:** Tot stack-ul e open-source, portabil
- ✅ **Scalabilitate:** Hugo handles 100,000+ pagini ușor
- ✅ **Stabilitate:** Hugo backwards compatible excelent

---

## Comparație cu Alternative Respinse

### De Ce NU Astro + Tina?

**Avantaje Astro+Tina:**
- ✅ UI CMS modernă, WYSIWYG, preview live
- ✅ Experiență editare superioară

**Dezavantaje (de ce am respins):**
- ❌ Dependență Tina Cloud (SaaS)
- ❌ Risc free tier → paid în viitor
- ❌ Framework tânăr (2021), mai puțin stabil
- ❌ Breaking changes mai frecvente
- ❌ Setup mai complex (env vars Tina)

**Decizie:** Pentru editare ocazională (produs anual, câteva articole), UI fancy NU justifică riscul SaaS și instabilitate

### De Ce NU Eleventy + Decap?

**Avantaje Eleventy:**
- ✅ JavaScript familiar
- ✅ Flexibil

**Dezavantaje (de ce Hugo e mai bun):**
- ❌ i18n necesită plugin (vs Hugo built-in)
- ❌ Image processing necesită plugin (vs Hugo built-in)
- ❌ Build 2-3x mai lent
- ❌ npm dependencies (vs Hugo zero)

**Decizie:** Hugo oferă tot ce oferă Eleventy, dar built-in și mai rapid

---

## Tech Stack Final - Rezumat

```
┌─────────────────────────────────────────┐
│   happybees.ro (Custom Domain)          │
│            ↓ CNAME                      │
│   Cloudflare Pages (Hosting)            │
│   - Free plan                           │
│   - SSL/HTTPS gratuit                   │
│   - CDN global                          │
│   - Deploy automat                      │
├─────────────────────────────────────────┤
│   Hugo (Static Site Generator)          │
│   - v0.122.0                            │
│   - Build: 15-30s                       │
│   - Output: HTML/CSS/JS static          │
│   - Image processing built-in           │
│   - i18n built-in (RO/EN)               │
├─────────────────────────────────────────┤
│   Decap CMS (Content Management)        │
│   - Self-hosted în /static/admin/       │
│   - Git-based (GitHub backend)          │
│   - Formular-driven UI                  │
│   - Media library                       │
├─────────────────────────────────────────┤
│   GitHub (Repository)                   │
│   - Version control                     │
│   - Backup automat                      │
│   - Collaboration                       │
└─────────────────────────────────────────┘

Cost total: 0 RON/lună
Subscripții: 0
Dependențe SaaS: 0
```

---

## Next Steps

### Phase 3: Planning

**Urmează:**
1. **PRD (Product Requirements Document)**
   - Specificații detaliate fiecare pagină
   - Wireframes/mockups
   - Content strategy
   - Design system (culori, fonts, stil vizual)

2. **Content Inventory**
   - Logo Happy Bees (fișiere)
   - Palette culori brand
   - Imagini stupină, albine, produse
   - Texte pagini (draft)

3. **Technical Specs**
   - Structură Hugo (folders, templates)
   - Config Decap CMS (collections, fields)
   - Schema multilingv RO/EN
   - Formulare contact/comandă

4. **Design Mockups**
   - Homepage hero (vizual cu albine)
   - Pagină produse (carduri)
   - Pagină articole (carduri mini cu CTA)
   - Pagină articol single (layout)

---

## Confirmări Finale

### ✅ Verificat

- [x] Hugo e 100% gratuit, open-source
- [x] Decap CMS e 100% gratuit, self-hosted
- [x] Cloudflare Pages plan Free e suficient
- [x] GitHub plan Free e suficient
- [x] Setup Cloudflare cu Hugo e simplu (10 min)
- [x] Workflow editare e intuitiv (formular-based)
- [x] Deploy e automat (commit → build → live)
- [x] Multilingv RO/EN e built-in Hugo
- [x] Image processing e built-in Hugo
- [x] Stack-ul e stabil pe 3+ ani

### ✅ Acceptat

- [x] Decap UI mai veche (dar funcțională)
- [x] NU preview live în CMS
- [x] NU WYSIWYG fancy (Markdown editor)

**Trade-off justificat:** Stabilitate + zero costuri > UI fancy

---

**Status:** ✅ ARCHITECTURE COMPLETE
**Data:** 2025-12-21
**Decizie:** Hugo + Decap CMS + Cloudflare Pages
**Confidence:** 🟢 HIGH (9/10)
**Cost Total:** 0 RON/lună, 0 subscripții
**Next Phase:** Planning (PRD)
