// RSS News Aggregator - Fetches Hurricane Melissa news from Jamaican RSS feeds
// Uses CORS proxy to handle cross-origin requests from browser

export interface RSSArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedDate: string;
  imageUrl?: string;
}

interface RSSFeed {
  url: string;
  source: string;
  corsProxyUrl?: string; // Optional CORS proxy
}

class RSSNewsAggregator {
  // RSS feed URLs for Jamaican news outlets
  private feeds: RSSFeed[] = [
    {
      url: 'https://jamaica-gleaner.com/gleaner/rss.xml',
      source: 'Jamaica Gleaner',
    },
    {
      url: 'https://www.jamaicaobserver.com/category/news/feed/',
      source: 'Jamaica Observer',
    },
    {
      url: 'http://jamaica-star.com/feed/news.xml',
      source: 'Jamaica Star',
    },
    {
      url: 'https://radiojamaicanewsonline.com/category/local/feed/',
      source: 'RJR News',
    },
    {
      url: 'https://www.televisionjamaica.com/category/news/feed/',
      source: 'TVJ News',
    },
  ];

  // CORS proxy to use (can be configured)
  private corsProxy = 'https://cors-anywhere.herokuapp.com/';

  /**
   * Fetch and parse RSS feed with timeout
   */
  private async fetchAndParseRSS(feedUrl: string): Promise<RSSArticle[]> {
    try {
      // Set a timeout for RSS fetch (5 seconds max)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        // Try direct fetch first
        const response = await fetch(feedUrl, {
          signal: controller.signal,
          headers: {
            Accept: 'application/rss+xml, application/xml',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch RSS feed: ${response.status} ${response.statusText}`
          );
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');

        // Check for parsing errors
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
          throw new Error('Failed to parse RSS feed');
        }

        // Extract items from RSS feed
        const items = xmlDoc.querySelectorAll('item');
        const articles: RSSArticle[] = [];

        items.forEach((item, index) => {
          const titleEl = item.querySelector('title');
          const descriptionEl = item.querySelector('description');
          const linkEl = item.querySelector('link');
          const pubDateEl = item.querySelector('pubDate');
          const imageEl = item.querySelector('image') ||
            item.querySelector('media\\:content') ||
            item.querySelector('[url*="jpg"], [url*="png"]');

          const title = titleEl?.textContent || 'Untitled';
          const description = descriptionEl?.textContent || '';
          const url = linkEl?.textContent || '';
          const pubDate = pubDateEl?.textContent || new Date().toISOString();
          const imageUrl = imageEl?.getAttribute('url') || imageEl?.getAttribute('src');

          if (title && url) {
            articles.push({
              id: `rss-${Date.now()}-${index}`,
              title: this.stripHTML(title),
              description: this.stripHTML(description).slice(0, 200),
              url,
              source: '', // Will be set by caller
              publishedDate: new Date(pubDate).toISOString(),
              imageUrl: imageUrl || undefined,
            });
          }
        });

        return articles;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.warn(`⚠️ RSS feed timeout/error from ${feedUrl}:`, error instanceof Error ? error.message : 'Unknown error');
      return [];
    }
  }

  /**
   * Strip HTML tags from text
   */
  private stripHTML(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /**
   * Filter articles for Hurricane Melissa relevance
   */
  private filterForHurricaneMelissa(articles: RSSArticle[]): RSSArticle[] {
    const keywords = [
      'Hurricane Melissa',
      'Melissa',
      'storm',
      'hurricane',
      'disaster',
      'relief',
      'damage',
      'recovery',
      'Jamaica',
    ];

    return articles.filter((article) => {
      const text = (
        article.title +
        ' ' +
        article.description
      ).toLowerCase();
      return keywords.some((keyword) =>
        text.includes(keyword.toLowerCase())
      );
    });
  }

  /**
   * Fetch Hurricane Melissa news from all RSS feeds
   */
  async fetchHurricaneMelissaNews(limit = 10): Promise<RSSArticle[]> {
    console.log('Fetching Hurricane Melissa news from RSS feeds...');

    const allArticles: RSSArticle[] = [];

    // Fetch from all feeds in parallel
    const feedPromises = this.feeds.map(async (feed) => {
      const articles = await this.fetchAndParseRSS(feed.url);
      return articles.map((article) => ({
        ...article,
        source: feed.source,
      }));
    });

    const feedResults = await Promise.allSettled(feedPromises);

    // Collect articles from successful feeds
    feedResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    });

    // Filter for Hurricane Melissa relevance
    const relevantArticles = this.filterForHurricaneMelissa(allArticles);

    // Sort by date (newest first) and limit
    return relevantArticles
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      )
      .slice(0, limit);
  }

  /**
   * Get available RSS feeds
   */
  getFeeds(): RSSFeed[] {
    return this.feeds;
  }

  /**
   * Add custom RSS feed
   */
  addFeed(url: string, source: string): void {
    this.feeds.push({ url, source });
    console.log(`Added RSS feed: ${source} (${url})`);
  }

  /**
   * Set CORS proxy URL (if needed)
   */
  setCorsProxy(proxyUrl: string): void {
    this.corsProxy = proxyUrl;
    console.log(`CORS proxy updated to: ${proxyUrl}`);
  }
}

export const rssNewsAggregator = new RSSNewsAggregator();
