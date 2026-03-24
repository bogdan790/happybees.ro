---
phase: 02-template-uri-si-navigatie
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - layouts/stiati-ca/list.html
  - layouts/stiati-ca/single.html
autonomous: true
requirements:
  - TMPL-01
  - TMPL-02
  - TMPL-03

must_haves:
  truths:
    - "Pagina /stiati-ca/ afișează lista articolelor cu același design vizual ca /articole/"
    - "Pagina unui articol individual /stiati-ca/hidromelul-bautura-vie-din-miere/ redă conținutul cu același layout ca un articol din jurnal"
    - "Niciun template nou nu introduce atribut style=\"\" dincolo de cele copiate verbatim din articole/"
    - "Butonul CTA din single.html trimite spre /produse/"
    - "Navigarea prev/next funcționează pe paginile stiati-ca"
  artifacts:
    - path: "layouts/stiati-ca/list.html"
      provides: "Listing page pentru secțiunea stiati-ca"
      exports: ["define \"main\"", "define \"title\""]
    - path: "layouts/stiati-ca/single.html"
      provides: "Pagina articol individual pentru secțiunea stiati-ca"
      exports: ["define \"main\"", "define \"title\""]
  key_links:
    - from: "layouts/stiati-ca/list.html"
      to: "content/stiati-ca/_index.md"
      via: ".Title si .Pages"
      pattern: "range .Pages"
    - from: "layouts/stiati-ca/single.html"
      to: "content/stiati-ca/*.md"
      via: ".Content si .Params.descriere_scurta"
      pattern: "\\.Content"
    - from: "layouts/stiati-ca/single.html"
      to: "/stiati-ca/"
      via: "link înapoi în nav"
      pattern: "href=\"/stiati-ca/\""
---

<objective>
Creare template-uri Hugo pentru secțiunea `stiati-ca`, reproducing exact designul vizual al secțiunii `articole`.

Purpose: Fără template-uri dedicate, Hugo folosește fallback-ul din `_default/` care nu are același design. Această fază aduce consistența vizuală necesară.
Output: `layouts/stiati-ca/list.html` și `layouts/stiati-ca/single.html` cu design identic cu `articole/`.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@content/stiati-ca/_index.md
@content/stiati-ca/hidromelul-bautura-vie-din-miere.md
</context>

<interfaces>
<!-- Front matter schema pentru articolele stiati-ca (STRUCT-03 din faza 1) -->
<!-- Executor trebuie să folosească aceste câmpuri, NU câmpurile din articole/ -->

Din content/stiati-ca/_index.md:
  title: "Știați că?"
  body: "Curiozități despre miere, albine și apicultură — lucruri simple pe care merită să le știi."

Din content/stiati-ca/hidromelul-bautura-vie-din-miere.md:
  title: "Hidromelul – băutura vie din miere"
  date: 2026-03-24T12:00:00+02:00
  descriere_scurta: "..."   <!-- folosit în loc de .Params.rezumat din articole/ -->
  imagine_card: "/images/uploads/hidromel-card-placeholder.jpg"
  draft: false

DIFERENTE fata de articole/:
  - articole/ folosește .Params.rezumat  →  stiati-ca/ folosește .Params.descriere_scurta
  - articole/ folosește .Params.categorie →  stiati-ca/ NU are categorie (se omite acea linie)
  - articole/ sortează cu .ByWeight      →  stiati-ca/ sortează cu .ByDate.Reverse (articole noi primul)
  - articole/single.html link "Înapoi la articole" → stiati-ca/single.html link "Înapoi la Știați că?"

