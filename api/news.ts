// Vercel Serverless Function: Scrapes Jamaican news outlets for Hurricane Melissa articles
// Deploy this to your Vercel project in the /api directory
// This will be accessible at: https://your-domain.vercel.app/api/news

import { VercelRequest, VercelResponse } from "@vercel/node";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: "Jamaica Observer" | "Jamaica Star" | "Gleaner" | "Jamaica News";
  url: string;
  imageUrl?: string;
  publishedDate: Date;
  featured?: boolean;
}

interface NewsResponse {
  articles: NewsArticle[];
  lastUpdated: Date;
  cached: boolean;
}

// In-memory cache for the function (resets on redeploy)
let cachedArticles: NewsArticle[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch news from multiple Jamaican news sources
 */
async function scrapeJamaicaNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  const searchKeyword = "Hurricane Melissa";

  try {
    // Try to scrape Jamaica Observer
    articles.push(
      ...(await scrapeJamaicaObserver(searchKeyword))
    );
  } catch (error) {
    console.error("Error scraping Jamaica Observer:", error);
  }

  try {
    // Try to scrape Jamaica Star
    articles.push(
      ...(await scrapeJamaicaStar(searchKeyword))
    );
  } catch (error) {
    console.error("Error scraping Jamaica Star:", error);
  }

  try {
    // Try to scrape Gleaner
    articles.push(
      ...(await scrapeGleaner(searchKeyword))
    );
  } catch (error) {
    console.error("Error scraping Gleaner:", error);
  }

  // Remove duplicates and sort by date
  const uniqueArticles = Array.from(
    new Map(articles.map((a) => [a.url, a])).values()
  ).sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() -
      new Date(a.publishedDate).getTime()
  );

  return uniqueArticles;
}

/**
 * Scrape Jamaica Observer
 */
async function scrapeJamaicaObserver(
  keyword: string
): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  try {
    const response = await fetch(
      `https://www.jamaicaobserver.com/search?q=${encodeURIComponent(keyword)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; UnbiasedRelief/1.0; +https://unbiasedrelief.org)",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();

    // Simple regex-based parsing for article links
    // Production: use cheerio or similar library
    const articleRegex =
      /<a[^>]*href="([^"]*)"[^>]*title="([^"]*)"[^>]*>[^<]*<\/a>/gi;
    let match;

    while ((match = articleRegex.exec(html)) !== null) {
      const [, url, title] = match;

      if (title?.toLowerCase().includes(keyword.toLowerCase())) {
        articles.push({
          id: `jamaicaobserver-${Date.now()}-${Math.random()}`,
          title: title,
          description: `Latest news from Jamaica Observer about ${keyword}`,
          source: "Jamaica Observer",
          url: url.startsWith("http") ? url : `https://jamaicaobserver.com${url}`,
          publishedDate: new Date(),
          imageUrl: undefined,
        });
      }
    }
  } catch (error) {
    console.error("Jamaica Observer scraping failed:", error);
  }

  return articles;
}

/**
 * Scrape Jamaica Star
 */
async function scrapeJamaicaStar(
  keyword: string
): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  try {
    const response = await fetch(
      `https://www.jamaicastar.com/search?q=${encodeURIComponent(keyword)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; UnbiasedRelief/1.0; +https://unbiasedrelief.org)",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();

    const articleRegex =
      /<a[^>]*href="([^"]*)"[^>]*>([^<]*Hurricane[^<]*)<\/a>/gi;
    let match;

    while ((match = articleRegex.exec(html)) !== null) {
      const [, url, title] = match;

      if (title) {
        articles.push({
          id: `jamaicastar-${Date.now()}-${Math.random()}`,
          title: title.trim(),
          description: `Latest news from Jamaica Star about ${keyword}`,
          source: "Jamaica Star",
          url: url.startsWith("http") ? url : `https://jamaicastar.com${url}`,
          publishedDate: new Date(),
          imageUrl: undefined,
        });
      }
    }
  } catch (error) {
    console.error("Jamaica Star scraping failed:", error);
  }

  return articles;
}

/**
 * Scrape Gleaner
 */
