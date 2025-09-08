import type { Place } from "../../api/Place";
import type { SearchAction } from "../useSearchReducer";
import { ACTION_TYPES } from "../actionTypes";

interface SearchResponse {
  features: {
    geometry: { coordinates: number[] };
    properties: { place_id: number; display_name: string };
  }[];
}

export const searchPlaces = async (
  dispatch: React.Dispatch<SearchAction>,
  term: string
) => {
  dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
  dispatch({ type: ACTION_TYPES.SET_ERROR, payload: null });

  if (!term.trim()) {
    dispatch({
      type: ACTION_TYPES.SET_ERROR,
      payload: "Please enter a search term.",
    });
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    dispatch({ type: ACTION_TYPES.SET_PLACES, payload: [] });
    return;
  }

  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${API_URL}/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: SearchResponse = await response.json();

    if (!data.features.length) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        payload: "No locations found.",
      });
      dispatch({ type: ACTION_TYPES.SET_PLACES, payload: [] });
    } else {
      const places: Place[] = data.features.map((f) => ({
        id: f.properties.place_id,
        name: f.properties.display_name,
        longitude: f.geometry.coordinates[0],
        latitude: f.geometry.coordinates[1],
      }));
      dispatch({ type: ACTION_TYPES.SET_PLACES, payload: places });
    }
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.SET_ERROR,
      payload: "Network error. Please try again later.",
    });
  } finally {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
  }
};
