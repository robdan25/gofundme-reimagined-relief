import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { cn } from "@/lib/utils";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2 transition-all hover:scale-110 active:scale-95",
          isOpen && "hidden"
        )}
        aria-label="Open chat"
      >
        <div className="rounded-full shadow-lg overflow-hidden w-16 h-16 flex items-center justify-center">
          <img
            src="https://srv1714-files.hstgr.io/b320ad88c348746b/files/public_html/Images/HeadshotLeon.png"
            alt="Leon - Chat Assistant"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-semibold text-foreground bg-white px-3 py-1 rounded-full shadow-md whitespace-nowrap">
          Need Help? Talk to Leon
        </span>
      </button>

      {/* Chat Window - Fixed Position Bottom Right */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] max-w-md h-[80vh] md:h-[600px] max-h-[90vh] bg-background rounded-lg shadow-2xl border border-border flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b bg-primary text-white rounded-t-lg flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Leon – Relief Support Guide</h2>
              <p className="text-xs text-white/80 mt-1">Your Unbiased Relief Assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 h-10 w-10 flex items-center justify-center hover:bg-primary/80 rounded transition-colors flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-4 bg-background">
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Clear Chat Button */}
          {messages.length > 1 && (
            <div className="px-4 py-2 border-t bg-accent">
              <Button
                onClick={handleClearChat}
                variant="ghost"
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                Clear Chat
              </Button>
            </div>
          )}

          {/* Input Area */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
