import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const WhatToDonate = () => {
  const sections = [
    {
      title: "Shelter & Structure",
      intro: "These items help families repair homes, secure roofs, and make damaged spaces safe enough to live in again.",
      items: [
        "Nails and screws (assorted sizes)",
        "Hammers and basic hand tools",
        "Pry bars and crowbars",
        "Tarpaulins and heavy-duty plastic sheeting",
        "Ropes, bungee cords, and tie-down straps",
        "Plywood / boards (where feasible through partner drives)",
      ],
    },
    {
      title: "Debris Clearance & Tools",
      intro: "Clearing fallen trees, mud, and broken materials is essential so communities can move safely and start rebuilding.",
      items: [
        "Shovels and spades",
        "Pickaxes",
        "Rakes and brooms",
        "Work gloves (heavy-duty)",
        "Hard hats and safety goggles",
        "Wheelbarrows (for partner or bulk drives)",
      ],
    },
    {
      title: "Water, Storage & Sanitation",
      intro: "Clean water and basic sanitation prevent disease outbreaks after a hurricane.",
      items: [
        "Water buckets with lids",
        "Collapsible or hard water containers / jerry cans",
        "Water storage tanks (for bulk/partner drives)",
        "Water purification kits (tablets or filters where permitted)",
        "Portable toilets / toilet seats / liners",
        "Garbage bags (heavy-duty) and cleaning supplies (bleach, disinfectants, mops)",
      ],
    },
    {
      title: "Power & Lighting",
      intro: "Many communities face long power outages. These items help families stay safe and connected.",
      items: [
        "Generators (household size, < 5000W where allowed)",
        "Fuel containers / gas cans (empty, clearly labeled)",
        "Solar lanterns and rechargeable lights",
        "Battery-powered or crank radios",
        "Batteries (AA, AAA, C, D) and mobile power banks",
      ],
    },
    {
      title: "Bedding, Shelter & Camping",
      intro: "When homes are damaged or families are relocated, basic bedding and camping gear become critical.",
      items: [
        "Mattresses and sleeping mats",
        "Sleeping bags and blankets",
        "Tents and tarps",
        "Cots and camp beds",
        "Mosquito nets",
      ],
    },
    {
      title: "Other High-Need Items",
      intro: "We also accept other priority items commonly requested on official lists.",
      items: [
        "Hygiene kits (soap, toothpaste, toothbrushes, sanitary pads, wipes)",
        "Basic first aid kits",
        "Non-perishable food (where accepted by a specific drive)",
        "Basic school supplies for children (notebooks, pencils, backpacks)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="https://srv1714-files.hstgr.io/faf546e4be15964e/files/public_html/Images/flooded_community.png"
          alt="Aerial view of flooded homes and fields in Jamaica after Hurricane Melissa."
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <p className="text-sm font-medium text-white/80 mb-2">
              Hurricane Melissa – On the Ground
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your Relief Items Help Communities Like This Recover
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              Homes and farms across Jamaica were flooded and damaged. By sending approved tools, water containers, bedding, and other essential supplies, you help families rebuild safely.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What to Donate
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Unbiased Relief collects <strong>approved relief goods</strong>—not just money. We work with trusted partners in Jamaica to move barrels, boxes, and pallets of supplies directly into communities after Hurricane Melissa. Below are priority item categories we're focusing on, based on official needs lists and on-the-ground feedback.
          </p>
          <p className="text-sm text-muted-foreground italic mb-6">
            Before buying in bulk, please also review the latest government guidance on our <strong>Official Relief Lists</strong> page.
          </p>
          <Link to="/official-relief-lists">
            <Button className="bg-primary hover:bg-primary-hover text-white">
              View Official Relief Lists
            </Button>
          </Link>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {section.intro}
              </p>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Important Note */}
        <div className="mt-12">
          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertDescription className="ml-4 text-base">
              <strong>Important:</strong> Not every item can be accepted at every drive. Each collection drive may have its own focus (for example: tools only, hygiene only, or medical supplies only). Always check the specific drive page or contact the organizer before purchasing large quantities.
            </AlertDescription>
          </Alert>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatToDonate;
