# Complete File List for Hostinger Upload

**Location:** `C:\PROJECTS\Unbiased Relief\gofundme-reimagined-relief\dist\`

**Total Size:** ~1.3 MB
**Status:** Ready for production upload

---

## 🔴 CRITICAL FILES - MUST UPLOAD

### Root Directory: `/public_html/`

```
dist/index.html (3.6 KB)
dist/.htaccess (1.2 KB)
```

**These files are ESSENTIAL for your site to work.**

### Assets Directory: `/public_html/assets/`

```
dist/assets/index-DfsorU3n.js (664 KB)           ← NEW & CRITICAL!
dist/assets/index-BBnBogrW.css (75 KB)
dist/assets/drive-hygiene-kits-CbuMOhbK.jpg (111 KB)
dist/assets/drive-medical-supplies-DXuVOJvp.jpg (110 KB)
dist/assets/drive-school-supplies-BbRLIzwK.jpg (94 KB)
dist/assets/hero-relief-supplies-ZY-M_pG1.jpg (182 KB)
```

**The JavaScript file (index-DfsorU3n.js) is the most important - it has the fix for Jamaica news.**

---

## ⚪ OPTIONAL FILES

These can be uploaded but are not critical:

```
dist/dropoff-data.json (29 KB)
dist/favicon.ico (7.5 KB)
dist/heart-favicon.svg (253 bytes)
dist/news-data.json (7.4 KB)
dist/placeholder.svg (3.2 KB)
dist/robots.txt (284 bytes)
dist/sitemap.xml (3.1 KB)
```

---

## 🗑️ OLD FILES TO DELETE FROM HOSTINGER

**Before uploading new files, DELETE these from `/public_html/assets/`:**

```
❌ index-df6HHgJA.js
❌ index-DkqGtxfh.js
❌ index-lFeLKGqD.js  ← CRITICAL - This is the broken one!
❌ index-xJtP9112.js
❌ index-DVXvQ1Dq.css (if exists and different hash)
```

---

## Step-by-Step Upload Instructions

### Step 1: Delete Old Files (CRITICAL!)

1. Login to Hostinger
2. File Manager → `/public_html/assets/`
3. Delete each of these 4 old JavaScript files:
   - `index-df6HHgJA.js` (delete)
   - `index-DkqGtxfh.js` (delete)
   - `index-lFeLKGqD.js` (delete - THIS IS CRITICAL!)
   - `index-xJtP9112.js` (delete)
4. Delete old CSS if different: `index-DVXvQ1Dq.css`

**Important:** If you don't delete the old `index-lFeLKGqD.js`, the broken version will keep loading!

### Step 2: Upload Root Files

Upload these 2 files to `/public_html/`:

1. `dist/index.html`
2. `dist/.htaccess`

### Step 3: Upload New Assets

Upload these files to `/public_html/assets/`:

1. `dist/assets/index-DfsorU3n.js` ← **Most important!**
2. `dist/assets/index-BBnBogrW.css`
3. `dist/assets/drive-hygiene-kits-CbuMOhbK.jpg`
4. `dist/assets/drive-medical-supplies-DXuVOJvp.jpg`
5. `dist/assets/drive-school-supplies-BbRLIzwK.jpg`
6. `dist/assets/hero-relief-supplies-ZY-M_pG1.jpg`

### Step 4: Clear Cache

1. Hostinger Dashboard
2. Advanced → Cloudflare
3. Click **"Purge Everything"**
4. Wait 30-60 seconds

### Step 5: Hard Refresh Browser

1. Go to `https://unbiasedrelief.org`
2. Press **Ctrl+Shift+R** (or **Cmd+Shift+R** on Mac)
3. This clears browser cache and reloads

### Step 6: Test

1. Open DevTools: **F12**
2. Go to **Console** tab
3. You should see:
   ```
   ✅ [JamaicaNewsFeed] Successfully loaded 8 articles from 1 sources
   ```
4. NO red CORS errors
5. News articles should appear on home page and `/news` page

---

## File Details

### index.html (3.6 KB)
- **What it is:** Main HTML file
- **References:** `/assets/index-DfsorU3n.js` and `/assets/index-BBnBogrW.css`
- **Upload to:** `/public_html/`
- **Replace:** Yes, upload new version

### index-DfsorU3n.js (664 KB) - **MOST CRITICAL**
- **What it is:** React app with Jamaica news feature
- **Calls:** `/api/jamaica-news` (relative path, no CORS issues)
- **Upload to:** `/public_html/assets/`
- **This is:** The NEW fixed version
- **Hash:** `DfsorU3n`
- **Previous broken file:** `index-lFeLKGqD.js` - **DELETE THIS!**

### index-BBnBogrW.css (75 KB)
- **What it is:** Tailwind CSS styles
- **Upload to:** `/public_html/assets/`
- **Replace:** Yes

### .htaccess (1.2 KB)
- **What it is:** Server configuration
- **Does:** SPA routing + cache control headers
- **Upload to:** `/public_html/`
- **Replace:** Yes

### Images (4 files, 497 KB total)
- **Upload to:** `/public_html/assets/`
- **Replace:** Yes
- Files:
  - `drive-hygiene-kits-CbuMOhbK.jpg` (111 KB)
  - `drive-medical-supplies-DXuVOJvp.jpg` (110 KB)
  - `drive-school-supplies-BbRLIzwK.jpg` (94 KB)
  - `hero-relief-supplies-ZY-M_pG1.jpg` (182 KB)

---

## What's Different?

### Old Version (Broken)
- **File:** `index-lFeLKGqD.js`
- **Problem:** Tried to call absolute Vercel URL
- **Result:** CORS blocked, blank site, error in console

### New Version (Fixed)
- **File:** `index-DfsorU3n.js`
- **Solution:** Calls relative path `/api/jamaica-news`
- **Result:** Vercel rewrites to serverless function, fetches real Jamaica news
- **Benefits:** No CORS issues, real hurricane news loads

---

## Quick Reference

| Action | Files | Count | Total Size |
|--------|-------|-------|-----------|
| Delete | Old JS files | 4 | ~2.7 MB |
| Upload Root | index.html, .htaccess | 2 | 4.8 KB |
| Upload Assets | JS, CSS, Images | 6 | 1.0 MB |
| Optional | JSON, SVG, robots, etc | 7 | ~48 KB |
| **TOTAL TO UPLOAD** | | **8** | **~1.0 MB** |

---

## Troubleshooting

### Site is still blank
- **Cause:** Old `index-lFeLKGqD.js` still exists on server
- **Fix:** Delete it immediately and clear cache

### CORS errors in console
- **Cause:** Old broken JavaScript file loading
- **Fix:** Delete old files, upload new ones, clear cache

### Still seeing error after upload
- **Cause:** Browser cache
- **Fix:** Hard refresh with **Ctrl+Shift+R**

### 404 errors
- **Cause:** `.htaccess` not uploaded or files not in right location
- **Fix:** Check `.htaccess` is in `/public_html/` root

---

## Files in Your Computer

All these files are in: **`C:\PROJECTS\Unbiased Relief\gofundme-reimagined-relief\dist\`**

You can:
1. Navigate to this folder in File Explorer
2. Copy files from here to upload to Hostinger
3. Or drag-and-drop them to Hostinger File Manager

---

## Summary

✅ **All files ready**
✅ **index-DfsorU3n.js is the fixed version**
✅ **Just delete old files and upload new ones**
✅ **Clear cache and test**

Your site will work once you:
1. Delete old JS files
2. Upload new files
3. Clear cache
4. Hard refresh browser

Good luck! 🚀
