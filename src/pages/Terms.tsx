import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  const lastUpdated = "November 2025";
  const contactEmail = "info@unbiasedrelief.org";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Terms of Service
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
              1. What Unbiased Relief Does
            </h2>
            <p className="text-muted-foreground mb-4">
              Unbiased Relief ("Unbiased Relief", "we", "us", or "our") is a community
              platform that helps:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>
                • Share official relief needs and guidance from government and partner
                agencies.
              </li>
              <li>
                • Coordinate item-based donation drives (for example, barrels of supplies)
                for disaster relief.
              </li>
              <li>
                • Connect donors, community groups, and partner organizations that can
                collect, store, and ship approved relief items.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We do not guarantee that any particular item or campaign will be accepted,
              shipped, or delivered on a specific date. Logistics, customs rules, and
              on-the-ground conditions may change.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              2. Eligibility
            </h2>
            <p className="text-muted-foreground mb-4">
              By using our Services, you confirm that:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li>
                • You are at least 18 years old (or using the site with the supervision
                of a parent or guardian).
              </li>
              <li>
                • You have the authority to act on behalf of any group or organization you
                register or represent.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              3. Information on This Site
            </h2>
            <p className="text-muted-foreground mb-4">
              We work hard to keep information accurate and up to date, especially around:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 ml-4">
              <li>• Official needs lists</li>
              <li>• Drop-off locations and hours</li>
              <li>• Customs and duty waiver information</li>
            </ul>
            <p className="text-muted-foreground mb-4">However:</p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>• Information may change without notice.</li>
              <li>
                • Government policies, waivers, and customs rules are determined by the
                relevant authorities, not by Unbiased Relief.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We provide this information for general guidance only. You are responsible
              for confirming details with the relevant agency, shipper, or partner
              organization before acting.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              4. Campaigns and Drives
            </h2>
            <p className="text-muted-foreground mb-4">
              Our site may show campaigns organized by:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 ml-4">
              <li>• Unbiased Relief itself; and/or</li>
              <li>• Partner organizations (charities, community groups, churches, schools).</li>
            </ul>
            <p className="text-muted-foreground mb-4">For each campaign, we may:</p>
            <ul className="space-y-2 text-muted-foreground mb-6 ml-4">
              <li>• List suggested items, quantities, and timelines.</li>
              <li>
                • Highlight whether a campaign is "verified" or "urgent" based on checks we
                perform in good faith.
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">However:</p>
            <ul className="space-y-3 text-muted-foreground mb-6 ml-4">
              <li>• We do not own or control all partner campaigns.</li>
              <li>
                • We are not responsible for how a third-party organization manages its
                collections, storage, transportation, or distribution.
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              If you start a drive through our "Start a Drive" process, you agree that:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>• The information you provide is truthful and accurate.</li>
              <li>
                • You will follow our guidelines on what to collect and how to pack/label
                items.
              </li>
              <li>
                • You will respect local laws, building rules, and safety regulations at
                your collection location.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We reserve the right to decline, suspend, or remove any drive or campaign
              that appears unsafe, misleading, or inconsistent with our values or partner
              requirements.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              5. Donated Items & Logistics
            </h2>
            <p className="text-muted-foreground mb-4">When you donate items:</p>
            <ul className="space-y-3 text-muted-foreground mb-6 ml-4">
              <li>• All items are given voluntarily and without compensation.</li>
              <li>
                • We cannot guarantee that any particular item will be used in a specific
                community, facility, or region.
              </li>
              <li>
                • Items that are unsafe, expired, inappropriate, or not on the needs list
                may be re-routed, stored, or disposed of at the discretion of our partners.
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Shipping, customs clearance, and final distribution are often handled by
              third-party partners such as:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4 ml-4">
              <li>• Government agencies</li>
              <li>• Non-profit organizations</li>
              <li>• Logistics and shipping providers</li>
            </ul>
            <p className="text-muted-foreground">
              Delays or issues in transport, customs, or distribution are outside of our
              direct control.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              6. No Tax or Legal Advice
            </h2>
            <p className="text-muted-foreground mb-4">
              Any references to duty waivers, tax exemptions, or charitable receipts are
              for informational purposes only.
            </p>
            <p className="text-muted-foreground">
              We do not provide tax, legal, or financial advice. You should consult your
              own advisor to understand whether your contributions are tax-deductible or
              how any waivers apply to you.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              7. Your Content & Communications
            </h2>
            <p className="text-muted-foreground mb-4">
              If you submit content to us (for example: messages, photos, drive
              descriptions, or testimonials):
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>
                • You grant Unbiased Relief a non-exclusive, royalty-free license to use,
                reproduce, and display that content in connection with our Services and
                communications.
              </li>
              <li>
                • You confirm that you have the right to share that content and that it
                does not violate any third-party rights or laws.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We may remove any content we believe is offensive, harmful, misleading, or
              unrelated to our mission.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              8. Acceptable Use
            </h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>• Use the site for fraudulent, illegal, or deceptive purposes.</li>
              <li>• Impersonate another person or organization.</li>
              <li>
                • Post or transmit content that is hateful, harassing, defamatory, or
                discriminatory.
              </li>
              <li>
                • Attempt to interfere with the security or proper functioning of the site.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We may suspend or block access to the Services for users who violate these
              Terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              9. Third-Party Links and Services
            </h2>
            <p className="text-muted-foreground mb-4">
              Our site may link to or integrate with third-party websites and services
              (for example: government sites, partner charities, logistics providers, or
              donation platforms).
            </p>
            <p className="text-muted-foreground">
              These third parties have their own terms and privacy policies. We are not
              responsible for their content, actions, or policies. You use third-party
              sites at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              10. Disclaimers
            </h2>
            <p className="text-muted-foreground mb-4">
              The Services are provided on an "as is" and "as available" basis.
            </p>
            <p className="text-muted-foreground mb-4">To the fullest extent permitted by law, we:</p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>
                • Do not warrant that the site will be uninterrupted, error-free, or free
                of harmful components.
              </li>
              <li>
                • Do not guarantee that any specific campaign, drive, or shipment will
                reach a particular outcome.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Your use of the site, and your decision to donate, organize, or ship items,
              is at your own risk.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              11. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, Unbiased Relief and its directors,
              volunteers, partners, and affiliates will not be liable for:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-4 ml-4">
              <li>
                • Any indirect, incidental, special, or consequential damages; or
              </li>
              <li>
                • Any loss of goods, data, or opportunities arising from or related to your
                use of the Services, donations, or participation in campaigns.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Where liability cannot be excluded, it will be limited to the extent
              permitted by applicable law.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              12. Changes to These Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update these Terms from time to time. When we do, we will revise the
              "Last updated" date at the top.
            </p>
            <p className="text-muted-foreground">
              Continued use of the Services after changes are posted means you accept the
              updated Terms. If you do not agree with the changes, you should stop using
              the site.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              13. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms or how our platform works, you can
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

export default Terms;
