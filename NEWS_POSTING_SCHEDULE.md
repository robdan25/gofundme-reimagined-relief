# Claude Automated News Posting Schedule

This document explains how Claude automatically posts Hurricane Melissa news at regular intervals.

## Default Posting Schedule

**Frequency**: Every **12 hours** (2 times per day)

This means Claude will automatically fetch and post news:
- **12:00 AM (Midnight Jamaica Time)**
- **12:00 PM (Noon Jamaica Time)**

## Configurable Schedules

You can adjust how often Claude posts news by changing the `intervalHours` setting:

### Option 1: Every 6 Hours (4 posts per day)
```typescript
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';

scheduledNewsPoster.init({
  intervalHours: 6,
  maxArticlesPerPost: 8
});
```
Posts at: 12 AM, 6 AM, 12 PM, 6 PM

### Option 2: Every 12 Hours (2 posts per day) - DEFAULT
```typescript
scheduledNewsPoster.init({
  intervalHours: 12,
  maxArticlesPerPost: 8
});
```
Posts at: 12 AM, 12 PM

### Option 3: Every 24 Hours (1 post per day)
```typescript
scheduledNewsPoster.init({
  intervalHours: 24,
  maxArticlesPerPost: 10
});
```
Posts at: 12 AM (every morning)

### Option 4: Every 4 Hours (6 posts per day)
```typescript
scheduledNewsPoster.init({
  intervalHours: 4,
  maxArticlesPerPost: 5
});
```
Posts at: 12 AM, 4 AM, 8 AM, 12 PM, 4 PM, 8 PM

## Implementation

### 1. Add to Your News Page (`src/pages/News.tsx`)

```typescript
import { useEffect } from 'react';
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';

export default function NewsPage() {
  useEffect(() => {
    // Initialize scheduled posting when page loads
    scheduledNewsPoster.init({
      intervalHours: 12, // Adjust as needed
      maxArticlesPerPost: 8,
      autoStartOnPageLoad: true
    });

    // Optional: Log status to console
    console.log(scheduledNewsPoster.getStatus());

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      {/* Your news content here */}
    </div>
  );
}
```

### 2. Add to App Root (`src/App.tsx`)

```typescript
import { useEffect } from 'react';
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';

function App() {
  useEffect(() => {
    // Initialize on app load
    scheduledNewsPoster.init({
      intervalHours: 12,
      autoStartOnPageLoad: true
    });
  }, []);

  return (
    // Your app structure
  );
}
```

## Checking Scheduler Status

You can check the current status of the news scheduler anytime:

```typescript
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';

// Get full status
const status = scheduledNewsPoster.getStatus();
console.log('Scheduler Status:', status);
// Output:
// {
//   running: true,
//   lastPost: Date(2025-11-06T12:00:00Z),
//   nextPostIn: "Next post in: 11h 45m",
//   config: { intervalHours: 12, maxArticlesPerPost: 8, ... }
// }

// Get time until next post
console.log(scheduledNewsPoster.getTimeUntilNextPost());
// Output: "Next post in: 11h 45m"

// Get last post time
const lastPost = scheduledNewsPoster.getLastPostTime();
console.log('Last article posted:', lastPost);
```

## Manual News Posts

You can also manually trigger news posts anytime:

```typescript
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';

// Post news immediately
await scheduledNewsPoster.postNews();

console.log('✅ News posted!');
console.log(scheduledNewsPoster.getStatus());
```

## Cost Optimization

Each news post makes 4 Claude API calls (one per news source):

| Frequency | Posts/Day | API Calls/Day | Est. Daily Cost |
|-----------|-----------|---------------|-----------------|
| Every 24 hours | 1 | 4 | ~$0.02-0.05 |
| Every 12 hours | 2 | 8 | ~$0.04-0.10 |
| Every 6 hours | 4 | 16 | ~$0.08-0.20 |
| Every 4 hours | 6 | 24 | ~$0.12-0.30 |

**Recommendation**: Start with **every 12 hours** (2 posts/day) for good coverage at minimal cost.

## Real-World Example

Here's a complete example integrating news posting into your News page:

```typescript
// src/pages/News.tsx
import { useEffect, useState } from 'react';
import { scheduledNewsPoster } from '@/services/scheduledNewsPoster';
import { claudeNewsAggregator } from '@/services/claudeNewsAggregator';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [schedulerStatus, setSchedulerStatus] = useState(null);

  useEffect(() => {
    // Initialize scheduled posting
    scheduledNewsPoster.init({
      intervalHours: 12,
      maxArticlesPerPost: 8,
      autoStartOnPageLoad: true
    });

    // Update scheduler status
    setSchedulerStatus(scheduledNewsPoster.getStatus());

    // Fetch initial articles
    const loadNews = async () => {
      const news = await claudeNewsAggregator.fetchHurricaneMelissaNews(10);
      setArticles(news);
    };

    loadNews();
  }, []);

  return (
    <div className="p-6">
      <h1>Hurricane Melissa News</h1>

      {/* Scheduler Status */}
      <div className="bg-blue-50 p-4 rounded mb-6">
        <h3>News Scheduler Status</h3>
        <p>Status: {schedulerStatus?.running ? '✅ Running' : '❌ Stopped'}</p>
        <p>Frequency: Every {schedulerStatus?.config.intervalHours} hours</p>
        <p>{schedulerStatus?.nextPostIn}</p>
      </div>

      {/* Articles */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <article key={article.id} className="border p-4">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <small>{article.source} - {article.publishedDate.toLocaleDateString()}</small>
            <a href={article.url} target="_blank">Read More</a>
          </article>
        ))}
      </div>
    </div>
  );
}
```

## Troubleshooting

### "Scheduler already running"
The scheduler is already active. Call `stop()` first if you need to restart:
```typescript
scheduledNewsPoster.stop();
scheduledNewsPoster.start();
```

### "Claude API not configured"
Make sure your `VITE_ANTHROPIC_API_KEY` environment variable is set. See `CLAUDE_NEWS_SETUP.md`.

### No articles being posted
- Check browser console for errors
- Verify API key is correct
- Check that news sources have articles about Hurricane Melissa
- Try manual post: `await scheduledNewsPoster.postNews()`

## Next Steps

1. **Choose your schedule**: Decide how often Claude should post (default: 12 hours)
2. **Integrate into your page**: Add initialization code to News page or App root
3. **Monitor Claude usage**: Check your Anthropic console to track API calls
4. **Test manually**: Use `scheduledNewsPoster.postNews()` to verify it works
5. **Monitor costs**: Track spending based on your posting frequency

## Support

For questions about:
- **Scheduling**: Check this file
- **Claude API**: See `CLAUDE_NEWS_SETUP.md`
- **Code**: Check `src/services/scheduledNewsPoster.ts`
