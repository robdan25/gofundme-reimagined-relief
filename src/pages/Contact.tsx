import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactReasons = [
    "Question about what to donate",
    "Drop-off / shipping question",
    "Start a drive",
    "Partnership inquiry",
    "Media / press",
    "Technical issue",
    "Other",
  ];

  const contactChannels = [
    {
      label: "General inquiries",
      email: "info@unbiasedrelief.org",
    },
    {
      label: "Media & press",
      email: "press@unbiasedrelief.org",
    },
    {
      label: "Issues & safety concerns",
      email: "issues@unbiasedrelief.org",
    },
  ];

  const helpfulLinks = [
    { label: "Help Center", href: "/help-center" },
    { label: "What to Donate", href: "/what-to-donate" },
    { label: "Drop-Off & Shipping", href: "/drop-off-and-shipping" },
    { label: "Report an Issue", href: "/report-issue" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        phone: "",
        reason: "",
        message: "",
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
            <Mail className="w-10 h-10 text-primary" />
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a question about donating items, starting a drive, partnering with us, or using the
            Unbiased Relief site? We'd love to hear from you. Use the form below or reach out
            through the channels that fit you best.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: When to Reach Out */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              When to Reach Out
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We're here to help with a wide range of questions and inquiries. Here are some common
              reasons to get in touch:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4 mb-6">
              {[
                "Questions about what to donate.",
                "Help finding a drop-off or shipping option.",
                "Support with starting or registering a drive.",
                "Partnership or media inquiries.",
                "Technical issues with the website or chatbot.",
              ].map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              To report something unsafe or suspicious, please use our{" "}
              <Link to="/report-issue" className="text-primary hover:underline font-medium">
                Report an Issue
              </Link>{" "}
              page so we can capture all the details properly.
            </p>
          </section>

          {/* Section 2: Contact Form */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Share a few details and we'll do our best to respond as soon as we can.
            </p>

            {submitSuccess && (
              <Alert className="mb-6 bg-primary/10 border-primary">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <p className="text-foreground font-medium">Thank you for contacting us.</p>
                  <p className="text-muted-foreground">
                    We'll get back to you as soon as we can.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} action="https://formspree.io/f/xyzpqwab" method="POST" className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your full name"
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
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone or WhatsApp <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+1 (234) 567-8900"
                />
              </div>

              {/* Reason for contacting */}
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Reason for contacting us <span className="text-primary">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a reason</option>
                  {contactReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Tell us more about your question or inquiry..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3"
              >
                Send Message
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 italic">
              Please avoid sharing sensitive personal information. If your question is urgent or
              time-sensitive, mention that in your message.
            </p>
          </section>

          {/* Section 3: Other Ways to Reach Us */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-4">
              {contactChannels.map((channel, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {channel.label}:
                  </p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {channel.email}
                  </a>
                </div>
              ))}
            </div>
            <div className="border-l-4 border-primary pl-4 py-2 mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Website:</p>
              <a
                href="https://unbiasedrelief.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                https://unbiasedrelief.org
              </a>
            </div>
          </section>

          {/* Section 4: Helpful Links */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Helpful Links
            </h2>
            <ul className="space-y-3 text-muted-foreground ml-4">
              {helpfulLinks.map((link, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <Link to={link.href} className="text-primary hover:underline font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Final CTA */}
          <Alert className="bg-primary/10 border-primary">
            <Mail className="h-4 w-4 text-primary" />
            <AlertDescription>
              <p className="text-foreground font-medium mb-2">We look forward to hearing from you.</p>
              <p className="text-muted-foreground">
                Whether you have a quick question or a detailed inquiry, your input helps us serve
                the Unbiased Relief community better.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
