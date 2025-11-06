import { Link } from "react-router-dom";
import DriveCard from "./DriveCard";
import { getFeaturedCampaigns } from "@/data/campaigns";

const FeaturedCampaigns = () => {
  const drives = getFeaturedCampaigns();

  return (
    <section id="drives" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Relief Drives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verified drives collecting approved supplies. Every item goes directly to communities in need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive, index) => (
            <DriveCard key={index} {...drive} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/official-relief-lists" className="text-primary hover:text-primary-hover font-medium text-lg hover:underline inline-block">
            View All Drives →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
