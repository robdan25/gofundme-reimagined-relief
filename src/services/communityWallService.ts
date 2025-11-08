// Community Wall Service - Showcases community members and their impact stories

export type CommunityRole = "Donor" | "Volunteer" | "Drive Organizer";
export type CommunityLocation = "All" | "Toronto" | "Brampton" | "Montreal" | "London" | "Jamaica";

export interface CommunityWallPost {
  id: string;
  name: string;
  role: CommunityRole;
  location: CommunityLocation;
  caption: string;
  image?: string;
  impact: string; // e.g., "100 items donated", "50 hours volunteered"
  date: Date;
  featured?: boolean;
}

class CommunityWallService {
  // Community wall posts - showcasing diverse community members
  private posts: CommunityWallPost[] = [
    {
      id: "post-1",
      name: "Sarah's Youth Group",
      role: "Donor",
      location: "Toronto",
      caption: "Our high school collected 8 barrels of school supplies!",
      impact: "8 barrels of supplies",
      date: new Date("2025-11-06"),
      featured: true,
    },
    {
      id: "post-2",
      name: "Marcus",
      role: "Volunteer",
      location: "Brampton",
      caption: "Spent my Saturday helping organize donations at the warehouse",
      impact: "12 hours of volunteering",
      date: new Date("2025-11-05"),
      featured: true,
    },
    {
      id: "post-3",
      name: "Grace Community Church",
      role: "Drive Organizer",
      location: "Toronto",
      caption: "Led our biggest drive yet - 6 boxes of medical supplies for Jamaica clinics",
      impact: "6 boxes of medical supplies",
      date: new Date("2025-11-04"),
      featured: true,
    },
    {
      id: "post-4",
      name: "Keisha",
      role: "Donor",
      location: "Montreal",
      caption: "Donated blankets and tarps for families rebuilding",
      impact: "50+ items",
      date: new Date("2025-11-03"),
    },
    {
      id: "post-5",
      name: "Tech Workers Relief Group",
      role: "Drive Organizer",
      location: "London",
      caption: "Virtual + in-person drive collected water containers and tools",
      impact: "4 boxes of supplies",
      date: new Date("2025-11-02"),
    },
    {
      id: "post-6",
      name: "David",
      role: "Volunteer",
      location: "Toronto",
      caption: "Coordinated logistics for barrel shipment to Jamaica",
      impact: "20 hours coordination",
      date: new Date("2025-11-01"),
    },
    {
      id: "post-7",
      name: "Jamaican Canadian Association",
      role: "Drive Organizer",
      location: "Toronto",
      caption: "Community came together - 12 barrels sent to Spanish Town",
      impact: "12 barrels",
      date: new Date("2025-10-31"),
      featured: true,
    },
    {
      id: "post-8",
      name: "James",
      role: "Donor",
      location: "Brampton",
      caption: "Contributed tools and building supplies for reconstruction",
      impact: "100+ items",
      date: new Date("2025-10-30"),
    },
    {
      id: "post-9",
      name: "Women's Group",
      role: "Volunteer",
      location: "Montreal",
      caption: "Packed hygiene kits for distribution in affected communities",
      impact: "200 hygiene kits",
      date: new Date("2025-10-29"),
    },
    {
      id: "post-10",
      name: "University Relief Club",
      role: "Drive Organizer",
      location: "London",
      caption: "Campus-wide drive raised awareness and supplies for Hurricane Melissa relief",
      impact: "500+ items",
      date: new Date("2025-10-28"),
    },
    {
      id: "post-11",
      name: "Catherine",
      role: "Donor",
      location: "Jamaica",
      caption: "Community members in Jamaica grateful for the support - items arrived safely",
      impact: "Received 3 barrels",
      date: new Date("2025-10-27"),
    },
    {
      id: "post-12",
      name: "Local Business Coalition",
      role: "Drive Organizer",
      location: "Toronto",
      caption: "10 businesses partnered to send supplies directly to relief centers",
      impact: "15 boxes of supplies",
      date: new Date("2025-10-26"),
    },
  ];

  /**
   * Get all posts
   */
  getAllPosts(): CommunityWallPost[] {
    return this.posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get posts by location
   */
  getPostsByLocation(location: CommunityLocation): CommunityWallPost[] {
    if (location === "All") {
      return this.getAllPosts();
    }
    return this.posts
      .filter((p) => p.location === location)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get posts by role
   */
  getPostsByRole(role: CommunityRole): CommunityWallPost[] {
    return this.posts
      .filter((p) => p.role === role)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get featured posts
   */
  getFeaturedPosts(): CommunityWallPost[] {
    return this.posts
      .filter((p) => p.featured)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get posts by location and role
   */
  getPostsByLocationAndRole(
    location: CommunityLocation,
    role?: CommunityRole
  ): CommunityWallPost[] {
    let filtered = this.getPostsByLocation(location);
    if (role) {
      filtered = filtered.filter((p) => p.role === role);
    }
    return filtered;
  }

  /**
   * Get a single post by ID
   */
  getPostById(id: string): CommunityWallPost | undefined {
    return this.posts.find((p) => p.id === id);
  }

  /**
   * Add a new post
   */
  addPost(post: Omit<CommunityWallPost, "id" | "date">): void {
    const newPost: CommunityWallPost = {
      ...post,
      id: `post-${Date.now()}`,
      date: new Date(),
    };
    this.posts.push(newPost);
  }

  /**
   * Get unique locations
   */
  getLocations(): CommunityLocation[] {
    const locations = new Set<CommunityLocation>(
      this.posts.map((p) => p.location)
    );
    locations.add("All");
    return Array.from(locations).sort();
  }

  /**
   * Get post count by location
   */
  getPostCountByLocation(location: CommunityLocation): number {
    if (location === "All") {
      return this.posts.length;
    }
    return this.posts.filter((p) => p.location === location).length;
  }

  /**
   * Get total impact stats
   */
  getTotalStats() {
    return {
      totalPosts: this.posts.length,
      totalDonors: this.posts.filter((p) => p.role === "Donor").length,
      totalVolunteers: this.posts.filter((p) => p.role === "Volunteer").length,
      totalOrganizers: this.posts.filter((p) => p.role === "Drive Organizer")
        .length,
    };
  }
}

export const communityWallService = new CommunityWallService();
