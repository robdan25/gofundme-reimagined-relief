# Final Hostinger Upload Instructions

**Status:** Ready for production deployment

## Files Ready to Upload

All files are in the `dist/` folder on your computer.

### Critical Files (MUST Upload)

**To `/public_html/` (root):**
```
dist/index.html          ← Main HTML file
dist/.htaccess           ← Server configuration
```

**To `/public_html/assets/` (create folder if doesn't exist):**
```
dist/assets/index-DfsorU3n.js              ← NEW JavaScript (with working API call)
dist/assets/index-BBnBogrW.css             ← CSS styles
dist/assets/drive-hygiene-kits-CbuMOhbK.jpg
dist/assets/drive-medical-supplies-DXuVOJvp.jpg
dist/assets/drive-school-supplies-BbRLIzwK.jpg
dist/assets/hero-relief-supplies-ZY-M_pG1.jpg
```

### Optional Files (Can Upload)
```
dist/favicon.ico
dist/heart-favicon.svg
dist/dropoff-data.json
dist/news-data.json
dist/placeholder.svg
dist/robots.txt
dist/sitemap.xml
```

---

## Step-by-Step Upload Process

### Step 1: Delete Old JavaScript Files

In Hostinger File Manager → `/public_html/assets/`:

**DELETE these old files (they cause the CORS error):**
- ❌ `index-df6HHgJA.js`
- ❌ `index-DkqGtxfh.js`
- ❌ `index-lFeLKGqD.js` ← This is the broken one showing CORS error
- ❌ `index-xJtP9112.js`
- ❌ `index-DVXvQ1Dq.css` (if different from current)

**KEEP:**
- ✅ `index-BBnBogrW.css` (current CSS)
- ✅ All `.jpg` image files

### Step 2: Upload Root Files

**Upload to `/public_html/`:**
1. `dist/index.html` → Replace existing
2. `dist/.htaccess` → Replace existing

### Step 3: Upload Asset Files

**Upload to `/public_html/assets/`:**
1. `dist/assets/index-DfsorU3n.js` → NEW file (different from old ones)
2. `dist/assets/index-BBnBogrW.css` → Replace existing
3. All `.jpg` files → Replace existing

### Step 4: Clear Hostinger Cache

1. **Hostinger Dashboard** → Click on your domain
2. **Advanced** → **Cloudflare** (or cache service)
3. Click **Purge Everything**
4. Wait 30 seconds

### Step 5: Test Production Site

1. Visit: `https://unbiasedrelief.org`
2. Open DevTools: Press `F12`
3. Go to **Console** tab
4. Look for these logs:
   - ✅ `🌍 [JamaicaNewsFeed] Fetching Jamaica news from server API...`
   - ✅ `✅ [JamaicaNewsFeed] Successfully loaded 8 articles from 1 sources`
   - ✅ **NO** CORS errors

### Step 6: Verify News Display

- [ ] Home page shows news articles
- [ ] `/news` page shows articles
- [ ] Articles have source badges (Jamaica Observer, etc.)
- [ ] Articles are clickable
- [ ] Console shows successful fetch logs
- [ ] No red errors in console

---

## What Changed

This upload fixes the CORS issue by:
1. Using **relative API path** `/api/jamaica-news` instead of absolute URL
2. Vercel's rewrites route this to the serverless function
3. No more cross-origin requests from browser
4. Real Jamaica news articles load from RSS feeds server-side

### Architecture

```
Your Hostinger Site (unbiasedrelief.org)
    ↓
JamaicaNewsFeed component calls:  fetch('/api/jamaica-news')
    ↓
Vercel rewrites to: /api/jamaica-news.ts (serverless function)
    ↓
Fetches from RSS feeds server-side (no CORS)
    ↓
Returns 8 real articles from Jamaica Observer
    ↓
Displays on your site ✅
```

---

## File Summary

| File | Size | Purpose |
|------|------|---------|
| index.html | 3.6 KB | Main HTML - references index-DfsorU3n.js |
| index-DfsorU3n.js | 664 KB | React app - calls `/api/jamaica-news` |
| index-BBnBogrW.css | 75 KB | Styles |
| .htaccess | 1.1 KB | SPA routing + cache headers |
| Images (4 files) | ~500 KB | Drive photos |

**Total:** ~1.3 MB (same as before)

---

## Troubleshooting

**Problem:** Still seeing CORS error
- **Solution:** Clear browser cache (Ctrl+Shift+Delete), then refresh
- **Or:** Check if old `index-lFeLKGqD.js` still exists in assets (delete it)

**Problem:** News not showing
- **Solution:** Check console logs - should show successful fetch
- **Or:** Wait 5 minutes for cache to clear, then refresh

**Problem:** 404 Not Found errors
- **Solution:** Make sure `.htaccess` is uploaded to `/public_html/`
- **Or:** Make sure `index.html` correctly references the files

---

## Ready?

All files are in `C:\PROJECTS\Unbiased Relief\gofundme-reimagined-relief\dist\`

Upload them now and check the console on your live site!

Questions? Check the console logs first - they tell you exactly what's happening.
