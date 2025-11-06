import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Heart, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Check Approved Items",
      description: "Browse GOJ and ODPEM lists to see exactly what's needed and duty-waived.",
      link: "https://supportjamaica.gov.jm/needs",
      linkText: "View Needs",
    },
    {
      icon: CreditCard,
      title: "Pack & Label Your Supplies",
      description: "Pack sturdy boxes or barrels, label them by category (medical, hygiene, tools), and follow our packing guides.",
    },
    {
      icon: Heart,
      title: "Drop Off or Ship",
      description: "Bring items to a partner drop-off location or ship directly to our collection warehouse.",
    },
    {
      icon: CheckCircle,
      title: "We Deliver & Report Back",
      description: "We work with trusted agencies in Jamaica to distribute supplies and share updates from the communities you've helped.",
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
            Sending relief supplies is simple and transparent. Here's how your items help.
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
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-primary hover:underline font-medium text-sm"
                    >
                      {step.linkText || "Learn More"}
                    </a>
                  )}
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
