import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DriveCard from "@/components/DriveCard";
import { getAllCampaigns } from "@/data/campaigns";

const OfficialReliefLists = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const campaigns = getAllCampaigns();

  // Category display names
  const categoryNames: Record<string, string> = {
    "shelter-bedding": "Shelter & Bedding",
    "food-water": "Food & Water",
    "medical-health": "Medical & Health",
    "sanitation-cleaning": "Sanitation & Cleaning",
    "tools-debris": "Tools & Debris",
    "school-community": "School & Community",
  };
  const officialLinks = [
    {
      title: "Jamaica Consulate General – Toronto (Duty Waiver & Relief Items)",
      description:
        "Official guidance for Canada-based donors, including the 30-day duty waiver and designated hurricane relief items for barrels, boxes, and containers.",
      buttonLabel: "View Consulate List",
      url: "https://jcgtoronto.ca/melissa/",
      image: "/Images/JCG.png",
    },
    {
      title: "Government of Jamaica – National Needs List",
      description:
        "Hurricane Melissa preliminary national needs list, covering shelter, health, water and sanitation, debris clearance, and more, scaled for up to 400,000 affected persons.",
      buttonLabel: "View National Needs List",
      url: "https://supportjamaica.gov.jm/needs",
      image: "/Images/JGJ.png",
    },
    {
      title: "Jamaica Customs Agency – Individual Relief Items",
      description:
        "Approved disaster relief items for individuals shipping barrels, boxes, and personal consignments, including information relevant to customs and import rules.",
      buttonLabel: "View Customs Item List",
      url: "https://jca.gov.jm/list-of-disaster-relief-items-for-individuals/",
      image: "/Images/JCA.png",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="/Images/Rebuild.png"
          alt="Damaged Jamaican street after a hurricane, with residents clearing debris and beginning to rebuild."
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <p className="text-sm font-medium text-white/80 mb-2 uppercase tracking-wide">
              {category ? `Approved Items for ${categoryNames[category] || category}` : "Official Guidance"}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {category
                ? `${categoryNames[category]} Relief Items`
                : "Use the Official Lists to Send the Right Help"
              }
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              {category
                ? `Learn what approved ${categoryNames[category].toLowerCase()} items are needed for Hurricane Melissa relief in Jamaica, then find a drop-off location near you to donate.`
                : "Government and consulate lists show exactly which items are approved and most urgent. Check these before buying or shipping relief goods, so every barrel and box supports recovery on the ground."
              }
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Official Relief Lists (Jamaica)
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These are the official relief needs and duty-waived items published by the Government of Jamaica and partner agencies. We summarize key categories on Unbiased Relief, but you should always check these lists for the latest details before buying or shipping in bulk.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Government & Consulate Links
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {officialLinks.map((link, index) => (
              <Card key={index} className="flex flex-col border-border bg-card hover:shadow-hover transition-shadow overflow-hidden">
                {link.image && (
                  <div className="relative overflow-hidden aspect-[16/9] bg-muted">
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl leading-tight">
                    {link.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed mt-3">
                    {link.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    className="w-full bg-primary hover:bg-primary-hover text-white"
                    onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
                  >
                    {link.buttonLabel}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground italic">
            Note: Unbiased Relief is not an official government website. Always rely on the linked pages above for the most current rules and item approvals.
          </p>
        </div>

        {/* Active Relief Campaigns */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Active Relief Campaigns
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Browse all active relief drives collecting approved supplies across Jamaica. Each campaign is verified and aligned with official government guidance.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <DriveCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>

        {/* Find Drop-Off Locations CTA */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Donate?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Now that you know what items are needed, find a drop-off location near you or learn about shipping options to get your supplies to Jamaica.
            </p>
            <Button
              onClick={() => navigate("/drop-off-and-shipping")}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Drop-Off Locations & Shipping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfficialReliefLists;
