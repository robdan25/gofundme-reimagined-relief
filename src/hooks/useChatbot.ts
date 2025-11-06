import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Leon – Relief Support Guide for Unbiased Relief (unbiasedrelief.org).

Your job:
- Help people understand what relief items to donate, where to drop them off, and how drives work.
- Focus on official Government of Jamaica / consulate needs lists and the Unbiased Relief pages:
  - What to Donate
  - Official Lists
  - Drop-Off & Shipping
  - Partners
  - Start a Drive
- If you don't know something, say so and suggest they check official links or contact Unbiased Relief directly.
Speak in a warm, clear, practical tone.`;

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm Leon, your Relief Support Guide. I'm here to help you understand how to donate, start a relief drive, or learn more about Unbiased Relief. What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback((userText: string) => {
    if (!userText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Call DeepSeek API
    const callDeepSeekAPI = async () => {
      try {
        const response = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-reasoner",
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...messages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
              })),
              {
                role: "user",
                content: userText,
              },
            ],
            temperature: 0.5,
            max_tokens: 512,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error?.message || `API error: ${response.statusText}`
          );
        }

        const data = await response.json();
        const botResponseText =
          data.choices?.[0]?.message?.content ||
          "I'm having trouble responding. Please try again.";

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);

        // Add error message to chat
        const errorBotMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `Sorry, I encountered an error: ${errorMessage}. Please try again or contact support if the issue persists.`,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorBotMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    callDeepSeekAPI();
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "1",
        text: "Hi! I'm Leon, your Relief Support Guide. I'm here to help you understand how to donate, start a relief drive, or learn more about Unbiased Relief. What can I help you with today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    error,
  };
};
