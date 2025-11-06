import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="https://unbiasedrelief.org/Images/UnbiasedReliefheart.png"
              alt="Unbiased Relief"
              className="h-8 sm:h-10 object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/what-to-donate" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              What to Donate
            </Link>
            <Link to="/official-relief-lists" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Official Lists
            </Link>
            <Link to="/drop-off-and-shipping" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Drop-Off & Shipping
            </Link>
            <Link to="/news" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              News & Updates
            </Link>
            <Link to="/partners" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Partners
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <CurrencySelector />
            <Link to="/start-drive">
              <Button size="sm" className="bg-primary hover:bg-primary-hover text-white">
                Start a Drive
              </Button>
            </Link>
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
              <Link to="/what-to-donate" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                What to Donate
              </Link>
              <Link to="/official-relief-lists" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Official Lists
              </Link>
              <Link to="/drop-off-and-shipping" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Drop-Off & Shipping
              </Link>
              <Link to="/news" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                News & Updates
              </Link>
              <Link to="/partners" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Partners
              </Link>
              <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/start-drive" className="w-full">
                <Button size="sm" className="w-full bg-primary hover:bg-primary-hover text-white">
                  Start a Drive
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
