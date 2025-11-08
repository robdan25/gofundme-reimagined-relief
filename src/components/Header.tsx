import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Users, Image, Handshake, Star, Heart, Newspaper } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/dist/Images/UnbiasedReliefheart.png"
              alt="Unbiased Relief"
              className="h-8 sm:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/what-to-donate" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2">
              What to Donate
            </Link>

            <Link to="/drop-off-and-shipping" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2">
              Drop-Off & Shipping
            </Link>

            {/* Community Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsCommunityDropdownOpen(true)}
              onMouseLeave={() => setIsCommunityDropdownOpen(false)}
            >
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 flex items-center gap-1">
                Community Wall
                <ChevronDown className="w-4 h-4" />
              </button>

              {isCommunityDropdownOpen && (
                <div className="absolute left-0 mt-0 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link to="/community-wall" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Users className="w-4 h-4" /> Community Wall
                  </Link>
                  <Link to="/donation-photos" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Image className="w-4 h-4" /> Latest Photos & Stories
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  <Link to="/volunteer" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" /> Volunteers
                  </Link>
                  <Link to="/partners" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Handshake className="w-4 h-4" /> Partners
                  </Link>
                  <Link to="/testimonials" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Star className="w-4 h-4 inline mr-2" /> Testimonials
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  <Link to="/news" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                    <Newspaper className="w-4 h-4" /> News & Updates
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2">
              About
            </Link>

            <Link to="/start-drive">
              <Button size="sm" className="bg-primary hover:bg-primary-hover text-white ml-2">
                Start a Drive
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-card/50">
            <div className="flex flex-col gap-0">
              <Link to="/what-to-donate" className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3">
                What to Donate
              </Link>
              <Link to="/drop-off-and-shipping" className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3">
                Drop-Off & Shipping
              </Link>
              <div className="border-t border-border my-2"></div>
              <button onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)} className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3 flex items-center justify-between w-full">
                Community Wall
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCommunityDropdownOpen && (
                <>
                  <Link to="/community-wall" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    👥 Community Wall
                  </Link>
                  <Link to="/donation-photos" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    📸 Latest Photos & Stories
                  </Link>
                  <Link to="/volunteer" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    🙌 Volunteers
                  </Link>
                  <Link to="/partners" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    🤝 Partners
                  </Link>
                  <Link to="/testimonials" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    <Star className="w-4 h-4 inline mr-2" /> Testimonials
                  </Link>
                  <Link to="/news" className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-6 py-2">
                    📰 News & Updates
                  </Link>
                </>
              )}
              <div className="border-t border-border my-2"></div>
              <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3">
                About
              </Link>
              <Link to="/start-drive" className="w-full px-4 py-3">
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
