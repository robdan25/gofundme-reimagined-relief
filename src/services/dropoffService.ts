// Drop-off Locations Service - Manages relief supply collection points

export type Region = 'London & South East' | 'Midlands & North' | 'Other Regions' | 'South Florida (Miami-Dade)' | 'South Florida (Broward)' | 'Central Florida (Orlando)' | 'NYC (All Boroughs)' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Manhattan' | 'Atlanta (Georgia)';
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

    // NYC - All Boroughs
    {
      id: 'nypd-all-boroughs',
      name: 'All NYPD Precincts',
      address: 'Multiple locations across all NYC boroughs',
      region: 'NYC (All Boroughs)',
      hours: '24/7 (Open 24 hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Drop-off donations at any local NYPD precinct 24/7',
    },

    // NYC - Brooklyn
    {
      id: 'brooklyn-borough-hall',
      name: 'Brooklyn Borough Hall',
      address: '209 Joralemon St, Brooklyn, NY 11201',
      region: 'Brooklyn',
      hours: 'Mon-Fri (during business hours)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'cunningham-district-office',
      name: 'NYS Assemblyman Brian Cunningham\'s District Office',
      address: '249 Empire Blvd, Brooklyn, NY 11225',
      region: 'Brooklyn',
      hours: 'Mon-Fri, 10:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'chandler-waterman-office',
      name: 'NYS Assemblywoman Monique Chandler-Waterman\'s District Office',
      address: '903 Utica Avenue, Brooklyn, NY 11203',
      region: 'Brooklyn',
      hours: 'Mon-Fri, 10:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'hibiscus-brew-brooklyn',
      name: 'Hibiscus Brew',
      address: '546 Flatbush Ave, Brooklyn, NY 11225',
      region: 'Brooklyn',
      hours: 'Mon-Fri (7:30 a.m. – 6:00 p.m.), Sat-Sun (8:30 a.m. – 6:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'vmbs-brooklyn',
      name: 'VMBS (Victoria Mutual Building Society)',
      address: '2700 Church Avenue, Brooklyn, NY 11226',
      region: 'Brooklyn',
      hours: 'Mon-Fri, 9:30 a.m. – 3:30 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'jamie-williams-office',
      name: 'NYS Assemblywoman Jamie Williams\' District Office',
      address: '5318 Avenue N, 1st Floor, Brooklyn, NY 11234',
      region: 'Brooklyn',
      hours: 'Mon-Fri (10:00 a.m. – 6:00 p.m.), Sat (9:00 a.m. – 3:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'st-lucia-house-brooklyn',
      name: 'St. Lucia House',
      address: '438 East 49th St, Brooklyn, NY 11203',
      region: 'Brooklyn',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'st-gabriel-church-brooklyn',
      name: 'St. Gabriel\'s Episcopal Church',
      address: '611 Degraw St, Brooklyn, NY 11217',
      region: 'Brooklyn',
      hours: 'Tues, Wed, Fri (9:00 a.m. – 4:00 p.m.), Sat (11:00 a.m. – 1:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'east-flatbush-village',
      name: 'East Flatbush Village',
      address: '1101 Utica Ave, Brooklyn, NY',
      region: 'Brooklyn',
      hours: 'Mon-Fri, 12:00 p.m. – 7:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'peppas-jerk-chicken-brooklyn',
      name: 'Peppa\'s Jerk Chicken',
      address: '1853 Nostrand Ave, Brooklyn, NY',
      region: 'Brooklyn',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },
    {
      id: 'cj-restaurant-flatbush',
      name: 'C & J\'s Restaurant - Flatbush',
      address: '875 Flatbush Ave, Brooklyn, NY',
      region: 'Brooklyn',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },
    {
      id: 'cj-restaurant-utica',
      name: 'C & J\'s Restaurant - Utica',
      address: '817 Utica Ave, Brooklyn, NY',
      region: 'Brooklyn',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },

    // NYC - Queens
    {
      id: 'vp-records-queens',
      name: 'VP Records (Official Consulate Partner)',
      address: '170-19 Jamaica Ave, Queens, NY 11432',
      region: 'Queens',
      hours: 'Mon-Sat, 12:00 p.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Official Consulate Partner',
    },
    {
      id: 'sanders-office-queens',
      name: 'Senator James Sanders Jr.\'s Office',
      address: '142-01 Rockaway Blvd, South Ozone Park, NY 11436',
      region: 'Queens',
      hours: 'Mon-Thurs, 9:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'comrie-office-queens',
      name: 'Senator Leroy Comrie\'s Office',
      address: '113-43 Farmers Blvd, St. Albans, NY 11412',
      region: 'Queens',
      hours: 'Mon-Thurs, 9:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'hyndman-office-queens',
      name: 'Assemblywoman Alicia Hyndman\'s Office',
      address: '232-06 Merrick Blvd, Laurelton, NY 11413',
      region: 'Queens',
      hours: 'Mon-Thurs, 9:00 a.m. – 5:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'brooks-powers-far-rockaway',
      name: 'Councilwoman Selvena Brooks-Powers\' Office - Far Rockaway',
      address: '1931 Mott Ave, Suite 410, Far Rockaway, NY 11691',
      region: 'Queens',
      hours: 'Mon, Wed (9:00 a.m. – 5:00 p.m.), Thurs (11:00 a.m. – 7:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'brooks-powers-laurelton',
      name: 'Councilwoman Selvena Brooks-Powers\' Office - Laurelton',
      address: '222-02 Merrick Blvd, Laurelton, NY 11413',
      region: 'Queens',
      hours: 'Mon, Wed (9:00 a.m. – 5:00 p.m.), Thurs (11:00 a.m. – 7:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'community-church-nazarene-queens',
      name: 'Community Church of the Nazarene',
      address: '14-14 Central Ave, Far Rockaway, NY 11691',
      region: 'Queens',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'first-church-nazarene-queens',
      name: 'First Church of the Nazarene',
      address: '108-01 95th Ave, South Richmond Hill, NY 11419',
      region: 'Queens',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },
    {
      id: 'merritas-restaurant-queens',
      name: 'Merritas Restaurant',
      address: '223-15 Linden Blvd, Queens, NY',
      region: 'Queens',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },

    // NYC - Bronx
    {
      id: 'original-dumpling-shop-bronx',
      name: 'The Original Dumpling Shop (Partnered with JAHJAH Foundation)',
      address: 'Off Baychester Avenue, Bronx, NY',
      region: 'Bronx',
      hours: 'Open 7 days a week during business hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Partnered with JAHJAH Foundation',
    },

    // NYC - Manhattan
    {
      id: 'true-indian-hair-company-manhattan',
      name: 'True Indian Hair Company',
      address: '225 W 35th Street, New York, NY 10001',
      region: 'Manhattan',
      hours: 'Mon-Fri, 11:00 a.m. – 6:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
    },

    // USA - Atlanta (Georgia) - Shipping & Logistics
    {
      id: 'caribbean-intl-shipping',
      name: 'Caribbean International Shipping Services',
      address: '3048 Miller Road, Stonecrest, GA 30038',
      region: 'Atlanta (Georgia)',
      phone: '(770) 323-1111',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Sharon Barnwell · Specialized shipping services',
      callAhead: true,
    },
    {
      id: 'sa-laparkan-shipping',
      name: 'S & A Laparkan Shipping',
      address: '5365 Dividend Drive, Decatur, GA 30035',
      region: 'Atlanta (Georgia)',
      phone: '(770) 322-7922 or (770) 322-7923',
      hours: 'Mon–Fri (9:30 a.m. – 5:00 p.m.), Sat (9:00 a.m. – 1:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Seelochney Mohamed · Full-service shipping',
      callAhead: true,
    },
    {
      id: 'delta-air-lines-atlanta',
      name: 'Delta Air Lines (Atlanta)',
      address: '1777 Harvard Avenue, College Park, GA 30337',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Ms. E. Rashford · Air freight options',
      callAhead: true,
    },

    // USA - Atlanta (Georgia) - Community Centers & Churches
    {
      id: 'word-of-life-intl-church',
      name: 'Word of Life International Church of God',
      address: '4881 Lawrenceville Hwy, Tucker, GA 30084',
      region: 'Atlanta (Georgia)',
      phone: '(678) 937-9897',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Pastor Kenneth Hanson Jr.',
    },
    {
      id: 'caribbean-life-tv',
      name: 'Caribbean Life TV',
      address: '414 North Hairston Road, Suite 300, Stone Mountain, GA 30083',
      region: 'Atlanta (Georgia)',
      phone: '(404) 218-1234',
      hours: 'Mon–Fri (1:00 p.m. – 8:00 p.m.), Sat (9:00 a.m. – 3:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Lawrence Prescott',
    },
    {
      id: 'berean-christian-gwinnett',
      name: 'Berean Christian Church (Gwinnett)',
      address: '1465 Highpoint Rd, Snellville, GA 30078',
      region: 'Atlanta (Georgia)',
      hours: '10:00 a.m. – 4:30 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Bro. David Cuffie',
    },
    {
      id: 'berean-christian-dekalb',
      name: 'Berean Christian Church (Dekalb)',
      address: '2201 Young Road, Stone Mountain, GA 30088',
      region: 'Atlanta (Georgia)',
      phone: '',
      hours: 'Mon–Fri (9:00 a.m. – 5:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Sis. Donna Bush',
    },
    {
      id: 'berean-christian-henry',
      name: 'Berean Christian Church (Henry)',
      address: '171 Collier Road, Stockbridge, GA 30281',
      region: 'Atlanta (Georgia)',
      hours: 'Mon–Fri (9:00 a.m. – 5:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Min. Darrell Barrett',
    },
    {
      id: 'tara-events-center',
      name: 'Tara Events Center',
      address: '6340 GA-138, Jonesboro, GA 30236',
      region: 'Atlanta (Georgia)',
      hours: 'Mon–Fri (8:30 a.m. – 10:30 a.m. & 4:30 p.m. – 7:30 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical', 'bedding'],
      notes: 'Contact: Chris Scott',
    },

    // USA - Atlanta (Georgia) - Restaurants & Caribbean Businesses
    {
      id: 'irie-mon-cafe',
      name: 'Irie Mon Café',
      address: '5975 Peachtree Parkway, #2, Norcross, GA 30092',
      region: 'Atlanta (Georgia)',
      hours: '11:00 a.m. – 10:00 p.m.',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },
    {
      id: 'kool-runnings-restaurant',
      name: 'Kool Runnings Restaurant',
      address: '5450 Peachtree Pkwy, 8D, Peachtree Corners, GA 30092',
      region: 'Atlanta (Georgia)',
      phone: '',
      hours: 'Mon–Sat (12:00 p.m. – 7:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Marcia Reid',
    },
    {
      id: 'jays-caribbean-cuisine',
      name: 'Jay\'s Caribbean Cuisine',
      address: '150 Hurricane Shoals Rd, Lawrenceville, GA',
      region: 'Atlanta (Georgia)',
      hours: 'Tues–Sat (11:00 a.m. – 7:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Jackie or Liz',
    },
    {
      id: 'kingston-30',
      name: 'Kingston 30',
      address: '455 Grayson Hwy, Suite 128, Lawrenceville, GA',
      region: 'Atlanta (Georgia)',
      hours: 'Mon–Fri (11:00 a.m. – 11:00 p.m.), Sat (11:00 a.m. – 7:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Desmond Nembhard',
    },
    {
      id: 'royal-caribbean-bakery',
      name: 'Royal Caribbean Bakery',
      address: '4859 Memorial Dr, Stone Mountain, GA 30083',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies'],
      notes: 'Contact: Mr. Chin',
    },
    {
      id: 'sun-city-caribbean-restaurant',
      name: 'Sun City Caribbean & American Restaurant',
      address: '6201 Memorial Dr, Stone Mountain, GA 30083',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Nzingha Reid',
    },
    {
      id: 'queen-jamaican-cuisine',
      name: 'Queen Jamaican Cuisine',
      address: '1005 Brentwood Parkway, Stockbridge, GA 30281',
      region: 'Atlanta (Georgia)',
      hours: 'Mon–Sat (11:00 a.m. – 8:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Jennifer',
    },
    {
      id: 'fern-gully-jamaican-cafe',
      name: 'Fern Gully Jamaican Café',
      address: '2756 S Main St, Kennesaw, GA 30144',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },
    {
      id: 'ns-caribbean-market',
      name: 'N and S Caribbean Market',
      address: '685 GA-3, Hampton, GA 30228',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies'],
    },
    {
      id: 'select-intl-farmers-market',
      name: 'Select International Farmers Market',
      address: '8639 Tara Blvd, Jonesboro, GA 30236',
      region: 'Atlanta (Georgia)',
      hours: 'Contact for hours',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
    },
    {
      id: 'center-for-pain-rehab',
      name: 'Center For Pain and Rehab Medicine',
      address: '240 Medical Blvd, Stockbridge, GA 30281',
      region: 'Atlanta (Georgia)',
      phone: '',
      hours: 'Mon–Fri (8:00 a.m. – 5:30 p.m.)',
      acceptedItems: ['medical', 'hygiene', 'baby-supplies'],
      notes: 'Contact: Dr. Maxine Osbourne Foster',
    },
    {
      id: 'gmr-auto-care-center',
      name: 'GMR Auto Care Center',
      address: '3120 Main St W, Suite B, Snellville, GA',
      region: 'Atlanta (Georgia)',
      hours: 'Mon–Fri (9:00 a.m. – 6:00 p.m.), Sat (9:00 a.m. – 1:00 p.m.)',
      acceptedItems: ['non-perishable-food', 'hygiene', 'baby-supplies', 'medical'],
      notes: 'Contact: Lisa Royes',
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
      'NYC (All Boroughs)',
      'Brooklyn',
      'Queens',
      'Bronx',
      'Manhattan',
      'Atlanta (Georgia)',
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
      'NYC (All Boroughs)': this.locations.filter((l) => l.region === 'NYC (All Boroughs)').length,
      'Brooklyn': this.locations.filter((l) => l.region === 'Brooklyn').length,
      'Queens': this.locations.filter((l) => l.region === 'Queens').length,
      'Bronx': this.locations.filter((l) => l.region === 'Bronx').length,
      'Manhattan': this.locations.filter((l) => l.region === 'Manhattan').length,
      'Atlanta (Georgia)': this.locations.filter((l) => l.region === 'Atlanta (Georgia)').length,
    };
  }
}

export const dropoffService = new DropoffService();
