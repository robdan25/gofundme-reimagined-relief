import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, DollarSign } from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$2.4M",
      label: "Total Raised",
      description: "In hurricane relief funds",
      color: "text-primary",
    },
    {
      icon: Users,
      value: "15,427",
      label: "Active Donors",
      description: "Supporting recovery efforts",
      color: "text-secondary",
    },
    {
      icon: MapPin,
      value: "52",
      label: "Communities",
      description: "Receiving direct aid",
      color: "text-success",
    },
    {
      icon: TrendingUp,
      value: "127",
      label: "Active Campaigns",
      description: "Making real impact",
      color: "text-warning",
    },
  ];

  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact Together
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Every donation creates real change. See the collective impact we're making in Jamaica.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <Icon className={`w-10 h-10 mx-auto mb-4 text-white`} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                  <p className="text-sm text-white/80">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
