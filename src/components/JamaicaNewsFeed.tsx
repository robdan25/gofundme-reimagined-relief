import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, RefreshCw } from 'lucide-react';

interface JamaicaNewsItem {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
}

interface JamaicaNewsFeedProps {
  limit?: number;
  featured?: boolean;
  className?: string;
}

/**
 * Jamaica News Feed Component
 *
 * Displays real Hurricane Melissa news from Jamaican news outlets.
 * Fetches server-side from /api/jamaica-news to avoid CORS issues.
 *
 * Features:
 * - Server-side RSS feed aggregation (no CORS issues)
 * - 15-minute cache for performance
 * - Graceful error handling with fallback UI
 * - Responsive grid layout (mobile: 1 col, tablet: 2 cols, desktop: 3 cols)
 * - Real-time updates every 15 minutes
 */
export const JamaicaNewsFeed = ({
  limit = 3,
  featured = false,
  className = '',
}: JamaicaNewsFeedProps) => {
  const [items, setItems] = useState<JamaicaNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        `🌍 [JamaicaNewsFeed] Fetching Jamaica news from server API...`
      );

      const response = await fetch('https://hurricane-melissa-relief-j4lzdt1i-unbrs-projects.vercel.app/api/jamaica-news');

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        console.log(
          `✅ [JamaicaNewsFeed] Successfully loaded ${data.items.length} articles from ${data.sourceCount} sources`
        );
        setItems(data.items.slice(0, limit));
        setLastUpdated(new Date(data.lastUpdated));
        setError(null);
      } else {
        console.warn(
          `⚠️ [JamaicaNewsFeed] No articles returned from API, showing no news message`
        );
        setItems([]);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to load Jamaica news';
      console.error(`❌ [JamaicaNewsFeed] Error:`, errorMsg);
      setError(errorMsg);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Refresh every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit]);

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          {[...Array(Math.min(limit, 3))].map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Error state (only show if we have no items)
  if (error && items.length === 0) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <h3 className="text-lg font-semibold text-yellow-900">
            News Unavailable
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800 mb-4">
            We're temporarily unable to fetch the latest Hurricane Melissa news
            from Jamaica. Please check back soon or visit the news outlets
            directly.
          </p>
          <Button onClick={fetchNews} variant="outline" size="sm">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Empty state (no articles found)
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">No Recent News Available</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Check back soon for the latest Hurricane Melissa news and relief
            updates from Jamaica.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Success state - render news items
  return (
    <div className={className}>
      {lastUpdated && (
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4" />
          <span>
            Last updated:{' '}
            {new Date(lastUpdated).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      )}

      <div
        className={
          featured
            ? ''
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {items.map((item) => (
          <Card
            key={item.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer ${
              featured ? 'lg:col-span-2' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="mb-2">
                <Badge variant="secondary" className="bg-primary text-white">
                  {item.source}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                {item.title}
              </h3>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {item.summary}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <time dateTime={new Date(item.publishedAt).toISOString()}>
                  {new Date(item.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="default"
                className="w-full bg-primary hover:bg-primary-hover text-white"
                onClick={() => window.open(item.url, '_blank')}
              >
                Read Full Article
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JamaicaNewsFeed;
