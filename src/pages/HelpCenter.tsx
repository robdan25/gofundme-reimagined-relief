import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const supportEmail = "info@unbiasedrelief.org";

  const faqs = [
    {
      section: "Getting Started",
      questions: [
        {
          q: "What is Unbiased Relief?",
          a: (
            <>
              Unbiased Relief is a community platform that connects donors with verified relief
              item drives for Hurricane Melissa recovery in Jamaica. We help organize,
              coordinate, and distribute essential supplies—from tools to water containers to
              medical kits—based on official government needs lists and on-the-ground feedback.
              Unlike cash-based platforms, we focus on <strong>items that families can
              immediately use</strong>.
            </>
          ),
        },
        {
          q: "I'm new. Where should I start?",
          a: (
            <>
              Great! Here's how to get started:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>
                  <Link to="/what-to-donate" className="text-primary hover:underline">
                    View What to Donate
                  </Link>{" "}
                  to see priority items.
                </li>
                <li>
                  <Link to="/official-relief-lists" className="text-primary hover:underline">
                    Check Official Lists
                  </Link>{" "}
                  for government and consulate guidance.
                </li>
                <li>
                  <Link to="/drop-off-and-shipping" className="text-primary hover:underline">
                    Find a Drop-Off Location
                  </Link>{" "}
                  near you.
                </li>
                <li>
                  <Link to="/about" className="text-primary hover:underline">
                    Learn About Us
                  </Link>{" "}
                  to understand our mission.
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      section: "Donating Items",
      questions: [
        {
          q: "What items are most needed right now?",
          a: (
            <>
              Priority items include tools, water containers, hygiene kits, medical supplies,
              and shelter materials. For a complete, up-to-date list of approved items and
              current needs, visit our{" "}
              <Link to="/what-to-donate" className="text-primary hover:underline">
                What to Donate page
              </Link>{" "}
              or check the{" "}
              <Link to="/official-relief-lists" className="text-primary hover:underline">
                Official Relief Lists
              </Link>{" "}
              from the Government of Jamaica and Jamaican consulates.
            </>
          ),
        },
        {
          q: "Where can I drop off items?",
          a: (
            <>
              Unbiased Relief works with trusted partners to receive donations. Drop-off
              locations include KL Brandz facilities across the Greater Toronto Area, community
              partners, and official collection points across Canada. Visit our{" "}
              <Link to="/drop-off-and-shipping" className="text-primary hover:underline">
                Drop-Off & Shipping page
              </Link>{" "}
              to find a location near you and confirm hours before visiting.
            </>
          ),
        },
        {
          q: "Can I send cash instead of items?",
          a: (
            <>
              Unbiased Relief specializes in item-based relief because goods like tools, water
              containers, and medical supplies have immediate, direct impact. While we don't
              process direct cash donations, you can support our efforts by:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Donating items to an active relief drive.</li>
                <li>Starting your own drive through a community group or organization.</li>
                <li>Partnering with us to coordinate larger relief efforts.</li>
              </ul>
              For other ways to contribute, please{" "}
              <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">
                contact us
              </a>
              .
            </>
          ),
        },
      ],
    },
    {
      section: "Starting a Drive",
      questions: [
        {
          q: "How do I start my own relief drive?",
          a: (
            <>
              Visit our{" "}
              <Link to="/start-drive" className="text-primary hover:underline">
                Start a Drive page
              </Link>{" "}
              to begin the process. You'll provide details about your drive, specify which
              items you're collecting, and work with our team to ensure alignment with official
              relief needs. We'll help you set up a drop-off point, coordinate logistics, and
              keep donors informed throughout the process.
            </>
          ),
        },
        {
          q: "Do I have to be a charity to run a drive?",
          a: (
            <>
              No! Relief drives can be organized by anyone—families, friends, churches, schools,
              workplaces, community groups, and non-profits. What matters is that you're
              committed to collecting approved items and following our guidelines on safety,
              transparency, and coordination. If you represent an organization, see our{" "}
              <Link to="/partners" className="text-primary hover:underline">
                Partners page
              </Link>{" "}
              for more information.
            </>
          ),
        },
        {
          q: "How long should a drive run?",
          a: (
            <>
              Most relief drives run for <strong>2 to 6 weeks</strong>, depending on your goals
              and community capacity. Unbiased Relief can help you plan a timeline that aligns
              with official shipping windows and on-the-ground distribution needs. We'll also
              help you coordinate with partners to move collected items efficiently. Contact us
              for guidance specific to your drive.
            </>
          ),
        },
      ],
    },
    {
      section: "Partners & Organizations",
      questions: [
        {
          q: "I represent a charity / church / business. How can we partner with you?",
          a: (
            <>
              We're always looking to work with trusted organizations that share our commitment
              to transparent, item-based relief. Visit our{" "}
              <Link to="/partners" className="text-primary hover:underline">
                Partners page
              </Link>{" "}
              to learn about collaboration opportunities, or{" "}
              <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">
                reach out directly
              </a>{" "}
              to discuss how we can work together.
            </>
          ),
        },
        {
          q: "Do you work directly with agencies in Jamaica?",
          a: (
            <>
              Yes. Unbiased Relief collaborates with on-the-ground organizations in Jamaica,
              government agencies, and logistics partners to ensure that donated items reach
              communities that need them most. We follow official guidance from the Government of
              Jamaica and work transparently with partner organizations. You can read more about
              our partners and approach on our{" "}
              <Link to="/partners" className="text-primary hover:underline">
                Partners page
              </Link>
              .
            </>
          ),
        },
      ],
    },
    {
      section: "Safety, Security & Policies",
      questions: [
        {
          q: "How do you keep drives and drop-off locations safe?",
          a: (
            <>
              Safety is our top priority. We verify campaign organizers, monitor for fraudulent
              activity, and work with partners to ensure secure collection and distribution. For
              detailed information about our safety practices, fraud prevention, and how to spot
              red flags, visit our{" "}
              <Link to="/safety" className="text-primary hover:underline">
                Safety & Security page
              </Link>
              .
            </>
          ),
        },
        {
          q: "How do you protect my data?",
          a: (
            <>
              We take your privacy seriously. All data is encrypted, access is restricted to
              authorized staff, and we never sell your information. For a comprehensive
              explanation of how we collect, use, and protect your data, please read our{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </>
          ),
        },
        {
          q: "Where can I read the legal terms?",
          a: (
            <>
              Our legal documents are available here:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  – How you can use our platform.
                </li>
                <li>
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  – How we handle your data.
                </li>
                <li>
                  <Link to="/safety" className="text-primary hover:underline">
                    Safety & Security
                  </Link>{" "}
                  – Platform security and fraud prevention.
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      section: "Technical Help & Contact",
      questions: [
        {
          q: "The site isn't working properly. What should I do?",
          a: (
            <>
              Here are some quick troubleshooting steps:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>
                  <strong>Refresh the page</strong> (Ctrl+R or Cmd+R).
                </li>
                <li>
                  <strong>Check your internet connection</strong> and ensure you're connected to
                  a stable network.
                </li>
                <li>
                  <strong>Clear your browser cache</strong> and try again.
                </li>
                <li>
                  <strong>Try a different browser</strong> if the problem persists.
                </li>
                <li>
                  <strong>Take a screenshot</strong> and{" "}
                  <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">
                    contact us
                  </a>{" "}
                  with details.
                </li>
              </ul>
            </>
          ),
        },
        {
          q: "How can I contact Unbiased Relief?",
          a: (
            <>
              You can reach us in several ways:
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">
                    {supportEmail}
                  </a>
                </li>
                <li>
                  <strong>Chat with Leon:</strong> Use the chatbot (Relief Support Guide) at the
                  bottom right of the page for quick answers about relief items, drop-off
                  locations, and how to help.
                </li>
                <li>
                  <strong>Report a Concern:</strong> If you encounter a safety issue or
                  fraudulent campaign, please email us right away.
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 flex items-center gap-3">
            <HelpCircle className="w-10 h-10 text-primary" />
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Answers to common questions about donating items, starting drives, and using
            Unbiased Relief.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, sectionIndex) => (
            <section key={sectionIndex}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                {section.section}
              </h2>
              <div className="space-y-6">
                {section.questions.map((qa, qaIndex) => (
                  <Card key={qaIndex} className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{qa.q}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground leading-relaxed">
                      {qa.a}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Final Callout */}
        <Alert className="mt-12 bg-primary/10 border-primary">
          <HelpCircle className="h-4 w-4 text-primary" />
          <AlertDescription>
            <p className="text-foreground font-medium mb-2">Still need help?</p>
            <p className="text-muted-foreground">
              If you can't find what you're looking for, please{" "}
              <a href={`mailto:${supportEmail}`} className="text-primary hover:underline font-medium">
                contact us
              </a>{" "}
              and we'll do our best to respond as quickly as we can. You can also chat with
              Leon, our Relief Support Guide chatbot, for immediate assistance.
            </p>
          </AlertDescription>
        </Alert>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
