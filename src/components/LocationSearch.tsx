import { Fragment, useEffect } from "react";
import type { Place } from "../api/Place";
import { useSearchContext } from "../context/SearchContext";
import { searchPlaces } from "../context/actions/searchPlaces";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export const LocationSearch = ({ onPlaceClick }: LocationSearchProps) => {
  const { state, dispatch } = useSearchContext();

  useEffect(() => {
    document.getElementById("term")?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await searchPlaces(dispatch, state.searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-sm font-bold" htmlFor="term">
          Search
        </label>
        <div className="relative w-full">
          <input
            className="rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full border border-transparent pr-10"
            id="searchTerm"
            value={state.searchTerm}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
            }
            aria-label="Search locations"
          />
          {state.searchTerm && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-900 transition-all duration-200 p-1 rounded-md focus:ring focus:ring-gray-300"
              onClick={() => {
                dispatch({ type: "SET_SEARCH_TERM", payload: "" });
                dispatch({ type: "SET_PLACES", payload: [] });
                dispatch({ type: "SET_ERROR", payload: null });
              }}
              aria-label="Clear search"
            >
              ✖
            </button>
          )}
        </div>
      </form>

      <section aria-labelledby="location-heading">
        <h1 id="location-heading" className="text-xl font-semibold mt-6">
          Found Locations
        </h1>
      </section>

      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {state.isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500" />
            <p className="text-sm text-gray-500 ml-2">Searching...</p>
          </div>
        )}

        {!state.isLoading &&
          state.hasSearched &&
          state.places.length === 0 &&
          !state.errorMessage && (
            <p className="text-sm text-blue-700 font-semibold">
              No results found for "{state.searchTerm}". Try searching for a
              city or landmark.
            </p>
          )}

        {state.errorMessage && (
          <>
            <p className="text-sm text-red-700 bg-red-50 border border-red-400 shadow-sm px-4 py-2 rounded mt-4">
              {state.errorMessage}
            </p>
            <div className="border-b w-full border-blue-300 mt-4" />
          </>
        )}

        {state.places.map((place) => (
          <Fragment key={place.id}>
            <p className="text-sm">{place.name}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 transition-all focus:ring focus:ring-blue-200 text-white text-sm font-bold py-2 px-3 rounded"
              onClick={() => onPlaceClick(place)}
              aria-label={`View details of ${place.name}`}
              tabIndex={0}
            >
              Go
            </button>
            <div className="border-b w-full col-span-2 border-blue-300" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
