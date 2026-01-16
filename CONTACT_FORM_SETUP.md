# Contact Form - Resend API Setup

## 📧 Configurare formular de contact pentru Cloudflare Pages

Formularul de contact folosește **Resend API** pentru trimiterea emailurilor (compatibil cu Cloudflare Workers).

---

## 🔐 Environment Variables Necesare

Accesează: **Cloudflare Dashboard** → **Pages** → **happybees-ro** → **Settings** → **Environment Variables**

Adaugă următoarele variabile (click **"Add variable"** pentru fiecare):

### Production Environment:

| Variable Name | Description | Valoare Recomandată |
|--------------|-------------|---------------------|
| `RESEND_API_KEY` | API Key de la resend.com | **(din Resend Dashboard)** |
| `EMAIL_FROM` | Expeditor (trebuie verificat în Resend) | `site@happybees.ro` |
| `EMAIL_TO` | Destinatar (unde ajung mesajele) | `bogdan.pavel@happybees.ro` |
| `TURNSTILE_SECRET_KEY` | Secret Key pentru Cloudflare Turnstile (anti-spam) | **(din Cloudflare Dashboard)** |

---

## 📋 Pași de configurare:

### 1. Configurare Resend.com

1. **Accesează:** https://resend.com/domains
2. **Add Domain:** `happybees.ro`
3. **Configurează DNS records** (SPF, DKIM, DMARC):
   - Resend îți va afișa recordurile DNS exacte
   - Adaugă aceste recorduri în Cloudflare DNS
   - Așteaptă verificarea domeniului (câteva minute)
4. **Obține API Key:**
   - Dashboard → API Keys → Create API Key
   - Copiază API key-ul (apare o singură dată!)

### 2. Configurare Cloudflare Pages

1. **Accesează:** https://dash.cloudflare.com
2. **Navighează:** Pages → **happybees-ro** → **Settings**
3. **Click:** Environment Variables (în sidebar)
4. **Add variable** pentru **Production**:
   - Variable name: `RESEND_API_KEY`
   - Value: (paste API key de la Resend)
   - Click **Save**
5. **Add variable** pentru **Production**:
   - Variable name: `EMAIL_FROM`
   - Value: `site@happybees.ro`
   - Click **Save**
6. **Add variable** pentru **Production**:
   - Variable name: `EMAIL_TO`
   - Value: `bogdan.pavel@happybees.ro`
   - Click **Save**
7. **Redeploy:** Deployments → Click pe ultimul deployment → **Retry deployment**

---

## 📨 Cum funcționează schema:

```
Utilizator completează formularul (nume, email, mesaj)
         ↓
   Frontend trimite la /api/contact
         ↓
   Cloudflare Function (functions/api/contact.js)
         ↓
   Resend API trimite email
         ↓
FROM: site@happybees.ro ━━━━━━━━━━━━━━→ TO: bogdan.pavel@happybees.ro
REPLY-TO: emailul utilizatorului (pentru răspuns direct)
```

**Avantaje:**
- Email profesional (site@happybees.ro)
- Când răspunzi la email, merge direct la utilizator (reply-to)
- Toate mesajele ajung la bogdan.pavel@happybees.ro

---

## 🧪 Testare după configurare:

1. **Accesează:** https://happybees-ro.pages.dev/contact/
2. **Completează formularul** cu date de test
3. **Trimite mesaj**
4. **Verifică** inbox-ul la `bogdan.pavel@happybees.ro`
5. **Verifică** că poți răspunde direct utilizatorului (reply-to)

---

## ⚠️ IMPORTANT:

- **NU pune API keys în cod** - doar în Environment Variables!
- **Production Environment** = pentru live site (happybees-ro.pages.dev)
- Poți adăuga și **Preview Environment** pentru test branches (opțional)
- **Domeniul happybees.ro trebuie verificat în Resend** înainte de trimitere

---

## 🔍 Debugging:

Dacă formularul nu trimite email:

1. **Verifică Console browser** (F12) pentru erori JavaScript
2. **Verifică Cloudflare Functions logs:**
   - Dashboard → Pages → happybees-ro → **Functions** tab → **Logs**
3. **Verifică Environment Variables** sunt setate corect (toate 3!)
4. **Verifică domeniul în Resend:**
   - resend.com/domains → `happybees.ro` trebuie **Verified**
5. **Verifică Resend logs:**
   - resend.com/emails → vezi emailurile trimise și eventualele erori

---

## 📝 Diferența față de SMTP:

Resend API este superior pentru Cloudflare Workers:
- ✅ HTTP-based (nu necesită conexiuni persistente)
- ✅ Mai rapid și mai fiabil
- ✅ Logs detaliate în Resend Dashboard
- ✅ Rate limiting automat
- ✅ DKIM/SPF configurat automat

---

## 🛡️ Protecție Anti-Spam

Formularul include **două niveluri de protecție** împotriva spam-ului:

### 1. Honeypot Field
- Un câmp ascuns (`website`) care utilizatorii reali nu îl văd
- Boții îl completează automat
- Dacă este completat → mesajul este ignorat (fără să alerteze botul)
- **Nu necesită configurare suplimentară** - funcționează automat

### 2. Cloudflare Turnstile (CAPTCHA invizibil)
- CAPTCHA smart de la Cloudflare
- Gratuit și integrat cu Cloudflare Pages
- Verificare în background (nu deranjează utilizatorii)

#### Configurare Turnstile:

1. **Accesează:** Cloudflare Dashboard → **Turnstile** (în sidebar)
2. **Add Site:**
   - Site name: `Happy Bees`
   - Domain: `happybees.ro` (și `happybees-ro.pages.dev`)
   - Widget Mode: **Managed** (recomandat) sau **Invisible**
3. **Copiază cheile:**
   - **Site Key** → pune în `content/contact.md` (înlocuiește `YOUR_TURNSTILE_SITE_KEY`)
   - **Secret Key** → pune în Environment Variables ca `TURNSTILE_SECRET_KEY`
4. **Redeploy** site-ul

#### Verificare funcționare:
- Formularul va afișa widget-ul Turnstile (poate fi invizibil sau checkbox)
- Backend-ul validează token-ul cu API-ul Cloudflare
- Dacă validarea eșuează → mesajul nu este trimis

---

## 🔗 Resurse utile:

- Resend Documentation: https://resend.com/docs
- Resend Domains: https://resend.com/domains
- Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/
- Cloudflare Turnstile: https://developers.cloudflare.com/turnstile/
