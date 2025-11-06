import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    roles: [] as string[],
    availability: "",
    interests: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const volunteerRoles = [
    "Host a collection drive",
    "Help at a drop-off location",
    "Sort/pack/label items",
    "Outreach & communications",
    "Logistics/transport",
    "Other",
  ];

  const priorities = [
    "GTA volunteers to help at drop-off locations and packing events.",
    "Drive organizers willing to lead focused collections (tools, hygiene, school supplies, etc.).",
    "Communications & outreach helpers to connect with churches, schools, and community groups.",
  ];

  const expectations = [
    "We'll ask about your location, availability, and interests.",
    "For in-person roles, we'll confirm venues, dates, and basic safety guidelines.",
    "Some roles are short-term (one event); others are ongoing.",
    "We'll do our best to communicate clearly and respect your time.",
  ];

  const handleRoleChange = (role: string) => {
    setFormData((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

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
        city: "",
        country: "",
        roles: [],
        availability: "",
        interests: "",
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
            <Heart className="w-10 h-10 text-primary" />
            Volunteer with Unbiased Relief
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Unbiased Relief is powered by volunteers—people who pack boxes, host drives, share
            information, and help connect relief items to families in Jamaica after Hurricane
            Melissa. Whether you're in the GTA, elsewhere in Canada, or abroad, there are ways you
            can help.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: Ways to Volunteer */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ways to Volunteer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You don't have to be an expert to support relief. Here are some practical ways to
              get involved:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <strong className="text-foreground">Host a collection drive</strong>
                  <p className="text-sm mt-1">
                    Organize a drive at your church, school, workplace, or community group.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <strong className="text-foreground">Help at a drop-off site</strong>
                  <p className="text-sm mt-1">
                    Greet donors, unload cars, sort items, and keep the space organized.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <strong className="text-foreground">Sort, pack & label items</strong>
                  <p className="text-sm mt-1">
                    Join packing sessions to sort donations, check quality, and label boxes.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <strong className="text-foreground">Spread the word online</strong>
                  <p className="text-sm mt-1">Share campaigns and official needs lists.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <strong className="text-foreground">Offer professional skills</strong>
                  <p className="text-sm mt-1">Design, translation, logistics, tech, and more.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 2: Current Priorities */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Current Volunteer Priorities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Right now, we're focused on building our volunteer network in key locations and roles
              to support ongoing relief efforts:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4 mb-6">
              {priorities.map((priority, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed italic">
              Needs may change as campaigns evolve. When you sign up, we'll match you to roles that
              fit your location, skills, and availability.
            </p>
          </section>

          {/* Section 3: What to Expect */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What to Expect as a Volunteer
            </h2>
            <ul className="space-y-3 text-muted-foreground ml-4">
              {expectations.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Volunteer Sign-Up Form */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sign Up to Volunteer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Tell us how you'd like to help, and we'll contact you as opportunities come up.
            </p>

            {submitSuccess && (
              <Alert className="mb-6 bg-primary/10 border-primary">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <p className="text-foreground font-medium">Thank you!</p>
                  <p className="text-muted-foreground">
                    We've received your volunteer interest and will be in touch as opportunities
                    arise.
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

              {/* City & Country */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                    City <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Toronto"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Country <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Canada"
                  />
                </div>
              </div>

              {/* How would you like to help? */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  How would you like to help? <span className="text-primary">*</span>
                </label>
                <div className="space-y-2">
                  {volunteerRoles.map((role) => (
                    <label key={role} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                        className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                      />
                      <span className="text-muted-foreground">{role}</span>
                    </label>
                  ))}
                </div>
                {formData.roles.length === 0 && (
                  <p className="text-xs text-primary mt-2">Please select at least one role</p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Availability <span className="text-primary">*</span>
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select an option</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible/varies</option>
                </select>
              </div>

              {/* Interests/Skills */}
              <div>
                <label
                  htmlFor="interests"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Tell us a bit about your skills or interests
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="E.g., I have logistics experience, speak Spanish, can help on weekends, etc."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3"
              >
                Submit Volunteer Interest
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 italic">
              We may not be able to place every volunteer immediately, but we'll keep your details
              on file and reach out as needs arise.
            </p>
          </section>

          {/* Section 5: Volunteer Safety */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Volunteer Safety
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We take safety seriously. Volunteers are expected to follow venue rules, basic
              lifting and storage guidelines, and our Safety & Security principles. If you ever
              feel unsafe or see something that doesn't look right, please tell us immediately.
            </p>
            <p className="text-muted-foreground">
              For more information, visit our{" "}
              <Link to="/safety" className="text-primary hover:underline font-medium">
                Safety & Security page
              </Link>
              .
            </p>
          </section>

          {/* Section 6: Questions */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Questions About Volunteering?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you're unsure where you fit, or you're representing a group that wants to help,
              reach out. For quick answers, visit our{" "}
              <Link to="/help-center" className="text-primary hover:underline font-medium">
                Help Center
              </Link>
              .
            </p>
          </section>

          {/* Final CTA */}
          <Alert className="bg-primary/10 border-primary">
            <Heart className="h-4 w-4 text-primary" />
            <AlertDescription>
              <p className="text-foreground font-medium mb-2">Ready to make a difference?</p>
              <p className="text-muted-foreground">
                Every hour counts. Whether you can help for one afternoon or commit to ongoing
                support, your contribution matters. Fill out the form above to get started.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteer;
