// Testimonials Service - Manages community testimonials and stories

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  message: string;
  avatar?: string;
  organization?: string;
  date: Date;
  rating?: number; // 1-5 stars
  verified?: boolean;
  image?: string;
}

class TestimonialsService {
  // Mock testimonials data - in production, this would come from a database
  private testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Maria Johnson',
      role: 'Community Leader',
      location: 'Spanish Town',
      message:
        'The relief efforts from Unbiased Relief have been absolutely life-changing for our community. They responded quickly and provided exactly what we needed. The volunteers were professional and compassionate every step of the way.',
      organization: 'Spanish Town Community Center',
      date: new Date('2025-11-04'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
    },
    {
      id: 'testimonial-2',
      name: 'Dr. James Chen',
      role: 'Healthcare Professional',
      location: 'Kingston',
      message:
        'As a doctor in the affected area, I can attest to the quality of medical supplies provided. Unbiased Relief worked directly with healthcare facilities to ensure we had what was most needed. Their coordination was exceptional.',
      organization: 'Kingston Medical Center',
      date: new Date('2025-11-03'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    },
    {
      id: 'testimonial-3',
      name: 'Patricia Williams',
      role: 'Relief Volunteer',
      location: 'Montego Bay',
      message:
        'I never realized how important organized relief efforts were until I volunteered. The training and coordination made such a difference. Unbiased Relief taught me that together, we can truly help our neighbors.',
      date: new Date('2025-11-02'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
    {
      id: 'testimonial-4',
      name: 'Governor Michael Thompson',
      role: 'Parish Official',
      location: 'St. Mary Parish',
      message:
        'The transparency and efficiency of Unbiased Relief is commendable. They provided regular updates, involved local authorities, and ensured aid reached those most in need. This is disaster relief done right.',
      organization: 'St. Mary Parish Council',
      date: new Date('2025-11-01'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 'testimonial-5',
      name: 'Angela Sterling',
      role: 'Business Owner',
      location: 'Negril',
      message:
        'When Hurricane Melissa hit, my business was severely damaged. The community support and relief efforts helped me get back on my feet. Unbiased Relief went beyond just providing goods - they restored hope.',
      date: new Date('2025-10-31'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
    {
      id: 'testimonial-6',
      name: 'Robert Bennett',
      role: 'Family Head',
      location: 'Port Antonio',
      message:
        'My family lost everything in the hurricane. Without the relief supplies and support, I don\'t know how we would have managed. The Unbiased Relief team treated us with dignity and kindness.',
      date: new Date('2025-10-30'),
      rating: 5,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1516003881520-1b8fa95b9f6e?w=200&h=200&fit=crop',
    },
  ];

  /**
   * Get all testimonials
   */
  getAllTestimonials(): Testimonial[] {
    return this.testimonials.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get verified testimonials only
   */
  getVerifiedTestimonials(): Testimonial[] {
    return this.testimonials
      .filter((t) => t.verified === true)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Get testimonials by rating (N stars or higher)
   */
  getTestimonialsByRating(minRating: number): Testimonial[] {
    return this.testimonials
      .filter((t) => t.rating && t.rating >= minRating)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  /**
   * Get random testimonials (for featured sections)
   */
  getRandomTestimonials(count: number): Testimonial[] {
    const shuffled = [...this.testimonials].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Get a single testimonial by ID
   */
  getTestimonialById(id: string): Testimonial | undefined {
    return this.testimonials.find((t) => t.id === id);
  }

  /**
   * Add a new testimonial
   */
  addTestimonial(testimonial: Testimonial): void {
    this.testimonials.push(testimonial);
  }

  /**
   * Get average rating of all testimonials
   */
  getAverageRating(): number {
    const ratedTestimonials = this.testimonials.filter((t) => t.rating);
    if (ratedTestimonials.length === 0) return 0;
    const sum = ratedTestimonials.reduce((acc, t) => acc + (t.rating || 0), 0);
    return Math.round((sum / ratedTestimonials.length) * 10) / 10;
  }

  /**
   * Get testimonials count
   */
  getTestimonialsCount(): number {
    return this.testimonials.length;
  }
}

export const testimonialsService = new TestimonialsService();
