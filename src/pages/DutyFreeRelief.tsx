import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, Target, Boxes } from "lucide-react";
import { Link } from "react-router-dom";

const DutyFreeRelief = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-h-[450px] overflow-hidden">
        <img
          src="https://unbiasedrelief.org/images/hero-relief-supplies.jpg"
          alt="Relief supplies being packed and prepared for shipment"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <div className="container mx-auto px-4 md:px-8 max-w-[1000px]">
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-200">Limited Time Opportunity</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Duty-Free Relief Window: Send Supplies Before November 28
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              Take advantage of the Government of Jamaica's temporary Import Duty and GCT waiver to send approved relief supplies at significantly reduced costs.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-[1000px]">
        {/* Campaign Overview */}
        <div className="mb-12">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Limited-Time Campaign • Hurricane Melissa Support
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            A Historic Opportunity for Relief Donors
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Ministry of Finance and the Public Service of Jamaica has granted a <strong>30-day waiver of Import Duty and General Consumption Tax (GCT)</strong> on approved relief supplies for Hurricane Melissa recovery. This unprecedented window significantly reduces the cost barrier for diaspora communities, businesses, and organizations sending supplies to Jamaica.
          </p>
        </div>

        {/* Key Details Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Calendar className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Waiver Period</h3>
                  <p className="text-muted-foreground">
                    <strong>October 29, 2025 – November 28, 2025</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    30 days to ship approved relief items duty-free
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Campaign Goal</h3>
                  <p className="text-muted-foreground">
                    <strong>500 barrels and pallets</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Of approved relief supplies shipped during the waiver period
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Matters */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Why This Waiver Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Reduced Costs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Duty and GCT taxes can add 20–30% to shipping costs. This waiver removes those barriers, making it far more affordable for diaspora families and organizations to send supplies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Faster Relief</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Simplified customs clearance means supplies reach communities faster. Every day counts as Jamaicans rebuild homes, schools, and livelihoods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Official Backing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This waiver comes directly from Jamaica's government, signaling that in-kind relief is a priority for recovery and reconstruction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Maximum Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  More of your contribution goes directly to supplies instead of taxes, so aid reaches families and communities in greater volume.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Can Be Sent */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            What Can Be Sent
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The waiver applies to approved relief supplies aligned with <strong>official Government of Jamaica guidance</strong>. Approved categories include:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              "Tools (hammers, saws, nails, screws, power tools)",
              "Water & sanitation (containers, purification kits, cleaning supplies)",
              "Shelter materials (tarpaulins, rope, hardware, insulation)",
              "Food & nutrition (non-perishable foods, infant formula, vitamins)",
              "Medical supplies (first aid kits, medicines, bandages, equipment)",
              "Hygiene & sanitation (soap, toothpaste, diapers, feminine products)",
              "School supplies (books, notebooks, pencils, backpacks, learning materials)",
              "Power & lighting (generators, fuel containers, solar lights, batteries)",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Boxes className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground italic border-l-4 border-warning pl-4">
            <strong>Important:</strong> Prohibited items remain prohibited (weapons, explosives, controlled substances, etc.). Always confirm items align with current official guidance.
          </p>
        </section>

        {/* How to Participate */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            How to Participate
          </h2>

          <div className="space-y-4 mb-8">
            {[
              {
                num: 1,
                title: "Browse Approved Items",
                desc: "Visit our What to Donate page to see priority relief items.",
              },
              {
                num: 2,
                title: "Gather & Pack",
                desc: "Collect or purchase approved items and pack them into barrels or boxes.",
              },
              {
                num: 3,
                title: "Find Drop-Off or Ship",
                desc: "Locate a Unbiased Relief drop-off location near you, or arrange shipment directly to a partner warehouse.",
              },
              {
                num: 4,
                title: "Track Your Impact",
                desc: "Receive updates on when your supplies arrive in Jamaica and how they are distributed to communities.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-primary rounded-lg p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Don't Miss This Opportunity
          </h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            The duty-free window closes on November 28, 2025. Every barrel and pallet sent during this period reaches Jamaica with maximum cost efficiency and government backing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/what-to-donate">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                View What to Donate
              </Button>
            </Link>
            <Link to="/drop-off-and-shipping">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                Find Drop-Off Locations
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ or Additional Info */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Questions?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            For detailed information about the government's duty-free waiver, shipping requirements, or what items qualify, please visit:
          </p>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Official Relief Lists</h3>
              <p className="text-muted-foreground mb-3">
                View comprehensive lists of approved items and ongoing campaigns across Jamaica.
              </p>
              <Link to="/official-relief-lists">
                <Button variant="outline">View All Drives</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DutyFreeRelief;
