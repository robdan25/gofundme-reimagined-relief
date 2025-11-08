// Donation Photos Service - Manages community donation photos
// Users upload photos of their donation efforts (barrels, boxes, packing sessions, etc.)

export interface DonationPhoto {
  id: string;
  submitterName: string;
  email: string;
  photos: string[]; // Array of base64 encoded images or URLs
  city: string;
  dropoffLocation: string;
  caption: string;
  consentGiven: boolean;
  createdAt: Date;
  approved?: boolean; // Moderator approval flag
  featured?: boolean;
}

class DonationPhotosService {
  // Mock donation photos data - in production, this would be stored in a database
  private donationPhotos: DonationPhoto[] = [];

  /**
   * Submit new donation photos
   */
  submitDonationPhotos(donation: DonationPhoto): void {
    const newDonation: DonationPhoto = {
      ...donation,
      id: `donation-${Date.now()}`,
      createdAt: new Date(),
      approved: false, // Start as unapproved, needs moderation
    };
    this.donationPhotos.push(newDonation);
  }

  /**
   * Get all approved donation photos (ready to display)
   */
  getApprovedPhotos(): DonationPhoto[] {
    return this.donationPhotos
      .filter((d) => d.approved && d.consentGiven)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get featured donation photos
   */
  getFeaturedPhotos(): DonationPhoto[] {
    return this.donationPhotos
      .filter((d) => d.featured && d.approved && d.consentGiven)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get pending submissions (for admin review)
   */
  getPendingPhotos(): DonationPhoto[] {
    return this.donationPhotos
      .filter((d) => !d.approved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get photos by city
   */
  getPhotosByCity(city: string): DonationPhoto[] {
    return this.donationPhotos
      .filter((d) => d.city.toLowerCase() === city.toLowerCase() && d.approved && d.consentGiven)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get photos by drop-off location
   */
  getPhotosByLocation(location: string): DonationPhoto[] {
    return this.donationPhotos
      .filter((d) => d.dropoffLocation.toLowerCase() === location.toLowerCase() && d.approved && d.consentGiven)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get a single donation photo by ID
   */
  getDonationPhotoById(id: string): DonationPhoto | undefined {
    return this.donationPhotos.find((d) => d.id === id);
  }

  /**
   * Approve a donation photo (for admin)
   */
  approveDonationPhoto(id: string): boolean {
    const donation = this.donationPhotos.find((d) => d.id === id);
    if (donation) {
      donation.approved = true;
      return true;
    }
    return false;
  }

  /**
   * Reject/delete a donation photo (for admin)
   */
  rejectDonationPhoto(id: string): boolean {
    const index = this.donationPhotos.findIndex((d) => d.id === id);
    if (index > -1) {
      this.donationPhotos.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Feature a donation photo (for admin)
   */
  featureDonationPhoto(id: string): boolean {
    const donation = this.donationPhotos.find((d) => d.id === id);
    if (donation) {
      donation.featured = true;
      return true;
    }
    return false;
  }

  /**
   * Get random approved photos (for featured sections)
   */
  getRandomApprovedPhotos(count: number): DonationPhoto[] {
    const approved = this.getApprovedPhotos();
    const shuffled = [...approved].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Get total count of approved photos
   */
  getApprovedPhotosCount(): number {
    return this.getApprovedPhotos().length;
  }
}

export const donationPhotosService = new DonationPhotosService();
