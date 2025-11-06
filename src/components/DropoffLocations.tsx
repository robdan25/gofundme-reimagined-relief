import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Package,
  Search,
  Filter,
} from 'lucide-react';
import {
  dropoffService,
  type DropoffLocation,
  type Region,
  type ItemType,
} from '@/services/dropoffService';

interface DropoffLocationsProps {
  featured?: boolean;
  limit?: number;
}

export const DropoffLocations = ({ featured = false, limit }: DropoffLocationsProps) => {
  const [locations, setLocations] = useState<DropoffLocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<DropoffLocation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [selectedItemType, setSelectedItemType] = useState<ItemType | 'all'>('all');

  const itemTypeLabels: Record<ItemType, string> = {
    'non-perishable-food': 'Non-Perishable Food',
    'hygiene': 'Hygiene Products',
    'baby-supplies': 'Baby Supplies',
    'medical': 'Medical Kits',
    'bedding': 'Bedding',
  };

  const itemTypeColors: Record<ItemType, string> = {
    'non-perishable-food': 'bg-orange-100 text-orange-800',
    'hygiene': 'bg-blue-100 text-blue-800',
    'baby-supplies': 'bg-pink-100 text-pink-800',
    'medical': 'bg-red-100 text-red-800',
    'bedding': 'bg-purple-100 text-purple-800',
  };

  useEffect(() => {
    const allLocations = dropoffService.getAllLocations();
    setLocations(allLocations);
    filterLocations(allLocations, '', 'all', 'all');
  }, []);

  const filterLocations = (
    locsList: DropoffLocation[],
    search: string,
    region: Region | 'all',
    itemType: ItemType | 'all'
  ) => {
    let filtered = locsList;

    // Search filter
    if (search.trim()) {
      filtered = dropoffService.searchLocations(search);
    }

    // Region filter
    if (region !== 'all') {
      filtered = filtered.filter((loc) => loc.region === region);
    }

    // Item type filter
    if (itemType !== 'all') {
      filtered = filtered.filter((loc) => loc.acceptedItems.includes(itemType));
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    setFilteredLocations(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    filterLocations(locations, value, selectedRegion, selectedItemType);
  };

  const handleRegionChange = (region: Region | 'all') => {
    setSelectedRegion(region);
    filterLocations(locations, searchQuery, region, selectedItemType);
  };

  const handleItemTypeChange = (itemType: ItemType | 'all') => {
    setSelectedItemType(itemType);
    filterLocations(locations, searchQuery, selectedRegion, itemType);
  };

  const regionCounts = dropoffService.getLocationCountByRegion();
  const regions: (Region | 'all')[] = [
    'all',
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

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Drop-Off Locations</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mb-2">
          Find a convenient location to drop off relief supplies for Hurricane Melissa.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Accepted items:</span> Non-perishable food, hygiene products,
          baby supplies, medical kits, and bedding. <span className="italic">Please note: Only new items are accepted.</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by location name or postcode..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Region Filter */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            <Filter className="w-4 h-4 inline mr-2" />
            Region
          </label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleRegionChange(region)}
                className={
                  selectedRegion === region ? 'bg-primary hover:bg-primary-hover text-white' : ''
                }
              >
                {region === 'all' ? `All Regions (${locations.length})` : `${region} (${regionCounts[region as Region]})`}
              </Button>
            ))}
          </div>
        </div>

        {/* Item Type Filter */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            <Package className="w-4 h-4 inline mr-2" />
            Item Type
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedItemType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleItemTypeChange('all')}
              className={selectedItemType === 'all' ? 'bg-primary hover:bg-primary-hover text-white' : ''}
            >
              All Items
            </Button>
            {(Object.keys(itemTypeLabels) as ItemType[]).map((itemType) => (
              <Button
                key={itemType}
                variant={selectedItemType === itemType ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleItemTypeChange(itemType)}
                className={
                  selectedItemType === itemType ? 'bg-primary hover:bg-primary-hover text-white' : ''
                }
              >
                {itemTypeLabels[itemType]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid gap-6">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="grid md:grid-cols-[1fr_auto] gap-6">
                  {/* Location Details */}
                  <div className="space-y-4">
                    {/* Name and region */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{location.name}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {location.region}
                      </Badge>
                    </div>

                    {/* Address */}
                    <div className="flex gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{location.address}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-3 text-sm">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{location.hours}</p>
                        {location.callAhead && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-semibold">Please call ahead</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    {location.phone && (
                      <div className="flex gap-3 text-sm">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <a
                          href={`tel:${location.phone}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {location.phone}
                        </a>
                      </div>
                    )}

                    {/* Accepted Items */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Accepts:</p>
                      <div className="flex flex-wrap gap-2">
                        {location.acceptedItems.map((itemType) => (
                          <Badge
                            key={itemType}
                            className={`text-xs ${itemTypeColors[itemType]}`}
                          >
                            {itemTypeLabels[itemType]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {location.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
                        <p className="flex gap-2 items-start">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{location.notes}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 justify-center">
                    {location.phone && (
                      <a href={`tel:${location.phone}`}>
                        <Button variant="outline" className="w-full gap-2">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                      </a>
                    )}
                    {location.coordinates && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full gap-2 bg-primary hover:bg-primary-hover text-white">
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </Button>
                      </a>
                    )}
                    {!location.coordinates && (
                      <Button
                        className="w-full gap-2 bg-primary hover:bg-primary-hover text-white"
                        onClick={() => {
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(location.address)}`,
                            '_blank'
                          );
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">No Locations Found</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No drop-off locations match your search criteria. Try adjusting your filters or contact us for more information.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info Banner */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-2">Before you donate:</p>
              <ul className="space-y-1 text-xs">
                <li>✓ Only new, unused items are accepted</li>
                <li>✓ Focus on the official needs list: non-perishable food, hygiene products, baby supplies, medical kits, bedding</li>
                <li>✓ Call ahead to confirm operating hours and check current needs</li>
                <li>✓ Ask about packaging and delivery requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DropoffLocations;
