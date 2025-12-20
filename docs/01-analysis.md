# Phase 1: Analysis - happybees.ro

**Data:** 2025-12-21
**Metodologie:** BMAD METHOD - Track: BMad Method (Products & Platforms)
**Proiect:** Site de prezentare stupină Happy Bees

---

## 1. Context și Viziune

### 1.1 Despre Stupină
- **Tip producție:** Stupină familială (NU industrială)
- **Brand:** Happy Bees (identitate existentă de ~8 ani)
- **Logo:** Existent - site-ul se va adapta identității actuale (NU redesign)

### 1.2 Obiective Principale
1. **Promovare:** Prezentarea stupinei și a produselor apicole
2. **Informare:** Conținut educativ despre apicultură (articole sezoniere)
3. **Comenzi:** Sistem simplu de comandă prin formular (NU e-commerce clasic)
4. **Autonomie:** Proprietarul să poată actualiza conținut fără cod (CMS)
5. **Atracție vizuală:** Site foarte vizual, legat de natură, NU corporatist

---

## 2. Cerințe Vizuale și Design

### 2.1 Identitate Vizuală
- ✅ **Stil:** Foarte vizual, atractiv, organic, legat de natură
- ❌ **NU:** Corporatist, formal, rigid
- 🎨 **Elemente vizuale:**
  - Fundaluri cu poze albine
  - Câmpuri cu flori
  - Natură vie
  - Păduri, copaci
  - Imagini expresive pentru produse

### 2.2 Funcționalități Vizuale
- **Upload imagini:** Proprietar trebuie să poată încărca poze ușor
- **Mini carduri articole:**
  - Poză expresivă mică
  - Titlu articol
  - CTA: "Află mai mult" / "Citește aici"
  - Click → pagină completă articol
- **Galerii foto:** Pentru produse, stupină, proces de lucru

---

## 3. Produse și Servicii

### 3.1 Produse Apicole
| Produs | Detalii | Observații |
|--------|---------|------------|
| **Miere** | Poliflora, mană, rapiță, salcâm, tei, floarea-soarelui | **Sortiment variază anual** - trebuie ușor editabil |
| **Polen** | - | Cantități mici |
| **Propolis** | Tinctură cu alcool 60-70% | Anual |
| **Ceară** | - | Ocazional |

**Cerință critică:** Anual se schimbă sortimentul de miere → trebuie foarte ușor de actualizat produsele

### 3.2 Model de Vânzare
- **NU e-commerce clasic** (fără coș, fără checkout online)
- Prezentare produse pe site
- Comenzi prin **formular simplu**
- Contact direct cu proprietarul
- **Plată:** Transfer bancar direct în cont
- **Confirmare:** Manuală (de către proprietar)

---

## 4. Structură Conținut

### 4.1 Pagini Statice
1. **Acasă** - Hero vizual cu albine/natură
2. **Despre stupină** - Povestea, valorile, metode de lucru
3. **Produse apicole** - Catalog produse cu prețuri și descrieri
4. **Articole / Jurnal apicol** - Mini carduri cu poze + CTA
5. **Contact** - Informații contact + formulare

### 4.2 Secțiune Blog/Articole
- **Scop:** Informativ și educativ
- **Frecvență:** Ocazională (NU săptămânală fixă)
- **Format:** Pagini separate pentru fiecare articol
- **Prezentare:** Mini carduri cu:
  - Poză expresivă
  - Titlu
  - Scurt rezumat (opțional)
  - Buton CTA ("Află mai mult", "Citește aici")
- **Structură tematică:** Articole pe sezoane apicole
  - Lucrări de primăvară
  - Lucrări de vară
  - Lucrări de toamnă
  - Lucrări de iarnă

### 4.3 Formulare Necesare
1. **Formular de contact** - Întrebări generale
2. **Formular de comandă simplă** - Fără coș, fără cont utilizator

---

## 5. Cerințe Tehnice

### 5.1 Hosting și Integrare
- ✅ **Hosting:** Cloudflare Pages (cerință fixă)
- ✅ **Domeniu:** happybees.ro (existent)
- ✅ **Versioning:** GitHub (legat cu GitHub)
- ✅ **Email:** Găzduire email există deja (nu e nevoie)

