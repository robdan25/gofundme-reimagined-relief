import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, DollarSign } from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "15+",
      label: "Barrels & Pallets",
      description: "Shipped to Jamaica",
      color: "text-primary",
    },
    {
      icon: Users,
      value: "350+",
      label: "Relief Items",
      description: "Collected and distributed",
      color: "text-secondary",
    },
    {
      icon: MapPin,
      value: "14",
      label: "Parishes",
      description: "Supported across Jamaica",
      color: "text-success",
    },
    {
      icon: TrendingUp,
      value: "4",
      label: "Active Drives",
      description: "Currently collecting supplies",
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
