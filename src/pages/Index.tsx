import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OfficialAgenciesStrip from "@/components/OfficialAgenciesStrip";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import ImpactStats from "@/components/ImpactStats";
import ConnectWithUs from "@/components/ConnectWithUs";
import JamaicaNewsFeed from "@/components/JamaicaNewsFeed";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema, WebPageSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://unbiasedrelief.org" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hurricane Melissa Jamaica Relief Support"
        description="Support Hurricane Melissa relief efforts in Jamaica. Donate to verified campaigns helping families, rebuilding communities, and providing essential aid. Trusted relief organization."
        canonical="https://unbiasedrelief.org"
        keywords="Jamaica relief, Hurricane Melissa donations, Jamaica disaster aid, community support, verified relief campaigns"
      />
      <OrganizationSchema />
      <WebPageSchema
        title="Hurricane Melissa Jamaica Relief Support"
        description="Support Hurricane Melissa relief efforts in Jamaica. Donate to verified campaigns helping families, rebuilding communities, and providing essential aid."
        canonical="https://unbiasedrelief.org"
      />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <Header />
      <main>
        <Hero />
        <OfficialAgenciesStrip />
        <FeaturedCampaigns />
        <Categories />
        <ImpactStats />
        <ConnectWithUs />

        {/* Hurricane Melissa News Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Latest Hurricane Melissa News
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-time coverage from major Jamaican news outlets. Get the latest updates on relief efforts and recovery initiatives.
              </p>
            </div>

            <JamaicaNewsFeed limit={3} />

            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white">
                <Link to="/news">
                  View All News Articles →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
