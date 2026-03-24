# Plan de mâine — HappyBees

## Context rapid

Site: **happybees.ro** — Hugo + Decap CMS + Cloudflare Pages
Repo: `bogdan790/happybees.ro` pe GitHub
Azi am finalizat: secțiunea „Știați că?" (template-uri, nav, CMS, preview homepage) — **complet live**

---

## Agenda mâine

### 1. Bug fixes cunoscute (din analiza codebase)

În ordine de prioritate:

- [ ] **Imagini produse** — `layouts/produse/single.html` + `list.html` nu afișează câmpurile `imagine`/`galerie` deși există în front matter
- [ ] **Imagini articole** — `layouts/articole/single.html` + `list.html` ignoră `imagine_hero`/`imagine_card`
- [ ] **Număr de telefon** — `config.toml` și `content/contact.md` au `+40 7XX XXX XXX` placeholder — de înlocuit cu numărul real
- [ ] **Hero + despre preview** — `content/_index.md` referențiază `hero-homepage-placeholder.jpg` și `despre-preview-placeholder.jpg` care nu există în `static/images/uploads/`
- [ ] **Open Graph** — `layouts/_default/baseof.html` nu are `<meta property="og:*">` — sharing pe social fără preview
- [ ] **Meta description per pagină** — toate paginile au aceeași descriere globală, rău pentru SEO
- [ ] **Meniu CMS deconectat** — `header.html` citește din `config.toml`, CMS editează `data/menu.yaml` (fără efect pe site)

### 2. Versiune EN completă (milestone nou)

**Decizie de luat la început:**
- URL: `happybees.ro/en/` pentru engleză (RO rămâne la `/`) — confirmi?
- Ton EN: același calm/educativ ca RO?

**Ce facem (Claude traduce tot):**
- Hugo multilingual config + switcher RO/EN în header
- Traducere homepage, despre, contact, politică confidențialitate
- Traducere 8 produse
- Traducere 4 articole jurnal apicol
- Traducere articol hidromel (Știați că?)
- CMS — colecții separate pentru conținut EN

---

## Cum să pornești conversația mâine

```
Suntem pe proiectul happybees.ro.
Citește TOMORROW.md din repo pentru context.
Începem cu bug fixes, apoi milestone EN.
```

Sau dacă ești pe alt laptop:
```
git clone https://github.com/bogdan790/happybees.ro
cd happybees.ro
cat TOMORROW.md
```

---

*Creat: 2026-03-25*
