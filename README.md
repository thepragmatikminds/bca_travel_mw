# BCA Travel — pilot website

**Where travel feels as easy as ABC.** Air tickets · Travel insurance · Hotel booking · Tour packages · Airport transfers · Visa processing.

This is a standalone website (React + Vite + Tailwind CSS 4). It has **no backend, no database and no logins**, so it can be hosted for free on Cloudflare straight from GitHub.

## How bookings work (pilot phase)

1. The visitor picks a service and fills in a short form (`/book`).
2. The site prepares an email to **Info@travelbca.com** with all the details and a reference such as `BCA-261119-9SDK`.
3. The visitor sends it from their email app, Gmail, or by copying the text.
4. The BCA team replies with availability, price and payment instructions.

There is **no online payment**. Payment is arranged by email only. Nothing is stored on a server: the email *is* the booking record.

## Deploy: GitHub → Cloudflare

### 1. Put the code on GitHub
In your local clone of `thepragmatikminds/bca_travel_mw2`:

```bash
# delete the old Base44 files (keep the hidden .git folder), copy these files in, then:
npm install            # creates package-lock.json — commit it
git add -A
git commit -m "BCA Travel pilot site"
git push origin main
```

### 2. Connect Cloudflare
In the Cloudflare dashboard go to **Workers & Pages → Create → Import a repository**, choose the repo and use:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | *(leave empty)* |

The project name must match `"name"` in `wrangler.jsonc` (`bca-travel`). Every push to `main` then redeploys automatically.

*Prefer Cloudflare Pages?* Choose **Pages → Connect to Git**, build command `npm run build`, output directory `dist`. It works without changes.

If a build fails on Node version, add the build variable `NODE_VERSION` = `22`.

### 3. Custom domain
Cloudflare dashboard → your project → **Settings → Domains & Routes → Add**. (The poster's email uses `travelbca.com`.)

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs ./dist
```

## Where to change things

| To change | Edit |
| --- | --- |
| Email, phone numbers, Instagram, pilot banner on/off | `src/config/site.js` → `SITE` |
| Services, their descriptions and the form fields for each | `src/config/site.js` → `SERVICES` |
| Destination quick-picks, FAQ, "how it works" steps | `src/config/site.js` |
| Brand colours and fonts | `src/index.css` (`@theme`) |
| Logo | `src/components/Logo.jsx`, `public/favicon.svg`, `public/icons/` |
| Poster image on the home page | `public/images/bca-poster.jpg` |

**Going live later:** set `SITE.pilot.enabled` to `false` to hide the pilot banner and footer note.

## Project layout

```
index.html            page shell, fonts, meta tags
wrangler.jsonc        Cloudflare config (static assets + single-page-app fallback)
public/               icons, manifest (installable app), service worker, _headers
src/config/site.js    business details, services, form fields, FAQ
src/lib/              email builder + validation, tiny router, date helpers
src/components/       header, footer, cards, icons, logo
src/pages/            Home, Services, Book, Contact, NotFound
```

## Notes

- **Facebook** appears on the poster but no page address was provided, so no Facebook link is shown. Add one in `SiteFooter.jsx` / `Contact.jsx` when you have it.
- **WhatsApp** links (questions only) use the two poster numbers, because the poster shows a WhatsApp icon beside them. Set `whatsappEnabled: false` in `site.js` to hide them.
- Do not collect passport numbers through the site — the visa form says so. The team should explain safe document sharing in the email reply.
- The old Base44 version (airline bookings, Stripe, accounts) is no longer used by this code and can stay archived.
