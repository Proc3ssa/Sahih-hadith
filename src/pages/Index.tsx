import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen pattern-bg">
        <div className="flex h-screen">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className="flex flex-col flex-1 min-w-0">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            
            <main className="flex-1 overflow-hidden">
              <ChatInterface />
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