Din layouts/articole/list.html (structura de COPIAT verbatim, cu adaptările de mai sus):
  {{ define "title" }}Articole | {{ .Site.Title }}{{ end }}
  {{ define "main" }}
  <section style="padding: var(--space-2xl) 0;">
    <div class="container">
      <h1>Jurnal apicol</h1>
      <p style="font-size: 1.125rem; margin-bottom: var(--space-xl);">...</p>
      <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
        {{ range .Pages.ByWeight }}
          <article class="card">
            <div>
              <h2 style="margin-bottom: var(--space-sm);">
                <a href="{{ .RelPermalink }}" style="color: var(--color-gray-dark);">{{ .Title }}</a>
              </h2>
              <p style="font-size: 0.875rem; color: var(--color-gray-medium); margin-bottom: var(--space-sm);">
                {{ .Date.Format "2 January 2006" }} | {{ .Params.categorie }}
              </p>
              <p style="margin-bottom: var(--space-md);">{{ .Params.rezumat }}</p>
              <a href="{{ .RelPermalink }}" style="color: var(--color-honey-gold); font-weight: 600;">Citește articolul →</a>
            </div>
          </article>
        {{ end }}
      </div>
    </div>
  </section>
  {{ end }}

Din layouts/articole/single.html (structura de COPIAT verbatim, cu adaptările de mai sus):
  {{ define "title" }}{{ .Title }} | {{ .Site.Title }}{{ end }}
  {{ define "main" }}
  <article style="padding: var(--space-2xl) 0;">
    <div class="container" style="max-width: 800px;">
      <h1>{{ .Title }}</h1>
      <p style="color: var(--color-gray-medium); margin-bottom: var(--space-xl);">
        {{ .Date.Format "2 January 2006" }} | {{ .Params.categorie }}
      </p>
      <div class="content">{{ .Content }}</div>
      <!-- CTA box -->
      <div style="background-color: var(--color-cream); padding: var(--space-xl); border-radius: 12px; text-align: center; margin: var(--space-2xl) 0;">
        <p style="...">...</p>
        <a href="/produse/" class="btn-primary">...</a>
      </div>
      <!-- Nav prev/next -->
      <nav style="display: flex; justify-content: space-between; padding-top: var(--space-xl); border-top: 1px solid var(--color-cream-dark);">
        ...
        <a href="/articole/" style="color: var(--color-gray-medium);">Înapoi la articole</a>
        ...
      </nav>
    </div>
  </article>
  {{ end }}
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Creare layouts/stiati-ca/list.html</name>

  <read_first>
    - /home/bogdan/proiecte/happybees/layouts/articole/list.html  (sursa de copiat)
    - /home/bogdan/proiecte/happybees/content/stiati-ca/_index.md  (titlu și descriere secțiune)
  </read_first>

  <files>layouts/stiati-ca/list.html</files>

  <action>
Creează directorul `layouts/stiati-ca/` dacă nu există, apoi creează fișierul `layouts/stiati-ca/list.html` cu conținutul de mai jos.

Structura este IDENTICĂ cu `layouts/articole/list.html` cu trei modificări:
1. Titlul paginii: "Știați că?" în loc de "Jurnal apicol" (din .Title al secțiunii sau hardcodat)
2. Descrierea: textul din _index.md în loc de "Povești și lucrări din viața stupinei"
3. Sortare: `.ByDate.Reverse` în loc de `.ByWeight` (articolele noi apar primele)
4. Câmpul afișat sub titlu: `.Params.descriere_scurta` în loc de `.Params.rezumat`
5. Rândul cu data: FĂRĂ `| {{ .Params.categorie }}` (câmpul nu există în stiati-ca)

CONȚINUT EXACT al fișierului de scris:

```
{{ define "title" }}{{ .Title }} | {{ .Site.Title }}{{ end }}

{{ define "main" }}
<section style="padding: var(--space-2xl) 0;">
  <div class="container">
    <h1>{{ .Title }}</h1>
    <p style="font-size: 1.125rem; margin-bottom: var(--space-xl);">{{ .Description }}</p>

    <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
      {{ range .Pages.ByDate.Reverse }}
        <article class="card">
          <div>
            <h2 style="margin-bottom: var(--space-sm);">
              <a href="{{ .RelPermalink }}" style="color: var(--color-gray-dark);">{{ .Title }}</a>
            </h2>

            <p style="font-size: 0.875rem; color: var(--color-gray-medium); margin-bottom: var(--space-sm);">
              {{ .Date.Format "2 January 2006" }}
            </p>

            <p style="margin-bottom: var(--space-md);">{{ .Params.descriere_scurta }}</p>

            <a href="{{ .RelPermalink }}" style="color: var(--color-honey-gold); font-weight: 600;">Citește articolul →</a>
          </div>
        </article>
      {{ end }}
    </div>
  </div>
</section>
{{ end }}
```

