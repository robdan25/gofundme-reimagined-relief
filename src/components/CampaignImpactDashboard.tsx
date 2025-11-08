import { getCampaignStats } from "@/data/campaigns";
import { BarChart3, Package, Target, CheckCircle2 } from "lucide-react";

const CampaignImpactDashboard = () => {
  const stats = getCampaignStats();
  const overallProgress = Math.round((stats.totalItems / stats.totalGoal) * 100);

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Hurricane Melissa Relief Impact
          </h2>
          <p className="text-muted-foreground">
            Real-time progress across all government-coordinated relief campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Items Collected */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Items Collected
              </h3>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.totalItems.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalGoal.toLocaleString()} goal items
            </p>
            {/* Progress bar */}
            <div className="mt-3 w-full h-2 bg-blue-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${Math.min(overallProgress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {overallProgress}% complete
            </p>
          </div>

          {/* Total Barrels Packed */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Barrels Packed
              </h3>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.totalBarrels}
            </div>
            <p className="text-xs text-muted-foreground">
              ready for shipping
            </p>
          </div>

          {/* Active Campaigns */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Campaigns
              </h3>
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.activeCampaigns}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.verifiedCampaigns} verified by government
            </p>
          </div>

          {/* Days Until Deadline */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Shipping Deadline
              </h3>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              48
            </div>
            <p className="text-xs text-muted-foreground">
              days until December 31
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>In partnership with the Government of Jamaica</strong> - All campaigns are verified and coordinated with official relief agencies. Every item contributes directly to Hurricane Melissa recovery efforts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignImpactDashboard;
