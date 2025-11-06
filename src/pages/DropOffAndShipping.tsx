import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Truck, Package, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DropOffPartnersStrip from "@/components/DropOffPartnersStrip";
import LocationMap from "@/components/LocationMap";
import DropoffLocations from "@/components/DropoffLocations";

const DropOffAndShipping = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
    city: string;
  } | null>(null);
  const klBrandzLocations = [
    {
      name: "KL Brandz – Ajax (Second Floor)",
      address: "513 Westney Road South, Ajax, ON",
      city: "Ajax",
    },
    {
      name: "KL Brandz – Pickering",
      address: "940 Brock Road, Unit 4, Pickering, ON",
      city: "Pickering",
    },
    {
      name: "KL Brandz – Scarborough (Victoria Park)",
      address: "1846 Victoria Park Avenue, Unit 5, Scarborough, ON",
      city: "Scarborough",
    },
    {
      name: "KL Brandz – North York",
      address: "800 Petrolia Road, Unit 19, North York, ON",
      city: "North York",
    },
  ];

  const communityPartners = [
    {
      name: "Fire Fusion",
      address: "1260 Kennedy Rd #2, Scarborough, ON M1P 2L4",
      city: "Scarborough",
    },
    {
      name: "Dams Food – Ajax",
      address: "154 Harwood Ave S, Ajax, ON L1S 2H6",
      city: "Ajax",
    },
    {
      name: "Dams Food – Bowmanville",
      address: "37 King St E, Bowmanville, ON L1C 1N1",
      city: "Bowmanville",
    },
  ];

  const officialDropOffLocations = [
    {
      name: "Jamaican Canadian Association",
      address: "995 Arrow Road, Toronto, ON",
      city: "Toronto",
      type: "Community Organization",
    },
    {
      name: "Hon. Charmaine Williams",
      address: "456 Vodden St. E, Brampton, ON",
      city: "Brampton",
      type: "Official Representative",
    },
    {
      name: "City Hall of Brampton",
      address: "2 Wellington Street West, Brampton, ON",
      city: "Brampton",
      type: "Municipal",
    },
    {
      name: "Jamaica Association Montreal",
      address: "4065 Rue Jean-Talon O, Montreal, QC",
      city: "Montreal",
      type: "Community Organization",
    },
    {
      name: "Jamaican London Ontario Association – Irie Market",
      address: "1050 Kipps Lane, London, ON",
      city: "London",
      type: "Community Organization",
    },
    {
      name: "WEAN Community Centre",
      address: "150 Dundas Street, London, ON",
      city: "London",
      type: "Community Centre",
    },
    {
      name: "Palomino Gordon Law",
      address: "130 Davis Drive, Unit 32C, New Market, ON",
      city: "New Market",
      type: "Business Partner",
    },
    {
      name: "The O Spot",
      address: "362 Kingston Road West, Unit 5, Ajax, ON",
      city: "Ajax",
      type: "Community Partner",
    },
    {
      name: "New Haven Funeral Centre",
      address: "7025 Legion Road, Mississauga, ON",
      city: "Malton / Mississauga",
      type: "Community Partner",
    },
    {
      name: "Organization for Economic Development and Diplomacy",
      address: "3290 Jefferson Boulevard, Windsor, ON",
      city: "Windsor",
      type: "Community Organization",
    },
  ];

  const additionalCommunityDrives = [
    {
      name: "OISE – University of Toronto",
      address: "252 Bloor Street West, Toronto, ON",
      city: "Toronto",
      type: "Campus Donation Drive",
      note: "Lobby collection bins · Nov 4–Dec 23 · Building hours Mon–Fri 7am–9pm, Sat–Sun 9am–9pm",
    },
    {
      name: "Little Jamaica Community Drive – Studio M",
      address: "Studio M, 1609 Eglinton Avenue West, Toronto, ON",
      city: "Toronto",
      type: "Community Partner",
      note: "Select Saturdays · 1:00–6:00 pm · Check organizer schedule for current dates",
    },
    {
      name: "National Black Coalition of Canada – Edmonton Chapter",
      address: "2937 101 Street NW, Edmonton, AB",
      city: "Edmonton",
      type: "Community Organization",
      note: "Open Nov 2–6 and Saturdays in November · 11:00 am–5:00 pm",
    },
    {
      name: "D'Lux Hair Vault Relief Drive",
      address: "D'Lux Hair Vault, 620–11877 Sarcee Trail NW, Calgary, AB",
      city: "Calgary",
      type: "Business Partner",
      note: "Donations accepted during regular store hours",
    },
    {
      name: "Royals Community Center Donation Drive",
      address: "Royal's Event & Community Center, 13551 105A Avenue, Surrey, BC",
      city: "Surrey",
      type: "Community Centre",
      note: "Collecting food, clothing and hygiene items · Call ahead to confirm hours",
    },
    {
      name: "Vancouver Area \"Support Jamaica\" Drive",
      address: "Novus Production Office, Unit 101, 3876 Norland Avenue, Burnaby, BC",
      city: "Burnaby",
      type: "Community Partner",
      note: "\"From Vancouver With Love\" drive · Check local Jamaican groups for latest schedule",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Drop-Off Locations | Relief Supplies | Unbiased Relief</title>
        <meta
          name="description"
          content="Find drop-off locations in UK, Canada, and online to donate Hurricane Melissa relief supplies. Non-perishable food, hygiene products, baby supplies, medical kits, and bedding accepted."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Image Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="https://unbiasedrelief.org/Images/dropoff.png"
          alt="People unloading boxes and blue barrels at a relief drop-off location in front of a storefront."
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <p className="text-sm font-medium text-white/80 mb-2">
              Drop-Off & Shipping
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Bring Your Relief Items to a Drop-Off Point
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              Unbiased Relief works with trusted partners to receive boxes, barrels, and bulk items and prepare them for shipment to communities across Jamaica.
            </p>
          </div>
        </div>
      </section>

      {/* GTA Drop-Off Partners Strip */}
      <DropOffPartnersStrip />

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Caption for Partners Strip */}
        <div className="mb-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground italic">
            These GTA partners are official drop-off points for Hurricane Melissa relief supplies. More locations coming soon.
          </p>
        </div>

        {/* Main Content Section */}
        <section className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Drop-Off & Shipping
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We make it easy to get your relief items into the hands of Jamaican communities. Drop-off locations are available across Canada and the UK. These options help your donations reach the right places.
          </p>
        </section>

        {/* Tabbed Interface for Regions */}
        <Tabs defaultValue="uk" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="uk" className="gap-2">
              <Globe className="w-4 h-4" />
              UK Locations
            </TabsTrigger>
            <TabsTrigger value="canada" className="gap-2">
              <Globe className="w-4 h-4" />
              Canada Locations
            </TabsTrigger>
          </TabsList>

          {/* UK Drop-Off Locations */}
          <TabsContent value="uk">
            <DropoffLocations featured={false} />
          </TabsContent>

          {/* Canada Drop-Off Locations */}
          <TabsContent value="canada">
            {/* Official Drop-Off Locations Across Canada */}
            <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Official Drop-Off Locations Across Canada
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Verified drop-off points organized by city
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {officialDropOffLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => setSelectedLocation(location)}
                className="text-left hover:opacity-90 transition-opacity"
              >
                <Card className="border-border bg-card hover:shadow-hover transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{location.city}</p>
                        {location.type && (
                          <p className="text-xs text-muted-foreground/70 mt-1">{location.type}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{location.address}</p>
                    <p className="text-xs text-primary font-semibold mt-3">Click to view map</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          {/* Additional Community & Campus Drives */}
          <div className="mt-12 mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Additional Community & Campus Drives (Across Canada)
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Verified donation drives through community organizations and campus partners
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalCommunityDrives.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLocation(location)}
                  className="text-left hover:opacity-90 transition-opacity"
                >
                  <Card className="border-border bg-card hover:shadow-hover transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <CardTitle className="text-lg">{location.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{location.city}</p>
                          {location.type && (
                            <p className="text-xs text-muted-foreground/70 mt-1">{location.type}</p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{location.address}</p>
                      {location.note && (
                        <p className="text-xs text-muted-foreground/70 italic mb-2">{location.note}</p>
                      )}
                      <p className="text-xs text-primary font-semibold">Click to view map</p>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>

          <Alert className="bg-muted/50 border-border mt-8">
            <AlertDescription className="text-sm text-muted-foreground italic">
              <p className="mb-2">
                Contact your nearest location directly to confirm drop-off hours and availability. For locations in other provinces, please contact your Honorary Consul or local Jamaican Community Association.
              </p>
              <p>
                Some community and campus drives are time-limited. Please contact the location or visit their social pages to confirm current drop-off hours and dates before visiting.
              </p>
            </AlertDescription>
          </Alert>
        </section>

        {/* Community Partner Drop-Off Locations */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Community Partner Drop-Off Locations
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            KL Brandz locations and additional drop-off partners in the Greater Toronto Area
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* KL Brandz Locations */}
            {klBrandzLocations.map((location, index) => (
              <button
                key={`klbrandz-${index}`}
                onClick={() => setSelectedLocation(location)}
                className="text-left hover:opacity-90 transition-opacity"
              >
                <Card className="border-border bg-card hover:shadow-hover transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{location.city}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{location.address}</p>
                    <p className="text-xs text-primary font-semibold mt-3">Click to view map</p>
                  </CardContent>
                </Card>
              </button>
            ))}

            {/* Other Community Partners */}
            {communityPartners.map((location, index) => (
              <button
                key={`partner-${index}`}
                onClick={() => setSelectedLocation(location)}
                className="text-left hover:opacity-90 transition-opacity"
              >
                <Card className="border-border bg-card hover:shadow-hover transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{location.city}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{location.address}</p>
                    <p className="text-xs text-primary font-semibold mt-3">Click to view map</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          <Alert className="bg-muted/50 border-border">
            <AlertDescription className="text-sm text-muted-foreground italic">
              Please contact the location directly to confirm drop-off availability and hours before visiting.
            </AlertDescription>
          </Alert>
            </section>
          </TabsContent>
        </Tabs>

        {/* Shipping & Logistics */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Shipping & Logistics
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Truck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Partner Shipping
                </h3>
                <p className="text-muted-foreground">
                  We work with trusted freight forwarders and logistics partners who specialize in moving barrels and pallets to Jamaica. Contact us for current shipping rates and schedules.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Package className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Barrels & Boxes
                </h3>
                <p className="text-muted-foreground">
                  Pack approved items into sturdy barrels or boxes, clearly label by category (tools, hygiene, medical, etc.), and follow our packing guides to ensure safe transport.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Packing Guidelines */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Packing Guidelines
          </h2>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {[
                  "Use sturdy, new or gently used barrels (55-gallon) or heavy-duty boxes.",
                  "Label each barrel or box clearly with its contents (e.g., 'TOOLS', 'HYGIENE KITS', 'WATER CONTAINERS').",
                  "Include a list of items inside each container, with quantities.",
                  "Ensure items are clean and in good condition.",
                  "Do NOT include items that are banned or not on official lists (check 'Official Lists' page).",
                  "Seal barrels securely with straps or duct tape.",
                  "Include contact information on the outside of each container so recipients can follow up.",
                ].map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span className="text-muted-foreground">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Important Information */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Important Information
          </h2>

          <div className="space-y-4">
            <Alert className="border-border bg-card">
              <AlertDescription>
                <strong>Duty Waiver:</strong> Items shipped to Jamaica for Hurricane Melissa relief may qualify for a temporary duty waiver. Always consult the{" "}
                <a
                  href="/official-relief-lists"
                  className="text-primary hover:underline font-medium"
                >
                  Official Lists
                </a>
                {" "}page for the latest information on approved items and customs requirements.
              </AlertDescription>
            </Alert>

            <Alert className="border-border bg-card">
              <AlertDescription>
                <strong>Tracking:</strong> When you ship items through our partner network, you'll receive tracking information and regular updates on where your supplies are in the distribution chain.
              </AlertDescription>
            </Alert>

            <Alert className="border-border bg-card">
              <AlertDescription>
                <strong>Questions?</strong> For detailed shipping inquiries, current rates, or logistics support, please contact our team at{" "}
                <a
                  href="mailto:info@unbiasedrelief.org"
                  className="text-primary hover:underline font-medium"
                >
                  info@unbiasedrelief.org
                </a>
                .
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Before You Donate */}
        <section>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Before You Donate
          </h2>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <ol className="space-y-4">
                {[
                  "Check the 'Official Lists' page to see what's currently needed and approved.",
                  "Join or start a relief drive through a trusted organization.",
                  "Shop for approved items in bulk if possible—buying together saves money and shipping costs.",
                  "Pack carefully and label clearly.",
                  "Drop off at a KL Brandz location or arrange shipping.",
                  "Share your contribution with your community and encourage others to join.",
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />

      {/* Location Map Modal */}
      {selectedLocation && (
        <LocationMap
          isOpen={!!selectedLocation}
          onClose={() => setSelectedLocation(null)}
          locationName={selectedLocation.name}
          address={selectedLocation.address}
          city={selectedLocation.city}
        />
      )}
    </div>
    </>
  );
};

export default DropOffAndShipping;