Nota: `.Description` în Hugo returnează fie câmpul `description` din front matter, fie primul paragraf al body-ului `.md`. Deoarece `_index.md` nu are câmpul `description` explicit (are doar body text), folosești `{{ .Content }}` sau hardcodezi textul. Alternativa mai robustă: adaugă în `_index.md` câmpul `description: "Curiozități despre miere, albine și apicultură — lucruri simple pe care merită să le știi."` și folosește `{{ .Params.description }}`. FĂRĂ a modifica structura Hugo.

Varianta sigură fără a modifica _index.md — folosește `.Site.Params.description` nu, ci pur și simplu hardcodează descrierea secțiunii în template (este conținut static de secțiune, nu date dinamice):

```
<p style="font-size: 1.125rem; margin-bottom: var(--space-xl);">Curiozități despre miere, albine și apicultură — lucruri simple pe care merită să le știi.</p>
```

Fișierul FINAL de scris la `layouts/stiati-ca/list.html`:

{{ define "title" }}{{ .Title }} | {{ .Site.Title }}{{ end }}

{{ define "main" }}
<section style="padding: var(--space-2xl) 0;">
  <div class="container">
    <h1>{{ .Title }}</h1>
    <p style="font-size: 1.125rem; margin-bottom: var(--space-xl);">Curiozități despre miere, albine și apicultură — lucruri simple pe care merită să le știi.</p>

    <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
      {{ range .Pages.ByDate.Reverse }}
        <article class="card">
          <div>
            <h2 style="margin-bottom: var(--space-sm);">
              <a href="{{ .RelPermalink }}" style="color: var(--color-gray-dark);">{{ .Title }}</a>
            </h2>

            <p style="font-size: 0.875rem; color: var(--color-gray-medium); margin-bottom: var(--space-sm);">
              {{ .Date.Format "2 January 2006" }}
            </p>

            <p style="margin-bottom: var(--space-md);">{{ .Params.descriere_scurta }}</p>

            <a href="{{ .RelPermalink }}" style="color: var(--color-honey-gold); font-weight: 600;">Citește articolul →</a>
          </div>
        </article>
      {{ end }}
    </div>
  </div>
</section>
{{ end }}
  </action>

  <verify>
    <automated>test -f /home/bogdan/proiecte/happybees/layouts/stiati-ca/list.html && grep -c 'descriere_scurta' /home/bogdan/proiecte/happybees/layouts/stiati-ca/list.html && grep -c 'ByDate.Reverse' /home/bogdan/proiecte/happybees/layouts/stiati-ca/list.html && echo "OK"</automated>
  </verify>

  <acceptance_criteria>
    - `grep 'descriere_scurta' layouts/stiati-ca/list.html` returnează cel puțin 1 rezultat
    - `grep 'ByDate.Reverse' layouts/stiati-ca/list.html` returnează 1 rezultat
    - `grep -c 'rezumat' layouts/stiati-ca/list.html` returnează 0 (câmpul din articole/ NU apare)
    - `grep -c 'categorie' layouts/stiati-ca/list.html` returnează 0 (câmpul din articole/ NU apare)
    - `grep 'class="card"' layouts/stiati-ca/list.html` returnează 1 rezultat (clasa CSS existentă)
    - `grep 'define "main"' layouts/stiati-ca/list.html` returnează 1 rezultat
  </acceptance_criteria>

  <done>Fișierul layouts/stiati-ca/list.html există, folosește .Params.descriere_scurta, sortează ByDate.Reverse, și are structura identică cu articole/list.html fără câmpurile categorie și rezumat.</done>
