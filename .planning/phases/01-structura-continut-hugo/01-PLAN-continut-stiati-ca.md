---
phase: 01-structura-continut-hugo
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/stiati-ca/_index.md
  - content/stiati-ca/hidromelul-bautura-vie-din-miere.md
autonomous: true
requirements:
  - STRUCT-01
  - STRUCT-02
  - STRUCT-03

must_haves:
  truths:
    - "Directorul content/stiati-ca/ există cu cele două fișiere Markdown"
    - "Hugo recunoaște secțiunea și generează URL-ul /stiati-ca/"
    - "Articolul hidromel este accesibil la /stiati-ca/hidromelul-bautura-vie-din-miere/"
    - "Front matter-ul articolului conține câmpurile: title, date, descriere_scurta, imagine_card, draft"
    - "hugo server rulează fără erori de build"
  artifacts:
    - path: "content/stiati-ca/_index.md"
      provides: "Index secțiune cu titlu și descriere"
      contains: "title: \"Știați că?\""
    - path: "content/stiati-ca/hidromelul-bautura-vie-din-miere.md"
      provides: "Primul articol complet cu front matter și conținut"
      exports: []
  key_links:
    - from: "content/stiati-ca/_index.md"
      to: "URL /stiati-ca/"
      via: "Hugo section detection"
      pattern: "title:"
    - from: "content/stiati-ca/hidromelul-bautura-vie-din-miere.md"
      to: "URL /stiati-ca/hidromelul-bautura-vie-din-miere/"
      via: "Hugo slug from filename"
      pattern: "title:.*[Hh]idromel"
---

<objective>
Crearea secțiunii "Știați că?" în structura de conținut Hugo prin două fișiere Markdown.
Aceasta este faza de conținut pur — zero modificări la template-uri, CSS sau configurație.

Purpose: Hugo trebuie să recunoască secțiunea `stiati-ca` și să genereze URL-urile corecte înainte de orice
lucru la template-uri sau navigație (Fazele 2-4 depind de existența acestui conținut).

Output:
- content/stiati-ca/_index.md — index secțiune
- content/stiati-ca/hidromelul-bautura-vie-din-miere.md — primul articol complet
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md

<!-- Reference files for front matter patterns -->
@content/articole/_index.md
@content/articole/lucrari-primavara.md
</context>

<interfaces>
<!-- Front matter patterns din codebase — executor folosește direct, fără explorare. -->

Din content/articole/_index.md:
```yaml
---
title: "Articole"
---

Jurnal apicol - povești și lucrări din viața stupinei.
```

Din content/articole/lucrari-primavara.md (pattern complet articol):
```yaml
---
title: "Lucrări de primăvară la stupină"
date: 2025-03-15T09:00:00+02:00
weight: 1
categorie: "Primăvară"
imagine_hero: "/images/uploads/articol-primavara-hero-placeholder.jpg"
imagine_card: "/images/uploads/articol-primavara-card-placeholder.jpg"
rezumat: "..."
---
```

Notă: Secțiunea `stiati-ca` folosește `descriere_scurta` (nu `rezumat`) și adaugă câmpul `draft`
conform STRUCT-03. Aceasta aliniază schema cu cerințele CMS din Faza 3.
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Creare index secțiune stiati-ca</name>
  <files>content/stiati-ca/_index.md</files>
  <read_first>
    - content/articole/_index.md — pattern exact pentru _index.md de secțiune
  </read_first>
  <action>
Creează directorul content/stiati-ca/ și fișierul content/stiati-ca/_index.md cu conținutul următor:

```markdown
---
title: "Știați că?"
---

Curiozități despre miere, albine și apicultură — lucruri simple pe care merită să le știi.
```

