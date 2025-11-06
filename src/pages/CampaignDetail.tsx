import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Boxes, Users, Clock, Target } from "lucide-react";
import { getCampaignById } from "@/data/campaigns";
import NotFound from "./NotFound";

const CampaignDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const campaign = slug ? getCampaignById(slug) : null;

  if (!campaign) {
    return <NotFound />;
  }

  const percentage = Math.min((campaign.barrelsPacked / campaign.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {campaign.title}
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              by <strong>{campaign.organizer}</strong>
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Campaign Overview */}
        <div className="mb-12">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Campaign Details • Hurricane Melissa Relief
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About This Campaign
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Barrels Packed */}
              <div className="flex gap-4">
                <Boxes className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Barrels Packed
                  </h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-foreground">
                        {campaign.barrelsPacked} of {campaign.goal}
                      </span>
                      <span className="text-muted-foreground">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {campaign.goal - campaign.barrelsPacked} more barrels needed
                  </p>
                </div>
              </div>

              {/* Items Collected */}
              <div className="flex gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Items Collected
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <strong className="text-foreground text-xl">
                      {campaign.itemsCollected.toLocaleString()}
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Individual relief items packed and ready
                  </p>
                </div>
              </div>

              {/* Time Left */}
              <div className="flex gap-4">
                <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Time Remaining
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <strong className="text-foreground text-xl">
                      {campaign.daysLeft} days
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Until this campaign closes
                  </p>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Organized By
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <strong className="text-foreground">
                      {campaign.organizer}
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Verified relief partner
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Help Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            How You Can Help
          </h2>

          <div className="space-y-4 mb-8">
            {[
              {
                num: 1,
                title: "View Approved Items",
                desc: "Check our What to Donate page to see which items this campaign needs.",
              },
              {
                num: 2,
                title: "Buy or Gather Supplies",
                desc: "Purchase or collect approved items in new, unused condition.",
              },
              {
                num: 3,
                title: "Pack Into Barrels",
                desc: "Pack items securely into barrels or boxes for shipping.",
              },
              {
                num: 4,
                title: "Drop Off or Ship",
                desc: "Find a drop-off location near you or arrange direct shipment to our warehouse.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-primary rounded-lg p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            Every item you collect and send directly helps families and communities rebuild after Hurricane Melissa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate("/what-to-donate")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
            >
              View Approved Items
            </Button>
            <Button
              onClick={() => navigate("/drop-off-and-shipping")}
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
            >
              Find Drop-Off Locations
            </Button>
          </div>
        </section>

        {/* Questions Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Questions?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Learn more about our relief efforts and see all active campaigns.
          </p>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                View All Campaigns
              </h3>
              <p className="text-muted-foreground mb-3">
                See other relief drives and verified partners across Jamaica.
              </p>
              <Button
                onClick={() => navigate("/official-relief-lists")}
                variant="outline"
              >
                View All Drives
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDetail;
