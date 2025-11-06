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

  if (!apiKey) {
    console.error("CLAUDE_API_KEY environment variable not set");
    return [];
  }

  try {
    console.log("Generating articles with Claude API...");

    const prompt = `You are a professional news journalist. Generate 4 realistic, informative news articles about Hurricane Melissa relief efforts in Jamaica.

Focus on:
1. Relief organizations' efforts
2. Government support programs
3. Community recovery initiatives
4. Donation and aid opportunities

For each article, provide JSON in this exact format (no markdown, just raw JSON):
{
  "title": "Article title",
  "description": "2-3 sentence description of the article",
  "source": "Jamaica Observer|Jamaica Star|Gleaner|Jamaica News",
  "url": "https://example.com/article"
}

Generate EXACTLY 4 articles, separated by newlines. Do not include any other text, only the JSON objects.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `Claude API error ${response.status}:`,
        errorData
      );
      return [];
    }

    const data: any = await response.json();

    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error("Unexpected Claude response structure:", data);
      return [];
    }

    const text = data.content[0].text;
    console.log("Claude response:", text.substring(0, 200));

    // Parse the JSON objects from the response
    const articles: NewsArticle[] = [];
    const jsonMatches = text.match(/\{[^}]+\}/g) || [];

    for (let i = 0; i < jsonMatches.length && articles.length < 4; i++) {
      try {
        const parsed = JSON.parse(jsonMatches[i]);
        articles.push({
          id: `claude-${Date.now()}-${i}`,
          title: parsed.title || "Untitled",
          description: parsed.description || "",
          source: parsed.source || "Jamaica News",
          url: parsed.url || "#",
          publishedDate: new Date(),
          featured: i === 0,
        });
      } catch (e) {
        console.warn(`Failed to parse JSON object ${i}:`, jsonMatches[i]);
      }
    }

    if (articles.length > 0) {
      console.log(`Successfully generated ${articles.length} articles`);
      return articles;
    } else {
      console.warn("No valid articles parsed from Claude response");
      return [];
    }
  } catch (error) {
    console.error("Error calling Claude API:", error);
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
      console.log("Generating fresh articles with Claude");
      articles = await generateWithClaude();

      if (articles.length > 0) {
        cachedArticles = articles;
        lastFetchTime = Date.now();
        console.log("Articles cached successfully");
      } else {
        console.warn("No articles generated, using fallback");
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