</task>

<task type="auto">
  <name>Task 2: Creare layouts/stiati-ca/single.html</name>

  <read_first>
    - /home/bogdan/proiecte/happybees/layouts/articole/single.html  (sursa de copiat)
    - /home/bogdan/proiecte/happybees/content/stiati-ca/hidromelul-bautura-vie-din-miere.md  (front matter disponibil)
  </read_first>

  <files>layouts/stiati-ca/single.html</files>

  <action>
Creează fișierul `layouts/stiati-ca/single.html` cu structura identică cu `layouts/articole/single.html`, cu aceste modificări:
1. Rândul cu metadate: FĂRĂ `| {{ .Params.categorie }}` (câmpul nu există)
2. Link-ul "Înapoi": `href="/stiati-ca/"` și textul "Înapoi la Știați că?" în loc de "Înapoi la articole"

Fișierul FINAL de scris la `layouts/stiati-ca/single.html`:

{{ define "title" }}{{ .Title }} | {{ .Site.Title }}{{ end }}

{{ define "main" }}

<article style="padding: var(--space-2xl) 0;">
  <div class="container" style="max-width: 800px;">

    <h1>{{ .Title }}</h1>
    <p style="color: var(--color-gray-medium); margin-bottom: var(--space-xl);">
      {{ .Date.Format "2 January 2006" }}
    </p>

    <div class="content">
      {{ .Content }}
    </div>

    {{/* CTA Box */}}
    <div style="background-color: var(--color-cream); padding: var(--space-xl); border-radius: 12px; text-align: center; margin: var(--space-2xl) 0;">
      <p style="font-size: 1.125rem; margin-bottom: var(--space-md);">Vrei să afli mai multe despre produsele noastre?</p>
      <a href="/produse/" class="btn-primary">Vezi produsele</a>
    </div>

    {{/* Navigare articole */}}
    <nav style="display: flex; justify-content: space-between; padding-top: var(--space-xl); border-top: 1px solid var(--color-cream-dark);">
      {{ with .PrevInSection }}
      <a href="{{ .RelPermalink }}" style="color: var(--color-honey-gold);">← {{ .Title }}</a>
      {{ else }}
      <span></span>
      {{ end }}

      <a href="/stiati-ca/" style="color: var(--color-gray-medium);">Înapoi la Știați că?</a>

      {{ with .NextInSection }}
      <a href="{{ .RelPermalink }}" style="color: var(--color-honey-gold);">{{ .Title }} →</a>
      {{ else }}
      <span></span>
      {{ end }}
    </nav>

  </div>
</article>

{{ end }}
  </action>

  <verify>
    <automated>test -f /home/bogdan/proiecte/happybees/layouts/stiati-ca/single.html && grep -c 'stiati-ca' /home/bogdan/proiecte/happybees/layouts/stiati-ca/single.html && grep -c 'btn-primary' /home/bogdan/proiecte/happybees/layouts/stiati-ca/single.html && echo "OK"</automated>
  </verify>

  <acceptance_criteria>
    - `grep 'href="/stiati-ca/"' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep 'Înapoi la Știați că?' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep -c 'categorie' layouts/stiati-ca/single.html` returnează 0
    - `grep 'class="content"' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep 'class="btn-primary"' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep 'PrevInSection' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep 'NextInSection' layouts/stiati-ca/single.html` returnează 1 rezultat
    - `grep 'define "main"' layouts/stiati-ca/single.html` returnează 1 rezultat
  </acceptance_criteria>

  <done>Fișierul layouts/stiati-ca/single.html există, afișează data fără categorie, link-ul înapoi duce la /stiati-ca/, CTA și navigarea prev/next sunt identice cu articole/single.html.</done>
</task>

<task type="auto">
  <name>Task 3: Verificare absență stiluri inline noi (TMPL-03)</name>

  <read_first>
    - /home/bogdan/proiecte/happybees/layouts/stiati-ca/list.html
    - /home/bogdan/proiecte/happybees/layouts/stiati-ca/single.html
    - /home/bogdan/proiecte/happybees/layouts/articole/list.html
    - /home/bogdan/proiecte/happybees/layouts/articole/single.html
  </read_first>

  <files>layouts/stiati-ca/list.html, layouts/stiati-ca/single.html</files>

  <action>
