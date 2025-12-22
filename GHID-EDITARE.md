# 📝 Ghid Editare Site Happy Bees (fără coding)

Poți edita site-ul direct din browser, pe GitHub, **fără să instalezi nimic pe calculator**.

---

## 🌐 Acces la fișiere

**Link:** https://github.com/bogdan790/happybees.ro

**Autentificare:** Loghează-te cu contul tău GitHub (bogdan790)

---

## 📄 EDITARE ARTICOLE EXISTENTE

### Pas cu pas:

1. **Deschide:** https://github.com/bogdan790/happybees.ro/tree/main/content/articole
2. **Click pe articol** (ex: `lucrari-primavara.md`)
3. **Click pe iconița CREION** (Edit this file) din dreapta-sus
4. **Editează textul** direct în browser
5. **Scroll jos → Click "Commit changes"**
6. **Click "Commit changes"** din popup (verde)
7. **✅ GATA!** - Site-ul se actualizează automat în ~2 minute pe https://happybees-ro.pages.dev

### Ce poți edita:

```markdown
---
title: "Titlul articolului"          ← Editează titlul aici
date: 2025-03-15T09:00:00+02:00      ← Data (lasă așa)
weight: 1                             ← Ordinea (1=Primăvară, 2=Vară, etc)
categorie: "Primăvară"                ← Categoria
imagine_hero: "/images/uploads/..."  ← Poza mare (vezi mai jos)
imagine_card: "/images/uploads/..."  ← Poza card (vezi mai jos)
rezumat: "Rezumatul scurt"           ← Rezumat pentru card
---

## Titlu secțiune                     ← Editează conținutul aici

Text normal...

### Subtitlu

Mai mult text...
```

---

## ➕ ADĂUGARE ARTICOL NOU

### Pas cu pas:

1. **Deschide:** https://github.com/bogdan790/happybees.ro/tree/main/content/articole
2. **Click "Add file" → "Create new file"**
3. **Numele fișierului:** `lucrari-toamna-2025.md` (folosește doar litere mici, cifre, liniuță)
4. **Copiază șablonul de mai jos și completează:**

```markdown
---
title: "Titlul tău nou"
date: 2025-12-22T09:00:00+02:00
weight: 5
categorie: "General"
imagine_hero: "/images/uploads/placeholder.jpg"
imagine_card: "/images/uploads/placeholder.jpg"
rezumat: "Rezumat scurt max 200 caractere"
---

## Introducere

Textul tău aici...

### Secțiune 1

Mai mult text...

![Descriere poza](/images/uploads/numele-pozei.jpg)
```

5. **Scroll jos → "Commit changes"**
6. **✅ GATA!** - Articolul apare pe site în ~2 minute

---

## 🖼️ ADĂUGARE IMAGINI

### IMPORTANT: Imaginile trebuie încărcate mai întâi!

### Pas cu pas:

1. **Deschide:** https://github.com/bogdan790/happybees.ro/tree/main/static/images/uploads
2. **Click "Add file" → "Upload files"**
3. **Drag & drop pozele TAU** sau click "choose your files"
4. **RECOMANDĂRI IMAGINI:**
   - **Nume fișier:** `miere-salcam-2025.jpg` (fără spații, fără caractere speciale)
   - **Format:** JPG sau PNG
   - **Dimensiuni recomandate:**
     - Imagine Hero (mare): 1920x1080px (16:9)
     - Imagine Card (listă): 600x400px (3:2)
     - Imagine în text: 800-1200px lățime
   - **Mărime fișier:** Max 500KB per poză (optimizează înainte!)

5. **Scroll jos → "Commit changes"**
6. **✅ Pozele sunt încărcate!**

### Cum folosești poza în articol:

```markdown
![Descriere poza](/images/uploads/miere-salcam-2025.jpg)
```

**SAU în frontmatter (zona de sus cu ---):**

```markdown
imagine_hero: "/images/uploads/miere-salcam-2025.jpg"
imagine_card: "/images/uploads/miere-salcam-card.jpg"
```

