import { Card } from "@/components/ui/card";
import { Home, Heart, GraduationCap, Stethoscope, Utensils, Briefcase } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: Home,
      name: "Housing",
      count: 34,
      color: "text-primary",
    },
    {
      icon: Utensils,
      name: "Food & Water",
      count: 28,
      color: "text-secondary",
    },
    {
      icon: Stethoscope,
      name: "Medical",
      count: 19,
      color: "text-destructive",
    },
    {
      icon: GraduationCap,
      name: "Education",
      count: 15,
      color: "text-success",
    },
    {
      icon: Briefcase,
      name: "Livelihoods",
      count: 22,
      color: "text-warning",
    },
    {
      icon: Heart,
      name: "Community",
      count: 31,
      color: "text-primary",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Find campaigns supporting specific relief efforts
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-hover transition-all duration-300 cursor-pointer group border-border bg-card"
              >
                <Icon className={`w-10 h-10 mx-auto mb-3 ${category.color} group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold text-card-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} campaigns</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
