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
        'Things are still very hard, but Unbiased Relief reached us quickly with food and basic supplies. Knowing someone showed up for our community means a lot.',
      date: new Date('2025-11-04'),
      rating: 5,
      verified: true,
    },
    {
      id: 'testimonial-2',
      name: 'Dr. James Chen',
      role: 'Healthcare Professional',
      location: 'Kingston',
      message:
        'Our clinic was short on basic medicines after Melissa. The supplies from Unbiased Relief helped us keep seeing patients while we slowly rebuild.',
      organization: 'Kingston Medical Center',
      date: new Date('2025-11-03'),
      rating: 5,
      verified: true,
    },
    {
      id: 'testimonial-3',
      name: 'Robert Bennett',
      role: 'Family Head',
      location: 'Port Antonio',
      message:
        'We\'re still picking up the pieces. The food, water and hygiene items we received through Unbiased Relief gave my family a start while we figure out what\'s next.',
      date: new Date('2025-11-02'),
      rating: 5,
      verified: true,
    },
    {
      id: 'testimonial-4',
      name: 'Governor Michael Thompson',
      role: 'Parish Official',
      location: 'St. Mary',
      message:
        'Recovery will take time, but Unbiased Relief has been steady and transparent, working with local leaders to get help to the families most affected.',
      organization: 'St. Mary Parish Council',
      date: new Date('2025-11-01'),
      rating: 5,
      verified: true,
    },
    {
      id: 'testimonial-5',
      name: 'Angela Sterling',
      role: 'Business Owner',
      location: 'Negril',
      message:
        'My shop isn\'t fully back yet, but the support from Unbiased Relief helped me replace a few essentials and reopen the doors.',
      date: new Date('2025-10-31'),
      rating: 5,
      verified: true,
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
