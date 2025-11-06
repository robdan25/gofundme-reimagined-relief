// Hybrid News Service - Uses RSS feeds as primary, Claude as fallback
// Prioritizes real-time RSS data from Jamaican news outlets

import { rssNewsAggregator, type RSSArticle } from './rssNewsAggregator';
import { claudeNewsAggregator, type AggregatedNewsArticle } from './claudeNewsAggregator';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedDate: string;
  imageUrl?: string;
  fetchMethod: 'rss' | 'claude'; // Track which method fetched the article
}

class HybridNewsService {
  private cache: { articles: NewsArticle[]; timestamp: number } | null = null;
  private cacheExpiry = 30 * 60 * 1000; // 30 minutes

  /**
   * Fetch Hurricane Melissa news using hybrid approach
   * Primary: RSS feeds
   * Fallback: Claude aggregator
   */
  async fetchNews(limit = 10): Promise<NewsArticle[]> {
    // Return cached results if still fresh
    if (this.cache && Date.now() - this.cache.timestamp < this.cacheExpiry) {
      console.log('📦 [Hybrid News] Returning cached news (fresh)');
      return this.cache.articles.slice(0, limit);
    }

    const articles: NewsArticle[] = [];
    const startTime = Date.now();

    try {
      // Step 1: Try RSS feeds first (primary method)
      console.log('🔄 [Hybrid News] Fetching news from RSS feeds (5 sec timeout)...');
      const rssArticles = await rssNewsAggregator.fetchHurricaneMelissaNews(
        limit
      );

      if (rssArticles.length > 0) {
        console.log(`✅ [Hybrid News] Got ${rssArticles.length} articles from RSS feeds`);
        articles.push(
          ...rssArticles.map((article) => ({
            ...article,
            fetchMethod: 'rss' as const,
          }))
        );
      } else {
        console.log(
          '⚠️ [Hybrid News] No RSS articles found (CORS blocked or timeout), falling back to Claude...'
        );
      }

      // Step 2: If RSS didn't return enough articles, supplement with Claude
      if (articles.length < limit) {
        const needed = limit - articles.length;
        console.log(
          `🤖 [Hybrid News] Fetching ${needed} additional articles from Claude API...`
        );

        try {
          const claudeArticles =
            await claudeNewsAggregator.fetchHurricaneMelissaNews(needed);

          // Convert Claude articles to our format and avoid duplicates
          const existingUrls = new Set(articles.map((a) => a.url));
          const newClaudeArticles = claudeArticles
            .filter((a) => !existingUrls.has(a.url))
            .map((article) => ({
              ...article,
              fetchMethod: 'claude' as const,
            }));

          articles.push(...newClaudeArticles);
          console.log(
            `✅ [Hybrid News] Added ${newClaudeArticles.length} articles from Claude`
          );
        } catch (error) {
          console.error('⚠️ [Hybrid News] Claude API failed:', error);
          // Continue with what we have from RSS
        }
      }

      // Step 3: Sort by date and limit
      const sorted = articles
        .sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        )
        .slice(0, limit);

      // Cache results
      this.cache = {
        articles: sorted,
        timestamp: Date.now(),
      };

      const elapsed = Date.now() - startTime;
      const rssCount = sorted.filter((a) => a.fetchMethod === 'rss').length;
      const claudeCount = sorted.filter((a) => a.fetchMethod === 'claude').length;

      console.log(
        `📰 [Hybrid News] Complete! ${sorted.length} articles (${rssCount} RSS, ${claudeCount} Claude) in ${elapsed}ms`
      );

      return sorted;
    } catch (error) {
      console.error('[Hybrid News] Fatal error:', error);

      // If everything fails, return cached articles if available
      if (this.cache) {
        console.log('📦 [Hybrid News] Returning stale cache as fallback');
        return this.cache.articles.slice(0, limit);
      }

      return [];
    }
  }

  /**
   * Clear cache (useful for manual refresh)
   */
  clearCache(): void {
    this.cache = null;
    console.log('🗑️ News cache cleared');
  }

  /**
   * Get cache status
   */
  getCacheStatus(): {
    isCached: boolean;
    age: number | null;
    fresh: boolean;
  } {
    if (!this.cache) {
      return { isCached: false, age: null, fresh: false };
    }

    const age = Date.now() - this.cache.timestamp;
    return {
      isCached: true,
      age,
      fresh: age < this.cacheExpiry,
    };
  }
}

export const hybridNewsService = new HybridNewsService();
