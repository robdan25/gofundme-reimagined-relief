import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    about: [
      { label: "About Us", href: "#" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Safety & Security", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    fundraising: [
      { label: "Start a Campaign", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Campaign Tips", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    contact: [
      { label: "Contact Us", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partnerships", href: "#" },
      { label: "Report Issue", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Unbiased Relief</h3>
                <p className="text-xs text-muted-foreground">Hurricane Support</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting donors with verified relief campaigns to help Jamaica rebuild after Hurricane Melissa.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Fundraising</h4>
            <ul className="space-y-2">
              {footerLinks.fundraising.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Unbiased Relief. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              100% of donations go directly to verified relief campaigns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
