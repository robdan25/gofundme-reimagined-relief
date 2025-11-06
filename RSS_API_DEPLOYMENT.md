# Jamaica News API - RSS Feed Implementation

## Overview

You now have a **server-side RSS news fetching system** that completely solves the CORS issues. All external API calls happen on Vercel serverless functions, not in the browser.

## Architecture

### Before (Had CORS Issues)
```
Browser → RSS Feeds (BLOCKED by CORS)
Browser → Claude API (BLOCKED by CORS)
Result: Site fallback to cached data only
```

### After (No CORS Issues)
```
Browser → Your API Route (/api/jamaica-news) → RSS Feeds (Server-side, no CORS)
Browser → Your API Route (/api/jamaica-news) → Claude API (Server-side, optional fallback)
Result: Real news from Jamaican outlets directly to users
```

## New Files Created

### 1. Backend API Route: `/api/jamaica-news.ts`
**Location:** `api/jamaica-news.ts`

**What it does:**
- Fetches RSS feeds from 5 Jamaican news outlets (Jamaica Observer, Jamaica Gleaner, Jamaica Star, RJR News, TVJ News)
- Parses XML server-side (no CORS issues)
- Filters for Hurricane Melissa-related articles only
- Returns normalized JSON with top 10 articles
- Caches results for 15 minutes
- Has 5-second timeout per feed (graceful failure)

**Key Features:**
- ✅ All external requests happen server-side only
- ✅ No CORS issues
- ✅ Filters for relevant Hurricane Melissa content
- ✅ Error handling: if some feeds fail, returns articles from working feeds
- ✅ 15-minute cache with timestamp
- ✅ Detailed console logging for debugging

### 2. React Component: `/src/components/JamaicaNewsFeed.tsx`
**Location:** `src/components/JamaicaNewsFeed.tsx`

**What it does:**
- Calls `/api/jamaica-news` endpoint
- Displays news in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Shows source badge, headline, summary, publication date
- Links to full article on news outlet
- Loading skeleton while fetching
- Graceful error handling
- Auto-refresh every 15 minutes

**Usage:**
```typescript
// Show 3 latest articles
<JamaicaNewsFeed limit={3} />

// Show 12 articles with grid layout
<JamaicaNewsFeed limit={12} />

// With custom className
<JamaicaNewsFeed limit={6} className="my-custom-class" />
```

### 3. Updated Pages

**News Page: `/src/pages/News.tsx`**
- Completely refactored to use JamaicaNewsFeed component
- Shows up to 12 news articles
- Cleaner, simpler code
- Better error handling

**Home Page: `/src/pages/Index.tsx`**
- Replaced HurricaneMelissaNews with JamaicaNewsFeed
- Shows 3 latest articles in hero section
- Same responsive design

## Deployment Instructions

### Step 1: Deploy to Vercel

Your Vercel deployment automatically deploys the API route when you push to git.

```bash
git add .
git commit -m "Add RSS-based Jamaica news API to solve CORS issues"
git push
```

Vercel will:
1. Build your React app
2. Deploy `/api/jamaica-news.ts` as a serverless function
3. Available at: `https://your-project.vercel.app/api/jamaica-news`

### Step 2: Update Hostinger Files

You have a **new build** ready. Files to upload:

**Delete from Hostinger:**
- `assets/index-*.js` (old JavaScript file)
- `assets/index-*.css` (old CSS file)

**Upload to Hostinger `/public_html/`:**
- `dist/index.html` → `/public_html/index.html`
- `dist/assets/*` → `/public_html/assets/`
- `dist/.htaccess` → `/public_html/.htaccess`

**If you use Vercel for hosting instead:**
- Just push to git, Vercel handles everything

### Step 3: Clear Cache

Hostinger caching can serve stale files. Clear it:
1. Login to Hostinger
2. Go to Advanced → Cloudflare
3. Click "Purge Everything"

Or if not using Cloudflare, clear the server cache through your hosting panel.

## How to Add More RSS Feeds Later

The RSS feeds are defined in `/api/jamaica-news.ts`:

```typescript
const RSS_FEEDS = [
  {
    source: "Jamaica Observer",
    url: "https://www.jamaicaobserver.com/category/news/feed/",
  },
  // Add more feeds like this:
  {
    source: "New Outlet Name",
    url: "https://example.com/feed/",
  },
];
```

Just add a new object to the array and deploy.

## Filtering Logic

The API filters articles using keywords:
- "melissa"
- "tropical storm melissa"
- "hurricane" (any hurricane content)

To modify what articles are returned, edit this section in `/api/jamaica-news.ts`:

```typescript
const isRelevant =
  title.toLowerCase().includes("melissa") ||
  title.toLowerCase().includes("tropical storm melissa") ||
  title.toLowerCase().includes("hurricane") ||
  summary.toLowerCase().includes("melissa") ||
  summary.toLowerCase().includes("tropical storm melissa");
```

## API Response Format

```json
{
  "items": [
    {
      "id": "Jamaica Observer-1730888400000-0",
      "source": "Jamaica Observer",
      "title": "Hurricane Melissa Relief Updates",
      "url": "https://jamaicaobserver.com/article",
      "publishedAt": "2024-11-06T12:30:00.000Z",
      "summary": "The latest update on Hurricane Melissa relief efforts..."
    }
  ],
  "lastUpdated": "2024-11-06T17:44:00.000Z",
  "cached": false,
  "sourceCount": 5
}
```

## Console Logging

The API logs detailed information for debugging:

```
[RSS] Starting multi-feed fetch from 5 sources
[RSS] Fetching Jamaica Observer from https://www.jamaicaobserver.com/category/news/feed/
[RSS] Successfully parsed Jamaica Observer: found 3 Melissa-related articles
...
[RSS] Complete! 7 articles from 4 sources in 1247ms
[API] Returning 7 articles from 4 sources
```

Check browser console (F12) to see logs from the component:

```
🌍 [JamaicaNewsFeed] Fetching Jamaica news from server API...
✅ [JamaicaNewsFeed] Successfully loaded 7 articles from 4 sources
```

## Troubleshooting

### Issue: "No recent news available" message
**Cause:** All RSS feeds returned empty or timed out
**Solution:**
1. Check browser console for logs
2. Test the API directly: `/api/jamaica-news`
3. Verify RSS feed URLs are still active and returning valid data
4. Check Vercel logs for serverless function errors

### Issue: Only seeing old/cached articles
**Cause:** 15-minute cache is still valid
**Solution:**
1. Wait 15 minutes for cache to expire
2. Or clear browser localStorage
3. For immediate refresh in dev: restart server

### Issue: Articles appear on localhost but not on production
**Cause:** Hostinger caching serving stale build
**Solution:**
1. Clear Hostinger/Cloudflare cache
2. Verify correct files uploaded
3. Clear browser cache (Ctrl+Shift+Delete)

## Why This Solves CORS Issues

**CORS (Cross-Origin Resource Sharing)** is a browser security feature that blocks:
- ❌ JavaScript running in browser from calling external APIs
- ✅ Server code (Node.js, Vercel functions) calling external APIs

**Before:** Browser → RSS feeds directly = CORS error

**After:** Browser → Your API → RSS feeds = No CORS (server-to-server)

The browser only talks to your own API (`/api/jamaica-news`), which talks to external feeds server-side.

## Performance

- **First load:** ~2 seconds (5 feeds fetched in parallel, 5-second timeout per feed)
- **Cached loads:** ~100ms (returns cached data)
- **Auto-refresh:** Every 15 minutes
- **Timeout protection:** If feeds take >5 seconds each, still returns partial results
- **Duplicate removal:** Automatically deduplicates articles across feeds

## Next Steps

1. ✅ Push to git (`git push`)
2. ✅ Verify on Vercel: Check that `/api/jamaica-news` is deployed
3. ✅ Test API: Visit `/api/jamaica-news` on production
4. ✅ Upload new dist files to Hostinger
5. ✅ Clear Hostinger cache
6. ✅ Test on production site: Check home page and /news page

---

**Questions?** The component includes detailed console logging. Check the browser console (F12) to see what's happening in real-time.