Notă: _index.md pentru o secțiune are nevoie doar de `title` în front matter. Hugo detectează
secțiunea automat din prezența directorului și a acestui fișier.
  </action>
  <verify>
    <automated>grep -r "title:" /home/bogdan/proiecte/happybees/content/stiati-ca/_index.md && echo "FILE_OK"</automated>
  </verify>
  <acceptance_criteria>
    - Fișierul content/stiati-ca/_index.md există
    - Conține exact câmpul `title: "Știați că?"`
    - Conține o descriere scurtă în corp (după front matter)
    - Nu conține câmpuri suplimentare față de exemplul articole/_index.md
  </acceptance_criteria>
  <done>Fișierul _index.md există și are front matter valid cu title.</done>
</task>

<task type="auto">
  <name>Task 2: Creare articol hidromel cu conținut complet</name>
  <files>content/stiati-ca/hidromelul-bautura-vie-din-miere.md</files>
  <read_first>
    - content/articole/lucrari-primavara.md — pattern front matter pentru articole (title, date, imagine_card etc.)
    - content/stiati-ca/_index.md — verifică că directorul există (creat în Task 1)
  </read_first>
  <action>
Creează fișierul content/stiati-ca/hidromelul-bautura-vie-din-miere.md cu front matter-ul și conținutul de mai jos.

Front matter (câmpuri obligatorii conform STRUCT-03):
- title: "Hidromelul – băutura vie din miere"
- date: 2026-03-25T10:00:00+02:00
- descriere_scurta: "Hidromelul este una dintre cele mai vechi băuturi fermentate din lume. Descoperă ce este, din ce este făcut și ce proprietăți are."
- imagine_card: "/images/uploads/hidromel-card-placeholder.jpg"
- draft: false

Corpul articolului (folosește textul exact de mai jos, fără modificări):

---
Hidromelul, cunoscut și sub denumirea de mied, este una dintre cele mai vechi băuturi fermentate din lume, cu o istorie de mii de ani. Considerat în trecut „băutura zeilor", hidromelul îmbină simplitatea naturii cu un proces autentic: fermentația mierii.

Astăzi, această băutură revine în atenția celor care caută produse naturale, curate și cu o poveste reală.

## Ce este hidromelul

Hidromelul este o băutură obținută prin fermentarea mierii de albine în apă, cu ajutorul drojdiilor.

Pe scurt:
miere + apă + fermentație = hidromel

În funcție de rețetă, poate fi:
- sec sau dulce
- liniștit sau ușor acidulat
- simplu sau îmbogățit cu fructe sau plante

Tăria alcoolică variază, în mod natural, între 8% și 14%.

## Din ce este făcut hidromelul

Ingredientele sunt simple, dar atent alese:

- Miere de albine – baza produsului, bogată în enzime și compuși naturali valoroși
- Apă pură de mare adâncime (150 m) – extrasă din profunzime, stabilă și curată, ideală pentru fermentație
- Drojdie – elementul care transformă dulceața mierii într-o băutură complexă
- Opțional: polen, plante aromatice, fructe

Această simplitate este, de fapt, secretul hidromelului: un produs fără artificii.

## Procesul de obținere

Hidromelul este realizat printr-un proces controlat, dar cât mai apropiat de natură:

- Fermentație controlată termic – temperatura este menținută constant pentru a păstra aromele fine ale mierii
- Timp și răbdare – fiecare lot evoluează natural
- Limpezire naturală la rece – fără filtre agresive, fără adaosuri

Nu se folosesc: substanțe chimice, cărbuni de filtrare, tratamente industriale.

Rezultatul este un hidromel curat, autentic, care își păstrează caracterul natural.

## Proprietăți antioxidante și beneficii

Datorită mierii și ingredientelor apicole, hidromelul păstrează o parte din proprietățile acestora.

### 1. Bogat în antioxidanți

Mierea conține compuși naturali care ajută organismul să lupte împotriva stresului oxidativ.

Contribuie la: protecția celulară, susținerea imunității, echilibru general.

### 2. Sursă naturală de nutrienți

Hidromelul poate conține vitamine, minerale, enzime active. Susține energia zilnică și funcționarea normală a organismului.

### 3. Efect tonic și revigorant

Consumat în cantități mici, hidromelul oferă o senzație plăcută de revitalizare.

### 4. Susținerea digestiei

