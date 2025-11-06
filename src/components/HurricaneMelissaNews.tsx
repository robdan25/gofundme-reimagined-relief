import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { newsService, NewsArticle } from '@/services/newsService';
import ArticleModal from './ArticleModal';

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
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`📰 [HurricaneMelissaNews] Fetching ${limit} articles...`);

        let fetchedArticles: NewsArticle[];
        if (featured) {
          const featuredArticle = await newsService.getFeaturedArticle();
          fetchedArticles = featuredArticle ? [featuredArticle] : [];
        } else {
          fetchedArticles = await newsService.getRecentArticles(limit);
        }

        if (fetchedArticles && fetchedArticles.length > 0) {
          console.log(`✅ [HurricaneMelissaNews] Successfully loaded ${fetchedArticles.length} articles`);
          setArticles(fetchedArticles);
          setError(null);
        } else {
          console.warn(`⚠️ [HurricaneMelissaNews] No articles returned, retrying...`);
          // Retry once if no articles
          if (retryCount < 1) {
            setTimeout(() => setRetryCount(retryCount + 1), 2000);
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load news';
        console.error(`❌ [HurricaneMelissaNews] Error:`, errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 15 minutes for real-time updates
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit, featured, retryCount]);

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

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={featured ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
        {articles.map((article) => (
          <Card
            key={article.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer ${
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
                    {article.fetchMethod === 'rss' ? 'Jamaica News' : 'Unbiased Relief'}
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
                onClick={() => handleOpenArticle(article)}
              >
                Read Full Article
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HurricaneMelissaNews;
