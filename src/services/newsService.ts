// News Service - Fetches and caches Hurricane Melissa news articles
// Uses Jamaica timezone (EST/UTC-5) for all timestamps

import { timezoneService } from './timezoneService';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: 'Jamaica Observer' | 'Jamaica Star' | 'Gleaner' | 'Jamaica News';
  url: string;
  imageUrl?: string;
  publishedDate: Date;
  featured?: boolean;
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
   * Fetch news articles from static JSON file
   * Falls back to cached data if fetch fails
   */
  async fetchNews(): Promise<NewsArticle[]> {
    try {
      const cached = this.getFromCache();
      if (cached && this.isCacheValid()) {
        return cached;
      }

      const response = await fetch(NEWS_DATA_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch news data: ${response.status}`);
      }

      const data: any = await response.json();
      const articles = (data.articles || []).map((article: any) => ({
        ...article,
        publishedDate: new Date(article.publishedDate),
      }));

      // Cache the fresh data
      this.saveToCache(articles);

      return articles;
    } catch (error) {
      console.error('Failed to fetch news:', error);

      // Return cached data even if stale
      const cached = this.getFromCache();
      if (cached && cached.length > 0) {
        return cached;
      }

      // Return fallback articles
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
