import dutyFreeImage from "@/assets/hero-relief-supplies.jpg";
import driveHygiene from "@/assets/drive-hygiene-kits.jpg";
import driveSchool from "@/assets/drive-school-supplies.jpg";
import driveMedical from "@/assets/drive-medical-supplies.jpg";

export interface Campaign {
  id: string;
  slug: string;
  image: string;
  title: string;
  organizer: string;
  description: string;
  barrelsPacked: number;
  goal: number;
  itemsCollected: number;
  daysLeft: number;
  verified: boolean;
  urgent: boolean;
  featured?: boolean;
}

export const campaigns: Campaign[] = [
  {
    id: "duty-free-relief-window",
    slug: "duty-free-relief-window",
    image: dutyFreeImage,
    title: "Duty-Free Relief Window: Send Supplies Before November 28",
    organizer: "Unbiased Relief",
    description: "The Ministry of Finance and the Public Service has approved a 30-day waiver of Import Duty and GCT on approved relief supplies for Hurricane Melissa recovery. This is a limited-time opportunity to send barrels and pallets of essential items directly to Jamaica with significantly reduced costs.",
    barrelsPacked: 5,
    goal: 200,
    itemsCollected: 110,
    daysLeft: 24,
    verified: true,
    urgent: true,
    featured: true,
  },
  {
    id: "hygiene-port-antonio",
    slug: "hygiene-port-antonio",
    image: driveHygiene,
    title: "Hygiene & Sanitation Supplies for Port Antonio",
    organizer: "Jamaica Red Cross",
    description: "Collecting soap, toothpaste, sanitary products, diapers, and cleaning supplies for 200+ families who lost their homes in Port Antonio.",
    barrelsPacked: 4,
    goal: 50,
    itemsCollected: 90,
    daysLeft: 18,
    verified: true,
    urgent: true,
    featured: true,
  },
  {
    id: "school-supplies-st-mary",
    slug: "school-supplies-st-mary",
    image: driveSchool,
    title: "School Supplies for St. Mary Students",
    organizer: "Ministry of Education Jamaica",
    description: "Gathering books, notebooks, pencils, backpacks, and educational materials for 450 students whose school was destroyed by Hurricane Melissa.",
    barrelsPacked: 3,
    goal: 50,
    itemsCollected: 80,
    daysLeft: 25,
    verified: true,
    urgent: false,
    featured: true,
  },
  {
    id: "medical-supplies-rural-clinics",
    slug: "medical-supplies-rural-clinics",
    image: driveMedical,
    title: "Medical Supplies for Rural Clinics",
    organizer: "Jamaica Medical Relief Foundation",
    description: "Collecting bandages, first-aid kits, over-the-counter medicines, and medical equipment for rural communities affected by the hurricane.",
    barrelsPacked: 3,
    goal: 50,
    itemsCollected: 70,
    daysLeft: 12,
    verified: true,
    urgent: true,
    featured: false,
  },
];

/**
 * Get total campaign statistics (for dashboard)
 */
export const getCampaignStats = () => {
  const stats = {
    totalBarrels: campaigns.reduce((sum, c) => sum + c.barrelsPacked, 0),
    totalItems: campaigns.reduce((sum, c) => sum + c.itemsCollected, 0),
    totalGoal: campaigns.reduce((sum, c) => sum + c.goal, 0),
    activeCampaigns: campaigns.length,
    verifiedCampaigns: campaigns.filter(c => c.verified).length,
  };
  return stats;
};

/**
 * Get a campaign by ID or slug
 */
export const getCampaignById = (idOrSlug: string): Campaign | undefined => {
  return campaigns.find(
    (campaign) => campaign.id === idOrSlug || campaign.slug === idOrSlug
  );
};

/**
 * Get featured campaigns (shown on homepage)
 * Returns only campaigns marked with featured: true
 */
export const getFeaturedCampaigns = (): Campaign[] => {
  return campaigns.filter((campaign) => campaign.featured === true);
};

/**
 * Get all campaigns (shown on official relief lists page)
 */
export const getAllCampaigns = (): Campaign[] => {
  return campaigns;
};
