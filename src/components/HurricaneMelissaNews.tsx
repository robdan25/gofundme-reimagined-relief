import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar } from 'lucide-react';
import { newsService, NewsArticle } from '@/services/newsService';

interface HurricaneMelissaNewsProps {
  limit?: number;
  featured?: boolean;
}

export const HurricaneMelissaNews = ({
  limit = 3,
  featured = false,
}: HurricaneMelissaNewsProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedArticles: NewsArticle[];
        if (featured) {
          const featuredArticle = await newsService.getFeaturedArticle();
          fetchedArticles = featuredArticle ? [featuredArticle] : [];
        } else {
          fetchedArticles = await newsService.getRecentArticles(limit);
        }

        setArticles(fetchedArticles);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load news'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 15 minutes for real-time updates
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit, featured]);

  if (loading && articles.length === 0) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-4">
          {[...Array(featured ? 1 : Math.min(limit, 3))].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <h3 className="text-lg font-semibold text-yellow-900">
            News Update
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800">
            We're having trouble fetching the latest news. Please check back soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">No Articles Available</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Check back soon for the latest Hurricane Melissa news from Jamaica.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={featured ? '' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}>
      {articles.map((article) => (
        <Card
          key={article.id}
          className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col ${
            featured ? 'lg:col-span-2' : ''
          }`}
        >
          {article.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden bg-muted">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-primary text-white">
                  {article.source}
                </Badge>
              </div>
            </div>
          )}

          <CardHeader className={article.imageUrl ? '' : 'pb-2'}>
            <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
              {article.title}
            </h3>
          </CardHeader>

          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {article.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={new Date(article.publishedDate).toISOString()}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
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
              asChild
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Read Full Article
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HurricaneMelissaNews;
