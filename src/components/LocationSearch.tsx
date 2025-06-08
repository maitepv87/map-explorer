import { useState, Fragment, useEffect } from "react";
import type { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export const LocationSearch = ({ onPlaceClick }: LocationSearchProps) => {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.getElementById("term")?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    setErrorMessage("");

    if (!term.trim()) {
      setErrorMessage("Please enter a search term.");
      setIsLoading(false);
      setPlaces([]);
      return;
    }

    const { places, error } = await search(term);

    if (error) {
      setErrorMessage(error);
    }

    setPlaces(places);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-sm font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full border border-transparent"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <h1 className="text-xl font-semibold mt-6">Found Locations</h1>

      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500" />
            <p className="text-sm text-gray-500 ml-2">Searching...</p>
          </div>
        )}

        {!isLoading && hasSearched && places.length === 0 && !errorMessage && (
          <p className="text-sm text-gray-500 mt-4">
            No results found for "{term}". Try searching for a city or landmark.
          </p>
        )}

        {errorMessage && (
          <>
            <p className="text-sm text-red-700 bg-red-50 border border-red-400 shadow-sm px-4 py-2 rounded mt-4">
              {errorMessage}
            </p>
            <div className="border-b w-full border-blue-300 mt-4" />
          </>
        )}

        {places.map((place) => (
          <Fragment key={place.id}>
            <p className="text-sm">{place.name}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 transition-all focus:ring focus:ring-blue-200 text-white text-sm font-bold py-2 px-3 rounded"
              onClick={() => onPlaceClick(place)}
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