---

## 📦 EDITARE PRODUSE

### Pas cu pas:

1. **Deschide:** https://github.com/bogdan790/happybees.ro/tree/main/content/produse
2. **Click pe produs** (ex: `miere-salcam.md`)
3. **Click pe CREION** (Edit)
4. **Editează:**

```markdown
---
title: "Miere de salcâm"
date: 2025-01-10T10:00:00+02:00
pret: 35                              ← Preț în RON
unitate: "kg"                         ← Unitate (kg, 100g, 50ml)
disponibilitate: "disponibil"         ← disponibil / indisponibil / stoc-limitat
imagine: "/images/uploads/..."        ← Poza principală
descriere_scurta: "Text scurt"        ← Max 150 caractere
---

## Descriere

Text detaliat despre produs...
```

5. **Commit changes**

---

## 🏠 EDITARE PAGINA DESPRE / CONTACT / HOMEPAGE

### Homepage:

**Link:** https://github.com/bogdan790/happybees.ro/blob/main/content/_index.md

**Ce poți edita:**
- `titlu:` Hero titlu principal
- `subtitlu:` Hero subtitlu
- `text:` Textul din secțiunea "Cine suntem"

### Despre:

**Link:** https://github.com/bogdan790/happybees.ro/blob/main/content/despre.md

**Ce poți edita:**
- Toată povestea stupinei
- Valori (Natural, Calitate, Familie)

### Contact:

**Link:** https://github.com/bogdan790/happybees.ro/blob/main/content/contact.md

**Ce poți edita:**
- Email, telefon, locație
- Text intro

---

## ⚙️ CUM FUNCȚIONEAZĂ ACTUALIZAREA

1. **Tu editezi fișierul pe GitHub** → Click "Commit changes"
2. **GitHub salvează modificarea** → Creează un "commit"
3. **Cloudflare Pages detectează schimbarea** → Pornește build-ul
4. **Site-ul se rebuild-ează automat** → ~2 minute
5. **Site-ul live se actualizează** → https://happybees-ro.pages.dev

**Verifici statusul build-ului:**
https://dash.cloudflare.com/ → Pages → happybees-ro → Deployments

---

## 📝 FORMATARE TEXT MARKDOWN

```markdown
# Titlu mare (H1)
## Titlu mediu (H2)
### Titlu mic (H3)

**Text bold**
*Text italic*

- Lista
- Cu puncte

1. Lista
2. Numerotată

[Link text](https://google.com)

![Poza](/images/uploads/poza.jpg)
```

---

## ⚠️ SFATURI IMPORTANTE

✅ **DA:**
- Folosește nume fișiere simple: `miere-salcam.jpg`, `articol-vara.md`
- Optimizează pozele înainte de upload (max 500KB)
- Verifică că path-ul la poză este corect: `/images/uploads/...`
- Așteaptă ~2 minute după commit pentru actualizare site

❌ **NU:**
- NU folosi spații în nume fișiere (folosește `-` sau `_`)
- NU folosi caractere speciale: ă, â, î, ș, ț în nume fișiere
- NU șterge fișiere dacă nu ești sigur ce fac
- NU edita fișiere din `/layouts/` sau `/functions/` (doar dacă știi ce faci)

---

## 🆘 DACĂ CEVA NU MERGE

1. **Verifică că ai făcut "Commit changes"** (butonul verde)
2. **Așteaptă 2-3 minute** pentru build
3. **Reîmprospătează pagina** cu Ctrl+Shift+R (hard refresh)
4. **Verifică Cloudflare Pages Deployments** pentru erori build

---

## 📞 CONTACT SUPORT

Dacă ai nevoie de ajutor cu coding:
- Revin la Claude Code pentru modificări tehnice
- Sau găsești un developer freelance pentru task-uri complexe

**Editări simple (text, poze, produse) - poți face singur/ă prin GitHub Web!** 🎉
