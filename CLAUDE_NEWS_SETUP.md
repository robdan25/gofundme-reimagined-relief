# Claude News Aggregation Setup

This guide explains how to set up and use the Claude-powered news aggregator to automatically fetch real Hurricane Melissa news from Jamaican news sources.

## Overview

The `claudeNewsAggregator` service uses Claude API to:
- Fetch real articles about Hurricane Melissa from reputable Jamaican outlets
- Extract titles, descriptions, and article links
- Deduplicate articles
- Format timestamps in Jamaica timezone (EST/UTC-5)

## Jamaican News Sources

The aggregator fetches from these reputable outlets:
1. **Jamaica Observer** - https://www.jamaicaobserver.com
2. **Jamaica Star** - https://www.jamaicastar.com
3. **The Gleaner** - https://www.gleanerjm.com
4. **RJR/TVJ/Nationwide** - https://www.rjrnewsonline.com

## Setup Instructions

### 1. Get Your Claude API Key

1. Go to https://console.anthropic.com
2. Sign up or log in to your account
3. Navigate to the "API keys" section
4. Create a new API key
5. Copy your API key (keep it secret!)

### 2. Set Environment Variable

Create a `.env.local` file in the project root:

```bash
VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
```

Or set it directly in your deployment environment (Vercel, Netlify, etc.)

### 3. Usage in Your Components

```typescript
import { claudeNewsAggregator } from '@/services/claudeNewsAggregator';

// Fetch real news
const articles = await claudeNewsAggregator.fetchHurricaneMelissaNews(10);

// Format with Jamaica timezone
const formattedArticles = claudeNewsAggregator.formatWithJamaicaTime(articles);

// Check if API is configured
if (claudeNewsAggregator.isConfigured()) {
  // Fetch real news from sources
  const realNews = await claudeNewsAggregator.fetchHurricaneMelissaNews();
} else {
  // Fall back to static news-data.json
  console.log('Claude API not configured, using static news');
}
```

## Integration Examples

### In Your News Page Component

```typescript
import { useEffect, useState } from 'react';
import { claudeNewsAggregator } from '@/services/claudeNewsAggregator';
import type { AggregatedNewsArticle } from '@/services/claudeNewsAggregator';

export default function NewsPage() {
  const [articles, setArticles] = useState<AggregatedNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (claudeNewsAggregator.isConfigured()) {
          // Fetch real news from Jamaican sources
          const realArticles = await claudeNewsAggregator.fetchHurricaneMelissaNews(15);
          const formatted = claudeNewsAggregator.formatWithJamaicaTime(realArticles);
          setArticles(formatted);
        } else {
          console.log('API not configured, using fallback');
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <small>{article.source} - {article.publishedDate.toLocaleDateString('en-JM')}</small>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </div>
      ))}
    </div>
  );
}
```

## How It Works

1. **API Call**: When `fetchHurricaneMelissaNews()` is called, the service makes requests to Claude API
2. **News Search**: Claude searches each Jamaican news outlet for Hurricane Melissa articles
3. **Article Extraction**: Claude extracts:
   - Article title
   - Brief description (2-3 sentences)
   - URL to the full article
   - Publication date
4. **Deduplication**: Removes duplicate articles by title
5. **Sorting**: Orders articles by most recent first
6. **Timezone**: Converts all timestamps to Jamaica timezone

## API Response Format

```typescript
interface AggregatedNewsArticle {
  id: string;                    // Unique identifier
  title: string;                 // Article headline
  description: string;           // Brief summary
  fullContent?: string;          // Optional full article text
  source: 'Jamaica Observer' | 'Jamaica Star' | 'Gleaner' | 'RJR/TVJ/Nationwide';
  url: string;                   // Link to full article
  imageUrl?: string;             // Optional featured image
  publishedDate: Date;           // Publication date in Jamaica TZ
  featured?: boolean;            // Mark as featured article
}
```

## Cost Considerations

- Claude API calls cost money (typically $0.003 per 1K input tokens)
- Each news fetch makes ~4 API calls (one per news source)
- Estimated cost: ~$0.01-0.02 per fetch
- Consider caching results to avoid excessive API calls

## Troubleshooting

### "Claude API key not configured"

Make sure you've set the `VITE_ANTHROPIC_API_KEY` environment variable:

```bash
# Local development
echo "VITE_ANTHROPIC_API_KEY=your_key" > .env.local

# Or in production (Vercel, Netlify, etc.)
# Add as environment variable in your deployment settings
```

### No articles returned

- Check that your API key is valid
- Claude might not find articles on those specific outlets
- Try searching the news websites directly to verify content exists
- Check Claude API usage in your console

### Articles are slow to load

- Fetching from 4 sources takes time (parallel requests)
- Consider caching the results in localStorage
- Implement pagination to show fewer articles initially

## Next Steps

1. **Set up the API key** following the instructions above
2. **Test in development**: Run `npm run dev` and check browser console
3. **Integrate into news feed**: Update your News page to use the aggregator
4. **Monitor costs**: Keep track of API usage in your Anthropic console
5. **Set up caching**: Consider implementing localStorage caching for cost optimization

## Support

For issues with:
- **Claude API**: Visit https://console.anthropic.com/docs
- **News aggregator code**: Check the `src/services/claudeNewsAggregator.ts` file
- **Integration**: Review the usage examples above
