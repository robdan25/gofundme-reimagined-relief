import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    location: "",
    description: "",
    contactMe: false,
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const issueTypes = [
    "Suspicious/fake campaign",
    "Drop-off location problem",
    "Misuse of donated items",
    "Safety concern",
    "Incorrect site information",
    "Technical issue",
    "Other",
  ];

  const reportCategories = [
    "Fake or suspicious campaigns using our name or logo.",
    "Problems at a drop-off location (no one knows about the drive, signage missing, unsafe storage, disrespectful behaviour).",
    "Misuse of donated items (resale, hoarding, obvious diversion).",
    "Safety concerns for volunteers or donors.",
    "Incorrect or outdated information on the site (wrong address, wrong hours, outdated guidance).",
    "Technical issues with the website or chatbot.",
  ];

  const issueEmail = "info@unbiasedrelief.org";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form will be submitted to Formspree via action attribute
    // Show success message
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        issueType: "",
        location: "",
        description: "",
        contactMe: false,
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-warning" />
            Report an Issue
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            If you see something that doesn't look right—online or at a drop-off location—please
            tell us. Reporting issues helps us keep Unbiased Relief safe, transparent, and
            effective for everyone.
          </p>
          <p className="text-base text-muted-foreground italic">
            This page is for concerns about Unbiased Relief, our listed drives, or our partners.
            If anyone is in immediate danger, please contact local emergency services first.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: What You Can Report */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What You Can Report
            </h2>
            <ul className="space-y-3 text-muted-foreground ml-4 mb-6">
              {reportCategories.map((category, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-warning font-bold mt-1">•</span>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              You don't need proof to contact us—if something feels wrong, share what you saw and
              we'll review it in good faith.
            </p>
          </section>

          {/* Section 2: Urgent vs Non-Urgent */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Urgent vs Non-Urgent Issues
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-warning pl-4">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Urgent (act immediately)
                </h3>
                <p className="text-muted-foreground">
                  If anyone is in immediate danger, contact local emergency services first. You
                  can still report the situation to us afterward.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Non-Urgent (but important)
                </h3>
                <p className="text-muted-foreground">
                  Suspicious pages, incorrect information, technical bugs, and other concerns are
                  still important and should be reported using the form below. We'll investigate
                  and take action as needed.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Report an Issue Form */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tell Us What's Going On
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use the form below to describe the issue. The more details you share, the easier it
              is for us to investigate.
            </p>

            {submitSuccess && (
              <Alert className="mb-6 bg-primary/10 border-primary">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <p className="text-foreground font-medium">Thank you.</p>
                  <p className="text-muted-foreground">
                    We've received your report and will review it as soon as we can.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} action="https://formspree.io/f/xyzpqwab" method="POST" className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name (optional)"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Issue Type */}
              <div>
                <label
                  htmlFor="issueType"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Issue Type <span className="text-primary">*</span>
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select an issue type</option>
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Where did this happen? <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., website URL, address, campaign name"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Describe the issue <span className="text-primary">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Please be as specific as possible. Include dates, times, and any other details that might help us investigate."
                />
              </div>

              {/* Contact Me Checkbox */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactMe"
                    checked={formData.contactMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                  />
                  <span className="text-muted-foreground">
                    Yes, I'd like Unbiased Relief to contact me about this report
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3"
              >
                Submit Issue
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 italic">
              We review reports in good faith and may follow up with you or our partners for more
              information. We cannot promise a specific outcome in every case, but your report
              helps us act responsibly.
            </p>
          </section>

          {/* Section 4: How We Handle Your Report */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How We Handle Your Report
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you submit an issue, our team will log your report, review the details, and,
              where appropriate, contact partners or update information on the site. Serious safety
              or fraud concerns may be escalated to appropriate partners or authorities.
            </p>
          </section>

          {/* Section 5: Prefer Email */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Prefer Email?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can also email us directly about concerns at:
            </p>
            <Card className="border-border bg-card mb-4">
              <CardContent className="p-6">
                <p className="text-center font-medium text-foreground mb-3">
                  <a
                    href={`mailto:${issueEmail}`}
                    className="text-primary hover:underline"
                  >
                    {issueEmail}
                  </a>
                </p>
              </CardContent>
            </Card>
            <p className="text-muted-foreground">
              Please include as much detail as you can (location, time, and screenshots if
              available).
            </p>
          </section>

          {/* Final CTA */}
          <Alert className="bg-warning/10 border-warning">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription>
              <p className="text-foreground font-medium mb-2">Your report matters.</p>
              <p className="text-muted-foreground">
                Community feedback is essential to keeping Unbiased Relief trustworthy and safe.
                Thank you for helping us maintain the integrity of relief efforts.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportIssue;
