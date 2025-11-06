import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, CheckCircle, Lock } from "lucide-react";

const Safety = () => {
  const lastUpdated = "November 2025";
  const contactEmail = "info@unbiasedrelief.org";

  const safetyTips = [
    "Only donate through verified campaigns on Unbiased Relief or trusted partner organizations.",
    "Check campaign organizer credentials and contact information before contributing.",
    "Use secure payment methods and never share sensitive banking details via email or chat.",
    "Be wary of unsolicited requests for donations outside of official channels.",
    "Report suspicious activity or fraudulent campaigns to us immediately.",
    "Verify drop-off locations by calling ahead before visiting with your items.",
  ];

  const redFlags = [
    "Requests for wire transfers, gift cards, or cryptocurrency",
    "Pressure to donate quickly without verification",
    "Lack of transparent information about how funds or items are used",
    "Organizers requesting personal financial information",
    "Campaigns that don't align with official government relief guidance",
    "No verifiable contact information or legitimate organizational affiliation",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Safety & Security
          </h1>
          <p className="text-base text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-base md:text-lg leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Our Commitment to Safety
            </h2>
            <p className="text-muted-foreground mb-4">
              At Unbiased Relief, protecting your trust and safety is our top priority. We are
              committed to maintaining a secure, transparent platform where donors, organizers, and
              partners can work together with confidence.
            </p>
            <p className="text-muted-foreground">
              This page outlines how we approach safety, security, and fraud prevention—and what you
              can do to protect yourself while using our Services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Platform Security
            </h2>
            <p className="text-muted-foreground mb-6">
              We implement multiple layers of security to protect the integrity of our platform:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold text-foreground mb-2">Secure Data Encryption</h3>
                <p className="text-muted-foreground">
                  All data transmitted between your device and our servers is encrypted using
                  industry-standard SSL/TLS protocols.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold text-foreground mb-2">Authentication & Access Control</h3>
                <p className="text-muted-foreground">
                  User accounts are protected by secure password requirements and optional
                  two-factor authentication. Only authorized staff have access to sensitive data.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold text-foreground mb-2">Regular Security Audits</h3>
                <p className="text-muted-foreground">
                  We conduct ongoing security reviews and penetration testing to identify and
                  address vulnerabilities before they can be exploited.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold text-foreground mb-2">Fraud Detection & Prevention</h3>
                <p className="text-muted-foreground">
                  We monitor platform activity for suspicious behavior, unauthorized transactions,
                  and fraudulent campaigns using automated and manual review processes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Campaign Verification Process
            </h2>
            <p className="text-muted-foreground mb-6">
              Before campaigns are featured on Unbiased Relief, they undergo a verification process:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Organizer Verification:</strong> We confirm the identity and legitimacy of
                campaign organizers, including organizational affiliation where applicable.
              </li>
              <li>
                • <strong>Relief Alignment:</strong> Campaigns must align with official relief
                guidance from government agencies and recognized humanitarian organizations.
              </li>
              <li>
                • <strong>Transparency Requirements:</strong> Organizers provide clear information
                about where items go, how they're distributed, and updates on impact.
              </li>
              <li>
                • <strong>Contact Verification:</strong> We confirm that all contact information
                (phone, email, address) is legitimate and operational.
              </li>
              <li>
                • <strong>Ongoing Monitoring:</strong> Active campaigns are monitored for complaints,
                issues, or signs of misuse.
              </li>
            </ul>
            <Alert className="mt-6 bg-muted/50 border-border">
              <AlertDescription className="text-sm text-muted-foreground italic">
                "Verified" status indicates that Unbiased Relief has conducted initial checks, but
                does not guarantee that a campaign will succeed or be free from all risks. Use your
                judgment and contact organizers directly with questions.
              </AlertDescription>
            </Alert>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-warning" />
              Red Flags: How to Spot Fraudulent Campaigns
            </h2>
            <p className="text-muted-foreground mb-6">
              Be cautious of campaigns or requests that exhibit any of these warning signs:
            </p>
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-warning font-bold mt-1">⚠</span>
                      <span className="text-muted-foreground">{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <p className="text-muted-foreground mt-6">
              If you encounter any of these red flags, do not donate. Instead, report the campaign
              to us immediately at{" "}
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline font-medium">
                {contactEmail}
              </a>
              .
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Safety Tips for Donors
            </h2>
            <div className="space-y-4">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  </div>
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Safety Tips for Campaign Organizers
            </h2>
            <p className="text-muted-foreground mb-6">
              If you are organizing a relief drive, follow these best practices to build trust and
              protect your donors:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Be Transparent:</strong> Clearly explain what items you're collecting,
                where they're going, and how they'll be distributed.
              </li>
              <li>
                • <strong>Provide Updates:</strong> Share regular progress reports and photos with
                donors showing how items are being used (with privacy in mind).
              </li>
              <li>
                • <strong>Collect Safely:</strong> Designate clear collection locations, set
                collection hours, and ensure a responsible person is always present.
              </li>
              <li>
                • <strong>Document Everything:</strong> Keep records of items collected, donor
                information, and final distribution to demonstrate accountability.
              </li>
              <li>
                • <strong>Use Official Channels:</strong> Always use Unbiased Relief's platform to
                communicate with donors rather than personal email or phone.
              </li>
              <li>
                • <strong>Respect Donor Privacy:</strong> Do not share donor information with
                third parties without explicit consent.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What We Do Not Do
            </h2>
            <p className="text-muted-foreground mb-6">
              To clarify what we are not, Unbiased Relief:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • Does not process payments or collect financial contributions directly. Donations
                are coordinated through partner organizations and charities.
              </li>
              <li>
                • Does not guarantee that any specific donation will reach a particular location or
                be used in a specific way.
              </li>
              <li>
                • Does not take responsibility for how partner organizations manage collected items,
                though we require transparency and alignment with relief goals.
              </li>
              <li>
                • Does not provide legal, tax, or financial advice. Always consult professionals
                before making large donations or tax deductions.
              </li>
              <li>
                • Does not store sensitive payment information on our platform. Payment processing
                (if any) is handled by secure third-party providers.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Data Protection & Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personal information is handled with care and respect. For details on how we
              collect, use, and protect your data, please see our{" "}
              <a href="/privacy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-muted-foreground">
              In summary, we:
            </p>
            <ul className="space-y-2 text-muted-foreground mt-3 ml-4">
              <li>• Encrypt data in transit and at rest</li>
              <li>• Limit data access to authorized personnel only</li>
              <li>• Do not sell or share your information without consent (except with necessary partners)</li>
              <li>• Retain data only as long as necessary for our Services</li>
              <li>• Respect your privacy rights, including the right to access, correct, or delete your data</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Reporting Safety Concerns
            </h2>
            <p className="text-muted-foreground mb-6">
              If you encounter a safety concern, fraudulent campaign, or suspicious activity on
              Unbiased Relief, please report it immediately. We take all reports seriously and will
              investigate promptly.
            </p>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">How to Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">Email:</p>
                  <p className="text-muted-foreground">
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                      {contactEmail}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">In Your Report, Include:</p>
                  <ul className="space-y-1 text-muted-foreground ml-4">
                    <li>• The campaign ID or link to the suspicious campaign</li>
                    <li>• A description of the suspicious activity</li>
                    <li>• Any screenshots or evidence (if available)</li>
                    <li>• Your contact information so we can follow up</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Consequences for Violations
            </h2>
            <p className="text-muted-foreground mb-4">
              We take violations of our platform policies seriously. Actions we may take include:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Campaign Suspension or Removal:</strong> Campaigns found to be fraudulent,
                misleading, or unsafe are suspended or removed immediately.
              </li>
              <li>
                • <strong>Account Termination:</strong> Users who engage in fraudulent or harmful
                behavior may have their accounts permanently terminated.
              </li>
              <li>
                • <strong>Law Enforcement Referral:</strong> In cases of fraud, theft, or other
                criminal activity, we may report to law enforcement authorities.
              </li>
              <li>
                • <strong>Public Notice:</strong> In serious cases, we may issue public warnings about
                fraudulent campaigns or unsafe practices.
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Third-Party Safety
            </h2>
            <p className="text-muted-foreground mb-4">
              Many of our relief efforts involve third-party organizations, including:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-6">
              <li>• Charities and non-profit organizations</li>
              <li>• Government agencies and relief coordinators</li>
              <li>• Logistics and shipping providers</li>
              <li>• Community groups and volunteers</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              While we partner with organizations we trust, each has its own policies and practices.
              We recommend:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • Researching partner organizations independently before donating through them.
              </li>
              <li>
                • Reviewing their privacy policies, safety practices, and track records.
              </li>
              <li>
                • Asking questions directly to the organization if you have concerns.
              </li>
              <li>
                • Contacting us if you discover unsafe practices from any of our partners.
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Updates to This Policy
            </h2>
            <p className="text-muted-foreground">
              We review and update our safety practices regularly as threats evolve and our platform
              grows. Any significant changes to this Safety & Security policy will be announced on
              this page, with the "Last updated" date revised accordingly.
            </p>
          </section>

          {/* Final CTA */}
          <section>
            <Alert className="bg-primary/10 border-primary">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription>
                <p className="text-foreground font-medium mb-2">Questions? We're Here to Help</p>
                <p className="text-muted-foreground">
                  If you have any safety or security questions, or if you'd like more information
                  about how we protect our community, please don't hesitate to reach out at{" "}
                  <a href={`mailto:${contactEmail}`} className="text-primary hover:underline font-medium">
                    {contactEmail}
                  </a>
                  . Your trust is everything to us.
                </p>
              </AlertDescription>
            </Alert>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;
