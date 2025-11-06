import { Mail, Facebook, Twitter, Instagram, Linkedin, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ConnectWithUs = () => {
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form will be submitted to Formspree
    alert("Thank you for subscribing! Check your email for updates.");
  };

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      url: "https://facebook.com/unbiasedrelief",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter/X",
      url: "https://twitter.com/unbiasedrelief",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://instagram.com/unbiasedrelief",
      color: "hover:text-pink-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/company/unbiasedrelief",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-[1000px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Connect Also
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our journey, share updates with your network, and stay informed about Hurricane Melissa relief efforts in Jamaica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Newsletter */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get relief updates, impact stories, and donation opportunities delivered to your inbox.
                  </p>
                </div>
              </div>
              <form onSubmit={handleEmailSubmit} action="https://formspree.io/f/xyzpqwab" method="POST" className="space-y-3">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="bg-muted border-border"
                />
                <input type="hidden" name="_subject" value="New Newsletter Subscription" />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Subscribe to Updates
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Share & Engage */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Share2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Spread the Word
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share relief drives and impact stories on your social media to reach more supporters.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" className="flex-1 min-w-fit">
                  <Facebook className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 min-w-fit">
                  <Twitter className="w-4 h-4 mr-2" />
                  Tweet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground text-center mb-6">
            Follow Us on Social Media
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className={`w-6 h-6 ${social.color} transition-colors`} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Chat Support */}
        <div className="mt-12 pt-8 border-t border-border">
          <Card className="border-border bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <MessageSquare className="w-8 h-8 text-primary flex-shrink-0 hidden md:block" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Need Help? Talk to Leon
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Have questions about donations, drop-off locations, or relief efforts? Our AI assistant Leon is available 24/7 to help you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
