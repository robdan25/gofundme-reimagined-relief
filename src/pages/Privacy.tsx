import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  const lastUpdated = "November 2025";
  const contactEmail = "info@unbiasedrelief.org";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-base text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-base md:text-lg leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We may collect the following types of information when you use our Services:
            </p>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-bold text-foreground mb-2">Contact Information</h3>
                <p>
                  Name, email address, phone number, and mailing address (provided when you
                  sign up, start a drive, or contact us).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Information About Drives and Donations
                </h3>
                <p>
                  Details about relief drives you organize or participate in, items donated,
                  quantities, and descriptions you provide.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Usage Information</h3>
                <p>
                  Information about how you interact with our site, including pages visited,
                  time spent, clicks, and referring URLs. This is collected through cookies and
                  analytics tools.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Device Information</h3>
                <p>
                  IP address, browser type, operating system, device type, and other technical
                  details about the device you use to access our Services.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Uploaded Content</h3>
                <p>
                  Any photos, documents, drive descriptions, testimonials, or other content you
                  upload or submit to our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Providing Services:</strong> To operate, maintain, and improve our platform,
                process donations, and manage relief drives.
              </li>
              <li>
                • <strong>Communication:</strong> To send you updates, confirmations, newsletters,
                and other information related to your account or campaigns you're involved with.
              </li>
              <li>
                • <strong>Verification:</strong> To verify your identity and confirm the accuracy
                of information about drives or donations.
              </li>
              <li>
                • <strong>Analytics and Improvements:</strong> To understand how users interact
                with our site and make improvements to user experience.
              </li>
              <li>
                • <strong>Legal Compliance:</strong> To comply with laws, regulations, and legal
                requests.
              </li>
              <li>
                • <strong>Fraud Prevention:</strong> To detect and prevent fraudulent activity,
                abuse, or misuse of our Services.
              </li>
              <li>
                • <strong>Marketing and Outreach:</strong> To send you updates about relief efforts,
                new campaigns, or stories about impact (only if you've opted in).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              3. Legal Basis for Processing
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are located in a jurisdiction with specific data protection laws (such as the
              EU General Data Protection Regulation), we process your information based on:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Consent:</strong> Your explicit agreement to process your data for specific
                purposes.
              </li>
              <li>
                • <strong>Contract Performance:</strong> To fulfill your requests and provide our
                Services.
              </li>
              <li>
                • <strong>Legal Obligation:</strong> To comply with applicable laws and regulations.
              </li>
              <li>
                • <strong>Legitimate Interests:</strong> To operate our business, prevent fraud, and
                improve our Services.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal information. However, we may share your information in
              the following circumstances:
            </p>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-bold text-foreground mb-2">With Partner Organizations</h3>
                <p>
                  We share information with trusted partner charities, community organizations, and
                  logistics providers who help distribute relief items or manage campaigns (only the
                  information necessary for them to perform their role).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">With Service Providers</h3>
                <p>
                  We share information with vendors who provide services such as hosting, email,
                  analytics, payment processing, and customer support. These providers are bound by
                  confidentiality agreements.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">For Legal Reasons</h3>
                <p>
                  We may disclose information if required by law, court order, or to protect the
                  rights and safety of Unbiased Relief, our users, or the public.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Business Transfers</h3>
                <p>
                  If our organization is involved in a merger, acquisition, or asset sale, your
                  information may be transferred as part of that transaction. We will provide notice
                  before your information becomes subject to a different privacy policy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground mb-4">
              Our site uses cookies and similar tracking technologies to:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6 ml-4">
              <li>• Remember your preferences and login information</li>
              <li>• Analyze website usage and performance</li>
              <li>• Deliver targeted content and advertisements</li>
              <li>• Prevent fraud and enhance security</li>
            </ul>
            <p className="text-muted-foreground">
              Most browsers allow you to control cookies through their settings. You can choose to
              disable cookies, but doing so may limit your ability to use certain features of our
              Services.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              6. Data Retention
            </h2>
            <p className="text-muted-foreground mb-4">
              We retain your information for as long as:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>• Your account is active</li>
              <li>• We need it to provide our Services</li>
              <li>• We are required to keep it for legal or tax purposes</li>
            </ul>
            <p className="text-muted-foreground">
              If you request account deletion, we will remove your personal information, except
              where we are required by law to retain it. Some information may be retained in
              anonymized form for analytics purposes.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              7. Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights regarding your personal
              information:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • <strong>Right to Access:</strong> Request a copy of the information we hold about
                you.
              </li>
              <li>
                • <strong>Right to Correct:</strong> Request correction of inaccurate or incomplete
                information.
              </li>
              <li>
                • <strong>Right to Delete:</strong> Request deletion of your personal information
                (subject to certain exceptions).
              </li>
              <li>
                • <strong>Right to Opt-Out:</strong> Opt out of marketing communications or certain
                data processing activities.
              </li>
              <li>
                • <strong>Right to Data Portability:</strong> Request your data in a portable format
                for transfer to another service.
              </li>
              <li>
                • <strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time for
                optional data processing.
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                {contactEmail}
              </a>
              .
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              8. Third-Party Links and Services
            </h2>
            <p className="text-muted-foreground mb-4">
              Our site may contain links to third-party websites and services (such as government
              agencies, partner charities, or payment processors). These third parties have their own
              privacy policies, and we are not responsible for their practices or content.
            </p>
            <p className="text-muted-foreground">
              We recommend reviewing the privacy policies of any third-party services before providing
              your information.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              9. Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We take data security seriously and implement technical, administrative, and physical
              safeguards to protect your information, including:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>• Encryption of data in transit (SSL/TLS)</li>
              <li>• Secure password storage and authentication</li>
              <li>• Access controls and role-based permissions</li>
              <li>• Regular security audits and updates</li>
            </ul>
            <p className="text-muted-foreground">
              However, no method of transmission over the Internet is completely secure. While we
              strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-muted-foreground mb-4">
              Unbiased Relief is based in Canada, and your information may be processed, stored, and
              transferred in Canada and other countries where we or our partners operate.
            </p>
            <p className="text-muted-foreground">
              By using our Services, you consent to the transfer of your information to countries
              that may have data protection laws different from your country of residence. We will
              take appropriate safeguards to protect your information in accordance with this Privacy
              Policy.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              11. Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              Our Services are not directed to children under the age of 13. We do not knowingly
              collect personal information from children under 13.
            </p>
            <p className="text-muted-foreground">
              If we become aware that we have collected information from a child under 13, we will
              promptly delete such information and terminate the child's account. If you believe we
              have collected information from a child under 13, please contact us at{" "}
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                {contactEmail}
              </a>
              .
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "Last updated" date at the top of this page and notify you of significant changes.
            </p>
            <p className="text-muted-foreground">
              Your continued use of the Services after changes are posted constitutes your acceptance
              of the updated Privacy Policy. We encourage you to review this policy periodically to
              stay informed about how we protect your information.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              13. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please
              contact us at:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Unbiased Relief</strong>
              </p>
              <p>Email: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a></p>
              <p>Website: <a href="https://unbiasedrelief.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://unbiasedrelief.org</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
