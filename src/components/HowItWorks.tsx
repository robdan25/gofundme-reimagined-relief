import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Heart, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find a Campaign",
      description: "Browse verified relief campaigns or search for specific needs. All campaigns are vetted for authenticity.",
    },
    {
      icon: CreditCard,
      title: "Make a Donation",
      description: "Donate securely with credit card, debit card, or digital payment. Choose one-time or monthly giving.",
    },
    {
      icon: Heart,
      title: "Track Your Impact",
      description: "Receive updates on how your donation is making a difference. See photos and stories from the field.",
    },
    {
      icon: CheckCircle,
      title: "100% Transparency",
      description: "Every dollar is tracked. View detailed reports on how funds are distributed and used for relief efforts.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making a difference is simple and transparent. Here's how your donation helps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="text-center border-border bg-card hover:shadow-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
