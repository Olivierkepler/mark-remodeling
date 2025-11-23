This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


***************************** CHANGE  DOMAIN ****************************************

Here’s exactly how you can move your domain from a **Netlify-hosted project** to a **Vercel-hosted project**, while keeping the same custom domain name.

---

# ✅ **Steps to Move Your Domain From Netlify → Vercel**

## **1. Remove or Disable the Domain From Netlify**

Before Vercel can use your domain, Netlify must no longer be controlling it.

### **In Netlify:**

1. Go to your site dashboard.
2. Navigate to **Site Settings → Domain management → Custom domains**.
3. Find the domain you added.
4. **Remove** or **delete** the domain from this project.
5. (Optional but recommended)
   Go to your domain’s **DNS settings** inside Netlify and delete old DNS records (A, CNAME, TXT) so they don't conflict.

---

# ✅ **2. Add Your Domain to Vercel**

Now you connect the domain to your new Vercel project.

### **In Vercel:**

1. Open the new project you deployed on Vercel.
2. Go to **Settings → Domains**.
3. Click **Add**.
4. Enter your custom domain name.
5. Vercel will give you DNS records to add (usually 2 A records or 1 CNAME depending on your setup).

---

# ✅ **3. Update DNS Records With Your Domain Registrar**

Wherever you purchased the domain (GoDaddy, Namecheap, Google Domains, Porkbun, etc.) — this is where you must update DNS.

> ❗ Your DNS must point to Vercel, **not** Netlify anymore.

### **Common Vercel DNS settings:**

#### If using the **apex/root domain**:

`example.com`

```
A → 76.76.21.21
```

#### If using the **www domain**:

```
CNAME → cname.vercel-dns.com
```

Vercel will show exactly what you need — follow those instructions.

---

# ✅ **4. Wait for DNS Propagation**

Changes usually take:

* **Minutes** for most registrars
* Up to **24 hours** globally

Your site may go offline briefly during this transition.

---

# ✨ **Optional: Redirect www → root (or vice versa)**

Vercel can do this automatically using domain settings.

---

# 🎉 Once DNS propagates, your domain now points to your new Vercel project!

If you'd like, tell me:

* Your registrar (GoDaddy? Namecheap? Google?)
* Whether your domain is currently managed by Netlify DNS
* Your desired domain structure (`example.com`, `www.example.com`, etc.)

…and I can give step-by-step instructions customized exactly to your setup.




********************************* GOOGLE SHEETS *************************************

Here’s the **exact process** to obtain each of these values:

# ✅ 1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**

This comes from creating a **Google Cloud Service Account**.

### **Steps:**

1. Go to **Google Cloud Console** → [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create or select a project.
3. In the sidebar, go to **IAM & Admin → Service Accounts**.
4. Click **Create Service Account**.
5. Name it anything (e.g., “vercel-sheets”).
6. After creation, select it → Go to **Keys** tab.
7. Click **Add Key → Create new key → JSON**.
8. A `.json` file will download.

Inside that file, find:

```
"client_email": "your-service-account@your-project.iam.gserviceaccount.com"
```

This value is your
➡️ **GOOGLE_SERVICE_ACCOUNT_EMAIL**

---

# ✅ 2. **GOOGLE_PRIVATE_KEY**

From the same downloaded JSON key file.

Inside the file you’ll see:

```
"private_key": "-----BEGIN PRIVATE KEY-----\n ... \n-----END PRIVATE KEY-----\n"
```

That entire block is your
➡️ **GOOGLE_PRIVATE_KEY**

### ⚠️ Important:

When adding it as an environment variable in Vercel or .env files:

* Replace literal `\n` with real line breaks **OR**
* Wrap the key in quotes, depending on your setup

**Example (Vercel-style):**

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
```

---

# ✅ 3. **GOOGLE_SHEET_ID**

This comes from your Google Sheet's URL.

### **Steps:**

1. Open the Google Sheet you want to connect.
2. Look at the URL:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGHIJKlmnopQRstuVWXYZ12345/edit#gid=0
```

The part after `/d/` and before `/edit` is the ID:

```
1AbCdEfGHIJKlmnopQRstuVWXYZ12345
```

This is your
➡️ **GOOGLE_SHEET_ID**

---

# 📌 Final Summary

| Variable                         | Where It Comes From              |
| -------------------------------- | -------------------------------- |
| **GOOGLE_SERVICE_ACCOUNT_EMAIL** | From JSON key → `"client_email"` |
| **GOOGLE_PRIVATE_KEY**           | From JSON key → `"private_key"`  |
| **GOOGLE_SHEET_ID**              | From Google Sheet URL            |

---

If you want, you can paste your JSON file (without the private key), and I can point out exactly where each value is. Or I can walk you through setting it up in **Vercel environment variables** step-by-step.


