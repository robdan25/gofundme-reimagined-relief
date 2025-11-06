import { Button } from "@/components/ui/button";
import { MapPin, X, Navigation } from "lucide-react";

interface LocationMapProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  address: string;
  city: string;
}

const LocationMap = ({
  isOpen,
  onClose,
  locationName,
  address,
  city,
}: LocationMapProps) => {
  if (!isOpen) return null;

  // Create Google Maps URLs
  const fullAddress = `${address}, ${city}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const googleMapsUrl = `https://www.google.com/maps/search/${encodedAddress}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{locationName}</h2>
          <button
            onClick={onClose}
            className="p-2 h-10 w-10 flex items-center justify-center hover:bg-accent rounded transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 pb-4">
          {/* Address Info */}
          <div className="flex items-start gap-3 bg-muted p-4 rounded-lg">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-foreground">{locationName}</p>
              <p className="text-muted-foreground text-sm">{address}</p>
              <p className="text-muted-foreground text-sm">{city}</p>
            </div>
          </div>

          {/* Map Container with Static Image */}
          <div className="w-full rounded-lg overflow-hidden border border-border bg-muted">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=15&size=600x300&markers=color:red%7C${encodedAddress}&style=feature:all|element:labels|visibility:off&style=feature:road|color:0x000000&style=feature:road.arterial|color:0x5f5f5f&style=feature:road.highway|color:0x8b8b8b&style=feature:water|color:0xb3d9ff`}
                alt={`Map of ${locationName}`}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  // Fallback if static map fails
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EClick to view on Google Maps%3C/text%3E%3C/svg%3E";
                }}
              />
            </a>
            <div className="p-3 bg-muted text-xs text-muted-foreground text-center border-t border-border">
              Click the map to open in Google Maps
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              To confirm current drop-off hours and availability, please contact the location directly or visit their website before dropping off items.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                <MapPin className="w-4 h-4 mr-2" />
                View Location
              </Button>
            </a>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </a>
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationMap;
