import { useState } from "react";
import { Send, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  hadithRef?: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Assalamu alaikum! I'm here to help you understand hadiths and Islamic teachings. Ask me about any hadith or situation you'd like guidance on.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      // 🔹 Call your AWS API Gateway endpoint
      const res = await fetch(
        `https://jf2gf47ttf.execute-api.us-east-1.amazonaws.com/hadith?q=${encodeURIComponent(input)}`
      );
      const data = await res.json();

      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: data.result || "I couldn’t find a relevant hadith for this query.",
        isUser: false,
        timestamp: new Date(),
        hadithRef: data.hadithRef || "Sahih Reference", // optional, adjust if Lambda returns it
      };

      setMessages(prev => [...prev, response]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "⚠️ Error fetching hadith. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <Card
              className={`max-w-[80%] ${
                message.isUser
                  ? "glass-card border-primary/20 bg-primary/10"
                  : "glass-card border-secondary/20 bg-card/50"
              }`}
            >
              <CardContent className="p-4">
                {!message.isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Sahih Assistant</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.hadithRef && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      <span className="font-arabic">{message.hadithRef}</span>
                    </div>
                  </div>
                )}
                <div className="mt-2 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 glass-strong">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a hadith or Islamic teaching..."
            className="glass-card border-border/50 focus:border-primary/50"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="glow-primary"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <footer className="text-center py-2 text-xs text-muted-foreground border-t border-border/30 bg-background/80">
        &copy; Faisal 2025
      </footer>
    </div>
  );
};
