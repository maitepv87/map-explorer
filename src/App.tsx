import { useState } from "react";
import type { Place } from "./api/Place";
import { Map, LocationSearch } from "./components";

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white shadow border-b border-gray-200 w-full">
        <h1 className="text-lg font-semibold text-gray-800 text-center lg:text-left">
          Map Explorer
        </h1>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <aside
          className="w-full lg:w-1/3 p-4 bg-white shadow-lg border-b lg:border-r border-gray-200"
          aria-label="Search panel"
        >
          <LocationSearch onPlaceClick={(p) => setPlace(p)} />
        </aside>

        <main className="flex-1" aria-label="Map display area">
          <Map place={place} />
        </main>
      </div>
    </div>
  );
}

export default App;
