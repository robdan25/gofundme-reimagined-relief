import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { communityWallService, CommunityLocation, CommunityRole } from "@/services/communityWallService";
import { useState, useMemo } from "react";
import { Heart, MapPin, Calendar } from "lucide-react";

const CommunityWall = () => {
  const [selectedLocation, setSelectedLocation] = useState<CommunityLocation>("All");
  const [selectedRole, setSelectedRole] = useState<CommunityRole | "All">("All");

  const stats = useMemo(() => communityWallService.getTotalStats(), []);
  const allPosts = useMemo(() => communityWallService.getAllPosts(), []);

  const filteredPosts = useMemo(() => {
    let filtered = communityWallService.getPostsByLocation(selectedLocation);
    if (selectedRole !== "All") {
      filtered = filtered.filter((p) => p.role === selectedRole);
    }
    return filtered;
  }, [selectedLocation, selectedRole]);

  const getRoleColor = (role: CommunityRole): string => {
    switch (role) {
      case "Donor":
        return "bg-blue-100 text-blue-800";
      case "Volunteer":
        return "bg-green-100 text-green-800";
      case "Drive Organizer":
        return "bg-purple-100 text-purple-800";
    }
  };

  const getRoleIcon = (role: CommunityRole): string => {
    switch (role) {
      case "Donor":
        return "💝";
      case "Volunteer":
        return "🙌";
      case "Drive Organizer":
        return "🎯";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Community Wall
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Meet the donors, volunteers, and organizers making a difference. This is our community
            — people from Toronto, Brampton, Montreal, London, and Jamaica working together to
            support relief efforts.
          </p>
        </section>

        {/* Impact Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{stats.totalPosts}</div>
            <div className="text-sm text-muted-foreground">Community Members</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalDonors}</div>
            <div className="text-sm text-muted-foreground">Donors</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.totalVolunteers}</div>
            <div className="text-sm text-muted-foreground">Volunteers</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totalOrganizers}</div>
            <div className="text-sm text-muted-foreground">Organizers</div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            {/* Location Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Filter by Location
              </h3>
              <div className="flex flex-wrap gap-2">
                {["All", "Toronto", "Brampton", "Montreal", "London", "Jamaica"].map(
                  (location) => (
                    <Button
                      key={location}
                      onClick={() => setSelectedLocation(location as CommunityLocation)}
                      variant={selectedLocation === location ? "default" : "outline"}
                      size="sm"
                      className={
                        selectedLocation === location
                          ? "bg-primary hover:bg-primary-hover text-white"
                          : ""
                      }
                    >
                      {location}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Filter by Role
              </h3>
              <div className="flex flex-wrap gap-2">
                {["All", "Donor", "Volunteer", "Drive Organizer"].map((role) => (
                  <Button
                    key={role}
                    onClick={() => setSelectedRole(role as CommunityRole | "All")}
                    variant={selectedRole === role ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedRole === role ? "bg-primary hover:bg-primary-hover text-white" : ""
                    }
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPosts.length} of {allPosts.length} community members
          </p>
        </div>

        {/* Masonry Grid */}
        <section>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Placeholder or Actual Image */}
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-primary/40" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {/* Name */}
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2">{post.name}</h3>

                    {/* Role Badge */}
                    <div className="mb-3">
                      <Badge className={`${getRoleColor(post.role)} border-0`}>
                        {getRoleIcon(post.role)} {post.role}
                      </Badge>
                    </div>

                    {/* Caption */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {post.caption}
                    </p>

                    {/* Impact */}
                    <div className="bg-muted/50 rounded p-2 mb-3">
                      <p className="text-xs font-medium text-foreground">{post.impact}</p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No community members found matching your filters.
              </p>
              <Button
                onClick={() => {
                  setSelectedLocation("All");
                  setSelectedRole("All");
                }}
                variant="outline"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </section>

        {/* Join the Community CTA */}
        <section className="mt-16 bg-gradient-to-r from-primary to-primary-hover rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Community Wall</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Whether you're a donor, volunteer, or drive organizer, your story matters. Share your
            impact and inspire others to join the relief effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/donation-photos")}
              className="bg-white text-primary hover:bg-white/90 font-medium"
            >
              Share Your Story
            </Button>
            <Button
              onClick={() => (window.location.href = "/start-drive")}
              className="border-white text-white hover:bg-white/10"
              variant="outline"
            >
              Start a Drive
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityWall;
