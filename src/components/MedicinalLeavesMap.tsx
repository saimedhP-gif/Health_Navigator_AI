import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { medicinalLeaves, type MedicinalLeaf } from "@/data/medicinalLeaves";
import { regionCoordinates, getCoordinatesForRegion } from "@/data/regionCoordinates";
import { Button } from "@/components/ui/button";
import { X, Leaf, MapPin, ChevronRight } from "lucide-react";

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom leaf marker icon
const createLeafIcon = (color: string = "#22c55e") => {
  return L.divIcon({
    className: "custom-leaf-marker",
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Group leaves by region with coordinates
interface RegionGroup {
  region: string;
  coords: { lat: number; lng: number };
  leaves: MedicinalLeaf[];
}

function MapController({ selectedRegion }: { selectedRegion: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRegion) {
      const coords = getCoordinatesForRegion(selectedRegion);
      if (coords) {
        map.flyTo([coords.lat, coords.lng], 5, { duration: 1.5 });
      }
    } else {
      map.flyTo([20, 0], 2, { duration: 1.5 });
    }
  }, [selectedRegion, map]);
  
  return null;
}

interface MedicinalLeavesMapProps {
  onSelectLeaf?: (leaf: MedicinalLeaf) => void;
}

export function MedicinalLeavesMap({ onSelectLeaf }: MedicinalLeavesMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  
  // Group leaves by their primary region with coordinates
  const regionGroups = useMemo(() => {
    const groups: Record<string, RegionGroup> = {};
    
    medicinalLeaves.forEach((leaf) => {
      leaf.regions.forEach((region) => {
        const coords = getCoordinatesForRegion(region);
        if (coords) {
          if (!groups[region]) {
            groups[region] = {
              region,
              coords,
              leaves: [],
            };
          }
          // Avoid duplicates
          if (!groups[region].leaves.find((l) => l.id === leaf.id)) {
            groups[region].leaves.push(leaf);
          }
        }
      });
    });
    
    return Object.values(groups);
  }, []);

  const leafIcon = useMemo(() => createLeafIcon(), []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-border">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: "hsl(var(--muted))" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedRegion={selectedRegion} />
        
        {regionGroups.map((group) => (
          <Marker
            key={group.region}
            position={[group.coords.lat, group.coords.lng]}
            icon={leafIcon}
            eventHandlers={{
              click: () => setActivePopup(group.region),
            }}
          >
            <Popup>
              <div className="min-w-[200px] max-w-[280px]">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">{group.region}</h3>
                  <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {group.leaves.length} {group.leaves.length === 1 ? "leaf" : "leaves"}
                  </span>
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {group.leaves.map((leaf) => (
                    <button
                      key={leaf.id}
                      onClick={() => onSelectLeaf?.(leaf)}
                      className="w-full text-left p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-lg">{leaf.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {leaf.commonName}
                        </p>
                        <p className="text-xs text-muted-foreground italic truncate">
                          {leaf.scientificName}
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border z-[1000]">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-medium">Medicinal Leaf Origin</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Click markers to explore leaves from each region
        </p>
      </div>
      
      {/* Region filter */}
      <div className="absolute top-4 right-4 z-[1000]">
        <select
          value={selectedRegion || ""}
          onChange={(e) => setSelectedRegion(e.target.value || null)}
          className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Regions</option>
          {regionGroups.map((group) => (
            <option key={group.region} value={group.region}>
              {group.region} ({group.leaves.length})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
