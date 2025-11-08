import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { WebPageSchema } from "@/components/StructuredData";

const About = () => {
  const seoData = {
    title: "About Unbiased Relief",
    description: "Learn about Unbiased Relief's mission to provide verified, unbiased aid for Hurricane Melissa relief efforts in Jamaica. Our approach, focus areas, and impact.",
    canonical: "https://unbiasedrelief.org/about",
    keywords: "about unbiased relief, Jamaica relief mission, verified aid, hurricane relief, community support Jamaica",
  };
  const focusAreasLeft = [
    "Nails, screws, basic tools (hammers, pry bars)",
    "Tarpaulins, ropes, and tie-downs",
    "Shovels, spades, and debris-clearing tools",
  ];

  const focusAreasRight = [
    "Water containers, buckets with lids, and purification kits",
    "Generators, fuel containers, solar lights, and radios",
    "Mattresses, bedding, tents, and basic household items",
  ];

  const steps = [
    {
      number: 1,
      title: "We align with official guidance.",
      description:
        "We monitor national needs lists, consulate updates, and partner requests to understand what is actually required.",
    },
    {
      number: 2,
      title: "Organizers start relief drives.",
      description:
        "Trusted partners create item-based drives (for example: tools only, hygiene kits, or medical supplies) with clear requirements.",
    },
    {
      number: 3,
      title: "Donors pack and drop off items.",
      description:
        "Supporters buy and pack approved items, then bring them to designated drop-off locations or ship to partner warehouses.",
    },
    {
      number: 4,
      title: "Supplies are shipped and distributed.",
      description:
        "Drives work with logistics partners and agencies in Jamaica to deliver items into communities, with updates shared back to donors.",
    },
  ];

  const commitments = [
    {
      title: "Alignment with official lists",
      description:
        "We link directly to Government of Jamaica and consulate guidance so donors can always verify what's needed.",
    },
    {
      title: "Item-first relief",
      description:
        "We centre goods and products—especially tools, water, sanitation, and shelter—because that's what families on the ground keep asking for.",
    },
    {
      title: "Community respect",
      description:
        "We avoid sensational images and focus on dignity, partnership, and long-term recovery.",
    },
    {
      title: "Transparency",
      description:
        "Where possible, we share stories, photos, and reports from partner organizations showing how supplies are used.",
    },
  ];

  const helpWays = [
    "Visit What to Donate to see priority items.",
    "Join an existing relief drive or start your own.",
    "Share Unbiased Relief with friends, churches, and community groups.",
    "Partner with us as a logistics, faith, or community organization.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoData} />
      <WebPageSchema
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
      />
      <Header />

      {/* Hero Image Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="/Images/Unity.png"
          alt="Volunteers in Jamaica packing relief boxes together, smiling and working as a team."
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <p className="text-sm font-medium text-white/80 mb-2">
              Community-Led Relief
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Real People, Working Together for Jamaica
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              Unbiased Relief is powered by volunteers, partners, and supporters who believe in sending the right help—real relief items that families can use to rebuild.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* About Section Title */}
        <div className="mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Hurricane Melissa Support • Jamaica
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Unbiased Relief
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Unbiased Relief is a community-led platform helping Jamaica rebuild after Hurricane Melissa by connecting donors with <strong>approved relief item drives</strong>. Instead of guessing what to send, supporters can follow official needs lists and partner with trusted collection drives that move barrels, boxes, and pallets of supplies directly into affected communities.
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Unbiased Relief is an initiative of Unbiased Miind, a Canada-based advocacy group committed to equal rights and justice for all. When Hurricane Melissa devastated communities across Jamaica, we saw diaspora families and friends eager to help—but unsure what to send or who to trust. This platform exists to close that gap: we organize item-based relief drives, align them with official guidance from Jamaican authorities, and make it easier for everyday people to give in ways that truly help.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Our mission is simple: <strong>get the right relief items to the people who need them most, as transparently as possible.</strong>
          </p>
          <ul className="space-y-3">
            {[
              "Connect donors with vetted relief drives focused on approved items.",
              "Follow official lists from Jamaican government agencies and consulates.",
              "Prioritize high-impact goods like tools, water storage, sanitation, and shelter.",
              "Share clear updates on where supplies go and how they support recovery.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What We Focus On */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            What We Focus On
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Based on official needs and on-the-ground feedback, we concentrate on items that help families restore safety, dignity, and basic daily life.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Shelter & Structure
              </h3>
              <ul className="space-y-2">
                {focusAreasLeft.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Water, Power & Essentials
              </h3>
              <ul className="space-y-2">
                {focusAreasRight.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground italic">
            Every drive on Unbiased Relief clearly lists the specific items it accepts, so donors can shop and pack with confidence.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            How Unbiased Relief Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <Card key={step.number} className="flex flex-col border-border bg-card">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                    {step.number}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Commitments */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Commitments
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We take trust seriously. People are giving from the heart, and we owe them honesty and clarity in return.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {commitments.map((commitment, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {commitment.title}
                </h3>
                <p className="text-muted-foreground">{commitment.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How You Can Help */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            How You Can Help Today
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Whether you're in Canada, the US, the UK, or elsewhere, you can be part of Jamaica's recovery.
          </p>

          <ul className="space-y-3 mb-8">
            {helpWays.map((way, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">{way}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/what-to-donate">
              <Button className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto">
                View What to Donate
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                // Placeholder for "Start a Drive" action
                alert("Start a Drive feature - contact us to get started!");
              }}
            >
              Start a Drive
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
