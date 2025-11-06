# Hurricane Melissa News System - Setup & Deployment Guide

## Overview

The Hurricane Melissa News system is a real-time news aggregation tool that:
- ✅ Automatically scrapes Jamaican news outlets (Jamaica Observer, Jamaica Star, Gleaner)
- ✅ Filters articles containing "Hurricane Melissa"
- ✅ Updates every 10-15 minutes (not every 6 hours)
- ✅ Displays on homepage and dedicated `/news` page
- ✅ Caches results to reduce API calls
- ✅ Falls back gracefully on errors

## Architecture

```
┌─────────────────────────────────────────┐
│   React Frontend (src/)                 │
│   - HurricaneMelissaNews.tsx (component)│
│   - News.tsx (full page)                │
│   - newsService.ts (API client)         │
└──────────────┬──────────────────────────┘
               │ fetches from
               ▼
┌─────────────────────────────────────────┐
│   Vercel Serverless Function (api/)     │
│   - api/news.ts (scraper)               │
│   - Runs every 10 minutes               │
│   - Caches in-memory                    │
└──────────────┬──────────────────────────┘
               │ scrapes
               ▼
┌─────────────────────────────────────────┐
│   Jamaican News Outlets                 │
│   - Jamaica Observer                    │
│   - Jamaica Star                        │
│   - Jamaica Gleaner                     │
└─────────────────────────────────────────┘
```

## Files Created

### Frontend Files

1. **`src/services/newsService.ts`** - News API client
   - Handles fetching from `/api/news`
   - localStorage caching (15-minute cache)
   - Fallback articles when API fails

2. **`src/components/HurricaneMelissaNews.tsx`** - News display component
   - Grid layout for article cards
   - Image, title, description, source, date
   - "Read Full Article" CTA buttons
   - Loading and error states

3. **`src/pages/News.tsx`** - Full news page
   - Featured article at top
   - Recent articles grid
   - Last updated timestamp
   - Refresh button functionality

4. **Updated `src/pages/Index.tsx`**
   - Added News section to homepage
   - Shows 3 latest articles
   - "View All News" button links to `/news`

5. **Updated `src/App.tsx`**
   - Added `/news` route

### Backend Files

6. **`api/news.ts`** - Vercel serverless scraper function
   - Scrapes Jamaica Observer, Jamaica Star, Gleaner
   - Filters for "Hurricane Melissa" keyword
   - Returns JSON with articles
   - In-memory 10-minute cache
   - Fallback articles on error

7. **`vercel.json`** - Vercel configuration
   - Build command: `npm run build`
   - Output directory: `dist`
   - API cache headers (10-minute cache)
   - Function settings (1GB memory, 30s timeout)

## Deployment Steps

### Step 1: Push Code to GitHub

```bash
cd /c/PROJECTS/Unbiased\ Relief/gofundme-reimagined-relief
git add .
git commit -m "Add Hurricane Melissa news scraper system"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Connect GitHub to Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"
5. Vercel will auto-detect Next.js/Vite settings
6. Click "Deploy"

### Step 3: Set Environment Variables

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add: `VITE_NEWS_API_URL` = `https://yourdomain.vercel.app/api/news`
3. Save and redeploy

### Step 4: Update Frontend URL

Update `src/services/newsService.ts` if your Vercel domain is different:

```typescript
const API_ENDPOINT = process.env.VITE_NEWS_API_URL || 'https://yourdomain.vercel.app/api/news';
```

### Step 5: Test the System

1. Visit your site homepage - you should see the News section
2. Visit `/news` page
3. Check browser console for any errors
4. Verify articles are loading

## Automatic Updates

### Real-Time Updates (15 Minutes)

The frontend automatically refreshes news every 15 minutes:
- `HurricaneMelissaNews.tsx` → `useEffect` with 15-minute interval
- `News.tsx` → Same 15-minute refresh

### Backend Cache (10 Minutes)

The Vercel function caches results for 10 minutes:
- First request → Scrapes news outlets (slow)
- Next 10 minutes → Returns cached results (fast)
- After 10 minutes → Scrapes again

**Net Result**: News updates are refreshed every 10-15 minutes automatically.

### Optional: Enable Cron Jobs (For Even Faster Updates)

To force updates every 5 minutes (requires Vercel Cron):

1. Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/news",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

2. Requires Vercel Pro plan

**Our current setup (10-minute cache) is sufficient and free.**

## Troubleshooting

### News Not Loading

1. **Check browser console** - Look for fetch errors
2. **Verify API endpoint** - Visit `https://yourdomain.vercel.app/api/news` directly in browser
   - Should return JSON with articles
3. **Check Vercel logs**:
   - Dashboard → Deployments → Runtime Logs
   - Look for "Error scraping" messages

### Articles Not Filtered Correctly

1. Keyword search is case-insensitive ✓
2. Regex patterns in `api/news.ts` may need tuning for site structure changes
3. News sites block scraping? → Consider using NewsAPI instead

### Performance Issues

1. Scraping takes 30+ seconds?
   - Vercel timeout is 30 seconds
   - Current scraping should finish in 5-10 seconds
   - If slower, optimize regex patterns or use Cheerio library

2. Too many API calls?
   - 10-minute backend cache prevents excessive scraping
   - 15-minute frontend cache prevents redundant fetches
   - Total: Very few requests to news sites

## Switching to NewsAPI (Alternative)

If web scraping becomes unreliable, switch to NewsAPI:

1. Get free API key: [newsapi.org](https://newsapi.org)
2. Replace `api/news.ts` with NewsAPI client
3. Set `VITE_NEWS_API_KEY` in Vercel environment variables

```typescript
// Example using NewsAPI
const response = await fetch(
  `https://newsapi.org/v2/everything?q=Hurricane+Melissa&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`
);
```

## Monitoring

### Google Analytics

News page events are tracked:
- Page views to `/news`
- News section on homepage
- Article clicks (via external links)

Check in GA4 dashboard under Engagement.

### Vercel Analytics

Monitor in Vercel dashboard:
- Function execution time
- Error rate
- Cache hit rate
- Bandwidth usage

## Cost

**Free Tier:**
- Vercel function calls: Unlimited
- Bandwidth: 100GB/month
- Build minutes: 6,000/month

**Our usage:**
- ~4 API calls per hour (cleanup every 15 min × 4 sources)
- ~100KB per response
- **Est. cost: $0/month (free tier)**

## Future Enhancements

1. **Better Scraping**: Use Cheerio library for more reliable parsing
2. **More Sources**: Add ZoomNews, NewNation, etc.
3. **Social Media**: Pull tweets with #HurricaneMelissa
4. **Image Extraction**: Save article images to CDN
5. **Search**: Add search functionality to News page
6. **Categories**: Filter news by relief category
7. **Email Alerts**: Notify users of new articles
8. **RSS Feed**: Create `/api/news.rss` for RSS readers

## Contact & Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: Open issue in repository
- **Unbiased Relief**: [contactus@unbiasedrelief.org](mailto:contactus@unbiasedrelief.org)

---

**Last Updated**: November 2025
**System Status**: ✅ Production Ready
