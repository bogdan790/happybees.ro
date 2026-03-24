---
phase: 02-template-uri-si-navigatie
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - config.toml
autonomous: true
requirements:
  - NAV-01
  - NAV-02

must_haves:
  truths:
    - "Meniul principal conține butonul 'Știați că?' vizibil în header pe toate paginile"
    - "Butonul 'Știați că?' apare între 'Articole' și 'Despre' în ordinea de afișare"
    - "Clasa CSS 'active' se aplică pe butonul 'Știați că?' când utilizatorul se află pe /stiati-ca/ sau pe un articol din secțiune"
    - "Celelalte 5 intrări din meniu rămân neschimbate"
  artifacts:
    - path: "config.toml"
      provides: "Intrare nouă [[menu.main]] pentru secțiunea stiati-ca"
      contains: "url = \"/stiati-ca/\""
  key_links:
    - from: "config.toml [[menu.main]] stiati-ca"
      to: "layouts/partials/header.html"
      via: "range .Site.Menus.main"
      pattern: "IsMenuCurrent|HasMenuCurrent"
---

<objective>
Adăugare intrare nouă în meniul principal din `config.toml` pentru secțiunea „Știați că?".

Purpose: Fără această intrare, secțiunea este accesibilă doar direct prin URL — nu apare în navigarea site-ului. Clasa `active` este gestionată automat de Hugo prin `IsMenuCurrent` și `HasMenuCurrent` deja implementate în `header.html`.
Output: `config.toml` cu 6 intrări `[[menu.main]]`, butonul „Știați că?" la weight 3.5 (între Articole la 3 și Despre la 4).
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
</context>

<interfaces>
<!-- Starea actuală a config.toml relevantă pentru această sarcină -->

Intrările existente [[menu.main]] (NU le modifica):
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

Intrarea de ADĂUGAT (weight 3.5 plasează butonul între Articole=3 și Despre=4):
  [[menu.main]]
    name = "Știați că?"
    url = "/stiati-ca/"
    weight = 3.5

Logica active state în layouts/partials/header.html (DEJA implementată, nu necesită modificări):
  class="{{ if or (eq .URL $currentPage.RelPermalink) (eq .URL $currentPage.Permalink)
    ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}active{{ end }}"

Hugo aplică automat clasa `active` pe butonul de meniu al secțiunii curente prin
`HasMenuCurrent` — aceasta detectează că /stiati-ca/hidromelul-.../ este sub /stiati-ca/
și marchează butonul „Știați că?" ca activ.
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Adaugă intrarea [[menu.main]] pentru Știați că? în config.toml</name>

  <read_first>
    - /home/bogdan/proiecte/happybees/config.toml  (fișierul de modificat — citește-l integral înainte)
    - /home/bogdan/proiecte/happybees/layouts/partials/header.html  (verifică logica active state)
  </read_first>

  <files>config.toml</files>

  <action>
Deschide `config.toml` și adaugă o nouă intrare `[[menu.main]]` DUPĂ intrarea pentru "Articole" (weight = 3) și ÎNAINTE de intrarea pentru "Despre" (weight = 4).

Blocul exact de adăugat:

[[menu.main]]
  name = "Știați că?"
  url = "/stiati-ca/"
  weight = 3.5

Poziționarea în fișier: după blocul:
  [[menu.main]]
    name = "Articole"
    url = "/articole/"
    weight = 3

și înainte de blocul:
  [[menu.main]]
    name = "Despre"
    url = "/despre/"
    weight = 4

NU modifica, șterge sau reordona nicio altă intrare din config.toml. Adaugă DOAR cele 4 linii de mai sus (linie goală + [[menu.main]] + name + url + weight).

Rezultatul final al secțiunii de meniu din config.toml trebuie să fie:

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
  name = "Știați că?"
  url = "/stiati-ca/"
  weight = 3.5

[[menu.main]]
  name = "Despre"
  url = "/despre/"
  weight = 4

[[menu.main]]
  name = "Contact"
  url = "/contact/"
  weight = 5
  </action>

  <verify>
    <automated>grep -c 'stiati-ca' /home/bogdan/proiecte/happybees/config.toml && grep -A3 'stiati-ca' /home/bogdan/proiecte/happybees/config.toml && grep -c '\[\[menu.main\]\]' /home/bogdan/proiecte/happybees/config.toml</automated>
  </verify>

  <acceptance_criteria>
    - `grep -c '[[menu.main]]' config.toml` returnează 6
    - `grep 'url = "/stiati-ca/"' config.toml` returnează 1 rezultat
    - `grep 'weight = 3.5' config.toml` returnează 1 rezultat
    - `grep 'name = "Știați că?"' config.toml` returnează 1 rezultat
    - `grep 'url = "/articole/"' config.toml` returnează 1 rezultat (intrarea Articole NU a fost modificată)
    - `grep 'url = "/despre/"' config.toml` returnează 1 rezultat (intrarea Despre NU a fost modificată)
    - `grep 'url = "/contact/"' config.toml` returnează 1 rezultat (intrarea Contact NU a fost modificată)
  </acceptance_criteria>

  <done>config.toml conține 6 intrări [[menu.main]], cu „Știați că?" la weight 3.5 între Articole și Despre. Celelalte 5 intrări rămân nemodificate.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 2: Verificare vizuală nav și clasa active</name>

  <what-built>
    Intrarea de meniu pentru „Știați că?" a fost adăugată în config.toml. Hugo va afișa butonul în header prin logica existentă din layouts/partials/header.html care iterează .Site.Menus.main și aplică clasa `active` automat.
  </what-built>

  <how-to-verify>
    1. Pornește Hugo: `hugo server` din /home/bogdan/proiecte/happybees/
    2. Deschide http://localhost:1313/ — verifică că meniul conține butonul „Știați că?" între „Articole" și „Despre"
    3. Deschide http://localhost:1313/stiati-ca/ — verifică că butonul „Știați că?" are clasa `active` (text bold sau subliniat față de celelalte butoane)
    4. Deschide http://localhost:1313/stiati-ca/hidromelul-bautura-vie-din-miere/ — verifică că butonul „Știați că?" rămâne `active` și pe pagina articolului individual
    5. Deschide http://localhost:1313/articole/ — verifică că butonul „Articole" este acum `active` (nu „Știați că?")
    6. Verifică pe mobil (DevTools → Toggle Device Toolbar) că butonul apare și în meniul hamburger
  </how-to-verify>

  <resume-signal>Scrie "aprobat" dacă toate verificările trec, sau descrie problema observată.</resume-signal>
</task>

</tasks>

<verification>
Verificare automată finală după Task 1:
```bash
grep -c '\[\[menu\.main\]\]' config.toml
# trebuie să returneze: 6

grep -B1 -A3 'stiati-ca' config.toml
# trebuie să arate blocul cu name="Știați că?", url="/stiati-ca/", weight=3.5
```
</verification>

<success_criteria>
- `config.toml` conține exact 6 intrări `[[menu.main]]`
- Intrarea nouă: `name = "Știați că?"`, `url = "/stiati-ca/"`, `weight = 3.5`
- Butonul apare în nav între Articole și Despre (verificat vizual în hugo server)
- Clasa `active` se aplică pe butonul „Știați că?" la vizitarea paginilor din secțiunea /stiati-ca/
- Celelalte intrări de meniu sunt nemodificate
</success_criteria>

<output>
După finalizare, creează `.planning/phases/02-template-uri-si-navigatie/02-02-SUMMARY.md` cu:
- Modificarea aplicată în config.toml
- Rezultatul verificării vizuale (aprobat/issues)
- Weight ales (3.5) și motivul
</output>
