# Hostinger Deployment Instructions - Final Update

## What Changed

Your frontend code now calls the **Vercel API** (`hurricane-melissa-relief-j4lzdt1i-unbrs-projects.vercel.app/api/jamaica-news`) instead of a local API route.

**This means:**
- ✅ Frontend stays on Hostinger (unbiasedrelief.org)
- ✅ API stays on Vercel (handles RSS feeds, no CORS issues)
- ✅ No domain upgrade needed
- ✅ No additional costs

## New Build Files

**New JavaScript file:** `dist/assets/index-lFeLKGqD.js` (updated with Vercel API URL)

**New CSS file:** `dist/assets/index-BBnBogrW.css` (same as before)

## Deployment Steps

### Step 1: Delete Old Files from Hostinger

Log into Hostinger → File Manager → `/public_html/assets/`

Delete these old files:
- `index-*.js` (ANY old JavaScript files with different hash names)
- Keep the new one: `index-lFeLKGqD.js`
- `index-*.css` (if you have old CSS files)
- Keep the new one: `index-BBnBogrW.css`

### Step 2: Upload New Files to Hostinger

**Upload to `/public_html/`:**
- `dist/index.html`
- `dist/.htaccess`

**Upload to `/public_html/assets/`:**
- `dist/assets/index-lFeLKGqD.js` (NEW - with Vercel API URL)
- `dist/assets/index-BBnBogrW.css`
- `dist/assets/*.jpg` (all images)

### Step 3: Clear Cache

1. Log into Hostinger
2. Go to **Advanced** → **Cloudflare** (or your caching service)
3. Click **Purge Everything**

Or wait 30 minutes for cache to naturally expire.

### Step 4: Test

Visit: `https://unbiasedrelief.org`

You should see:
- ✅ News articles on home page
- ✅ `/news` page with articles
- ✅ Open DevTools (F12) → Console
- ✅ Should show: `✅ [JamaicaNewsFeed] Successfully loaded X articles from Y sources`
- ✅ NO CORS errors

## Files Included

```
dist/
├── index.html
├── .htaccess
└── assets/
    ├── index-lFeLKGqD.js     (NEW - calls Vercel API)
    ├── index-BBnBogrW.css
    ├── drive-*.jpg
    └── hero-*.jpg
```

## How It Works

```
unbiasedrelief.org (Hostinger)
  ↓
  JamaicaNewsFeed component (React)
  ↓
  fetch('https://hurricane-melissa-relief-j4lzdt1i-unbrs-projects.vercel.app/api/jamaica-news')
  ↓
  /api/jamaica-news (Vercel)
  ↓
  RSS feeds (Jamaica Observer, Gleaner, Star, RJR, TVJ)
  ↓
  Real Hurricane Melissa news articles
  ↓
  Back to your site - displayed to users ✅
```

## Summary

- **Frontend:** Hostinger (unbiasedrelief.org)
- **API:** Vercel (handles RSS, no CORS issues)
- **News:** Real articles from Jamaican outlets
- **Cost:** $0 extra (Vercel free tier)
- **Setup:** Deploy to Hostinger, Vercel deploys automatically

## Verification Checklist

- [ ] Old files deleted from Hostinger
- [ ] New files uploaded to Hostinger
- [ ] Cache cleared
- [ ] Visit unbiasedrelief.org
- [ ] News visible on home page
- [ ] News visible on /news page
- [ ] Console shows successful fetch logs
- [ ] No CORS errors in console
- [ ] Articles are clickable and link to real news outlets

---

**Done!** Your site now has real, fresh Hurricane Melissa news from Jamaica with zero CORS issues. 🎉