Verifică că template-urile noi nu introduc atribute `style=""` care nu există în template-urile sursă `articole/`. Fiecare `style="..."` din `stiati-ca/` trebuie să fie identic cu un `style="..."` din `articole/`.

Pașii de verificare:
1. Extrage toate valorile `style="..."` din `layouts/stiati-ca/list.html`
2. Extrage toate valorile `style="..."` din `layouts/articole/list.html`
3. Confirmă că setul din stiati-ca este un subset al celui din articole (+ eventuale omisiuni)
4. Repetă pentru single.html

Dacă există ORICE `style=""` nou în stiati-ca/ care nu apare în articole/, corectează acel fișier eliminând sau înlocuind stilul inline cu un `style=""` identic cu cel din articole/.

Comanda de verificare:
```bash
grep -n 'style="' layouts/stiati-ca/list.html
grep -n 'style="' layouts/articole/list.html
grep -n 'style="' layouts/stiati-ca/single.html
grep -n 'style="' layouts/articole/single.html
```

Dacă o valoare `style=""` apare în stiati-ca/ dar nu în articole/, aceasta este o eroare — corectează.
  </action>

  <verify>
    <automated>
diff <(grep -o 'style="[^"]*"' /home/bogdan/proiecte/happybees/layouts/stiati-ca/list.html | sort) <(grep -o 'style="[^"]*"' /home/bogdan/proiecte/happybees/layouts/articole/list.html | sort) | grep '^<' | wc -l
    </automated>
  </verify>

  <acceptance_criteria>
    - Comanda `diff <(grep -o 'style="[^"]*"' layouts/stiati-ca/list.html | sort) <(grep -o 'style="[^"]*"' layouts/articole/list.html | sort) | grep '^<' | wc -l` returnează 0 (fără stiluri noi în list.html)
    - Comanda `diff <(grep -o 'style="[^"]*"' layouts/stiati-ca/single.html | sort) <(grep -o 'style="[^"]*"' layouts/articole/single.html | sort) | grep '^<' | wc -l` returnează 0 (fără stiluri noi în single.html)
    - Cerința TMPL-03 este satisfăcută: zero `style=""` noi față de referința articole/
  </acceptance_criteria>

  <done>Toate atributele style="" din layouts/stiati-ca/ sunt identice cu cele din layouts/articole/ — niciun stil inline nou introdus.</done>
</task>

</tasks>

<verification>
Rulează `hugo server` din rădăcina proiectului și verifică:
- `http://localhost:1313/stiati-ca/` — pagina de listing se afișează cu carduri, identic vizual cu `/articole/`
- `http://localhost:1313/stiati-ca/hidromelul-bautura-vie-din-miere/` — articolul individual se afișează cu titlu, dată, conținut, CTA box și nav prev/next
- `grep -c 'style="' layouts/stiati-ca/list.html` și același număr în `layouts/articole/list.html` (sau mai puțin)
</verification>

<success_criteria>
- `layouts/stiati-ca/list.html` există și conține `class="card"`, `descriere_scurta`, `ByDate.Reverse`
- `layouts/stiati-ca/single.html` există și conține `href="/stiati-ca/"`, `Înapoi la Știați că?`, `class="btn-primary"`
- Zero câmpuri `rezumat` sau `categorie` în oricare dintre noile template-uri
- Zero `style=""` noi față de template-urile sursă din `articole/`
- `hugo server` pornește fără erori de template
</success_criteria>

<output>
După finalizare, creează `.planning/phases/02-template-uri-si-navigatie/02-01-SUMMARY.md` cu:
- Fișierele create
- Deciziile luate (ex: sortare ByDate.Reverse, omiterea câmpului categorie)
- Orice deviație de la plan și motivul
</output>
