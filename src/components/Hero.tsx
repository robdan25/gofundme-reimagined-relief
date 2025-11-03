import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-relief-supplies.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Hurricane Melissa Relief Active</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Send Approved Relief Supplies to Jamaica
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Unbiased Relief connects donors with officially approved hurricane-relief item drives. Every barrel, box, and pallet goes where it's needed most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white text-lg px-8">
              View What to Donate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" className="bg-secondary hover:bg-secondary-hover text-white text-lg px-8">
              Find a Drop-Off Location
              <Heart className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white mb-1">850+</div>
              <div className="text-sm text-white/80">Barrels Shipped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">15K+</div>
              <div className="text-sm text-white/80">Items Collected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">45</div>
              <div className="text-sm text-white/80">Active Drives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
