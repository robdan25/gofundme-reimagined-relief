import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage as IChatMessage } from "@/hooks/useChatbot";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: IChatMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";

  return (
    <div className={cn("flex gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="h-10 w-10 flex-shrink-0 bg-primary">
          <AvatarImage
            src="https://srv1714-files.hstgr.io/b320ad88c348746b/files/public_html/Images/HeadshotLeon.png"
            alt="Leon"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-white font-bold">L</AvatarFallback>
        </Avatar>
      )}

      <Card
        className={cn(
          "max-w-xs sm:max-w-sm rounded-lg p-3",
          isBot
            ? "bg-accent text-foreground"
            : "bg-primary text-white rounded-br-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <p
          className={cn(
            "text-xs mt-1",
            isBot ? "text-muted-foreground" : "text-white/80"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </Card>

      {!isBot && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
