import { BookOpen, MessageSquare, Star, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: MessageSquare, label: "Chat", notifications: 3 },
  { icon: BookOpen, label: "Hadith Collection" },
  { icon: Star, label: "Favorites" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full w-64 
          glass-strong border-r border-border/50 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo area for mobile */}
          <div className="p-4 md:hidden">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">ص</span>
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">Sahih</h1>
                <p className="text-xs text-muted-foreground">Islamic Guidance</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 h-10
                    ${item.active ? "glow-primary" : "glass-card hover:bg-primary/10"}
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.notifications && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </Button>
              ))}
            </nav>

            <Separator className="my-6 bg-border/50" />

            <div className="space-y-4">
              <div className="glass-card p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-2">Daily Hadith</h3>
                <p className="text-xs text-muted-foreground font-arabic leading-relaxed">
                  "The best of people are those who benefit others."
                </p>
                <p className="text-xs text-primary mt-2">- Prophet Muhammad ﷺ</p>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-2">Quick Stats</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hadiths Studied</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions Asked</span>
                    <span className="font-medium">28</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};