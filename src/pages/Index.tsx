import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import ImpactStats from "@/components/ImpactStats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCampaigns />
        <Categories />
        <ImpactStats />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