Tradițional, hidromelul a fost folosit ca digestiv natural și băutură de relaxare după masă.

## Un produs viu, nu doar o băutură

Hidromelul nu este doar o băutură alcoolică. Este rezultatul unui proces natural în care mierea, drojdiile și timpul lucrează împreună pentru a crea o aromă unică, cu note florale și caracter autentic.

Fiecare lot este diferit, în funcție de tipul de miere, sezon și modul de preparare.

## Recomandări de păstrare

Pentru a păstra calitatea hidromelului:
- Se recomandă păstrarea la rece, pentru prospețime și stabilitate
- Poate fi ținut și la temperatura camerei, dacă recipientul este bine închis și ferit de aer

După deschidere: păstrează sticla la frigider.

## Consum responsabil

Hidromelul este o băutură alcoolică și trebuie consumat cu moderație. Savurat corect, devine o experiență, nu doar un produs.

## Concluzie

Hidromelul este o expresie pură a naturii – simplu, autentic și plin de caracter. O băutură care aduce în pahar munca albinelor și răbdarea timpului.
---
  </action>
  <verify>
    <automated>grep -E "^title:|^date:|^descriere_scurta:|^imagine_card:|^draft:" /home/bogdan/proiecte/happybees/content/stiati-ca/hidromelul-bautura-vie-din-miere.md | wc -l</automated>
  </verify>
  <acceptance_criteria>
    - Fișierul content/stiati-ca/hidromelul-bautura-vie-din-miere.md există
    - Front matter conține exact 5 câmpuri: title, date, descriere_scurta, imagine_card, draft
    - `grep "^title:" ...` returnează `title: "Hidromelul – băutura vie din miere"`
    - `grep "^date:" ...` returnează o dată validă în format ISO 8601
    - `grep "^descriere_scurta:" ...` returnează un string non-gol
    - `grep "^imagine_card:" ...` returnează `/images/uploads/hidromel-card-placeholder.jpg`
    - `grep "^draft:" ...` returnează `draft: false`
    - Corpul articolului conține cel puțin secțiunile `## Ce este hidromelul` și `## Concluzie`
    - Comanda `grep -E "^title:|^date:|^descriere_scurta:|^imagine_card:|^draft:" ...` returnează exact 5 linii
  </acceptance_criteria>
  <done>Articolul există cu front matter complet (5 câmpuri STRUCT-03) și tot conținutul corpului.</done>
</task>

</tasks>

<verification>
Verificare finală după ambele task-uri:

```bash
# 1. Ambele fișiere există
ls /home/bogdan/proiecte/happybees/content/stiati-ca/

# 2. Front matter _index.md are title
grep "title:" /home/bogdan/proiecte/happybees/content/stiati-ca/_index.md

# 3. Articolul are toate câmpurile STRUCT-03 (trebuie să returneze 5)
grep -E "^title:|^date:|^descriere_scurta:|^imagine_card:|^draft:" \
  /home/bogdan/proiecte/happybees/content/stiati-ca/hidromelul-bautura-vie-din-miere.md | wc -l

# 4. Hugo build fără erori
cd /home/bogdan/proiecte/happybees && hugo --quiet 2>&1 | grep -i "error" || echo "BUILD_OK"
```

Toate comenzile trebuie să treacă fără erori.
</verification>

<success_criteria>
- content/stiati-ca/_index.md există cu `title: "Știați că?"`
- content/stiati-ca/hidromelul-bautura-vie-din-miere.md există cu toate câmpurile STRUCT-03
- `hugo --quiet` rulează fără erori
- URL-urile /stiati-ca/ și /stiati-ca/hidromelul-bautura-vie-din-miere/ sunt generate în public/ după build
</success_criteria>

<output>
După finalizare, creează .planning/phases/01-structura-continut-hugo/01-01-SUMMARY.md cu:
- Fișierele create și front matter-ul exact folosit
- Orice decizie luată (ex: valori placeholder pentru imagine_card)
- Rezultatul comenzii hugo build
- Status: COMPLETE
</output>
