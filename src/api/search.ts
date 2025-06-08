import type { Place } from "./Place";

interface SearchResponse {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const search = async (
  term: string
): Promise<{ places: Place[]; error?: string }> => {
  try {
    if (!term.trim()) {
      return { places: [], error: "Please enter a search term." };
    }

    const response = await fetch(
      `${API_URL}/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );

    if (!response.ok) {
      return {
        places: [],
        error: `API error: ${response.status} ${response.statusText}`,
      };
    }

    const data: SearchResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      return { places: [], error: "No locations found." };
    }

    return {
      places: data.features.map((feature) => ({
        id: feature.properties.place_id,
        name: feature.properties.display_name,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
      })),
    };
  } catch (error) {
    console.error("Error fetching locations:", error);
    return { places: [], error: "Network error. Please try again later." };
  }
};
