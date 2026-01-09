export const regionCoordinates: Record<string, { lat: number; lng: number }> = {
  // Asia
  "India": { lat: 20.5937, lng: 78.9629 },
  "China": { lat: 35.8617, lng: 104.1954 },
  "Japan": { lat: 36.2048, lng: 138.2529 },
  "Southeast Asia": { lat: 13.7563, lng: 100.5018 },
  "Korea": { lat: 35.9078, lng: 127.7669 },
  "Indonesia": { lat: -0.7893, lng: 113.9213 },
  "Vietnam": { lat: 14.0583, lng: 108.2772 },
  "Philippines": { lat: 12.8797, lng: 121.7740 },
  "Sri Lanka": { lat: 7.8731, lng: 80.7718 },
  "Thailand": { lat: 15.8700, lng: 100.9925 },
  "Malaysia": { lat: 4.2105, lng: 101.9758 },
  
  // Middle East
  "Middle East": { lat: 29.2985, lng: 42.5510 },
  "Iran": { lat: 32.4279, lng: 53.6880 },
  "Turkey": { lat: 38.9637, lng: 35.2433 },
  
  // Africa
  "Africa": { lat: 1.6508, lng: 17.3005 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  "Southern Africa": { lat: -22.3285, lng: 24.6849 },
  "East Africa": { lat: -6.3690, lng: 34.8888 },
  "West Africa": { lat: 9.0820, lng: -1.8312 },
  "North Africa": { lat: 28.0339, lng: 1.6596 },
  "Central Africa": { lat: 4.0383, lng: 21.7587 },
  "Nigeria": { lat: 9.0820, lng: 8.6753 },
  "Ethiopia": { lat: 9.1450, lng: 40.4897 },
  "Madagascar": { lat: -18.7669, lng: 46.8691 },
  "Tanzania": { lat: -6.3690, lng: 34.8888 },
  "Kenya": { lat: -0.0236, lng: 37.9062 },
  "Namibia": { lat: -22.9576, lng: 18.4904 },
  "Botswana": { lat: -22.3285, lng: 24.6849 },
  "Egypt": { lat: 26.8206, lng: 30.8025 },
  "Morocco": { lat: 31.7917, lng: -7.0926 },
  "Sudan": { lat: 12.8628, lng: 30.2176 },
  
  // Europe
  "Europe": { lat: 54.5260, lng: 15.2551 },
  "Mediterranean": { lat: 35.9375, lng: 14.3754 },
  "Western Europe": { lat: 46.2276, lng: 2.2137 },
  "Eastern Europe": { lat: 50.0755, lng: 14.4378 },
  "Greece": { lat: 39.0742, lng: 21.8243 },
  "Italy": { lat: 41.8719, lng: 12.5674 },
  "Spain": { lat: 40.4637, lng: -3.7492 },
  "France": { lat: 46.2276, lng: 2.2137 },
  "Germany": { lat: 51.1657, lng: 10.4515 },
  "UK": { lat: 55.3781, lng: -3.4360 },
  "England": { lat: 52.3555, lng: -1.1743 },
  "Russia": { lat: 61.5240, lng: 105.3188 },
  
  // Americas
  "North America": { lat: 54.5260, lng: -105.2551 },
  "United States": { lat: 37.0902, lng: -95.7129 },
  "Canada": { lat: 56.1304, lng: -106.3468 },
  "Mexico": { lat: 23.6345, lng: -102.5528 },
  "South America": { lat: -8.7832, lng: -55.4915 },
  "Brazil": { lat: -14.2350, lng: -51.9253 },
  "Amazon Basin": { lat: -3.4653, lng: -62.2159 },
  "Amazon region": { lat: -3.4653, lng: -62.2159 },
  "Peru": { lat: -9.1900, lng: -75.0152 },
  "Argentina": { lat: -38.4161, lng: -63.6167 },
  "Chile": { lat: -35.6751, lng: -71.5430 },
  "Colombia": { lat: 4.5709, lng: -74.2973 },
  "Ecuador": { lat: -1.8312, lng: -78.1834 },
  "Bolivia": { lat: -16.2902, lng: -63.5887 },
  "Paraguay": { lat: -23.4425, lng: -58.4438 },
  "Uruguay": { lat: -32.5228, lng: -55.7658 },
  "Venezuela": { lat: 6.4238, lng: -66.5897 },
  "Central America": { lat: 15.7835, lng: -90.2308 },
  "Caribbean": { lat: 21.4691, lng: -78.6569 },
  
  // Oceania
  "Australia": { lat: -25.2744, lng: 133.7751 },
  "New Zealand": { lat: -40.9006, lng: 174.8860 },
  "Pacific Islands": { lat: -8.5569, lng: 179.1963 },
  "Hawaii": { lat: 19.8968, lng: -155.5828 },
  
  // General
  "Tropical regions": { lat: 0, lng: 25 },
  "Temperate regions": { lat: 45, lng: 0 },
  "Worldwide": { lat: 20, lng: 0 },
  "Global": { lat: 20, lng: 0 },
};

export function getCoordinatesForRegion(region: string): { lat: number; lng: number } | null {
  // Direct match
  if (regionCoordinates[region]) {
    return regionCoordinates[region];
  }
  
  // Partial match
  const lowerRegion = region.toLowerCase();
  for (const [key, coords] of Object.entries(regionCoordinates)) {
    if (lowerRegion.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerRegion)) {
      return coords;
    }
  }
  
  return null;
}
