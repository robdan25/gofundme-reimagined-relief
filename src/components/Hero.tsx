import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-hurricane.jpg";

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
            Help Jamaica Rebuild After Hurricane Melissa
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of donors supporting verified relief campaigns. Every contribution helps families recover, rebuild homes, and restore communities across Jamaica.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary-hover text-white text-lg px-8">
              Donate Now
              <Heart className="w-5 h-5 ml-2 fill-white" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-8">
              Browse Campaigns
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white mb-1">$2.4M</div>
              <div className="text-sm text-white/80">Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">15K+</div>
              <div className="text-sm text-white/80">Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">127</div>
              <div className="text-sm text-white/80">Active Campaigns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
