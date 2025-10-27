import { useState } from "react";
import type { Place } from "./api/Place";
import { Map, LocationSearch } from "./components";

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className="h-screen w-screen grid grid-cols-12 bg-gray-50">
      <aside className="col-span-3 p-4 bg-white shadow-lg border-r border-gray-200">
        <LocationSearch onPlaceClick={(p) => setPlace(p)} />
      </aside>

      <main className="col-span-9">
        <Map place={place} />
      </main>
    </div>
  );
}

export default App;
