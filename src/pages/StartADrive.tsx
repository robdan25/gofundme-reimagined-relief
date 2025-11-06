import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const StartADrive = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    location: "",
    contactName: "",
    email: "",
    phone: "",
    itemTypes: [] as string[],
    timeframe: "",
    collectMethod: "",
    driveIdea: "",
    agreeToGuidance: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Submit your drive idea",
      description: "Tell us who you are, where you're based, and what you'd like to collect.",
    },
    {
      number: 2,
      title: "Align with official lists",
      description:
        "We help you narrow down items using current Government of Jamaica guidance.",
    },
    {
      number: 3,
      title: "Run your drive",
      description:
        "Promote, collect, and pack items using our simple packing and labeling tips.",
    },
    {
      number: 4,
      title: "Drop off or ship",
      description:
        "Deliver items to an Unbiased Relief drop-off location or logistics partner.",
    },
    {
      number: 5,
      title: "See the impact",
      description:
        "We share updates and stories from the field when your items reach Jamaica.",
    },
  ];

  const itemOptions = [
    "Tools & building supplies (hammers, nails, tarps, etc.)",
    "Water & sanitation items (buckets, containers, purification kits, cleaning supplies)",
    "Bedding & shelter (mattresses, sleeping bags, tents, blankets)",
    "Hygiene kits & basic medical supplies",
    "School supplies for children",
    "Mixed / not sure yet",
  ];

  const toggleItemType = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      itemTypes: prev.itemTypes.includes(item)
        ? prev.itemTypes.filter((i) => i !== item)
        : [...prev.itemTypes, item],
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form will be submitted to Formspree via action attribute
    // Basic validation
    if (
      !formData.organizationName ||
      !formData.organizationType ||
      !formData.location ||
      !formData.contactName ||
      !formData.email ||
      !formData.agreeToGuidance
    ) {
      e.preventDefault();
      alert("Please fill in all required fields and agree to the guidance.");
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Reset form
    setFormData({
      organizationName: "",
      organizationType: "",
      location: "",
      contactName: "",
      email: "",
      phone: "",
      itemTypes: [],
      timeframe: "",
      collectMethod: "",
      driveIdea: "",
      agreeToGuidance: false,
    });

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Start a Relief Drive
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            Turn your church, workplace, school, or community group into a collection hub for{" "}
            <strong>approved relief items</strong> that help Jamaica rebuild after Hurricane Melissa.
          </p>
          <p className="text-base text-muted-foreground italic">
            We'll guide you on what to collect, how to pack it, and where to send it—so every box
            and barrel makes real impact.
          </p>
        </section>

        {/* What Does It Mean Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            What Does It Mean to Start a Drive?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A drive is a focused, time-limited campaign where your group collects specific relief
            items—like tools, tarps, water containers, hygiene kits, or bedding—and delivers them
            to one of our partner drop-off points or logistics partners.
          </p>

          <ul className="space-y-3">
            {[
              "Choose a **category of items** based on official needs and our 'What to Donate' guide.",
              "Promote the drive to your community (we provide sample flyers and messages).",
              "Collect, sort, and label items clearly.",
              "Bring them to a designated **drop-off or shipping partner** by an agreed date.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            How Starting a Drive Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
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

        {/* Success Message */}
        {showSuccess && (
          <Alert className="mb-8 border-green-500 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="ml-4 text-green-800">
              <strong>Thank you!</strong> We've received your drive details and will be in touch
              within 1-2 business days. Check your email for next steps!
            </AlertDescription>
          </Alert>
        )}

        {/* Form Section */}
        <section id="start-drive-form" className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Lead a Drive?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Fill out the form below and our team will contact you with next steps, current
            priority items, and the best drop-off or shipping option for your area.
          </p>

          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xyzpqwab" method="POST" className="space-y-6">
                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization / Group Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Grace Community Church, Tech Workers Relief Group"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationName: e.target.value })
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
                      <SelectItem value="community">Community Group</SelectItem>
                      <SelectItem value="faith">Faith Organization / Church</SelectItem>
                      <SelectItem value="school">School / Campus</SelectItem>
                      <SelectItem value="business">Business / Workplace</SelectItem>
                      <SelectItem value="family">Family / Friends Group</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location (City & Country) *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Toronto, Canada"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Primary Contact Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
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
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Item Types */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    What type of items would you like to collect?
                  </label>
                  <div className="space-y-3">
                    {itemOptions.map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <Checkbox
                          id={option}
                          checked={formData.itemTypes.includes(option)}
                          onCheckedChange={() => toggleItemType(option)}
                        />
                        <label htmlFor={option} className="text-sm text-muted-foreground cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Approximate drive timeframe
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 4 weeks, January 15 – February 15"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  />
                </div>

                {/* Collection Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    How will you collect items?
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., at our church on Sundays, workplace donation drive, online orders"
                    value={formData.collectMethod}
                    onChange={(e) => setFormData({ ...formData, collectMethod: e.target.value })}
                  />
                </div>

                {/* Drive Idea */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your group and your idea
                  </label>
                  <Textarea
                    placeholder="Share your story, why this matters to you, and any specific goals for your drive..."
                    value={formData.driveIdea}
                    onChange={(e) => setFormData({ ...formData, driveIdea: e.target.value })}
                    rows={5}
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreeToGuidance}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreeToGuidance: checked as boolean })
                    }
                  />
                  <label htmlFor="agreement" className="text-sm text-muted-foreground cursor-pointer">
                    I understand that all items must follow Unbiased Relief guidance and official
                    Government of Jamaica relief lists.
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white"
                >
                  Submit Drive Idea
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Helpful Links Section */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Helpful Links While You Plan
          </h3>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/what-to-donate" className="text-primary hover:underline font-medium">
              What to Donate →
            </Link>
            <Link to="/drop-off-and-shipping" className="text-primary hover:underline font-medium">
              Drop-Off & Shipping →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartADrive;
