# Phase 3: Planning - Product Requirements Document (PRD)

**Data:** 2025-12-21
**Metodologie:** BMAD METHOD - Phase 3: Planning
**Proiect:** happybees.ro - Site Stupină Happy Bees

---

## 1. DESIGN SYSTEM

### 1.1 Identitate Vizuală - Bazată pe Logo Happy Bees

**Logo = Single Source of Truth**

**Logo Analysis:**
```
┌─────────────────────────────────┐
│  [Hexagon cu albină]            │
│   + picături miere galben       │
│                                 │
│  Happy Bees (handwritten)       │
│  STUPINA BOGDĂNEL (sans bold)   │
└─────────────────────────────────┘

Personalitate:
- Prietenos, familiar (handwritten)
- Autentic, artizanal (nu corporatist)
- Natural, organic (hexagon = fagure)
- Calitate (picături miere = pur, lichid)
```

---

### 1.2 Paleta Culori (Extrasă din Logo)

**Culori Principale:**

```css
/* Din logo direct */
--color-honey-gold: #E6B84E;      /* Picături miere - STAR color */
--color-honey-dark: #D4A574;      /* Ton mai închis miere */
--color-black: #1a1a1a;           /* Contur hexagon, text */

/* Derivate pentru background & UI */
--color-cream: #FFF8E7;           /* Background cald */
--color-cream-light: #FFFBF0;     /* Background alternativ */
--color-cream-dark: #F5E6D3;      /* Cards, secțiuni */

/* Neutrale & Text */
--color-white: #FFFFFF;
--color-gray-dark: #2d2d2d;       /* Headings */
--color-gray-medium: #4a4a4a;     /* Text secundar */
--color-gray-light: #e0e0e0;      /* Borders, dividers */

/* Accente & Interacțiuni */
--color-honey-hover: #FFCC5C;     /* Hover pe butoane */
--color-honey-light: #FFF4DC;     /* Subtle highlights */
```

**Aplicare Culori:**

| Element | Culoare | Exemplu |
|---------|---------|---------|
| **Headings H1-H2** | `--color-gray-dark` | Titluri pagini |
| **Body text** | `--color-gray-medium` | Paragrafe, descrieri |
| **Links** | `--color-honey-gold` | Link-uri, CTA text |
| **Butoane CTA** | Background: `--color-honey-gold`<br>Text: `--color-white` | "Comandă", "Descoperă" |
| **Butoane CTA Hover** | Background: `--color-honey-hover` | Hover state |
| **Backgrounds** | `--color-cream` sau `--color-white` | Secțiuni alternate |
| **Cards** | Background: `--color-white`<br>Border: `--color-cream-dark` | Card produs, articol |

---

### 1.3 Tipografie

**Fonturi Alese (Bazate pe Logo):**

#### A) Headings - Handwritten (ca "Happy Bees")

**Font ales: `Caveat`**
- **De ce:** Handwritten, prietenos, lizibil, NU copilăros
- **Backup:** 'Indie Flower', 'Amatic SC', cursive
- **Google Fonts:** https://fonts.google.com/specimen/Caveat

```css
--font-heading: 'Caveat', 'Indie Flower', cursive;

/* Aplicare */
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 600; /* Semi-bold pentru lizibilitate */
}

/* Sizing */
h1 { font-size: 3.5rem; }    /* 56px - Hero titles */
h2 { font-size: 2.5rem; }    /* 40px - Section titles */
h3 { font-size: 1.75rem; }   /* 28px - Card titles */
```

**Exemplu:**
> **Happy Bees - Miere Naturală din Stupina Familiei Bogdănel** ← H1 în Caveat

#### B) Body Text - Sans-Serif (ca "STUPINA BOGDĂNEL")

**Font ales: `Inter`**
- **De ce:** Clar, modern, foarte lizibil, profesional
- **Backup:** 'Open Sans', 'Roboto', sans-serif
- **Google Fonts:** https://fonts.google.com/specimen/Inter

```css
--font-body: 'Inter', 'Open Sans', sans-serif;

/* Aplicare */
body, p, li, a {
  font-family: var(--font-body);
  font-weight: 400; /* Regular */
  line-height: 1.7; /* Spațiere generoasă pentru citire */
}

/* Sizing */
p, li { font-size: 1rem; }      /* 16px - Body text */
small { font-size: 0.875rem; }  /* 14px - Metadata, labels */
```

**Exemplu:**
> Mierea noastră este produsă cu grijă în stupina familiei Bogdănel, situată în zona de câmpie... ← Body text în Inter

#### C) Logo Text (dacă replicat în HTML)

**Font pentru "Happy Bees" logo text:** Caveat Bold (600)
**Font pentru "STUPINA BOGDĂNEL":** Inter Bold (700), UPPERCASE

```html
<div class="logo-text">
  <span class="logo-name">Happy Bees</span>
  <span class="logo-subtitle">STUPINA BOGDĂNEL</span>
</div>
```

---

### 1.4 Spacing & Layout

**Design System Spacing (8px grid):**

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
```

**Container & Breakpoints:**

```css
--container-max: 1200px;  /* Max width content */
--container-padding: 1.5rem;

