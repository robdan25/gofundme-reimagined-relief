// Vercel Serverless Function: AI-Powered News Generation with Claude
// Generates intelligent, relevant Hurricane Melissa news articles using Claude AI

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

// In-memory cache
let cachedArticles: NewsArticle[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Generate news articles using Claude AI
 */
async function generateWithClaude(): Promise<NewsArticle[]> {
  const apiKey = process.env.CLAUDE_API_KEY;

  console.log("generateWithClaude called");
  console.log("API Key present:", !!apiKey);
  console.log("Available env keys:", Object.keys(process.env).filter(k => k.includes('CLAUDE') || k.includes('claude')));

  if (!apiKey) {
    console.error("CLAUDE_API_KEY environment variable not set");
    return [];
  }

  try {
    console.log("Calling Claude API with key starting with:", apiKey.substring(0, 20));

    const prompt = `Generate 4 news articles about Hurricane Melissa relief in Jamaica as a JSON array. Each article should have: title, description (2-3 sentences), source (Jamaica Observer, Jamaica Star, Gleaner, or Jamaica News), and url (use https://example.com/article-slug).

Return ONLY valid JSON array, no markdown or extra text:
[
  {
    "title": "Article Title",
    "description": "Description here",
    "source": "Jamaica Observer",
    "url": "https://example.com/article"
  },
  ...
]`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    console.log("Claude API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Claude API error ${response.status}:`, errorText);
      return [];
    }

    const data: any = await response.json();
    console.log("Claude response received");

    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error("Invalid Claude response structure");
      return [];
    }

    const text = data.content[0].text;
    console.log("Claude text response length:", text.length);
    console.log("First 500 chars:", text.substring(0, 500));

    // Extract JSON array from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("No JSON array found in response");
      return [];
    }

    const parsedArray = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsedArray)) {
      console.error("Parsed content is not an array");
      return [];
    }

    const articles: NewsArticle[] = parsedArray.slice(0, 4).map((item: any, index: number) => ({
      id: `claude-${Date.now()}-${index}`,
      title: item.title || "Untitled",
      description: item.description || "",
      source: item.source || "Jamaica News",
      url: item.url || "#",
      publishedDate: new Date(),
      featured: index === 0,
    }));

    console.log(`Successfully generated ${articles.length} articles`);
    return articles;
  } catch (error) {
    console.error("Error in generateWithClaude:", error);
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
  console.log("=== API /news called ===");

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
      console.log("Returning cached articles");
      articles = cachedArticles;
    } else {
      console.log("Generating fresh articles with Claude");
      articles = await generateWithClaude();

      if (articles.length > 0) {
        console.log("Articles generated successfully, caching them");
        cachedArticles = articles;
        lastFetchTime = Date.now();
      } else {
        console.log("No articles generated, using fallback");
        articles = getFallbackArticles();
      }
    }

    console.log(`Returning ${articles.length} articles`);

    res.status(200).json({
      articles,
      lastUpdated: new Date(),
      cached: isCached,
    });
  } catch (error) {
    console.error("=== Unhandled error in /news ===", error);

    res.status(200).json({
      articles: getFallbackArticles(),
      lastUpdated: new Date(),
      cached: false,
    });
  }
};

/**
 * Fallback articles when Claude is unavailable
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
