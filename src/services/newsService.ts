// News Service - Fetches and caches Hurricane Melissa news articles
// Uses hybrid approach: RSS feeds primary, Claude aggregator as fallback
// All timestamps use Jamaica timezone (EST/UTC-5)

import { hybridNewsService } from './hybridNewsService';
import { timezoneService } from './timezoneService';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedDate: Date;
  featured?: boolean;
  fetchMethod?: 'rss' | 'claude';
}

export interface NewsResponse {
  articles: NewsArticle[];
  lastUpdated: Date;
}

const CACHE_KEY = 'hurricane_melissa_news';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes for fast updates
const NEWS_DATA_URL = '/news-data.json';

class NewsService {
  /**
   * Fetch news articles using hybrid service (RSS + Claude)
   * Falls back to cached data if fetch fails
   */
  async fetchNews(): Promise<NewsArticle[]> {
    try {
      const cached = this.getFromCache();
      if (cached && this.isCacheValid()) {
        console.log('📦 [NewsService] Returning fresh cached news');
        return cached;
      }

      console.log('🔄 [NewsService] Fetching fresh news from hybrid service...');

      // Use hybrid service to fetch news (RSS primary, Claude fallback)
      // Set a timeout - if hybrid service takes too long, use cache
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => {
          console.warn('⏱️ [NewsService] Fetch timeout - using cached data');
          resolve(null);
        }, 15000); // 15 second timeout
      });

      const fetchPromise = hybridNewsService.fetchNews(10);
      const result = await Promise.race([fetchPromise, timeoutPromise]);

      if (!result || result.length === 0) {
        throw new Error('No articles returned from hybrid service');
      }

      // Convert to NewsArticle format with proper dates
      const articles: NewsArticle[] = result.map((article) => ({
        ...article,
        publishedDate: new Date(article.publishedDate),
      }));

      // Cache the fresh data
      this.saveToCache(articles);
      console.log(`✅ [NewsService] Successfully fetched and cached ${articles.length} articles`);

      return articles;
    } catch (error) {
      console.error('❌ [NewsService] Error fetching news:', error instanceof Error ? error.message : 'Unknown error');

      // Return cached data even if stale (better than nothing)
      const cached = this.getFromCache();
      if (cached && cached.length > 0) {
        console.log(`📦 [NewsService] Returning stale cached data (${cached.length} articles)`);
        return cached;
      }

      // Return fallback articles only as last resort
      console.log('⚠️ [NewsService] No cache available, returning fallback');
      return this.getFallbackArticles();
    }
  }

  /**
   * Get featured news article (first one)
   */
  async getFeaturedArticle(): Promise<NewsArticle | null> {
    const articles = await this.fetchNews();
    return articles.length > 0 ? articles[0] : null;
  }

  /**
   * Get recent articles excluding featured
   */
  async getRecentArticles(limit: number = 6): Promise<NewsArticle[]> {
    const articles = await this.fetchNews();
    return articles.slice(1, limit + 1);
  }

  /**
   * Cache management
   */
  private saveToCache(articles: NewsArticle[]): void {
    try {
      const data: NewsResponse = {
        articles,
        lastUpdated: new Date(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to cache news:', error);
    }
  }

  private getFromCache(): NewsArticle[] | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data: NewsResponse = JSON.parse(cached);
      return data.articles || null;
    } catch (error) {
      console.warn('Failed to read from cache:', error);
      return null;
    }
  }

  private isCacheValid(): boolean {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return false;

      const data: NewsResponse = JSON.parse(cached);
      const lastUpdated = new Date(data.lastUpdated);
      const now = new Date();

      return now.getTime() - lastUpdated.getTime() < CACHE_DURATION;
    } catch {
      return false;
    }
  }

  /**
   * Fallback articles when API is unavailable
   */
  private getFallbackArticles(): NewsArticle[] {
    return [
      {
        id: 'fallback-1',
        title: 'Loading Hurricane Melissa News...',
        description: 'Please check back soon for the latest updates on Hurricane Melissa relief efforts in Jamaica.',
        source: 'Jamaica News',
        url: '#',
        publishedDate: new Date(),
        featured: true,
      },
    ];
  }

  /**
   * Clear cache manually
   */
  clearCache(): void {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

export const newsService = new NewsService();
