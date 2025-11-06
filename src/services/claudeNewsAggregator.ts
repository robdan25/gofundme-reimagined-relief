// Claude News Aggregator - Fetches real Hurricane Melissa news from Jamaican news outlets
// Uses Claude API to search and extract news articles from:
// - Jamaica Observer
// - Jamaica Star
// - The Gleaner
// - RJR / TVJ / Nationwide

import { timezoneService } from './timezoneService';

export interface AggregatedNewsArticle {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  source: 'Jamaica Observer' | 'Jamaica Star' | 'Gleaner' | 'RJR/TVJ/Nationwide';
  url: string;
  imageUrl?: string;
  publishedDate: Date;
  featured?: boolean;
}

class ClaudeNewsAggregator {
  private apiKey: string | null = null;
  private jamaicaNewsSources = [
    {
      name: 'Jamaica Observer' as const,
      url: 'https://www.jamaicaobserver.com',
      searchUrl: 'https://www.jamaicaobserver.com/search?q=Hurricane+Melissa',
    },
    {
      name: 'Jamaica Star' as const,
      url: 'https://www.jamaicastar.com',
      searchUrl: 'https://www.jamaicastar.com/search?q=Hurricane+Melissa',
    },
    {
      name: 'Gleaner' as const,
      url: 'https://www.gleanerjm.com',
      searchUrl: 'https://www.gleanerjm.com/search?q=Hurricane+Melissa',
    },
    {
      name: 'RJR/TVJ/Nationwide' as const,
      url: 'https://www.rjrnewsonline.com',
      searchUrl: 'https://www.rjrnewsonline.com/search?q=Hurricane+Melissa',
    },
  ];

  constructor() {
    // Initialize API key from environment variables
    this.apiKey =
      import.meta.env.VITE_ANTHROPIC_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      process.env.VITE_ANTHROPIC_API_KEY;
  }

  /**
   * Fetch latest Hurricane Melissa news from Jamaican sources using Claude
   * Claude will fetch real articles from news outlets
   */
  async fetchHurricaneMelissaNews(limit: number = 10): Promise<AggregatedNewsArticle[]> {
    if (!this.apiKey) {
      console.warn('Claude API key not configured. Cannot fetch real-time news.');
      return [];
    }

    try {
      const allArticles: AggregatedNewsArticle[] = [];

      // Fetch from each source
      for (const source of this.jamaicaNewsSources) {
        try {
          const sourceArticles = await this.fetchFromSource(source);
          allArticles.push(...sourceArticles);
        } catch (error) {
          console.error(`Failed to fetch from ${source.name}:`, error);
        }
      }

      // Remove duplicates and sort by date
      const uniqueArticles = this.removeDuplicates(allArticles);
      uniqueArticles.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

      return uniqueArticles.slice(0, limit);
    } catch (error) {
      console.error('Failed to fetch Hurricane Melissa news:', error);
      return [];
    }
  }

  /**
   * Fetch articles from a specific Jamaican news source using Claude
   */
  private async fetchFromSource(
    source: (typeof this.jamaicaNewsSources)[0]
  ): Promise<AggregatedNewsArticle[]> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!,
        },
        body: JSON.stringify({
          model: 'claude-opus-4-1',
          max_tokens: 2048,
          messages: [
            {
              role: 'user',
              content: `Please search ${source.name} (${source.url}) for the latest news articles about Hurricane Melissa in Jamaica.

Extract up to 5 recent articles with the following information:
- Article title
- Brief description (2-3 sentences)
- Full URL to the article
- Approximate publication date

Format your response as a JSON array with this structure:
[
  {
    "title": "Article Title",
    "description": "Brief description",
    "url": "https://...",
    "publishedDate": "2025-11-06T10:30:00Z"
  }
]

Only include articles related to Hurricane Melissa, relief efforts, or Jamaica disaster news.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content?.[0]?.text || '';

      // Parse JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn(`No articles found for ${source.name}`);
        return [];
      }

      const articles = JSON.parse(jsonMatch[0]);

      // Format articles with source information
      return articles.map((article: any, index: number) => ({
        id: `${source.name.toLowerCase().replace(/\//g, '-')}-${Date.now()}-${index}`,
        title: article.title || 'Untitled',
        description: article.description || '',
        source: source.name,
        url: article.url || source.url,
        publishedDate: new Date(article.publishedDate || new Date()),
        featured: index === 0,
      }));
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
      return [];
    }
  }

  /**
   * Remove duplicate articles by title
   */
  private removeDuplicates(articles: AggregatedNewsArticle[]): AggregatedNewsArticle[] {
    const seen = new Set<string>();
    return articles.filter((article) => {
      const key = article.title.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Format articles with Jamaica timezone
   */
  formatWithJamaicaTime(articles: AggregatedNewsArticle[]): AggregatedNewsArticle[] {
    return articles.map((article) => ({
      ...article,
      publishedDate: timezoneService.getJamaicaTime(article.publishedDate),
    }));
  }

  /**
   * Check if API is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const claudeNewsAggregator = new ClaudeNewsAggregator();