/* Breakpoints */
--breakpoint-mobile: 640px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
```

---

### 1.5 Componente UI

#### Butoane CTA

```css
.btn-primary {
  background: var(--color-honey-gold);
  color: var(--color-white);
  padding: 12px 32px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-honey-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 184, 78, 0.3);
}
```

**Exemplu vizual:**
```
┌──────────────────┐
│   Comandă acum   │  ← Background #E6B84E, text alb
└──────────────────┘
     (hover: #FFCC5C, lift effect)
```

#### Cards

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-cream-dark);
  border-radius: 12px;
  padding: var(--space-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}
```

---

### 1.6 Imagini - Stil Vizual

**Ghid Fotografii (Bazat pe Logo Vibe):**

**DO's ✅:**
- **Tonalitate:** Caldă, golden hour, lumină naturală
- **Culori dominante:** Galben-auriu, maro cald, verde natural
- **Compoziție:** Organic, natural, nu posed
- **Subiecte:**
  - Miere lichidă în borcan (lumina prin miere = galben auriu!)
  - Faguri naturali cu miere
  - Albine pe flori (focus macro)
  - Câmpuri cu flori (rapită galbenă, floarea-soarelui)
  - Stupină în natură (context rustic)
  - Produse pe fundal lemn natural / linen

**DON'Ts ❌:**
- ❌ Stock photos artificiale, sterile
- ❌ Fundal alb studio (prea corporatist)
- ❌ Culori reci (albastru, gri metalic)
- ❌ Lighting harsh, shadows dure
- ❌ Over-processed, filtre exagerate

**Format & Optimizare:**
- **Original:** JPEG/PNG, min 1920px width, max 5MB
- **Hugo procesează automat:** Resize (320w, 640w, 1024w, 1920w), WebP, lazy loading
- **Aspect ratio:**
  - Hero: 16:9 (landscape)
  - Card produs: 4:3 (portrait sau square)
  - Card articol: 3:2 (landscape)
  - Galerie: flexible (Hugo crop automat)

---

## 2. TON & VOICE

### 2.1 Personalitate Brand

**Happy Bees vorbește ca:**
- 👨‍🌾 **Apicultorul familiei** - prietenos, apropiat, de încredere
- 🌻 **Pasionat de natură** - autentic, legat de sezonalitate
- 🍯 **Mândru de calitate** - fără a fi arogant, doar sincer

**NU vorbește ca:**
- ❌ Corporație (formal, distant)
- ❌ Vânzător agresiv (pushy, sales-y)
- ❌ Influencer trendy (slang, emoji-uri excesive)

### 2.2 Ton Comunicare

**Opțiunea A confirmată: Tu / Voi (familiar, prietenos)**

**Exemple:**

| ❌ Corporatist (NU) | ✅ Familiar (DA) |
|---------------------|------------------|
| "Vă oferim miere de calitate superioară" | "Îți oferim miere naturală, așa cum o face natura" |
| "Produsele noastre respectă standardele..." | "Mierea noastră e exact cum o făceam și bunicii: naturală, nefiltrat\u0103" |
| "Comandați acum!" | "Descoperă mierea noastră →" |
| "Beneficiile mierii de salcâm includ..." | "Mierea de salcâm e preferata noastră - dulce, delicată, perfectă dimineața în ceai" |

### 2.3 Vocabular Brand

**Cuvinte de folosit des:**
- natural, pur, autentic
- familie, casă, tradiție
- sezoane, primăvară, vară
- albine, flori, natură
- grijă, pasiune, calitate

**Cuvinte de evitat:**
- premium, luxury, exclusive (prea corporate)
- revolucionar, inovator (nu e tech startup)
- garantat, certificat (prea formal, dacă nu e cazul)

---

## 3. STRUCTURĂ SITE & SPECIFICAȚII PAGINI

### 3.1 Sitemap

```
happybees.ro/
├── / (Homepage)
├── /despre/
├── /produse/
│   ├── /produse/miere-salcam/
│   ├── /produse/miere-poliflora/
│   └── ... (dinamic per produs)
├── /articole/
│   ├── /articole/lucrari-primavara/
│   ├── /articole/lucrari-vara/
│   └── ... (dinamic per articol)
├── /contact/
└── /admin/ (Decap CMS - NU în meniu public)
```

**Meniu Principal (Header):**
```
[Logo] Acasă | Produse | Articole | Despre | Contact
```

**Footer:**
```
[Logo]
Acasă | Produse | Articole | Despre | Contact
© 2025 Happy Bees - Stupina Bogdănel. Toate drepturile rezervate.
```

---

### 3.2 Homepage (/)

**Obiectiv:** Prima impresie, emoție, încredere, CTA către produse

**Secțiuni:**

#### A) Hero Section

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ [Background: Imagine câmp flori / albine]       │
│  (overlay cream translucid 40%)                 │
│                                                 │
│  [Logo Happy Bees - stânga sus]                 │
│                                                 │
│          Happy Bees                             │ ← H1 Caveat
│     Miere naturală din stupina                  │ ← H2 Caveat
│        familiei Bogdănel                        │
│                                                 │
│   [Buton CTA: "Descoperă produsele" #E6B84E]    │
│                                                 │
│   ↓ Scroll indicator (icon albină sau săgeată)  │
└─────────────────────────────────────────────────┘
```

**Content:**
- **H1:** "Happy Bees" (logo text sau similar)
- **H2:** "Miere naturală din stupina familiei Bogdănel"
- **CTA:** Buton "Descoperă produsele" → link la /produse/
- **Imagine hero:** Câmp cu flori galben (rapită/floarea-soarelui) SAU albine pe flori (macro)

**Editabil în CMS:**
- ✅ Imagine hero (upload/replace)
- ✅ Titlu H1
- ✅ Subtitlu H2
- ✅ Text buton CTA
- ✅ Link buton CTA

#### B) Despre Preview (Mini-secțiune)

**Layout:**
```
┌────────────────────────┬────────────────────────┐
│                        │  Cine suntem            │ ← H2
│  [Poză familie /       │                         │
│   stupină / Bogdan]    │  2-3 paragrafe scurte:  │
│                        │  - Povestea stupinei    │
│  (imagine portret)     │  - Pasiunea pentru api  │
│                        │  - De ce Happy Bees     │
│                        │                         │
│                        │  [Link: Citește povestea│
│                        │         completă →]     │
└────────────────────────┴────────────────────────┘
```

**Content:**
- **H2:** "Cine suntem" / "Povestea noastră"
- **Text:** 2-3 paragrafe (max 150 cuvinte total)
  - Exemplu: "Stupina Happy Bees a început ca un hobby al familiei Bogdănel, în urmă cu peste 10 ani. Astăzi, cele 20 de familii de albine..."
- **CTA:** Link text "Citește povestea completă →" (link /despre/)
- **Imagine:** Opțional - poză cu Bogdan/familie la stupină

**Editabil în CMS:**
- ✅ Imagine (upload/replace)
- ✅ Titlu H2
- ✅ Text paragrafe
- ✅ Text link CTA

#### C) Produse Featured (3-4 produse)

**Layout:**
```
┌──────────────────────────────────────────────────┐
│            Produsele noastre                     │ ← H2
│                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐│
│  │[Poză]  │  │[Poză]  │  │[Poză]  │  │[Poză]  ││
│  │Miere   │  │Miere   │  │Polen   │  │Propolis││
│  │Salcâm  │  │Polifl. │  │        │  │        ││
│  │45 RON  │  │40 RON  │  │30 RON  │  │35 RON  ││
│  │[Detalii│  │[Detalii│  │[Detalii│  │[Detalii││
│  └────────┘  └────────┘  └────────┘  └────────┘│
│                                                  │
│        [Buton: "Vezi toate produsele"]           │
└──────────────────────────────────────────────────┘
```

**Card produs (mini):**
- Poză produs (4:3 aspect)
- Nume produs (H3)
- Preț (bold, galben #E6B84E)
- Buton "Detalii" → link /produse/slug/

**Content:**
- **H2:** "Produsele noastre" / "Miere și produse apicole"
- **Produse:** Top 3-4 produse (miere salcâm, poliflora, polen, propolis)
- **CTA:** "Vezi toate produsele" → /produse/

**Editabil în CMS:**
- ✅ Selecție produse featured (din listă produse existente)
- ✅ Ordine afișare

#### D) Articole Recente (2-3 articole)

**Layout:**
```
┌──────────────────────────────────────────────────┐
│            Jurnal apicol                         │ ← H2
│                                                  │
│  ┌────────────────┐  ┌────────────────┐         │
│  │[Poză expresivă]│  │[Poză expresivă]│         │
│  │Lucrări         │  │Recoltarea      │         │
│  │primăvară       │  │mierii de tei   │         │
│  │                │  │                │         │
│  │Scurt text...   │  │Scurt text...   │         │
│  │[Citește →]     │  │[Citește →]     │         │
│  └────────────────┘  └────────────────┘         │
│                                                  │
│        [Buton: "Vezi toate articolele"]          │
└──────────────────────────────────────────────────┘
```

**Card articol:**
- Poză card (3:2 landscape)
- Titlu articol (H3)
- Rezumat scurt (2-3 rânduri)
- Link "Citește →" / "Află mai mult →"

**Content:**
- **H2:** "Jurnal apicol" / "Din viața stupinei"
- **Articole:** Ultimele 2-3 articole (sortate după dată desc)

**Editabil în CMS:**
- ✅ Articolele apar automat (ultimele 2-3 publicate)

#### E) CTA Final (Contact/Comandă)

**Layout:**
```
┌──────────────────────────────────────────────────┐
│ [Background: Cream #FFF8E7]                      │
│                                                  │
│     Vrei să comanzi miere naturală?              │ ← H2
│                                                  │
│     Contactează-ne direct sau completează        │
│     formularul de comandă rapid.                 │
│                                                  │
│  [Buton: "Trimite mesaj"]  [Buton: "Comandă"]   │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Content:**
- **H2:** CTA text (editat în CMS)
- **Text:** Scurt paragraf (1-2 rânduri)
- **Butoane:** "Trimite mesaj" (→ /contact/) + "Comandă" (→ /contact/#formular-comanda)

---

### 3.3 Pagina Produse (/produse/)

**Obiectiv:** Lista toate produsele, filtrare (opțional), navigare către produs individual

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  Produse apicole                                 │ ← H1
│  Miere naturală, polen, propolis, ceară          │ ← Subtitlu
│                                                  │
│  [Filtrare opțională: Toate | Miere | Altele]   │
│                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐│
│  │[Poză]  │  │[Poză]  │  │[Poză]  │  │[Poză]  ││
│  │        │  │        │  │        │  │        ││
│  │Miere   │  │Miere   │  │Polen   │  │Propolis││
│  │Salcâm  │  │Polifl. │  │        │  │        ││
│  │        │  │        │  │        │  │        ││
│  │45 RON/ │  │40 RON/ │  │30 RON/ │  │35 RON/ ││
│  │kg      │  │kg      │  │100g    │  │50ml    ││
│  │        │  │        │  │        │  │        ││
│  │Miere   │  │Miere   │  │Polen   │  │Tinctură││
│  │dulce...│  │aromată.│  │natural.│  │propolis││
│  │        │  │        │  │        │  │        ││
│  │✓ Dispo │  │✗ Indis │  │✓ Dispo │  │✓ Dispo ││
│  │        │  │        │  │        │  │        ││
│  │[Detalii│  │[Detalii│  │[Detalii│  │[Detalii││
│  └────────┘  └────────┘  └────────┘  └────────┘│
│                                                  │
└──────────────────────────────────────────────────┘
```

**Card produs (complet):**
- **Poză:** 400x300px (4:3), lazy loading
- **Nume:** H3 (ex: "Miere de Salcâm")
- **Preț:** Bold, galben (#E6B84E), ex: "45 RON/kg"
- **Descriere scurtă:** 2-3 rânduri (max 100 caractere)
- **Disponibilitate:** Badge (✓ Disponibil / ✗ Indisponibil)
- **CTA:** Buton "Detalii" → /produse/miere-salcam/

**Filtrare (opțional, v2):**
- Toggle buttons: "Toate" | "Miere" | "Polen & Propolis" | "Ceară"
- JavaScript filter (fără reload pagină)

**Editabil în CMS:**
- ✅ Adăugare produs nou (formular complet în /admin/)
- ✅ Editare produs existent (nume, preț, descriere, imagine, disponibilitate)
- ✅ Ștergere produs (sau toggle "published: false")
- ✅ Ordine afișare (sortare manuală sau după dată)

---

### 3.4 Pagina Produs Individual (/produse/[slug]/)

**Obiectiv:** Detalii complete produs, galerie, CTA comandă

**Layout:**
```
┌────────────────────┬────────────────────────────┐
│                    │  Miere de Salcâm           │ ← H1
│  [Imagine mare]    │                            │
│   produs           │  45 RON / kg               │ ← Preț mare
│                    │                            │
│  [Galerie mini]    │  ✓ Disponibil              │ ← Status
│  [thumb][thumb]    │                            │
│                    │  Descriere completă:       │
│                    │  Mierea de salcâm este...  │
│                    │  3-4 paragrafe detaliate   │
│                    │                            │
│                    │  Caracteristici:           │
│                    │  • Culoare: amber deschis  │
│                    │  • Gust: dulce, delicat    │
│                    │  • Cristalizare: lentă     │
│                    │  • Origine: zona X         │
│                    │                            │
│                    │  [Buton mare: Comandă]     │
└────────────────────┴────────────────────────────┘
```

**Secțiuni:**

**A) Galerie Imagini**
- Imagine principală mare (800x600px)
- Thumbnails dedesubt (click → schimbă imaginea mare)
- Lightbox (click imagine mare → modal full-screen)

**B) Detalii Produs**
- **H1:** Nume produs
- **Preț:** Foarte vizibil, bold, galben
- **Disponibilitate:** Badge (Verde: Disponibil / Roșu: Indisponibil / Galben: Stoc limitat)
- **Descriere:** 3-5 paragrafe (Markdown rich text)
  - Ce e special la acest tip de miere
  - Cum e produsă
  - Recomandări consum
- **Caracteristici:** Listă cu bullet points
  - Culoare, gust, aromă
  - Cristalizare
  - Origine (zona geografică)
  - Perioada recoltare

**C) CTA Comandă**
- Buton mare "Comandă acum" → link /contact/ cu produs pre-selectat
- SAU formular comandă inline (v2)

**Editabil în CMS:**
- ✅ Nume produs
- ✅ Preț
- ✅ Disponibilitate (dropdown: Disponibil / Indisponibil / Stoc limitat)
- ✅ Imagine principală (upload/replace)
- ✅ Galerie imagini (upload multiplu, reorder, delete)
- ✅ Descriere completă (Markdown editor)
- ✅ Caracteristici (listă editabilă: câmp text repeated)

---

### 3.5 Pagina Articole (/articole/)

**Obiectiv:** Lista articole jurnal apicol, navigare către articol complet

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  Jurnal apicol                                   │ ← H1
│  Povești și lucrări din viața stupinei           │ ← Subtitlu
│                                                  │
│  [Filter opțional: Toate | Primăvară | Vară |   │
│                    Toamnă | Iarnă]               │
│                                                  │
│  ┌─────────────────────────────────────────────┐│
│  │ ┌──────┐  Lucrări de primăvară la stupină  ││ ← Card mare
│  │ │[Poză]│  15 Martie 2025 | Primăvară        ││
│  │ │      │                                    ││
│  │ │ card │  La început de primăvară, albinele ││
│  │ │3:2   │  noastre încep să iasă din stup... ││
│  │ │      │  (rezumat 2-3 rânduri)             ││
│  │ └──────┘                                    ││
│  │         [Citește articolul →]               ││
│  └─────────────────────────────────────────────┘│
│                                                  │
│  ┌─────────────────────────────────────────────┐│
│  │ ┌──────┐  Recoltarea mierii de tei          ││
│  │ │[Poză]│  22 Iunie 2025 | Vară              ││
│  │ └──────┘  Rezumat...                        ││
│  │         [Citește articolul →]               ││
│  └─────────────────────────────────────────────┘│
│                                                  │
│  [Paginare: ← 1 2 3 →] (dacă >10 articole)     │
└──────────────────────────────────────────────────┘
```

**Card articol (listă):**
- **Layout:** Horizontal (poză stânga, text dreapta)
- **Poză card:** 3:2 landscape, 600x400px
- **Titlu:** H2, link către articol
- **Metadata:** Dată publicare + Categorie (sezon)
- **Rezumat:** 2-3 rânduri (max 150 caractere)
- **CTA:** Link text "Citește articolul →"

**Filtrare pe sezoane (opțional):**
- Toggle: Toate | Primăvară | Vară | Toamnă | Iarnă
- JavaScript filter

**Editabil în CMS:**
- ✅ Adăugare articol nou
- ✅ Editare articol existent
- ✅ Ștergere articol
- ✅ Filtrare automată după categorie (sezon)

---

### 3.6 Pagina Articol Individual (/articole/[slug]/)

**Obiectiv:** Conținut complet articol, imagini inline, experiență de citire plăcută

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  [Imagine Hero articol - full width]             │
│                                                  │
│  Lucrări de primăvară la stupină                 │ ← H1 (overlay pe imagine)
│  15 Martie 2025 | Primăvară                      │ ← Metadata
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  [Container max 800px centrat - citire ușoară]   │
│                                                  │
│  La început de primăvară, când temperatura       │
│  ajunge la 10-12 grade, albinele noastre...     │
│                                                  │
│  [Imagine inline - full width container]         │
│                                                  │
│  Primul lucru pe care îl facem este...           │
│                                                  │
│  ## Verificarea stupilor                         │ ← H2 (subsecțiune)
│                                                  │
│  Text articol continuat...                       │
│                                                  │
│  [Galerie 2-3 imagini]                           │
│                                                  │
│  Concluzie articol...                            │
│                                                  │
│  ─────────────────────────────                   │
│                                                  │
│  [Box CTA:]                                      │
│  Vrei să afli mai multe despre produsele         │
│  noastre? [Buton: Vezi produsele]                │
│                                                  │
│  ─────────────────────────────                   │
│                                                  │
│  ← Articol anterior | Înapoi la articole |       │
│                      Articol următor →           │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Secțiuni:**

**A) Hero Articol**
- Imagine hero full-width (16:9, 1920x1080px)
- Overlay gradient (bottom → transparent) pentru lizibilitate text
- H1 titlu articol (alb, pe overlay)
- Metadata: Dată + Categorie (alb, font mic)

**B) Conținut Articol**
- Container max 800px (reading width optimal)
- **Rich text Markdown:**
  - Paragrafe
  - Headings H2, H3 (subsecțiuni)
  - Liste (bullet, numbered)
  - Bold, italic
  - Link-uri
  - Imagini inline (upload în editor)
  - Galerii (2-4 imagini grid)

**C) CTA Box (final articol)**
- Background cream (#FFF8E7)
- Text CTA: "Vrei să afli mai multe despre produsele noastre?"
- Buton: "Vezi produsele" → /produse/

**D) Navigare Articole**
- Link "← Articol anterior" (dacă există)
- Link "Înapoi la articole" → /articole/
- Link "Articol următor →" (dacă există)

**Editabil în CMS:**
- ✅ Titlu articol (H1)
- ✅ Dată publicare (date picker)
- ✅ Categorie / Sezon (dropdown: Primăvară, Vară, Toamnă, Iarnă, General)
- ✅ Imagine hero (upload/replace)
- ✅ Imagine card (pentru listă articole) (upload/replace)
- ✅ Rezumat scurt (textarea, max 200 caractere)
- ✅ Conținut articol (Markdown rich editor)
  - ✅ Upload imagini inline (drag & drop în editor)
  - ✅ Inserare galerii (listă imagini)

---

### 3.7 Pagina Despre (/despre/)

**Obiectiv:** Povestea stupinei, valori, legătura personală cu Bogdan/familia

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  [Imagine hero: stupină în natură / Bogdan]      │
│                                                  │
│  Povestea Happy Bees                             │ ← H1 (overlay)
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Cine suntem                                     │ ← H2
│                                                  │
│  ┌──────────┐  Stupina Happy Bees a început     │
│  │          │  ca un hobby al familiei Bogdănel, │
│  │  [Poză]  │  în urmă cu peste 10 ani...        │
│  │ Bogdan / │                                    │
│  │ familie  │  3-5 paragrafe poveste:            │
│  │          │  - Cum a început                   │
│  │ portret  │  - De ce apicultură                │
│  │          │  - Primele familii de albine       │
│  └──────────┘  - Astăzi: X familii, zona Y      │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Valorile noastre                                │ ← H2
│                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │ [Icon] │  │ [Icon] │  │ [Icon] │            │
│  │Natural │  │Calitate│  │Familie │            │
│  │        │  │        │  │        │            │
│  │Text... │  │Text... │  │Text... │            │
│  └────────┘  └────────┘  └────────┘            │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Stupina noastră                                 │ ← H2
│                                                  │
│  [Galerie 4-6 imagini: stupină, albine, lucru]  │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  [CTA Box]                                       │
│  Vrei să încerci mierea noastră?                │
│  [Buton: Vezi produsele]  [Buton: Contact]      │
└──────────────────────────────────────────────────┘
```

**Secțiuni:**

**A) Hero**
- Imagine: Stupină în peisaj natural SAU Bogdan la stupină
- H1: "Povestea Happy Bees" / "Despre noi"

**B) Poveste (Cine suntem)**
- H2: "Cine suntem"
- Poză portret Bogdan/familie (opțional, stânga)
- Text poveste (3-5 paragrafe, 300-500 cuvinte):
  - Cum a început pasiunea pentru apicultură
  - Primele stupi, primele lecții
  - Evoluția stupinei (câte familii, unde e localizată)
  - De ce "Happy Bees" (nume semnificație)
  - Astăzi: producție, filosofie de lucru

**C) Valori (opțional)**
- 3 coloane cu icon + text scurt:
  - **Natural:** Miere fără aditivi, nefiltrat\u0103
  - **Calitate:** Grijă pentru fiecare stup
  - **Familie:** Producție familială, nu industrială

**D) Galerie Stupină**
- 4-6 imagini: stupi, albine, lucrări, peisaj

**E) CTA Final**
- "Vrei să încerci mierea noastră?"
- Butoane: "Vezi produsele" + "Contactează-ne"

**Editabil în CMS:**
- ✅ Imagine hero (upload/replace)
- ✅ Titlu H1
- ✅ Poză portret Bogdan/familie (upload/replace, opțional)
- ✅ Text poveste (Markdown editor, 3-5 paragrafe)
- ✅ Valori (3x câmpuri: titlu + text scurt)
- ✅ Galerie stupină (upload multiplu imagini, 4-6 poze)

---

### 3.8 Pagina Contact (/contact/)

**Obiectiv:** Formulare contact & comandă, informații contact direct

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  Contact                                         │ ← H1
│                                                  │
│  Ai întrebări sau vrei să comanzi?               │
│  Completează formularul sau contactează-ne       │
│  direct.                                         │
│                                                  │
└──────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────┐
│ FORMULAR CONTACT    │  INFORMAȚII CONTACT        │
│                     │                            │
│ Nume: [______]      │  📧 Email:                 │
│ Email: [_____]      │  contact@happybees.ro      │
│ Telefon: [___]      │                            │
│ Mesaj:              │  📞 Telefon:               │
│ [____________]      │  +40 7XX XXX XXX           │
│ [____________]      │                            │
│ [____________]      │  📍 Locație:               │
│                     │  Zona [X], Județul [Y]     │
│ [Trimite mesaj]     │                            │
│                     │  🕐 Program:               │
│ ─────────────────   │  L-V: 9:00 - 18:00         │
│                     │  (sau la programare)       │
│ FORMULAR COMANDĂ    │                            │
│                     │                            │
│ Nume: [______]      │  [Hartă Google Maps]       │
│ Email: [_____]      │  (opțional, dacă vrei      │
│ Telefon: [___]      │   să arăți zona stupinei)  │
│ Produs:             │                            │
│ [Dropdown: Miere    │                            │
│  Salcâm, etc.]      │                            │
│ Cantitate (kg):     │                            │
│ [___]               │                            │
│ Observații:         │                            │
│ [____________]      │                            │
│                     │                            │
│ [Trimite comanda]   │                            │
└─────────────────────┴────────────────────────────┘
```

**Formulare:**

**A) Formular Contact (General)**
- Nume (required)
- Email (required)
- Telefon (optional)
- Mesaj (textarea, required)
- Buton "Trimite mesaj"

**B) Formular Comandă**
- Nume (required)
- Email (required)
- Telefon (required pentru comenzi)
- Produs (dropdown: listă produse disponibile)
- Cantitate (number input, ex: 1 kg, 2 kg)
- Observații (textarea, optional)
- Buton "Trimite comanda"

**Processing Formulare:**
- **Opțiunea 1 (simplu):** Cloudflare Pages Functions → trimite email
- **Opțiunea 2:** Form service extern (ex: Formspree, Basin) - gratuit pentru low volume
- **Opțiunea 3:** Email direct via mailto (mai puțin user-friendly)

**Notificare după submit:**
- Success: "Mulțumim! Vom răspunde în maximum 24h."
- Error: "Ceva nu a mers bine. Te rugăm să ne contactezi direct la [email]."

**Informații Contact (Box dreapta):**
- Email: contact@happybees.ro (link mailto)
- Telefon: +40 7XX XXX XXX (link tel)
- Locație: Zona [X], județul [Y] (text descriptiv, NU adresă exactă dacă nu vrei)
- Program: L-V 9:00-18:00 sau la programare
- Google Maps embed (opțional, dacă vrei să arăți zona generală)

**Editabil în CMS:**
- ✅ Text intro (H1 + paragraf)
- ✅ Informații contact (email, telefon, locație, program) - câmpuri text
- ✅ Google Maps embed code (opțional)

---

## 4. IMAGE MANAGEMENT ÎN CMS (MANDATORY REQUIREMENT)

### 4.1 Cerințe Image Management

**PRIORITATE CRITICĂ:** Toate imaginile trebuie editabile din Decap CMS, fără cod.

**Tipuri imagini necesare:**
1. **Imagine Hero** (homepage, articole, despre)
2. **Imagini produse** (poză principală + galerie)
3. **Imagini articole** (poză card + poze inline în conținut)
4. **Imagini pagini statice** (Despre: portret, galerie stupină)

**Funcționalități CMS:**
- ✅ Upload imagini (drag & drop)
- ✅ Replace imagini existente
- ✅ Media Library vizuală (thumbnails, search)
- ✅ Galerii (listă imagini, upload multiplu, reorder)
- ❌ NU editare foto în CMS (crop, resize, filters)

**Procesare imagini:**
- Hugo Image Processing (automat la build)
- Generare responsive images (320w, 640w, 1024w, 1920w)
- Conversie WebP + JPEG fallback
- Lazy loading automat

---

### 4.2 Configurație Decap CMS - Image Fields

**Fișier: `static/admin/config.yml`**

```yaml
backend:
  name: github
  repo: bogdan/happybees  # Repo GitHub
  branch: main

media_folder: "static/images/uploads"  # Unde se salvează imaginile
public_folder: "/images/uploads"        # Path public pentru imagini

# Collections

collections:
  # ========================================
  # PRODUSE
  # ========================================
  - name: "produse_ro"
    label: "Produse (RO)"
    folder: "content/ro/produse"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Nume Produs", name: "title", widget: "string"}
      - {label: "Dată Publicare", name: "date", widget: "datetime"}
      - {label: "Preț (RON)", name: "pret", widget: "number", value_type: "float"}
      - {label: "Unitate", name: "unitate", widget: "string", default: "kg", hint: "ex: kg, 100g, 50ml"}
      - label: "Disponibilitate"
        name: "disponibilitate"
        widget: "select"
        options: ["Disponibil", "Indisponibil", "Stoc limitat"]
        default: "Disponibil"

      # IMAGINE PRINCIPALĂ (MANDATORY)
      - label: "Imagine Produs"
        name: "imagine"
        widget: "image"
        required: true
        hint: "Poză principală produs (min 800x600px, JPEG/PNG)"

      # GALERIE IMAGINI (OPTIONAL)
      - label: "Galerie Imagini"
        name: "galerie"
        widget: "list"
        required: false
        hint: "Poze suplimentare produs (opțional, 2-6 imagini)"
        field: {label: "Imagine", name: "imagine", widget: "image"}

      - {label: "Descriere Scurtă", name: "descriere_scurta", widget: "text", required: true, hint: "Max 150 caractere pentru card"}
      - {label: "Descriere Completă", name: "body", widget: "markdown", required: true}
      - label: "Caracteristici"
        name: "caracteristici"
        widget: "list"
        required: false
        hint: "Lista cu bullet points (ex: Culoare, Gust, Origine)"
        fields:
          - {label: "Caracteristică", name: "item", widget: "string"}

  # ========================================
  # ARTICOLE
  # ========================================
  - name: "articole_ro"
    label: "Articole (RO)"
    folder: "content/ro/articole"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Titlu Articol", name: "title", widget: "string"}
      - {label: "Dată Publicare", name: "date", widget: "datetime"}
      - label: "Categorie / Sezon"
        name: "categorie"
        widget: "select"
        options: ["Primăvară", "Vară", "Toamnă", "Iarnă", "General"]
        default: "General"

      # IMAGINE HERO ARTICOL (MANDATORY)
      - label: "Imagine Hero"
        name: "imagine_hero"
        widget: "image"
        required: true
        hint: "Imagine mare top articol (min 1920x1080px, 16:9)"

      # IMAGINE CARD (pentru listă articole) (MANDATORY)
      - label: "Imagine Card"
        name: "imagine_card"
        widget: "image"
        required: true
        hint: "Poză mică pentru card articol în listă (min 600x400px, 3:2)"

      - {label: "Rezumat Scurt", name: "rezumat", widget: "text", required: true, hint: "Max 200 caractere pentru card"}
      - {label: "Conținut Articol", name: "body", widget: "markdown", required: true, hint: "Poți insera imagini inline în editor"}

  # ========================================
  # PAGINI STATICE
  # ========================================
  - name: "pagini_ro"
    label: "Pagini (RO)"
    files:
      # HOMEPAGE
      - label: "Homepage"
        name: "homepage"
        file: "content/ro/_index.md"
        fields:
          - {label: "Titlu Pagină", name: "title", widget: "string", default: "Acasă"}

          # HERO SECTION
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - {label: "Titlu Principal (H1)", name: "titlu", widget: "string"}
              - {label: "Subtitlu (H2)", name: "subtitlu", widget: "string"}
              - {label: "Text Buton CTA", name: "cta_text", widget: "string", default: "Descoperă produsele"}
              - {label: "Link Buton CTA", name: "cta_link", widget: "string", default: "/produse/"}
              - label: "Imagine Hero"
                name: "imagine"
                widget: "image"
                required: true
                hint: "Background hero (min 1920x1080px, landscape)"

          # DESPRE PREVIEW
          - label: "Despre Preview"
            name: "despre_preview"
            widget: "object"
            fields:
              - {label: "Titlu (H2)", name: "titlu", widget: "string", default: "Cine suntem"}
              - {label: "Text (2-3 paragrafe)", name: "text", widget: "markdown"}
              - label: "Imagine"
                name: "imagine"
                widget: "image"
                required: false
                hint: "Poză familie/stupină (opțional)"

      # DESPRE
      - label: "Despre"
        name: "despre"
        file: "content/ro/despre.md"
        fields:
          - {label: "Titlu Pagină (H1)", name: "title", widget: "string", default: "Despre noi"}

          # IMAGINE HERO
          - label: "Imagine Hero"
            name: "imagine_hero"
            widget: "image"
            required: true
            hint: "Background hero pagină despre (min 1920x1080px)"

          # POVESTE
          - label: "Povestea Noastră"
            name: "poveste"
            widget: "object"
            fields:
              - {label: "Titlu (H2)", name: "titlu", widget: "string", default: "Cine suntem"}
              - {label: "Text Poveste", name: "text", widget: "markdown", hint: "3-5 paragrafe"}
              - label: "Poză Portret (Bogdan/Familie)"
                name: "imagine_portret"
                widget: "image"
                required: false
                hint: "Opțional - poză personală"

          # VALORI
          - label: "Valori"
            name: "valori"
            widget: "list"
            max: 3
            fields:
              - {label: "Titlu", name: "titlu", widget: "string"}
              - {label: "Text", name: "text", widget: "text"}

          # GALERIE STUPINĂ
          - label: "Galerie Stupină"
            name: "galerie"
            widget: "list"
            required: false
            hint: "4-6 imagini cu stupina, albine, lucrări"
            field: {label: "Imagine", name: "imagine", widget: "image"}

      # CONTACT
      - label: "Contact"
        name: "contact"
        file: "content/ro/contact.md"
        fields:
          - {label: "Titlu Pagină (H1)", name: "title", widget: "string", default: "Contact"}
          - {label: "Text Intro", name: "intro", widget: "text"}

          # INFORMAȚII CONTACT
          - label: "Informații Contact"
            name: "info"
            widget: "object"
            fields:
              - {label: "Email", name: "email", widget: "string"}
              - {label: "Telefon", name: "telefon", widget: "string"}
              - {label: "Locație", name: "locatie", widget: "string"}
              - {label: "Program", name: "program", widget: "text"}
              - {label: "Google Maps Embed Code", name: "maps_embed", widget: "text", required: false}
```

---

### 4.3 Media Library - Configurație

**În config.yml:**

```yaml
# Media Library Settings
media_library:
  name: uploadcare  # SAU cloudinary, sau default (git)
  config:
    # Opțional: integrare cu serviciu extern pentru preview mai bun
    # Pentru început: NU trebuie, Decap built-in e suficient

# SAU (recomandat - simplu, Git-based):
# NU specificăm media_library = Decap folosește Git default
# Avantaj: toate imaginile în repo, versioning, backup automat
```

**Workflow Media Library (Git-based):**

1. **Upload imagine:**
   - Drag & drop în câmp Image SAU click "Choose an image"
   - Decap salvează în `static/images/uploads/`
   - Commit automat în Git

2. **Media Library (vizualizare):**
   - Click "Media" în sidebar Decap CMS
   - Thumbnails toate imaginile (grid view)
   - Search by filename
   - Click imagine → details (size, path, delete option)

3. **Replace imagine:**
   - În editor produs/articol
   - Click imagine existentă → "Remove"
   - Upload imagine nouă → Save
   - Commit nou în Git

4. **Organizare:**
   - Opțional: folders în `static/images/uploads/`
     ```
     /static/images/uploads/
       /produse/
       /articole/
       /pagini/
     ```
   - Configurare în Decap:
     ```yaml
     media_folder: "static/images/uploads/produse"  # Per collection
     ```

---

### 4.4 Hugo Image Processing - Automat la Build

**Template Hugo pentru procesare imagini:**

**Fișier: `layouts/_default/single.html` (exemplu produs)**

```go-html-template
{{ define "main" }}
<article class="produs">
  <h1>{{ .Title }}</h1>

  {{/* IMAGINE PRINCIPALĂ - Procesare automată */}}
  {{ with .Params.imagine }}
    {{ $img := resources.Get . }}
    {{ if $img }}
      {{/* Generare responsive images */}}
      {{ $small := $img.Resize "640x webp" }}
      {{ $medium := $img.Resize "1024x webp" }}
      {{ $large := $img.Resize "1920x webp" }}

      <picture>
        <source media="(max-width: 640px)" srcset="{{ $small.RelPermalink }}" type="image/webp">
        <source media="(max-width: 1024px)" srcset="{{ $medium.RelPermalink }}" type="image/webp">
        <source srcset="{{ $large.RelPermalink }}" type="image/webp">
        <img src="{{ $img.RelPermalink }}" alt="{{ $.Title }}" loading="lazy">
      </picture>
    {{ end }}
  {{ end }}

  <p class="pret">{{ .Params.pret }} RON / {{ .Params.unitate }}</p>

  {{/* GALERIE - Loop prin imagini */}}
  {{ with .Params.galerie }}
    <div class="galerie">
      {{ range . }}
        {{ $galImg := resources.Get .imagine }}
        {{ if $galImg }}
          {{ $thumb := $galImg.Fill "400x300 webp" }}
          <a href="{{ $galImg.RelPermalink }}" data-lightbox="galerie">
            <img src="{{ $thumb.RelPermalink }}" alt="{{ $.Title }}" loading="lazy">
          </a>
        {{ end }}
      {{ end }}
    </div>
  {{ end }}

  <div class="descriere">
    {{ .Content }}
  </div>
</article>
{{ end }}
```

**Ce face Hugo automat:**
1. Citește `imagine: /images/uploads/miere-salcam.jpg` din Front Matter
2. Generează 3 dimensiuni (640w, 1024w, 1920w)
3. Convertește în WebP (+ fallback JPEG)
4. Lazy loading (`loading="lazy"`)
5. Output final: `<picture>` cu srcset responsive

**Build time:**
- 10 imagini produse: ~5-10 secunde (Hugo e rapid)
- 50 imagini total (produse + articole): ~20-30 secunde
- Procesare AUTOMATĂ, NU manual

---

### 4.5 Workflow Image Management - Rezumat

**Editare zilnică (Proprietar - Bogdan):**

```
1. Intră pe happybees.ro/admin/
2. Login GitHub (un click)
3. Navigare:
   - Produse (RO) → Miere Salcâm
   - SAU Articole (RO) → Lucrări primăvară
   - SAU Pagini (RO) → Homepage

4. Editare imagine:
   Opțiunea A - Replace imagine existentă:
     - Click imagine → Remove
     - Drag & drop imagine nouă
     - Save

   Opțiunea B - Adaugă în galerie:
     - Scroll la "Galerie Imagini"
     - Click [+ Add imagine]
     - Upload imagine
     - Repeat pentru 2-6 imagini
     - Save

5. Decap face commit în GitHub (automat)
6. Cloudflare detectează commit → build Hugo (30s)
7. Hugo procesează imaginile (resize, WebP) (automat)
8. Deploy live → Site actualizat cu imagini noi ✅

Timp total: 2-3 minute
```

**NU trebuie:**
- ❌ Să intri în cod
- ❌ Să rulezi comenzi terminal
- ❌ Să optimizezi manual imaginile (Hugo face automat)
- ❌ Să configurezi responsive images (Hugo template face automat)

---

## 5. CONTENT STRATEGY

### 5.1 Inventar Conținut Necesar

**Înainte de launch, pregătește:**

**A) Texte:**
- [ ] Homepage:
  - [ ] Titlu H1 hero
  - [ ] Subtitlu H2 hero
  - [ ] Despre preview (2-3 paragrafe, ~150 cuv)
- [ ] Despre:
  - [ ] Povestea stupinei (3-5 paragrafe, 300-500 cuv)
  - [ ] 3 valori (titlu + text scurt fiecare)
- [ ] Produse:
  - [ ] Pentru fiecare produs (miere, polen, propolis):
    - [ ] Nume
    - [ ] Preț
    - [ ] Descriere scurtă (max 150 caractere)
    - [ ] Descriere completă (3-5 paragrafe)
    - [ ] Caracteristici (5-8 bullet points)
- [ ] Contact:
  - [ ] Email, telefon, locație, program

**B) Imagini:**
- [ ] Homepage:
  - [ ] 1x Imagine hero (câmp flori / albine) - 1920x1080px
  - [ ] 1x Poză despre preview (opțional) - 800x600px
- [ ] Despre:
  - [ ] 1x Imagine hero (stupină în natură) - 1920x1080px
  - [ ] 1x Poză portret Bogdan/familie (opțional) - 600x800px
  - [ ] 4-6x Galerie stupină - min 1024x768px
- [ ] Produse (per produs):
  - [ ] 1x Imagine principală - 800x600px
  - [ ] 2-4x Galerie (opțional) - min 800x600px
- [ ] Articole (per articol):
  - [ ] 1x Imagine hero - 1920x1080px
  - [ ] 1x Imagine card - 600x400px
  - [ ] 2-4x Imagini inline (opțional) - min 1024x768px

**C) Logo & Brand:**
- [ ] Logo Happy Bees (PNG, min 500px width)
- [ ] Logo variante (alb, monochrome) - opțional
- [ ] Favicon (generat din logo) - 512x512px

---

### 5.2 Ghid Scriere Conținut

**Ton & Voice (reminder):**
- Familiar, prietenos (tu / voi)
- Autentic, personal
- NU corporatist, NU sales-y

**Structură Paragrafe:**
- Scurt: 2-4 rânduri per paragraf (citire ușoară pe mobile)
- Spațiere generoasă între paragrafe
- Headings H2/H3 pentru subsecțiuni (break monotonie)

**Exemple Scriere:**

**❌ Corporate (NU):**
> "Compania noastră oferă produse apicole de calitate superioară, certificate conform standardelor europene. Beneficiați de livrare rapidă și garanție de mulțumire 100%."

**✅ Familiar (DA):**
> "Mierea noastră e exact cum o făceam și bunicii: naturală, nefiltrat\u0103, direct din fagure. Fiecare borcan e făcut cu grijă în stupina noastră din [zona X]. Dacă vrei miere autentică, așa cum o face natura, ești în locul potrivit."

---

### 5.3 SEO - Keywords & Meta

**Keywords țintă (pentru SEO):**
- miere naturală
- miere de salcâm
- miere poliflora
- stupină [zona geografică]
- produse apicole naturale
- miere de la producător

**Meta Descriptions (per pagină):**

```yaml
# Homepage
meta_description: "Happy Bees - Miere naturală din stupina familiei Bogdănel. Miere de salcâm, poliflora, polen, propolis. Producție artizanală, direct de la apicultor."

# Produse
meta_description: "Produse apicole naturale: miere de salcâm, tei, poliflora, polen, propolis. Miere nefiltrat\u0103, direct din stupina Happy Bees."

# Despre
meta_description: "Povestea stupinei Happy Bees - pasiune pentru apicultură și miere naturală din [zona X]. Producție familială, tradiție și calitate."
```

**Open Graph (Social Share):**
```yaml
# Per pagină - în Front Matter
og_image: /images/og-happybees.jpg  # Imagine preview pentru Facebook/WhatsApp
og_title: "Happy Bees - Miere naturală din stupina familiei Bogdănel"
og_description: "Descoperă mierea naturală, nefiltrat\u0103, direct de la apicultor."
```

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1 Structură Hugo - Folders & Files

```
happybees/
├── archetypes/          # Template-uri pentru conținut nou
│   ├── default.md
│   ├── produse.md       # Template adăugare produs nou
│   └── articole.md      # Template adăugare articol nou
│
├── assets/              # Assets procesate de Hugo (CSS, JS, imagini)
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
│
├── content/             # Conținut Markdown (editabil în CMS)
│   ├── ro/              # Română (limba primară)
│   │   ├── _index.md    # Homepage
│   │   ├── despre.md    # Pagină Despre
│   │   ├── contact.md   # Pagină Contact
│   │   ├── produse/     # Folder produse
│   │   │   ├── _index.md           # Lista produse
│   │   │   ├── miere-salcam.md
│   │   │   ├── miere-poliflora.md
│   │   │   ├── polen.md
│   │   │   └── propolis.md
│   │   └── articole/    # Folder articole
│   │       ├── _index.md           # Lista articole
│   │       ├── lucrari-primavara.md
│   │       └── recoltarea-mierii.md
│   │
│   └── en/              # English (limba secundară) - Phase 2
│       └── (same structure)
│
├── data/                # Date structurate (opțional)
│   └── config.yml       # Configurări site (nav menu, footer, etc.)
│
├── layouts/             # Template-uri Hugo
│   ├── _default/
│   │   ├── baseof.html         # Layout master
│   │   ├── list.html           # Template listă (produse, articole)
│   │   └── single.html         # Template single (produs, articol)
│   ├── partials/
│   │   ├── header.html         # Header (logo, nav)
│   │   ├── footer.html         # Footer (copyright, links)
│   │   ├── card-produs.html    # Component card produs
│   │   └── card-articol.html   # Component card articol
│   ├── index.html              # Template homepage
│   ├── produse/
│   │   ├── list.html           # Lista produse
│   │   └── single.html         # Pagină produs individual
│   └── articole/
│       ├── list.html           # Lista articole
│       └── single.html         # Pagină articol individual
│
├── static/              # Fișiere statice (copiate as-is)
│   ├── admin/           # Decap CMS
│   │   ├── index.html
│   │   └── config.yml   # ← Config Decap CMS (IMPORTANT!)
│   ├── images/
│   │   ├── uploads/     # ← Imagini upload din CMS (GITIGNORED sau nu)
│   │   └── brand/       # Logo, favicon
│   └── fonts/           # Fonturi (dacă self-hosted)
│
├── config.toml          # Configurare Hugo principală
├── .gitignore
├── README.md
└── package.json         # (opțional) Pentru npm scripts
```

---

### 6.2 Hugo Config (`config.toml`)

```toml
baseURL = "https://happybees.ro"
languageCode = "ro"
title = "Happy Bees - Stupina Bogdănel"
theme = ""  # Custom theme (NU folosim theme extern)

# Multilingv (Phase future - EN)
defaultContentLanguage = "ro"
[languages]
  [languages.ro]
    languageName = "Română"
    weight = 1
    title = "Happy Bees - Stupina Bogdănel"
    [languages.ro.params]
      description = "Miere naturală din stupina familiei Bogdănel"

  # [languages.en]  # Uncomment când adaugi EN
  #   languageName = "English"
  #   weight = 2
  #   title = "Happy Bees - Bogdănel Apiary"

# Params globale
[params]
  description = "Miere naturală, polen, propolis - produse apicole din stupina Happy Bees"
  author = "Happy Bees"
  email = "contact@happybees.ro"
  telefon = "+40 7XX XXX XXX"

  # Open Graph / Social
  og_image = "/images/og-happybees.jpg"

  # Google Analytics (opțional)
  # google_analytics = "G-XXXXXXXXXX"

# Menu principal (sau definit în data/menu.yml)
[[menu.main]]
  name = "Acasă"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Produse"
  url = "/produse/"
  weight = 2

[[menu.main]]
  name = "Articole"
  url = "/articole/"
  weight = 3

[[menu.main]]
  name = "Despre"
  url = "/despre/"
  weight = 4

[[menu.main]]
  name = "Contact"
  url = "/contact/"
  weight = 5

# Image Processing
[imaging]
  quality = 85
  resampleFilter = "Lanczos"

  [imaging.exif]
    disableDate = false
    disableLatLong = true  # Privacy: remove GPS data

# Outputs
[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML"]

# Minify HTML/CSS/JS la build
[minify]
  minifyOutput = true
```

---

### 6.3 Deployment Cloudflare Pages - Final Settings

**Build Configuration:**

```
Framework: Hugo
Build command: hugo --minify
Build output directory: public
Root directory: (leave blank)

Environment variables:
  HUGO_VERSION = 0.122.0
  NODE_VERSION = 18  (dacă folosești npm pentru CSS/JS build)

Branch to deploy: main
Production branch: main
Preview branches: all branches (opțional)

Build watch paths: (default - all files)
```

**Deploy Trigger:**
- Automat la fiecare commit pe branch `main`
- Preview deploy pentru pull requests (opțional)

**Custom Domain:**
```
Primary domain: happybees.ro
DNS Record (Cloudflare DNS):
  Type: CNAME
  Name: @ (sau happybees.ro)
  Target: happybees.pages.dev
  Proxied: Yes (orange cloud)
```

**SSL/HTTPS:**
- Automat activat de Cloudflare
- SSL Mode: Full (strict) - recomandat
- Always Use HTTPS: ON

---

## 7. WIREFRAMES (Text-Based Mockups)

### 7.1 Homepage - Desktop View

```
┌────────────────────────────────────────────────────────────┐
│ [Logo Happy Bees]    Acasă  Produse  Articole  Despre  Contact │ ← Header sticky
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  [BACKGROUND IMAGE: Câmp cu flori galben / Albine]        │
│   (overlay cream 40% translucid)                           │
│                                                            │
│                 Happy Bees                                 │ ← H1 Caveat 56px
│          Miere naturală din stupina                        │ ← H2 Caveat 40px
│             familiei Bogdănel                              │
│                                                            │
│          [Buton: Descoperă produsele →]                    │ ← CTA #E6B84E
│                    (hover lift effect)                     │
│                                                            │
│                       ↓                                    │ ← Scroll indicator
└────────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌──────────────────┐    Cine suntem                      │ ← H2
│  │                  │                                      │
│  │  [Poză familie   │    Stupina Happy Bees a început...  │
│  │   sau stupină]   │    (2-3 paragrafe scurte)           │
│  │                  │                                      │
│  │  600x800px       │    Astăzi avem X familii de albine. │
│  │  portret         │    Producem miere naturală...       │
│  │                  │                                      │
│  └──────────────────┘    [Citește povestea completă →]    │
│                                                            │
└────────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────┐
│              Produsele noastre                             │ ← H2
│                                                            │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │[Poză]  │  │[Poză]  │  │[Poză]  │  │[Poză]  │         │
│  │400x300 │  │400x300 │  │400x300 │  │400x300 │         │
│  │        │  │        │  │        │  │        │         │
│  │Miere   │  │Miere   │  │Polen   │  │Propolis│         │
│  │Salcâm  │  │Polifl. │  │Natural │  │Tinctură│         │ ← H3 Caveat
│  │        │  │        │  │        │  │        │         │
│  │45 RON/kg  │40 RON/kg  │30 RON   │35 RON   │         │ ← Preț #E6B84E
│  │        │  │        │  │        │  │        │         │
│  │Miere   │  │Aromată │  │Surpă   │  │Ideal   │         │ ← Descriere scurtă
│  │dulce...|  │și...   │  │de...   │  │pentru...│         │
│  │        │  │        │  │        │  │        │         │
│  │[Detalii│  │[Detalii│  │[Detalii│  │[Detalii│         │ ← Buton outline
│  └────────┘  └────────┘  └────────┘  └────────┘         │
│                                                            │
│           [Vezi toate produsele →]                         │ ← CTA buton
│                                                            │
└────────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────┐
│              Jurnal apicol                                 │ ← H2
│                                                            │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │[Poză 600x400]   │  │[Poză 600x400]   │                │
│  │                 │  │                 │                │
│  │Lucrări de       │  │Recoltarea       │                │ ← H3 Caveat
│  │primăvară        │  │mierii de tei    │                │
│  │                 │  │                 │                │
│  │15 Martie 2025   │  │22 Iunie 2025    │                │ ← Metadata
│  │                 │  │                 │                │
│  │La început de... │  │În luna iunie... │                │ ← Rezumat
│  │                 │  │                 │                │
│  │[Citește →]      │  │[Citește →]      │                │ ← Link #E6B84E
│  └─────────────────┘  └─────────────────┘                │
│                                                            │
│           [Vezi toate articolele →]                        │
│                                                            │
└────────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────┐
│  [Background: Cream #FFF8E7]                               │
│                                                            │
│        Vrei să comanzi miere naturală?                     │ ← H2
│                                                            │
│   Contactează-ne direct sau completează formularul        │
│          de comandă rapid.                                 │
│                                                            │
│   [Trimite mesaj]        [Comandă acum]                    │ ← CTA butoane
│                                                            │
└────────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────┐
│  [Logo Happy Bees]                                         │ ← Footer
│                                                            │
│  Acasă | Produse | Articole | Despre | Contact            │
│                                                            │
│  © 2025 Happy Bees - Stupina Bogdănel.                    │
│  Toate drepturile rezervate.                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 7.2 Pagină Produs - Desktop View

```
┌────────────────────────────────────────────────────────────┐
│ [Logo Happy Bees]    Acasă  Produse  Articole  Despre  Contact │ ← Header
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Produse / Miere de Salcâm                                 │ ← Breadcrumb
└────────────────────────────────────────────────────────────┘

┌─────────────────────────┬──────────────────────────────────┐
│                         │  Miere de Salcâm                 │ ← H1 Caveat
│  [Imagine mare produs]  │                                  │
│      800x600px          │  45 RON / kg                     │ ← Preț #E6B84E bold
│                         │                                  │
│                         │  ✓ Disponibil                    │ ← Badge verde
│  ┌────┐ ┌────┐ ┌────┐  │                                  │
│  │[T1]│ │[T2]│ │[T3]│  │  Descriere:                      │
│  └────┘ └────┘ └────┘  │                                  │
│   Galerie thumbnails    │  Mierea de salcâm este una din.. │
│   (click → schimbă img) │  cele mai apreciate soiuri...    │
│                         │  (3-4 paragrafe)                 │
│                         │                                  │
│                         │  Caracteristici:                 │
│                         │  • Culoare: amber deschis        │
│                         │  • Gust: dulce, delicat          │
│                         │  • Cristalizare: foarte lentă    │
│                         │  • Origine: zona de câmpie       │
│                         │  • Recoltare: Mai - Iunie        │
│                         │                                  │
│                         │  [Buton mare: Comandă acum]      │ ← CTA #E6B84E
│                         │                                  │
└─────────────────────────┴──────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Alte produse care te-ar putea interesa:                   │ ← H2
│                                                            │
│  ┌────────┐  ┌────────┐  ┌────────┐                       │
│  │Miere   │  │Miere   │  │Polen   │                       │
│  │Polifl. │  │Tei     │  │Natural │                       │
│  └────────┘  └────────┘  └────────┘                       │
│                                                            │
└────────────────────────────────────────────────────────────┘

[Footer...]
```

---

### 7.3 Pagină Articol - Desktop View

```
┌────────────────────────────────────────────────────────────┐
│  [Imagine Hero - Full width 1920x1080]                     │
│   (overlay gradient bottom)                                │
│                                                            │
│   Lucrări de primăvară la stupină                         │ ← H1 Caveat alb
│   15 Martie 2025 | Primăvară                              │ ← Metadata alb
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  [Container max 800px - centrat]                           │
│                                                            │
│  La început de primăvară, când temperatura ajunge la      │
│  10-12 grade Celsius, albinele noastre încep să iasă      │
│  din stup și să exploreze împrejurimile.                  │
│                                                            │
│  Aceasta este perioada cea mai intensă pentru apicultor,  │
│  când trebuie să pregătim stupii pentru sezonul activ.    │
│                                                            │
│  [Imagine inline - 1024x768]                              │ ← Imagine in conținut
│                                                            │
│  ## Verificarea stupilor                                  │ ← H2 (subsecțiune)
│                                                            │
│  Primul lucru pe care îl facem este să verificăm fiecare  │
│  stup individual. Căutăm să vedem:                        │
│                                                            │
│  • Dacă matca este activă și depune ouă                   │
│  • Starea proviziilor de miere și polen                   │
│  • Sănătatea albinelor (boli, paraziți)                   │
│  • Dacă e nevoie de expandare (rame suplimentare)         │
│                                                            │
│  [Galerie 3 imagini - grid 3 col]                         │
│                                                            │
│  ## Hrănirea suplimentară                                 │ ← H2
│                                                            │
│  Text continuat...                                         │
│                                                            │
│  ─────────────────────────────────────────                │
│                                                            │
│  [Box CTA - Background cream]                              │
│  Vrei să afli mai multe despre produsele noastre?         │
│  [Buton: Vezi produsele →]                                │
│                                                            │
│  ─────────────────────────────────────────                │
│                                                            │
│  ← Articol anterior | Înapoi la articole | Articol următor → │
│                                                            │
└────────────────────────────────────────────────────────────┘

[Footer...]
```

---

## 8. NEXT STEPS - Implementation Roadmap

### 8.1 Phase 4: Implementation - Plan

**Pas 1: Setup Repository & Hugo (2-3 ore)**
- [ ] Creare repo GitHub `happybees`
- [ ] Setup Hugo local
- [ ] Creare structură folders (content, layouts, static)
- [ ] Config `config.toml` (multilingv RO, meniu, params)
- [ ] Push la GitHub

**Pas 2: Decap CMS Installation (1-2 ore)**
- [ ] Creare `static/admin/index.html`
- [ ] Creare `static/admin/config.yml` (collections: produse, articole, pagini)
- [ ] Test local: `hugo server` → vizitare `/admin/`
- [ ] Login GitHub OAuth → test CMS

**Pas 3: Design System Implementation (3-4 ore)**
- [ ] Setup fonts (Caveat + Inter) - Google Fonts
- [ ] Creare `assets/css/main.css`:
  - [ ] CSS variables (culori, spacing, fonturi)
  - [ ] Reset CSS
  - [ ] Componente (butoane, cards, forms)
- [ ] Test design system (componente izolate)

**Pas 4: Template-uri Hugo (5-7 ore)**
- [ ] `layouts/_default/baseof.html` (master layout)
- [ ] `layouts/partials/header.html` (logo, nav)
- [ ] `layouts/partials/footer.html` (copyright)
- [ ] `layouts/index.html` (homepage)
- [ ] `layouts/produse/list.html` + `single.html`
- [ ] `layouts/articole/list.html` + `single.html`
- [ ] `layouts/partials/card-produs.html`
- [ ] `layouts/partials/card-articol.html`
- [ ] Test Hugo Image Processing (responsive images, WebP)

**Pas 5: Content Initial (3-4 ore)**
- [ ] Homepage (`content/ro/_index.md`)
- [ ] Despre (`content/ro/despre.md`)
- [ ] Contact (`content/ro/contact.md`)
- [ ] 2-3 produse test (`content/ro/produse/`)
- [ ] 1-2 articole test (`content/ro/articole/`)
- [ ] Upload imagini test (hero, produse, articole)

**Pas 6: Formulare Contact/Comandă (2-3 ore)**
- [ ] Creare `layouts/contact.html` (formulare)
- [ ] Setup Cloudflare Pages Function pentru procesare formular
  - SAU integrare Formspree (mai simplu, gratuit)
- [ ] Test submit formular → primire email

**Pas 7: Deploy Cloudflare Pages (1 oră)**
- [ ] Cloudflare Dashboard → Pages → Create project
- [ ] Connect GitHub repo `happybees`
- [ ] Build settings (Hugo, env vars)
- [ ] Deploy test → verificare site live
- [ ] Custom domain `happybees.ro` (DNS CNAME)
- [ ] Test SSL, HTTPS redirect

**Pas 8: Test Workflow CMS (1 oră)**
- [ ] Test editare produs (schimbare preț, upload imagine)
- [ ] Test adăugare articol nou
- [ ] Test deploy automat (commit → build → live)
- [ ] Verificare Image Processing (Hugo generează WebP, responsive)

**Pas 9: Content Real & Launch (variabil)**
- [ ] Migrare conținut real (texte, imagini finale)
- [ ] Review design (ajustări culori, spacing)
- [ ] Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile responsive
- [ ] SEO check (meta descriptions, og:image, sitemap.xml)
- [ ] Google Analytics setup (opțional)
- [ ] **LAUNCH!** 🚀

---

### 8.2 Estimare Timp Total

| Phase | Descriere | Timp Estimat |
|-------|-----------|--------------|
| **Phase 1** | Analysis | ✅ DONE (2 ore) |
| **Phase 2** | Architecture | ✅ DONE (2 ore) |
| **Phase 3** | Planning (PRD) | ✅ DONE (3 ore) |
| **Phase 4.1** | Setup Hugo + Decap | 3-5 ore |
| **Phase 4.2** | Design System CSS | 3-4 ore |
| **Phase 4.3** | Template-uri Hugo | 5-7 ore |
| **Phase 4.4** | Content initial + Formulare | 5-7 ore |
| **Phase 4.5** | Deploy + Test | 2-3 ore |
| **Phase 4.6** | Content real + Launch | 4-6 ore |
| **TOTAL Phase 4** | | **22-32 ore** (3-4 zile lucru) |

**TOTAL PROIECT (Phase 1-4):** ~30-40 ore (1 săptămână full-time SAU 2-3 săptămâni part-time)

---

## 9. VALIDATION & SIGN-OFF

### 9.1 PRD Review Checklist

**Înainte de Phase 4 Implementation, verifică:**

- [ ] **Design System:**
  - [ ] Paleta culori extrasă corect din logo Happy Bees?
  - [ ] Fonturi Caveat + Inter potrivite pentru brand?
  - [ ] Stilul vizual (prietenos, natural, NU corporatist) e consistent?

- [ ] **Structură Pagini:**
  - [ ] Homepage: Hero + Despre preview + Produse + Articole + CTA?
  - [ ] Produse: Listă + Single cu galerie?
  - [ ] Articole: Listă + Single cu conținut rich?
  - [ ] Despre: Poveste + Valori + Galerie?
  - [ ] Contact: Formulare + Info contact?

- [ ] **Image Management (MANDATORY):**
  - [ ] Decap CMS config include câmpuri Image pentru TOATE tipurile?
  - [ ] Galerii configurate (upload multiplu)?
  - [ ] Hugo Image Processing pentru responsive + WebP?
  - [ ] Workflow clar: upload → save → deploy automat?

- [ ] **Ton & Voice:**
  - [ ] Familiar (tu/voi), NU corporatist?
  - [ ] Exemple scriere conținut sunt clare?

- [ ] **Technical Specs:**
  - [ ] Structură Hugo folders e logică?
  - [ ] Decap CMS config.yml e completă?
  - [ ] Cloudflare Pages settings sunt clare?

### 9.2 Întrebări Finale Înainte de Implementation

**Te rog confirmă sau clarifică:**

1. **Design System:**
   - Ești OK cu fonturile Caveat (headings) + Inter (body)?
   - SAU vrei să sugerez alternative?

2. **Content:**
   - Ai texte pregătite pentru Homepage, Despre?
   - SAU vrei placeholder text pentru început (lorem ipsum)?

3. **Imagini:**
   - Ai imagini ready (hero, produse, articole)?
   - SAU facem setup cu imagini placeholder și le înlocuiești tu după?

4. **Formular Contact:**
   - Preferi Cloudflare Pages Function (custom, gratuit, mai tehnic)
   - SAU Formspree (simplu, gratuit, plug-and-play)?

5. **Google Analytics:**
   - Vrei Google Analytics de la început?
   - SAU adăugăm mai târziu?

---

**Status PRD:** ✅ DRAFT COMPLETE
**Data:** 2025-12-21
**Autor:** Claude (BMAD Method - Phase 3)
**Aprobat de:** [Bogdan] - PENDING REVIEW

**Next Action:** Review PRD → Approval → Start Phase 4 Implementation
