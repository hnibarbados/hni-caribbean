# HNI Caribbean — Progressive Web App

Complete web application for Healthier Nation Initiative Caribbean.
Built with Next.js 14. Deploys as a Progressive Web App (PWA).

## What's included

| Route        | What it is                                           |
|--------------|------------------------------------------------------|
| `/`          | Public homepage                                      |
| `/partners`  | Partner directory with search + filters              |
| `/partners/[id]` | Individual partner detail pages                  |
| `/buy`       | Buy a Card product page → links to your checkout     |
| `/member`    | Member PWA: login, digital card, map, profile        |
| `/scanner`   | Partner scanner tool (bookmark on partner's device)  |
| `/admin`     | Admin dashboard (see step 5 below)                   |

---

## Deploy in 5 steps (no developer required)

### Step 1 — Get the code onto GitHub

1. Go to [github.com](https://github.com) and create a free account
2. Click **New repository** → name it `hni-caribbean` → Create
3. Download GitHub Desktop from [desktop.github.com](https://desktop.github.com)
4. Open GitHub Desktop → Clone your new repository to your computer
5. Copy all the files from this folder into the cloned repository folder
6. In GitHub Desktop: write a commit message like "Initial build" → click **Commit** → click **Push**

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with your GitHub account
2. Click **Add New → Project**
3. Find `hni-caribbean` in the list → click **Import**
4. Leave all settings as-is → click **Deploy**
5. Wait about 90 seconds → your site is live ✅

### Step 3 — Connect your domain

1. In Vercel: go to your project → **Settings → Domains**
2. Type `hnicaribbean.com` → Add
3. Follow the DNS instructions Vercel shows you
4. (Your domain registrar is where you bought the domain — usually GoDaddy or Namecheap)

### Step 4 — Connect your payment portal

Open `src/app/buy/page.jsx` and find this line near the top:

```js
const CHECKOUT_URL = "https://hnicaribbean.com/product/hni-savings-card/";
```

Replace the URL with your real checkout page URL. Save the file, push to GitHub, and Vercel redeploys automatically.

### Step 5 — Activate the admin dashboard

1. Download the `HNIAdmin.jsx` artifact from your Claude conversation
2. Copy the entire file contents
3. Paste it into `src/components/AdminDashboard.jsx`, replacing everything there
4. Push to GitHub → Vercel redeploys → go to `/admin`

---

## Replacing mock data with real data

All mock data lives in `src/lib/data.js`. Every partner, member, and org is defined there.

To add a real partner: add an object to the `PARTNERS` array following the same shape.

When you're ready for a real database, replace the exports in `src/lib/data.js` with `fetch()` calls to your API. The page files don't need to change.

---

## PWA — adding to home screen

**Android:** Chrome shows "Add to Home Screen" automatically. Members tap it and the app installs.

**iPhone:** Member taps the Share button (box with arrow) → "Add to Home Screen" → Add.

To help members with this, the app shows an install banner after 5 seconds on the `/member` screen.

---

## Icons

Replace the placeholder icons in `public/icons/` with real HNI icons:
- `icon-192.png` — 192×192 pixels
- `icon-512.png` — 512×512 pixels

These appear on the home screen when the PWA is installed.

---

## Routes for your team

| Tool      | URL                           | Who uses it                      |
|-----------|-------------------------------|----------------------------------|
| Member app| yoursite.com/member           | All members                      |
| Scanner   | yoursite.com/scanner          | Partners (bookmark on their device) |
| Admin     | yoursite.com/admin            | Your internal team               |

---

## Need help?

Bring this README and the full conversation from Claude to any developer.
Everything they need to understand the project is documented here.
