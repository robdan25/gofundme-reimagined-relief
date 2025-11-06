// Drop-off Locations Service - Manages relief supply collection points

export type Region = 'London & South East' | 'Midlands & North' | 'Other Regions' | 'South Florida (Miami-Dade)' | 'South Florida (Broward)' | 'Central Florida (Orlando)';
export type ItemType = 'non-perishable-food' | 'hygiene' | 'baby-supplies' | 'medical' | 'bedding';

export interface DropoffLocation {
  id: string;
  name: string;
  address: string;
  region: Region;
  phone?: string;
  hours: string;
  acceptedItems: ItemType[];
  notes?: string;
  callAhead?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

class DropoffService {
  private locations: DropoffLocation[] = [
    // London & South East
    {
      id: 'jp-logistics',
      name: 'JP Logistics Solutions',
      address: '14 Lamson Road, Rainham, Essex, RM13 9YY',
      region: 'London & South East',
      phone: '020 7476 0154',
      hours: 'Mon-Fri, 9:00 a.m. – 4:30 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      callAhead: true,
    },
    {
      id: 'kingsley-shipping',
      name: 'Kingsley Shipping Services Ltd.',
      address: 'Unit 3, 214 Purley Way, Croydon, CR0 4XG',
      region: 'London & South East',
      phone: '020 8689 6622',
      hours: 'Mon-Fri, 10:00 a.m. – 4:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'croydon-bme',
      name: 'Croydon BME Forum & Windrush Generation Legacy Association',
      address: '56A Mitcham Road, Croydon, CR0 3RG',
      region: 'London & South East',
      phone: '020 8684 3719',
      hours: 'Saturdays, 9:00 a.m. – 6:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'sudbury-methodist',
      name: 'Sudbury Methodist Church',
      address: '809 Harrow Road, Wembley, HA0 2LP',
      region: 'London & South East',
      hours: 'Tuesdays (6:00 p.m. – 8:00 p.m.), Thursdays & Fridays (11:00 a.m. – 3:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'brixton-soup',
      name: 'Brixton Soup Kitchen / Brixton Immortals Domino Club',
      address: '297–299 Coldharbour Lane, Brixton, SW9 8RP',
      region: 'London & South East',
      hours: 'Mon-Fri, 11:00 a.m. – 3:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'remakery-london',
      name: 'Remakery London',
      address: '51 Lilford Road, SE5 9HY',
      region: 'London & South East',
      hours: 'Varying hours, including evenings',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'northwick-park',
      name: 'Northwick Park Hospital (LNWH NHS Trust)',
      address: 'Maternity Entrance, Level 4, Northwick Park Hospital, London',
      region: 'London & South East',
      hours: 'Standard hospital hours',
      acceptedItems: ['medical', 'baby-supplies'],
      notes: 'Run by the hospital\'s maternity team',
    },
    {
      id: 'jn-tottenham',
      name: 'JN Money - Tottenham',
      address: '550-552 High Road, London, N17 9SY',
      region: 'London & South East',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'jn-elephant-park',
      name: 'JN Money - Elephant Park',
      address: '135 Walworth Rd, London, SE17 1RW',
      region: 'London & South East',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'jn-brixton-money',
      name: 'JN Money - Brixton',
      address: '389-391 Brixton Road, London, SW9 7DE',
      region: 'London & South East',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'jn-brixton-bank',
      name: 'JN Bank - Brixton',
      address: '410 Brixton Road, London, SW9 7AE',
      region: 'London & South East',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },

    // Midlands & North
    {
      id: 'jlb-shipping',
      name: 'JLB Shipping & Logistics Ltd.',
      address: 'Unit G, Sam\'s Lane, Spon Lane Trading Estate, 215–217 Sam\'s Lane, West Bromwich, B70 7EX',
      region: 'Midlands & North',
      phone: '0121 661 6525',
      hours: 'Mon-Fri (10:00 a.m. – 3:00 p.m.), Saturdays (9:00 a.m. – 12:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      callAhead: true,
    },
    {
      id: 'cleone-foods',
      name: 'Cleone Foods Ltd.',
      address: '50 Icknield Street, Birmingham, B18 5AY',
      region: 'Midlands & North',
      phone: '0121 551 2772',
      hours: 'Mon-Fri, 9:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'legacy-centre',
      name: 'The Legacy Centre of Excellence',
      address: '144 Potters Lane, Birmingham, B6 4UU',
      region: 'Midlands & North',
      phone: '0121 448 8910',
      hours: 'Mon-Fri, 10:00 a.m. onwards',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'jn-manchester',
      name: 'JN Money - Manchester',
      address: '112 Hulme High Street, M15 5JP',
      region: 'Midlands & North',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'jn-handsworth',
      name: 'JN Money - Birmingham (Handsworth)',
      address: '311A Soho Road, Handsworth, B21 9SD',
      region: 'Midlands & North',
      hours: 'Standard banking hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'jn-perry-barr',
      name: 'JN Money - Birmingham (Perry Barr)',
      address: 'One Stop Shopping Centre, Unit 1, In-shops, B42 1AA',
      region: 'Midlands & North',
      hours: 'Standard shopping centre hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'In partnership with Food for the Poor',
    },
    {
      id: 'leeds-ntcog',
      name: 'New Testament Church of God - Leeds',
      address: '3 Easterly Road, Roundhay, Leeds, LS8 2TN',
      region: 'Midlands & North',
      hours: 'Wednesday (Drop-off day)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'nottingham-acna',
      name: 'ACNA Centre - Nottingham',
      address: '31 HungerHill Road, Nottingham, NG3 4NB',
      region: 'Midlands & North',
      phone: '07871 730 197',
      hours: 'Mon-Wed (Varying hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'sheffield-sadacca',
      name: 'SADACCA - Sheffield',
      address: '48 The Wicker, S3 8JB',
      region: 'Midlands & North',
      hours: 'Mon-Fri, 10:30 a.m. – 6:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'huddersfield-chestnut',
      name: 'Chestnut Centre - Huddersfield',
      address: '2A Chestnut Street, Deighton, Huddersfield',
      region: 'Midlands & North',
      hours: 'Mon-Fri, 10:00 a.m. – 4:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },

    // Other Regions
    {
      id: 'brighton-afrori',
      name: 'Afrori Books - Brighton',
      address: 'Brighthelm Church and Community Centre, Brighton and Hove, BN1 1YD',
      region: 'Other Regions',
      hours: 'Tue-Sat, 10:30 a.m. – 6:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'bristol-ntcog',
      name: 'New Testament Church of God - Bristol',
      address: '141 Fishponds Road, Eastville, Bristol, BS5 6PR',
      region: 'Other Regions',
      hours: 'Wednesday (Drop-off day)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'cardiff-ntcog',
      name: 'New Testament Church of God - Cardiff',
      address: '6 Maria Street, Cardiff, CF10 5HF',
      region: 'Other Regions',
      hours: 'Wednesday (Drop-off day)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'newport-ntcog',
      name: 'New Testament Church of God - Newport',
      address: '173 Commercial Road, Newport, NP20 2PL',
      region: 'Other Regions',
      hours: 'Wednesday (Drop-off day)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },

    // USA - South Florida (Miami-Dade)
    {
      id: 'gem-doral',
      name: 'Global Empowerment Mission (GEM) Headquarters',
      address: '1850 NW 84th Ave, #100, Doral, FL 33126',
      region: 'South Florida (Miami-Dade)',
      hours: 'Mon–Fri (10 AM–5 PM), Sat (10 AM–2 PM)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Primary Hub',
    },
    {
      id: 'homestead-city-hall',
      name: 'Homestead City Hall',
      address: '100 Civic Court, Homestead, FL 33030',
      region: 'South Florida (Miami-Dade)',
      hours: 'Mon-Fri (Standard hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'phichol-williams',
      name: 'Phichol Williams Community Center',
      address: '951 SW 4th St, Homestead, FL 33030',
      region: 'South Florida (Miami-Dade)',
      hours: 'Saturdays',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'miami-gardens-betty',
      name: 'Betty T. Ferguson Recreational Complex',
      address: '3000 NW 199th Street, Miami Gardens, FL 33056',
      region: 'South Florida (Miami-Dade)',
      hours: 'Mon-Fri (Standard hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },

    // USA - South Florida (Broward)
    {
      id: 'miramar-police',
      name: 'Miramar Police Headquarters',
      address: '11765 City Hall Promenade, Miramar, FL',
      region: 'South Florida (Broward)',
      hours: 'Mon-Fri (Standard hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Partnered with Consul General of Jamaica',
    },
    {
      id: 'ft-lauderdale-police',
      name: 'Fort Lauderdale Police Department HQ',
      address: '1300 W Broward Blvd, Fort Lauderdale, FL',
      region: 'South Florida (Broward)',
      hours: 'Mon-Fri (Standard hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'All Fire Rescue stations open 8 AM-8 PM daily',
    },
    {
      id: 'food-for-poor',
      name: 'Food for the Poor',
      address: '6401 Lyons Road, Coconut Creek, FL 33073',
      region: 'South Florida (Broward)',
      hours: 'Mon-Fri (Business hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'jerk-machine-ft',
      name: 'Jerk Machine Restaurant',
      address: '317 SW 6th St, Fort Lauderdale, FL 33315',
      region: 'South Florida (Broward)',
      hours: 'Mon-Sat, 4 PM – 8 PM',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },

    // USA - Central Florida (Orlando)
    {
      id: 'marks-jamaican-grill',
      name: 'Marks Jamaican Grill',
      address: '5700 W University Blvd, Orlando, FL 32807',
      region: 'Central Florida (Orlando)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'cap-village-orlando',
      name: 'CAP Village (Caribbean American Passport)',
      address: 'Inside Fashion Square Mall, 3201 E Colonial Dr, Orlando, FL 32803',
      region: 'Central Florida (Orlando)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
  ];

  /**
   * Get all drop-off locations
   */
  getAllLocations(): DropoffLocation[] {
    return this.locations;
  }

  /**
   * Get locations by region
   */
  getLocationsByRegion(region: Region): DropoffLocation[] {
    return this.locations.filter((location) => location.region === region);
  }

  /**
   * Get locations that accept a specific item type
   */
  getLocationsByItemType(itemType: ItemType): DropoffLocation[] {
    return this.locations.filter((location) => location.acceptedItems.includes(itemType));
  }

  /**
   * Search locations by name or address
   */
  searchLocations(query: string): DropoffLocation[] {
    const lowerQuery = query.toLowerCase();
    return this.locations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowerQuery) ||
        location.address.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get a single location by ID
   */
  getLocationById(id: string): DropoffLocation | undefined {
    return this.locations.find((location) => location.id === id);
  }

  /**
   * Get all regions
   */
  getAllRegions(): Region[] {
    return [
      'London & South East',
      'Midlands & North',
      'Other Regions',
      'South Florida (Miami-Dade)',
      'South Florida (Broward)',
      'Central Florida (Orlando)',
    ];
  }

  /**
   * Get count of locations by region
   */
  getLocationCountByRegion(): Record<Region, number> {
    return {
      'London & South East': this.locations.filter((l) => l.region === 'London & South East').length,
      'Midlands & North': this.locations.filter((l) => l.region === 'Midlands & North').length,
      'Other Regions': this.locations.filter((l) => l.region === 'Other Regions').length,
      'South Florida (Miami-Dade)': this.locations.filter((l) => l.region === 'South Florida (Miami-Dade)').length,
      'South Florida (Broward)': this.locations.filter((l) => l.region === 'South Florida (Broward)').length,
      'Central Florida (Orlando)': this.locations.filter((l) => l.region === 'Central Florida (Orlando)').length,
    };
  }
}

export const dropoffService = new DropoffService();
