import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Press = () => {
  const pressEmail = "press@unbiasedrelief.org";

  const keyFacts = [
    {
      label: "Focus",
      text: "Item-based relief for Jamaica (tools, water & sanitation items, bedding, school supplies, medical and hygiene essentials).",
    },
    {
      label: "Founded by",
      text: "Unbiased Miind, a Canada-based advocacy group focused on equal rights and justice for all.",
    },
    {
      label: "Mission",
      text: "Help everyday people send the right items, at the right time, aligned with official Government of Jamaica needs lists.",
    },
    {
      label: "How it works",
      text: "Donors, drives, and partner organizations use Unbiased Relief to coordinate what to donate, where to drop it off, and how it's shipped to Jamaica.",
    },
    {
      label: "Core pages",
      text: "What to Donate, Official Relief Lists, Drop-Off & Shipping, Partners, Start a Drive.",
    },
  ];

  const highlights = [
    "Coordinating relief drives across the Greater Toronto Area in response to Hurricane Melissa.",
    "Supporting campaigns focused on hygiene & sanitation (Port Antonio), school supplies (St. Mary), and medical supplies for rural clinics.",
    "Helping donors use limited duty- and GCT-free windows to move more approved supplies into Jamaica.",
  ];

  const quotes = [
    {
      text: "Unbiased Relief exists to connect goodwill to real needs. Instead of guessing what to send, we help people follow official lists and support drives that move tools, water, bedding, and school supplies directly into Jamaican communities.",
      attribution: "Unbiased Relief Platform Mission",
    },
    {
      text: "After a hurricane, families need more than sympathy—they need hammers, tarps, water containers, mattresses, and school supplies. Our job is to coordinate those goods in a way that respects both donors and the communities receiving them.",
      attribution: "Item-Based Relief Philosophy",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Newspaper className="w-10 h-10 text-primary" />
            Press & Media
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Unbiased Relief is a community-led platform helping Jamaica rebuild after Hurricane
            Melissa by coordinating item-based relief drives—barrels, boxes, and pallets of
            approved supplies, not just cash. This page is for journalists, bloggers, and partners
            who want to learn more or feature our work.
          </p>
          <p className="text-base text-muted-foreground italic">
            For media inquiries, please contact:{" "}
            <a href={`mailto:${pressEmail}`} className="text-primary hover:underline font-medium">
              {pressEmail}
            </a>
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: Key Facts */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Key Facts About Unbiased Relief
            </h2>
            <div className="space-y-4">
              {keyFacts.map((fact, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-bold text-foreground mb-1">{fact.label}:</p>
                  <p className="text-muted-foreground">{fact.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Our Story */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story in Brief
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unbiased Relief was created in response to Hurricane Melissa, when diaspora
              communities wanted to help but weren't sure what to send or who to trust. Instead of
              rushing ad-hoc barrels and boxes, we built a platform that aligns with official
              lists from Jamaican authorities, highlights vetted drives, and focuses on practical
              relief items families can use to rebuild their lives—hammers and tarps, water
              containers, mattresses, school supplies, hygiene kits, and more.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              The core idea is simple: <strong>connect goodwill to real needs by coordinating goods, not just donations.</strong>
            </p>
          </section>

          {/* Section 3: Recent Highlights */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Recent Highlights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              As Unbiased Relief grows, these are some of the early areas of focus and impact.
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Logos & Images */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Logos & Images
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We provide a small set of approved logos and photos for media use. Please use them
              respectfully and do not modify the logo colors or proportions.
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-6">
              <li>• Unbiased Relief logo (PNG/SVG)</li>
              <li>• Relief drive and drop-off photos (barrels, boxes, volunteers)</li>
              <li>• Founder/representative portrait (available on request)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To request access to our media kit or higher-resolution images, email{" "}
              <a href={`mailto:${pressEmail}`} className="text-primary hover:underline font-medium">
                {pressEmail}
              </a>{" "}
              with your outlet and a brief description of your story.
            </p>
          </section>

          {/* Section 5: Sample Quotes */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sample Quotes
            </h2>
            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <Card key={index} className="border-primary/30 bg-primary/5">
                  <CardContent className="p-6">
                    <blockquote className="space-y-3">
                      <p className="text-lg text-foreground leading-relaxed italic">
                        "{quote.text}"
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        — {quote.attribution}
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 6: Media Contact */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Media Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For interviews, quotes, data, or to verify a story about Unbiased Relief, please
              contact:
            </p>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Unbiased Relief – Media Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">Email:</p>
                  <p className="text-muted-foreground">
                    <a href={`mailto:${pressEmail}`} className="text-primary hover:underline">
                      {pressEmail}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Website:</p>
                  <p className="text-muted-foreground">
                    <a
                      href="https://unbiasedrelief.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://unbiasedrelief.org
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Final CTA */}
          <Alert className="bg-primary/10 border-primary">
            <Newspaper className="h-4 w-4 text-primary" />
            <AlertDescription>
              <p className="text-foreground font-medium mb-2">Ready to share our story?</p>
              <p className="text-muted-foreground">
                Whether you're writing about hurricane relief, community activism, or innovative
                approaches to disaster response, we'd love to help. Reach out to{" "}
                <a href={`mailto:${pressEmail}`} className="text-primary hover:underline font-medium">
                  {pressEmail}
                </a>{" "}
                with your story idea, and let's work together to amplify the impact of item-based
                relief.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
