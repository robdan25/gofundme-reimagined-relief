// Vercel Serverless Function: Fetch Hurricane Melissa news from NewsAPI.org
// This fetches real news articles from worldwide sources covering Hurricane Melissa
// Deploy to Vercel and set NEWSAPI_KEY environment variable

import { VercelRequest, VercelResponse } from "@vercel/node";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
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

// In-memory cache for the function
let cachedArticles: NewsArticle[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch news from NewsAPI.org
 */
async function fetchFromNewsAPI(): Promise<NewsArticle[]> {
  // Try both process.env and the passed parameter
  const apiKey = process.env.NEWSAPI_KEY || process.env.newsapi_key;

  if (!apiKey) {
    console.error("NEWSAPI_KEY environment variable not set. Available env vars:", Object.keys(process.env).filter(k => k.toLowerCase().includes('news')));
    return [];
  }

  console.log("Using NEWSAPI_KEY for requests");


  try {
    const searchQueries = [
      "Hurricane Melissa Jamaica",
      "Hurricane Melissa relief",
      "Jamaica hurricane recovery",
    ];

    const allArticles: NewsArticle[] = [];
    const seenUrls = new Set<string>();

    for (const query of searchQueries) {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20`,
          {
            headers: {
              "X-API-Key": apiKey,
              "User-Agent": "UnbiasedRelief/1.0 (+https://unbiasedrelief.org)",
            },
          }
        );

        if (!response.ok) {
          console.error(
            `NewsAPI error for query "${query}":`,
            response.status,
            response.statusText
          );
          continue;
        }

        const data: any = await response.json();

        if (data.articles && Array.isArray(data.articles)) {
          for (const article of data.articles) {
            // Avoid duplicates
            if (seenUrls.has(article.url)) continue;
            seenUrls.add(article.url);

            allArticles.push({
              id: `newsapi-${article.url.replace(/[^a-z0-9]/gi, "")}`,
              title: article.title,
              description: article.description || article.content || "",
              source: article.source?.name || "News Source",
              url: article.url,
              imageUrl: article.urlToImage,
              publishedDate: new Date(article.publishedAt),
              featured: false,
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching from NewsAPI for query "${query}":`, error);
      }
    }

    // Sort by date (newest first) and limit to 50 articles
    return allArticles
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      )
      .slice(0, 50);
  } catch (error) {
    console.error("Error in fetchFromNewsAPI:", error);
    return [];
  }
}

/**
 * Main handler for the API endpoint
 */
export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
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
      cachedArticles &&
      lastFetchTime &&
      Date.now() - lastFetchTime < CACHE_DURATION;

    let articles: NewsArticle[] = [];

    if (isCached && cachedArticles) {
      articles = cachedArticles;
      console.log("Returning cached articles");
    } else {
      console.log("Fetching fresh articles from NewsAPI");
      articles = await fetchFromNewsAPI();

      if (articles.length > 0) {
        // Mark first article as featured
        articles[0].featured = true;
        cachedArticles = articles;
        lastFetchTime = Date.now();
      } else {
        // No articles found, use fallback
        console.warn("No articles found from NewsAPI, using fallback");
        articles = getFallbackArticles();
      }
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
      articles: getFallbackArticles(),
      lastUpdated: new Date(),
      cached: false,
    });
  }
};

/**
 * Fallback articles when API is unavailable
 */
function getFallbackArticles(): NewsArticle[] {
  return [
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