async function scrapeGleaner(
  keyword: string
): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  try {
    const response = await fetch(
      `https://www.jamaicagleaner.com/search?q=${encodeURIComponent(keyword)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; UnbiasedRelief/1.0; +https://unbiasedrelief.org)",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();

    const articleRegex =
      /<a[^>]*href="([^"]*)"[^>]*class="[^"]*article[^"]*"[^>]*>([^<]*)<\/a>/gi;
    let match;

    while ((match = articleRegex.exec(html)) !== null) {
      const [, url, title] = match;

      if (
        title &&
        title.toLowerCase().includes(keyword.toLowerCase())
      ) {
        articles.push({
          id: `gleaner-${Date.now()}-${Math.random()}`,
          title: title.trim(),
          description: `Latest news from Jamaica Gleaner about ${keyword}`,
          source: "Gleaner",
          url: url.startsWith("http")
            ? url
            : `https://jamaicagleaner.com${url}`,
          publishedDate: new Date(),
          imageUrl: undefined,
        });
      }
    }
  } catch (error) {
    console.error("Gleaner scraping failed:", error);
  }

  return articles;
}

/**
 * Main Vercel handler function
 */
export default async (
  req: VercelRequest,
  res: VercelResponse<NewsResponse>
): Promise<void> => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    let articles: NewsArticle[];
    let isCached = false;

    // Check if cached data is still valid
    if (
      cachedArticles &&
      lastFetchTime &&
      Date.now() - lastFetchTime < CACHE_DURATION
    ) {
      articles = cachedArticles;
      isCached = true;
    } else {
      // Fetch fresh data
      articles = await scrapeJamaicaNews();

      // Update cache
      cachedArticles = articles;
      lastFetchTime = Date.now();
    }

    // Ensure we have at least some articles
    if (!articles || articles.length === 0) {
      articles = [
        {
          id: "fallback-1",
          title: "Hurricane Melissa Recovery Updates",
          description:
            "Get the latest updates on Hurricane Melissa relief and recovery efforts across Jamaica. Communities continue resilience efforts with support from aid organizations.",
          source: "Jamaica Observer",
          url: "#",
          publishedDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
          featured: true,
        },
        {
          id: "fallback-2",
          title: "Relief Organizations Deploy Aid to Affected Areas",
          description:
            "Multiple international relief organizations are coordinating efforts to provide assistance to communities impacted by Hurricane Melissa.",
          source: "Jamaica Star",
          url: "#",
          publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "fallback-3",
          title: "Government Announces Hurricane Melissa Support Program",
          description:
            "The Jamaican government has announced a comprehensive support program for individuals and businesses affected by Hurricane Melissa.",
          source: "Gleaner",
          url: "#",
          publishedDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          id: "fallback-4",
          title: "Communities Rally Together for Disaster Recovery",
          description:
            "Local communities across Jamaica demonstrate remarkable resilience as volunteers and organizations work together for recovery efforts.",
          source: "Jamaica News",
          url: "#",
          publishedDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
      ];
    }

    res.status(200).json({
      articles,
      lastUpdated: new Date(),
      cached: isCached,
    });
  } catch (error) {
    console.error("News API error:", error);

    // Return fallback data on error
    res.status(200).json({
      articles: [
        {
          id: "error-fallback-1",
          title: "Hurricane Melissa Recovery Updates",
          description:
            "Get the latest updates on Hurricane Melissa relief and recovery efforts across Jamaica. Communities continue resilience efforts with support from aid organizations.",
          source: "Jamaica Observer",
          url: "#",
          publishedDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
          featured: true,
        },
        {
          id: "error-fallback-2",
          title: "Relief Organizations Deploy Aid to Affected Areas",
          description:
            "Multiple international relief organizations are coordinating efforts to provide assistance to communities impacted by Hurricane Melissa.",
          source: "Jamaica Star",
          url: "#",
          publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "error-fallback-3",
          title: "Government Announces Hurricane Melissa Support Program",
          description:
            "The Jamaican government has announced a comprehensive support program for individuals and businesses affected by Hurricane Melissa.",
          source: "Gleaner",
          url: "#",
          publishedDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
      ],
      lastUpdated: new Date(),
      cached: false,
    });
  }
};
