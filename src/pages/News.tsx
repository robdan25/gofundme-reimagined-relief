import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, RefreshCw } from 'lucide-react';
import { newsService, NewsArticle } from '@/services/newsService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedArticles = await newsService.fetchNews();
      setArticles(fetchedArticles);
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load news'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();

    // Refresh every 15 minutes
    const interval = setInterval(loadNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1);

  return (
    <>
      <Helmet>
        <title>Hurricane Melissa News - Latest Updates | Unbiased Relief</title>
        <meta
          name="description"
          content="Get the latest news and updates about Hurricane Melissa in Jamaica. Real-time coverage from major Jamaican news outlets."
        />
        <meta
          property="og:title"
          content="Hurricane Melissa News - Latest Updates"
        />
        <meta
          property="og:description"
          content="Real-time news coverage of Hurricane Melissa relief efforts in Jamaica."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unbiasedrelief.org/news" />
        <link rel="canonical" href="https://unbiasedrelief.org/news" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hurricane Melissa News
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real-time coverage of Hurricane Melissa relief efforts from major
              Jamaican news outlets. Updated every 15 minutes.
            </p>

            {lastUpdated && (
              <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4" />
                <span>
                  Last updated:{' '}
                  {lastUpdated.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short',
                  })}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {loading && articles.length === 0 && (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
            )}

            {error && articles.length === 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-yellow-900">
                    Unable to Load News
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-800 mb-4">{error}</p>
                  <Button onClick={loadNews} variant="outline">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {articles.length > 0 && (
              <div className="space-y-8">
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">
                      Featured Story
                    </h2>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        {featuredArticle.imageUrl && (
                          <div className="h-80 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={featuredArticle.imageUrl}
                              alt={featuredArticle.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex flex-col justify-between">
                          <div>
                            <Badge className="mb-4 bg-primary">
                              {featuredArticle.source}
                            </Badge>
                            <h3 className="text-3xl font-bold mb-4 text-foreground leading-tight">
                              {featuredArticle.title}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-6">
                              {featuredArticle.description}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                              <Calendar className="w-4 h-4" />
                              <time
                                dateTime={new Date(
                                  featuredArticle.publishedDate
                                ).toISOString()}
                              >
                                {new Date(
                                  featuredArticle.publishedDate
                                ).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>

                            <Button
                              className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white"
                              asChild
                            >
                              <a
                                href={featuredArticle.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                Read Full Article
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Recent Articles */}
                {recentArticles.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-foreground">
                      Recent News
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recentArticles.map((article) => (
                        <Card
                          key={article.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                        >
                          {article.imageUrl && (
                            <div className="relative w-full h-48 overflow-hidden bg-muted">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 left-3">
                                <Badge
                                  variant="secondary"
                                  className="bg-primary text-white"
                                >
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
                              <time
                                dateTime={new Date(
                                  article.publishedDate
                                ).toISOString()}
                              >
                                {new Date(
                                  article.publishedDate
                                ).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>
                          </CardContent>

                          <CardContent>
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
                                Read More
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {articles.length === 0 && !loading && !error && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">No Articles Found</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check back soon for the latest Hurricane Melissa news from
                    Jamaica.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default News;
