import { useEffect } from "react";
import type { Place } from "../api/Place";
import { useSearchContext } from "../context/SearchContext";
import { searchPlaces } from "../context/actions/searchPlaces";
import { ACTION_TYPES } from "../context/actionTypes";
import { ErrorBanner, LoadingSpinner, EmptyState } from "./";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export const LocationSearch = ({ onPlaceClick }: LocationSearchProps) => {
  const { state, dispatch } = useSearchContext();

  useEffect(() => {
    document.getElementById("searchTerm")?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await searchPlaces(dispatch, state.searchTerm);
  };

  const shouldShowHeading =
    state.isLoading ||
    state.errorMessage ||
    state.places.length > 0 ||
    (state.hasSearched && state.places.length === 0);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-4">
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4" role="search">
        <label
          className="text-sm font-semibold text-gray-700 block mb-2"
          htmlFor="searchTerm"
        >
          Search for a location
        </label>
        <div className="relative w-full">
          <input
            id="searchTerm"
            className="rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 px-10 py-2 w-full border border-gray-300 text-sm"
            value={state.searchTerm}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.SET_SEARCH_TERM,
                payload: e.target.value,
              })
            }
            placeholder="Search for a city or landmark..."
            aria-label="Search for a location"
          />
          {state.searchTerm && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => {
                dispatch({ type: ACTION_TYPES.SET_SEARCH_TERM, payload: "" });
                dispatch({ type: ACTION_TYPES.SET_PLACES, payload: [] });
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: null });
              }}
              aria-label="Clear search"
            >
              ✖
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      <section
        aria-labelledby="location-heading"
        className="flex-1 overflow-y-auto"
      >
        {shouldShowHeading && (
          <h1
            id="location-heading"
            className="text-lg font-semibold mb-3 text-gray-800"
          >
            Found Locations
          </h1>
        )}

        {state.isLoading && <LoadingSpinner text="Searching..." />}

        {state.errorMessage && <ErrorBanner message={state.errorMessage} />}

        {!state.isLoading &&
          state.hasSearched &&
          state.places.length === 0 &&
          !state.errorMessage && (
            <EmptyState
              title={`No results found for "${state.searchTerm}".`}
              subtitle="Try searching for a city or landmark."
            />
          )}

        <ul className="divide-y divide-gray-100 mt-2">
          {state.places.map((place) => (
            <li
              key={place.id}
              className="flex justify-between items-center p-3 hover:bg-blue-50 transition-colors duration-200 rounded-md"
            >
              <span className="text-sm text-gray-700">{place.name}</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-sm focus:ring focus:ring-blue-200 transition-all"
                onClick={() => onPlaceClick(place)}
                aria-label={`View details of ${place.name}`}
              >
                Go
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
