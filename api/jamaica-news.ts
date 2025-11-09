// Vercel Serverless Function: Jamaica News via RSS Feeds
// Fetches real Hurricane Melissa news from reputable Jamaican news outlets
// No CORS issues because fetching happens server-side only

import { VercelRequest, VercelResponse } from "@vercel/node";

export interface JamaicaNewsItem {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
}

interface NewsResponse {
  items: JamaicaNewsItem[];
  lastUpdated: string;
  cached: boolean;
  sourceCount: number;
}

// In-memory cache
let cachedNews: JamaicaNewsItem[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Jamaica news outlets with RSS feeds
const RSS_FEEDS = [
  {
    source: "Jamaica Observer",
    url: "https://www.jamaicaobserver.com/category/news/feed/",
  },
  {
    source: "Jamaica Gleaner",
    url: "https://jamaica-gleaner.com/feed",
  },
  {
    source: "Jamaica Star",
    url: "https://www.jamaicastar.com/feed",
  },
  {
    source: "RJR News",
    url: "https://radiojamaicanewsonline.com/feed",
  },
  {
    source: "TVJ News",
    url: "https://www.televisionjamaica.com/",
  },
];

/**
 * Parse RSS XML feed and extract articles related to Hurricane Melissa
 */
async function fetchAndParseRSSFeed(
  source: string,
  feedUrl: string,
  limit: number = 20
): Promise<JamaicaNewsItem[]> {
  const articles: JamaicaNewsItem[] = [];

  try {
    console.log(`[RSS] Fetching ${source} from ${feedUrl}`);

    const response = await fetch(feedUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; UnbiasedRelief/1.0; +https://unbiasedrelief.org)",
      },
    });

    if (!response.ok) {
      console.warn(
        `[RSS] ${source} returned status ${response.status}, skipping`
      );
      return [];
    }

    const xml = await response.text();

    // Simple XML parsing - extract items between <item> tags
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(xml)) && articles.length < limit) {
      const itemXml = itemMatch[1];

      // Extract fields
      const titleMatch = /<title[^>]*>\s*([\s\S]*?)\s*<\/title>/i.exec(
        itemXml
      );
      const linkMatch = /<link[^>]*>\s*([\s\S]*?)\s*<\/link>/i.exec(itemXml);
      const descMatch =
        /<description[^>]*>\s*([\s\S]*?)\s*<\/description>/i.exec(itemXml);
      const pubDateMatch = /<pubDate[^>]*>\s*([\s\S]*?)\s*<\/pubDate>/i.exec(
        itemXml
      );

      const title = titleMatch
        ? titleMatch[1]
            .replace(/<[^>]*>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .trim()
        : "";

      const url = linkMatch
        ? linkMatch[1].trim()
        : "";

      const summary = descMatch
        ? descMatch[1]
            .replace(/<[^>]*>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .substring(0, 200)
            .trim()
        : "";

      const publishedAt = pubDateMatch
        ? pubDateMatch[1].trim()
        : new Date().toISOString();

      // Filter for Hurricane Melissa related articles
      const isRelevant =
        title.toLowerCase().includes("melissa") ||
        title.toLowerCase().includes("tropical storm melissa") ||
        title.toLowerCase().includes("hurricane") ||
        summary.toLowerCase().includes("melissa") ||
        summary.toLowerCase().includes("tropical storm melissa");

      if (isRelevant && title && url) {
        articles.push({
          id: `${source}-${Date.now()}-${articles.length}`,
          source,
          title,
          url,
          publishedAt: new Date(publishedAt).toISOString(),
          summary,
        });
      }
    }

    console.log(
      `[RSS] Successfully parsed ${source}: found ${articles.length} Melissa-related articles`
    );
    return articles;
  } catch (error) {
    console.error(
      `[RSS] Error fetching ${source}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return [];
  }
}

/**
 * Fetch news from all RSS feeds in parallel
 */
async function fetchAllRSSFeeds(): Promise<JamaicaNewsItem[]> {
  try {
    console.log("[RSS] Starting multi-feed fetch from", RSS_FEEDS.length, "sources");

    const startTime = Date.now();

    // Fetch from all sources in parallel with timeout
    const feedPromises = RSS_FEEDS.map((feed) =>
      Promise.race([
        fetchAndParseRSSFeed(feed.source, feed.url, 20),
        new Promise<JamaicaNewsItem[]>((resolve) =>
          setTimeout(() => {
            console.warn(`[RSS] Timeout for ${feed.source}`);
            resolve([]);
          }, 5000)
        ),
      ])
    );

    const results = await Promise.all(feedPromises);

    // Combine all articles
    let allArticles: JamaicaNewsItem[] = [];
    const sourceCount = results.filter((r) => r.length > 0).length;

    for (const articles of results) {
      allArticles = allArticles.concat(articles);
    }

    // Remove duplicates (same URL)
    const seenUrls = new Set<string>();
    const uniqueArticles = allArticles.filter((article) => {
      if (seenUrls.has(article.url)) return false;
      seenUrls.add(article.url);
      return true;
    });

    // Sort by date (newest first)
    uniqueArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Return top 10
    const topArticles = uniqueArticles.slice(0, 10);

    const elapsed = Date.now() - startTime;
    console.log(
      `[RSS] Complete! ${topArticles.length} articles from ${sourceCount} sources in ${elapsed}ms`
    );

    return topArticles;
  } catch (error) {
    console.error(
      "[RSS] Fatal error fetching all feeds:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return [];
  }
}

/**
 * Main handler
 */
export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  console.log("=== API /jamaica-news called ===");

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Check cache
    const isCached =
      cachedNews &&
      lastFetchTime &&
      Date.now() - lastFetchTime < CACHE_DURATION;

    let articles: JamaicaNewsItem[] = [];
    let sourceCount = 0;

    if (isCached && cachedNews) {
      console.log("[API] Returning cached news");
      articles = cachedNews;
      sourceCount = new Set(articles.map((a) => a.source)).size;
    } else {
      console.log("[API] Fetching fresh news from RSS feeds");
      articles = await fetchAllRSSFeeds();
      sourceCount = new Set(articles.map((a) => a.source)).size;

      if (articles.length > 0) {
        console.log("[API] News fetched successfully, caching");
        cachedNews = articles;
        lastFetchTime = Date.now();
      } else {
        console.log("[API] No articles fetched, returning empty array");
      }
    }

    console.log(
      `[API] Returning ${articles.length} articles from ${sourceCount} sources`
    );

    res.status(200).json({
      items: articles,
      lastUpdated: new Date().toISOString(),
      cached: isCached,
      sourceCount,
    } as NewsResponse);
  } catch (error) {
    console.error(
      "[API] Unhandled error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    res.status(200).json({
      items: [],
      lastUpdated: new Date().toISOString(),
      cached: false,
      sourceCount: 0,
    } as NewsResponse);
  }
};
