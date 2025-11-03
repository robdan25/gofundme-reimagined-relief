import CampaignCard from "./CampaignCard";
import driveHygiene from "@/assets/drive-hygiene-kits.jpg";
import driveSchool from "@/assets/drive-school-supplies.jpg";
import driveMedical from "@/assets/drive-medical-supplies.jpg";

const FeaturedCampaigns = () => {
  const drives = [
    {
      image: driveHygiene,
      title: "Hygiene & Sanitation Supplies for Port Antonio",
      organizer: "Jamaica Red Cross",
      description: "Collecting soap, toothpaste, sanitary products, diapers, and cleaning supplies for 200+ families who lost their homes in Port Antonio.",
      barrelsPacked: 42,
      goal: 60,
      itemsCollected: 1247,
      daysLeft: 18,
      verified: true,
      urgent: true,
    },
    {
      image: driveSchool,
      title: "School Supplies for St. Mary Students",
      organizer: "Ministry of Education Jamaica",
      description: "Gathering books, notebooks, pencils, backpacks, and educational materials for 450 students whose school was destroyed by Hurricane Melissa.",
      barrelsPacked: 28,
      goal: 35,
      itemsCollected: 892,
      daysLeft: 25,
      verified: true,
      urgent: false,
    },
    {
      image: driveMedical,
      title: "Medical Supplies for Rural Clinics",
      organizer: "Jamaica Medical Relief Foundation",
      description: "Collecting bandages, first-aid kits, over-the-counter medicines, and medical equipment for rural communities affected by the hurricane.",
      barrelsPacked: 18,
      goal: 30,
      itemsCollected: 534,
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
            Featured Relief Drives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verified drives collecting approved supplies. Every item goes directly to communities in need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive, index) => (
            <CampaignCard key={index} {...drive} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="text-primary hover:text-primary-hover font-medium text-lg hover:underline">
            View All Drives →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
