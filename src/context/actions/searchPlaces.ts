import type { Place } from "../../api/Place";
import type { SearchAction } from "../SearchContext";

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

export const searchPlaces = async (
  dispatch: React.Dispatch<SearchAction>,
  term: string
): Promise<void> => {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({ type: "SET_ERROR", payload: null });

  if (!term.trim()) {
    dispatch({ type: "SET_ERROR", payload: "Please enter a search term." });
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_PLACES", payload: [] });
    return;
  }

  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${API_URL}/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );

    if (!response.ok) {
      dispatch({
        type: "SET_ERROR",
        payload: `API error: ${response.statusText}`,
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    const data: SearchResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      dispatch({ type: "SET_ERROR", payload: "No locations found." });
      dispatch({ type: "SET_PLACES", payload: [] });
    } else {
      const places: Place[] = data.features.map((feature) => ({
        id: feature.properties.place_id,
        name: feature.properties.display_name,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
      }));
      dispatch({ type: "SET_PLACES", payload: places });
    }
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: "Network error. Please try again later.",
    });
  }

  dispatch({ type: "SET_LOADING", payload: false });
};
