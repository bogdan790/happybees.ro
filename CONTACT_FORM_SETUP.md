# Contact Form - Environment Variables Setup

## 📧 SMTP Configuration pentru Cloudflare Pages

Pentru ca formularul de contact să funcționeze, trebuie să configurezi SMTP credentials în **Cloudflare Pages Dashboard**.

---

## 🔐 Environment Variables Necesare

Accesează: **Cloudflare Dashboard** → **Pages** → **happybees-ro** → **Settings** → **Environment Variables**

Adaugă următoarele variabile (click **"Add variable"** pentru fiecare):

### Production Environment:

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `SMTP_HOST` | SMTP server hostname | `mail.happybees.ro` sau `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` (TLS) sau `465` (SSL) sau `25` |
| `SMTP_USER` | SMTP username (email complet) | `contact@happybees.ro` |
| `SMTP_PASS` | SMTP password | `parola-ta-smtp` |
| `SMTP_FROM` | Email sender (From address) | `contact@happybees.ro` |
| `SMTP_TO` | Email recipient (unde ajung mesajele) | `bogdan@happybees.ro` |

---

## 📋 Pași de configurare în Cloudflare Dashboard:

1. **Accesează:** https://dash.cloudflare.com
2. **Navighează:** Pages → **happybees-ro** → **Settings**
3. **Click:** Environment Variables (în sidebar)
4. **Add variable** pentru **Production**:
   - Variable name: `SMTP_HOST`
   - Value: (completează cu server-ul tău SMTP)
   - Click **Save**
5. **Repetă** pentru toate cele 6 variabile de mai sus
6. **Redeploy:** Deployments → Click pe ultimul deployment → **Retry deployment**

---

## 🧪 Testare după configurare:

1. **Accesează:** https://happybees-ro.pages.dev/contact/
2. **Completează formularul** cu date de test
3. **Trimite mesaj**
4. **Verifică** inbox-ul la adresa setată în `SMTP_TO`

---

## ⚠️ IMPORTANT:

- **NU pune credentials în cod** - doar în Environment Variables!
- **Production Environment** = pentru live site
- Poți adăuga și **Preview Environment** pentru test branches (opțional)

---

## 🔍 Debugging:

Dacă formularul nu trimite email:

1. **Verifică Console browser** (F12) pentru erori JavaScript
2. **Verifică Cloudflare Functions logs:**
   - Dashboard → Pages → happybees-ro → **Functions** tab → **Logs**
3. **Verifică Environment Variables** sunt setate corect
4. **Test SMTP credentials** separat (cu un client email)

---

## 📝 Notă despre SMTP Ports:

- **Port 587** = TLS (recomandat, cel mai sigur)
- **Port 465** = SSL (deprecated dar funcționează)
- **Port 25** = Plain (nu e recomandat, fără encriptare)

Folosește **587** dacă furnizorul tău SMTP îl suportă.
