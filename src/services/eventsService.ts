// Events Service - Manages local relief events and activities in Jamaica

export interface ReliefsEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: 'collection' | 'distribution' | 'fundraiser' | 'volunteer' | 'workshop';
  organizer: string;
  attendees?: number;
  image?: string;
  contactEmail?: string;
  contactPhone?: string;
  link?: string;
  urgent?: boolean;
}

class EventsService {
  // Mock events data - in production, this would come from an API
  private events: ReliefsEvent[] = [
    {
      id: 'event-1',
      title: 'Relief Supply Collection Drive',
      description: 'Drop off non-perishable food, clean water, and medical supplies at Kingston Convention Centre. All supplies will be distributed to affected communities.',
      date: new Date('2025-11-08T09:00:00'),
      location: 'Kingston Convention Centre, Kingston',
      category: 'collection',
      organizer: 'Unbiased Relief',
      attendees: 150,
      contactEmail: 'events@unbiasedrelief.org',
      contactPhone: '+1-876-555-0100',
      image: 'https://unbiasedrelief.org/Images/Conven.png',
    },
    {
      id: 'event-2',
      title: 'Volunteer Registration & Training',
      description: 'Join us for volunteer orientation training. Learn how to safely handle and distribute relief supplies. All volunteers welcome regardless of experience.',
      date: new Date('2025-11-07T14:00:00'),
      location: 'Montego Bay Community Center, Montego Bay',
      category: 'volunteer',
      organizer: 'Jamaica Red Cross',
      attendees: 75,
      contactEmail: 'volunteers@jamaicaredcross.org',
      contactPhone: '+1-876-555-0101',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    },
    {
      id: 'event-3',
      title: 'Community Distribution Day',
      description: 'Help distribute collected supplies to families in Spanish Town. Volunteers needed for sorting, packing, and distribution activities.',
      date: new Date('2025-11-10T10:00:00'),
      location: 'Spanish Town Relief Center, Spanish Town',
      category: 'distribution',
      organizer: 'Local NGO Alliance',
      attendees: 200,
      contactEmail: 'distribution@localngos.org',
      contactPhone: '+1-876-555-0102',
      image: 'https://unbiasedrelief.org/Images/Comm.png',
      urgent: true,
    },
    {
      id: 'event-4',
      title: 'Medical Supply Drive',
      description: 'Collecting essential medical supplies: bandages, pain relievers, antibiotics, and first aid kits for affected medical facilities.',
      date: new Date('2025-11-09T08:00:00'),
      location: 'National Medical Supply Warehouse, Kingston',
      category: 'collection',
      organizer: 'Ministry of Health',
      attendees: 120,
      contactEmail: 'medical@moh.gov.jm',
      contactPhone: '+1-876-555-0103',
      image: 'https://unbiasedrelief.org/Images/Medi.png',
    },
    {
      id: 'event-5',
      title: 'Relief Logistics Workshop',
      description: 'Learn about efficient supply chain management for disaster relief. Suitable for coordinators and those managing relief drives.',
      date: new Date('2025-11-12T13:00:00'),
      location: 'University of the West Indies, Mona, Kingston',
      category: 'workshop',
      organizer: 'Caribbean Disaster Management Unit',
      attendees: 60,
      contactEmail: 'workshops@cdmu.gov.jm',
      contactPhone: '+1-876-555-0104',
      image: 'https://images.unsplash.com/photo-1583166615346-edadc433eaa7?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8amFtYWljYW4lMjBwZW9wbGUlMjB3b3Jrc2hvcCUyMHRyYWluaW5nfGVufDB8fHx8MTc2MjU1MjkyM3ww&ixlib=rb-4.1.0&q=85&w=600&h=300&fit=crop',
    },
  ];

  /**
   * Get all upcoming events
   */
  getUpcomingEvents(): ReliefsEvent[] {
    const now = new Date();
    return this.events
      .filter((event) => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Get events by category
   */
  getEventsByCategory(category: ReliefsEvent['category']): ReliefsEvent[] {
    return this.events.filter((event) => event.category === category);
  }

  /**
   * Get events in the next N days
   */
  getEventsInNextDays(days: number): ReliefsEvent[] {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return this.events
      .filter((event) => event.date > now && event.date <= futureDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Get urgent events
   */
  getUrgentEvents(): ReliefsEvent[] {
    return this.events.filter((event) => event.urgent === true);
  }

  /**
   * Get a single event by ID
   */
  getEventById(id: string): ReliefsEvent | undefined {
    return this.events.find((event) => event.id === id);
  }

  /**
   * Get events by location
   */
  getEventsByLocation(location: string): ReliefsEvent[] {
    return this.events.filter((event) =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  /**
   * Add a new event
   */
  addEvent(event: ReliefsEvent): void {
    this.events.push(event);
  }

  /**
   * Update an event
   */
  updateEvent(id: string, updates: Partial<ReliefsEvent>): boolean {
    const event = this.events.find((e) => e.id === id);
    if (event) {
      Object.assign(event, updates);
      return true;
    }
    return false;
  }

  /**
   * Delete an event
   */
  deleteEvent(id: string): boolean {
    const index = this.events.findIndex((e) => e.id === id);
    if (index > -1) {
      this.events.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const eventsService = new EventsService();
