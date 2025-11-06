// Scheduled News Poster - Automatically fetches and posts Hurricane Melissa news
// Uses Claude to aggregate news from Jamaican outlets at specified intervals

import { claudeNewsAggregator, type AggregatedNewsArticle } from './claudeNewsAggregator';
import { timezoneService } from './timezoneService';

export interface ScheduledNewsConfig {
  enabled: boolean;
  intervalHours: number; // How often to post (in hours): 6, 12, 24, etc.
  maxArticlesPerPost: number; // How many articles to fetch each time
  autoStartOnPageLoad: boolean; // Start scheduler when page loads
}

class ScheduledNewsPoster {
  private intervalId: NodeJS.Timeout | null = null;
  private lastPostTime: Date | null = null;
  private config: ScheduledNewsConfig = {
    enabled: true,
    intervalHours: 6, // Default: every 6 hours (4x per day)
    maxArticlesPerPost: 6,
    autoStartOnPageLoad: true,
  };

  /**
   * Initialize scheduled news posting
   */
  init(config?: Partial<ScheduledNewsConfig>): void {
    if (config) {
      this.config = { ...this.config, ...config };
    }

    if (this.config.enabled && this.config.autoStartOnPageLoad) {
      this.start();
    }
  }

  /**
   * Start the news posting scheduler
   */
  start(): void {
    if (this.intervalId) {
      console.warn('Scheduler already running');
      return;
    }

    if (!claudeNewsAggregator.isConfigured()) {
      console.warn('Claude API not configured. News scheduler disabled.');
      return;
    }

    console.log(`🔄 Starting news scheduler - every ${this.config.intervalHours} hours (${24 / this.config.intervalHours} posts per day)`);

    // Post news immediately
    this.postNews();

    // Then set up interval
    const intervalMs = this.config.intervalHours * 60 * 60 * 1000;
    this.intervalId = setInterval(() => {
      this.postNews();
    }, intervalMs);
  }

  /**
   * Stop the news posting scheduler
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('News scheduler stopped');
    }
  }

  /**
   * Post news immediately (manual trigger)
   */
  async postNews(): Promise<void> {
    try {
      console.log('Fetching Hurricane Melissa news from Jamaican sources...');

      // Fetch articles from Claude
      const articles = await claudeNewsAggregator.fetchHurricaneMelissaNews(
        this.config.maxArticlesPerPost
      );

      if (articles.length === 0) {
        console.log('No new articles found');
        return;
      }

      // Save to news data
      await this.saveToNewsData(articles);

      // Update last post time
      this.lastPostTime = new Date();

      console.log(`✅ Posted ${articles.length} Hurricane Melissa news articles at ${this.lastPostTime.toLocaleString('en-JM')} Jamaica Time`);
    } catch (error) {
      console.error('Failed to post news:', error);
    }
  }

  /**
   * Save articles to news-data.json (would need backend endpoint)
   */
  private async saveToNewsData(articles: AggregatedNewsArticle[]): Promise<void> {
    try {
      // In a real scenario, this would call a backend API to save the articles
      // For now, it stores in localStorage as a demonstration

      const existingData = localStorage.getItem('news-feed-updates');
      const updates = existingData ? JSON.parse(existingData) : { articles: [], lastUpdated: null };

      // Add new articles (avoiding duplicates by ID)
      const existingIds = new Set(updates.articles.map((a: any) => a.id));
      const newArticles = articles.filter((a) => !existingIds.has(a.id));

      updates.articles = [...newArticles, ...updates.articles].slice(0, 50); // Keep last 50
      updates.lastUpdated = new Date().toISOString();

      localStorage.setItem('news-feed-updates', JSON.stringify(updates));

      console.log(`Saved ${newArticles.length} articles to local storage`);
    } catch (error) {
      console.error('Failed to save articles:', error);
    }
  }

  /**
   * Get configuration
   */
  getConfig(): ScheduledNewsConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  setConfig(config: Partial<ScheduledNewsConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('Configuration updated:', this.config);
  }

  /**
   * Get last post time
   */
  getLastPostTime(): Date | null {
    return this.lastPostTime;
  }

  /**
   * Get time until next post
   */
  getTimeUntilNextPost(): string {
    if (!this.lastPostTime) {
      return 'Next post: Soon (scheduler just started)';
    }

    const nextPostTime = new Date(
      this.lastPostTime.getTime() + this.config.intervalHours * 60 * 60 * 1000
    );
    const now = new Date();
    const msUntilNext = nextPostTime.getTime() - now.getTime();

    if (msUntilNext < 0) {
      return 'Next post: Due (fetching now)';
    }

    const hours = Math.floor(msUntilNext / (60 * 60 * 1000));
    const minutes = Math.floor((msUntilNext % (60 * 60 * 1000)) / (60 * 1000));

    return `Next post in: ${hours}h ${minutes}m`;
  }

  /**
   * Get scheduler status
   */
  getStatus(): {
    running: boolean;
    lastPost: Date | null;
    nextPostIn: string;
    config: ScheduledNewsConfig;
  } {
    return {
      running: this.intervalId !== null,
      lastPost: this.lastPostTime,
      nextPostIn: this.getTimeUntilNextPost(),
      config: this.getConfig(),
    };
  }
}

export const scheduledNewsPoster = new ScheduledNewsPoster();
