import { Button } from "@/components/ui/button";
import { Search, Heart, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Unbiased Relief</h1>
              <p className="text-xs text-muted-foreground">Hurricane Melissa Support</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#campaigns" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Campaigns
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              Start Campaign
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#campaigns" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Campaigns
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                How it Works
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </a>
              <Button variant="outline" size="sm" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button size="sm" className="w-full bg-primary hover:bg-primary-hover">
                Start Campaign
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
