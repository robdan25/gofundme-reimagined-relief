import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

const Partners = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    location: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnerTypes: [] as string[],
    message: "",
  });

  const partnerTypes = [
    "Community / Faith",
    "NGO / Agencies",
    "Logistics / Warehousing",
    "Business / Corporate",
  ];

  const partnershipTypes = [
    "Run a collection drive",
    "Provide warehousing or logistics",
    "Distribute items in Jamaica",
    "Sponsor bulk items",
    "Other",
  ];

  const faqItems = [
    {
      question: "Do you only work with Jamaican organizations?",
      answer:
        "No. We partner with organizations based in Jamaica and across the diaspora. What matters most is that you can either collect approved relief items, help move them, or responsibly distribute them. For drives outside Jamaica, we align with the official lists and, where possible, connect you to local partners on the ground.",
    },
    {
      question: "Can we run a one-time drive, or do we have to commit long-term?",
      answer:
        "Both are welcome. Some partners run a single focused drive—for example, tools and tarps for roof repairs—while others work with us over multiple months. We'll help you scope what's realistic based on your capacity.",
    },
    {
      question: "Is Unbiased Relief a charity or a coordination platform?",
      answer:
        "Unbiased Relief functions primarily as a coordination platform. We help match donors, drives, and official needs lists so the right goods reach the right places. Some drives are led by registered charities or churches; others are community-based efforts that we vet before listing.",
    },
    {
      question: "Can businesses partner with you?",
      answer:
        "Absolutely. Businesses can sponsor bulk items, run staff collection drives, provide warehouse space or transport, or match employee donations in kind. We're happy to work with CSR teams to design a practical, high-impact partnership.",
    },
    {
      question: "How do we get started as a partner?",
      answer:
        "Fill out the short 'Become a Partner' form on this page. Share what you do, where you're based, and how you'd like to help. We'll review your information and contact you to discuss next steps and whether your goals align with current needs.",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partner Inquiry:", formData);
    alert("Thank you for your interest! Our team will be in touch soon.");
    // Reset form
    setFormData({
      organizationName: "",
      organizationType: "",
      location: "",
      contactPerson: "",
      email: "",
      phone: "",
      partnerTypes: [],
      message: "",
    });
  };

  const togglePartnerType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      partnerTypes: prev.partnerTypes.includes(type)
        ? prev.partnerTypes.filter((t) => t !== type)
        : [...prev.partnerTypes, type],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="https://unbiasedrelief.org/images/partners.png"
          alt="Relief partners meeting around a table with a Jamaican flag and stacked boxes in the background, smiling and shaking hands."
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <p className="text-sm font-medium text-white/80 mb-2">
              Partners & Collaborators
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Working Together for Real Relief
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              Unbiased Relief partners with churches, community groups, NGOs, businesses, and logistics providers to move approved relief items from donors to communities across Jamaica.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Main Content Section */}
        <section className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Partners in Real Relief
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Unbiased Relief works with charities, churches, community groups, and logistics providers to move approved relief items from donors to Jamaican communities affected by Hurricane Melissa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-primary hover:bg-primary-hover text-white"
              onClick={() => {
                const element = document.getElementById("partner-form");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Become a Partner
            </Button>
            <Button variant="outline">
              <a href="mailto:info@unbiasedrelief.org">Contact Our Team</a>
            </Button>
          </div>
        </section>

        {/* Who We Partner With */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Who We Partner With
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We collaborate with organizations that share our commitment to dignity, transparency, and practical help.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type, index) => {
              const titles = [
                "Community & Faith Organizations",
                "NGOs & Agencies in Jamaica",
                "Logistics & Warehousing",
                "Businesses & Corporate Teams",
              ];
              const descriptions = [
                "Churches, diaspora associations, alumni groups, and service clubs that coordinate item drives and local drop-off points.",
                "Organizations on the ground that distribute tools, water, sanitation supplies, medical items, school materials, and other essentials.",
                "Freight forwarders, shippers, truckers, and warehouse providers who help consolidate, store, and move barrels and pallets.",
                "Companies that sponsor bulk items (tarps, tools, water tanks, generators) or run staff relief drives.",
              ];
              const icons = [Users, Briefcase, MapPin, Users];
              const Icon = icons[index];

              return (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl">{titles[index]}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{descriptions[index]}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* What We Provide */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            What Unbiased Relief Provides
          </h2>

          <ul className="space-y-4">
            {[
              "Central Platform – A single place to list vetted drives, describe exactly which items are needed, and reach donors across the diaspora.",
              "Alignment with Official Lists – We link partner drives to Government of Jamaica and consulate guidance so donated items match current needs.",
              "Donor Education – Clear 'What to Donate' and 'Official Lists' pages so donors come to you already informed.",
              "Storytelling & Updates – Space to share item counts, photos, and impact updates from the field.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How We Work */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            How We Work With Partners
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Partnerships only work when expectations are clear. Here's what we ask of every partner, and what you can expect from us.
          </p>

          <ul className="space-y-4">
            {[
              "Accept and distribute approved relief items only, consistent with guidance from Jamaican authorities.",
              "Provide basic information about your organization, including location, primary contact, and (where applicable) registration details.",
              "Agree that donated items will never be resold.",
              "Share periodic updates (photos, item counts, short reports) that we can publish back to donors.",
              "Follow basic safeguarding and dignity principles when photographing or filming communities.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Friends of Unbiased Relief */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Friends of Unbiased Relief
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            We are building a network of trusted partners in Canada, Jamaica, and across the diaspora. This section will highlight some of the community organizations, churches, NGOs, and logistics providers we collaborate with.
          </p>

          <Alert className="bg-muted/50 border-border">
            <AlertDescription className="text-muted-foreground italic">
              Partner logos and stories coming soon.
            </AlertDescription>
          </Alert>
        </section>

        {/* Partner Form */}
        <section id="partner-form" className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Interested in Partnering With Us?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Share a few details about your organization and how you'd like to help. Our team will follow up to talk through fit, needs, and next steps.
          </p>

          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter organization name"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Organization Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization Type *
                  </label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, organizationType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="community">Community / Faith</SelectItem>
                      <SelectItem value="ngo">NGO / Agencies</SelectItem>
                      <SelectItem value="logistics">Logistics / Warehousing</SelectItem>
                      <SelectItem value="business">Business / Corporate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Country & City *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Toronto, Canada or Kingston, Jamaica"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Contact Person *
                  </label>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@organization.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone or WhatsApp
                  </label>
                  <Input
                    type="tel"
                    placeholder="Include country code"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Partnership Types */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    How would you like to partner?
                  </label>
                  <div className="space-y-3">
                    {partnershipTypes.map((type) => (
                      <div key={type} className="flex items-center gap-3">
                        <Checkbox
                          id={type}
                          checked={formData.partnerTypes.includes(type)}
                          onCheckedChange={() => togglePartnerType(type)}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us a bit about your work and your interest in partnering.
                  </label>
                  <Textarea
                    placeholder="Share your story and how you'd like to work with us..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white"
                >
                  Send Partner Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Partner FAQ
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
