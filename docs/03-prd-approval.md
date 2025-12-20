# PRD Approval - Phase 4 Go-Ahead

**Data:** 2025-12-21
**Status:** ✅ APROBAT

---

## Răspunsuri Review PRD

### 1. Design System
- ✅ **Fonturile aprobate:**
  - Caveat (headings)
  - Inter (body)
- ❌ **NU alternative** - mergem cu acestea

### 2. Content
- ❌ **NU texte finale pregătite**
- ✅ **Placeholder text** peste tot, structurat corect
- ⚠️ **CERINȚĂ CRITICĂ:** Toate textele 100% editabile din CMS (Decap)

### 3. Imagini
- ❌ **NU imagini finale pregătite**
- ✅ **Placeholder images** peste tot
- ⚠️ **CERINȚE CRITICE:**
  - Toate imaginile schimbabile din CMS
  - **ZERO imagini hardcodate** în template
  - Toate imaginile trebuie să vină din Decap CMS

### 4. Formular Contact
- ✅ **Cloudflare Pages Function**
- ❌ **NU servicii externe** (Formspree, etc.)

### 5. Google Analytics
- ⏸️ **NU acum**
- ✅ Adăugăm **post-launch**

---

## Principii Implementation Phase 4

### 🎯 Reguli de Aur

**1. CMS = Single Source of Truth pentru CONȚINUT**
```
✅ DA: Toate textele din Decap CMS
✅ DA: Toate imaginile din Decap CMS
❌ NU: Texte hardcodate în templates
❌ NU: Imagini hardcodate în /static/
```

**2. Placeholders peste tot**
```
✅ Lorem ipsum pentru texte (dar structurat logic)
✅ Placeholder images (https://placehold.co/ sau similar)
✅ Toate placeholder-urile editabile din CMS
```

**3. Workflow final (după implementation):**
```
Bogdan intră în /admin/
  ↓
Editează text/imagine placeholder
  ↓
Save → Deploy automat
  ↓
Site live cu conținut real
```

---

## Phase 4: Implementation Plan Ajustat

### Pas 1: Setup Hugo + Decap (PRIORITATE)
- [ ] Hugo installation & config
- [ ] Decap CMS setup cu **toate câmpurile editabile**
- [ ] **Test CMS:** Poți edita ORICE text/imagine?

### Pas 2: Design System CSS
- [ ] Fonts: Caveat + Inter (Google Fonts)
- [ ] Culori: Variables CSS din logo (#E6B84E, #1a1a1a, etc.)
- [ ] Componente: Butoane, cards

### Pas 3: Templates Hugo + Placeholders
- [ ] Homepage template cu **placeholder text editabil din CMS**
- [ ] Produse template cu **placeholder images editabile**
- [ ] Articole template cu **placeholder content editabil**
- [ ] **ZERO hardcoding** - tot din CMS

### Pas 4: Formulare Contact
- [ ] Cloudflare Pages Function pentru procesare formular
- [ ] Test submit → primire email

### Pas 5: Deploy Cloudflare Pages
- [ ] Setup build & deploy
- [ ] Test site live cu placeholders
- [ ] Verificare workflow: Edit CMS → Deploy → Live

### Pas 6: Handover (Predare către Bogdan)
- [ ] Documentație: Cum editezi texte în CMS
- [ ] Documentație: Cum uploadezi imagini în CMS
- [ ] Video walkthrough (opțional)
- [ ] Test: Bogdan editează 1 produs + 1 articol

---

## Success Criteria - Phase 4 Complete

**Site e GATA când:**
1. ✅ Live pe happybees.ro (Cloudflare Pages)
2. ✅ Decap CMS funcțional pe /admin/
3. ✅ **Toate textele** editabile din CMS (NU hardcodate)
4. ✅ **Toate imaginile** editabile din CMS (NU hardcodate)
5. ✅ Placeholder content peste tot (texte + imagini)
6. ✅ Workflow testat: Edit CMS → Save → Deploy → Live (1-2 min)
7. ✅ Formulare contact/comandă funcționale (trimit email)
8. ✅ Responsive (mobile, tablet, desktop)
9. ✅ Hugo Image Processing funcțional (WebP, lazy loading)
10. ✅ Bogdan poate edita singur conținut fără cod

**APOI:**
- Bogdan înlocuiește placeholders cu conținut real
- Review final design/content
- **LAUNCH PUBLIC!** 🎉

---

**Status:** ✅ GO FOR IMPLEMENTATION
**Aprobat de:** Bogdan
**Data:** 2025-12-21
**Next:** Phase 4 - Implementation Start