### 5.2 Limbă și Localizare
- 🇷🇴 **Limba primară:** Română cu diacritice (OBLIGATORIU)
- 🇬🇧 **Limba secundară:** Engleză (traducere în pas final)
- 🔄 **Schimbare limbă:** Buton pentru comutare RO/EN

### 5.3 Editare Conținut (CRITIC)
Proprietarul trebuie să poată edita **fără cod:**
1. ✏️ **Prețurile produselor** (actualizare frecventă)
2. ✏️ **Sortiment miere** (anual se schimbă varietățile)
3. ✏️ **Denumirile și descrierile produselor**
4. ✏️ **Conținutul paginilor statice**
5. ✏️ **Articole noi** (text + imagini)
6. ✏️ **Upload imagini** (pentru fundaluri, produse, articole)

---

## 6. Cerințe CMS

### 6.1 Experiență Anterioară
- ✅ A lucrat cu WordPress + Elementor
- ❌ NU dorește WordPress pentru acest proiect

### 6.2 Preferințe Interfață
- **DA:** Editor simplu, bazat pe formulare clare
- **NU:** Drag-and-drop builders complexe
- **Important:** Să poată edita orice element fără să intre în cod

### 6.3 Workflow Dorit
1. Intră în CMS (interfață web)
2. Editează conținut prin formulare simple
3. Salvează → deploy automat
4. Fără cunoștințe de cod necesare

---

## 7. Constrângeri și Criterii Decizie

### 7.1 Criterii Esențiale pentru Stack Tehnologic
1. ✅ **Ușor de editat** - Prioritate #1
2. ✅ **Foarte vizual** - Suport excelent pentru imagini
3. ✅ **Performanță** - Site rapid, SEO bun
4. ✅ **Cloudflare Pages** - Compatibilitate 100%
5. ✅ **GitHub integration** - Workflow Git
6. ✅ **Multilingv** - Română + Engleză
7. ✅ **CMS simplu** - Formulare clare, NU drag-and-drop complex
8. ❌ **NU overkill** - Soluție proporțională cu nevoile

### 7.2 Variante de Evaluat (Phase 2: Architecture)
- **Varianta de referință:** Eleventy + Decap CMS
- **Varianta 2:** Hugo + Decap CMS
- **Varianta 3:** Astro + Tina CMS (dacă nu e overkill)

---

## 8. Întrebări Rămase / De Clarificat

### 8.1 Identitate Vizuală
- ❓ Ai fișierele logo în format digital (SVG, PNG)?
- ❓ Există o paletă de culori definită pentru brand?
- ❓ Există fonturi specifice?

### 8.2 Conținut Existent
- ❓ Ai deja texte scrise pentru pagini?
- ❓ Ai imagini/foto cu stupina, albine, produse, natură?
- ❓ Ai articole deja scrise sau pornești de la zero?

### 8.3 Formular Comandă - Detalii
- ❓ Ce informații trebuie să completeze clientul? (nume, email, telefon, adresă, cantitate, tip miere?)
- ❓ Notificări email automate pentru comenzi sau manual?

### 8.4 Analytics și Marketing
- ❓ Vrei Google Analytics sau similar?
- ❓ Integrare cu social media (Facebook, Instagram)?

---

## 9. Concluzii Faza Analysis

### ✅ Ce am identificat:
- Site **foarte vizual**, organic, atractiv - nu corporatist
- Nevoie **critică** de editare ușoară (sortiment miere variază anual)
- CMS necesar dar **simplu** - formulare, nu complexitate
- Multilingv RO/EN
- Cloudflare Pages + GitHub workflow

### 🎯 Direcție:
- **Phase 2: Architecture** → Comparație detaliată stack-uri
- Eleventy vs Hugo vs Astro (dacă nu e overkill)
- Decap CMS ca variantă principală CMS
- Decizie finală bazată pe criterii clare

### 📋 Urmează:
- **Phase 2: Architecture** - Comparație orientată pe criterii
- Tratăm Eleventy + Decap CMS ca variantă de referință
- Evaluăm și Hugo
- Decidem stack final

---

**Status:** ✅ Analysis COMPLETE
**Data finalizare:** 2025-12-21
**Timpul Analysis:** ~20 minute
**Next Phase:** Architecture
