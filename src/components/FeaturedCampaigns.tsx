import CampaignCard from "./CampaignCard";
import campaignFamily from "@/assets/campaign-family.jpg";
import campaignSchool from "@/assets/campaign-school.jpg";
import campaignMedical from "@/assets/campaign-medical.jpg";

const FeaturedCampaigns = () => {
  const campaigns = [
    {
      image: campaignFamily,
      title: "Emergency Relief for Port Antonio Families",
      organizer: "Jamaica Red Cross",
      description: "Providing immediate food, water, and shelter supplies to 200+ families who lost their homes in Port Antonio during Hurricane Melissa.",
      raised: 87500,
      goal: 120000,
      donors: 1247,
      daysLeft: 18,
      verified: true,
      urgent: true,
    },
    {
      image: campaignSchool,
      title: "Rebuild St. Mary Primary School",
      organizer: "Ministry of Education Jamaica",
      description: "Help us rebuild the school that serves 450 students. The hurricane destroyed classrooms, the library, and essential facilities.",
      raised: 156000,
      goal: 250000,
      donors: 892,
      daysLeft: 25,
      verified: true,
      urgent: false,
    },
    {
      image: campaignMedical,
      title: "Mobile Medical Clinics for Rural Communities",
      organizer: "Jamaica Medical Relief Foundation",
      description: "Deploying mobile medical units to provide healthcare, medicines, and emergency treatment to isolated communities affected by the hurricane.",
      raised: 64200,
      goal: 95000,
      donors: 534,
      daysLeft: 12,
      verified: true,
      urgent: true,
    },
  ];

  return (
    <section id="campaigns" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Relief Campaigns
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verified campaigns making immediate impact. All donations are tracked and go directly to relief efforts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="text-primary hover:text-primary-hover font-medium text-lg hover:underline">
            View All Campaigns →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
