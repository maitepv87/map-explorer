import "leaflet/dist/leaflet.css";
import type { Place } from "../api/Place";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import type { Map as LeafletMap } from "leaflet";

interface MapProps {
  place: Place | null;
}

// export const Map = ({ place }: MapProps) => {
//   const mapRef = useRef<LeafletMap | null>(null);

//   useEffect(() => {
//     if (mapRef.current && place) {
//       mapRef.current.flyTo([place.latitude, place.longitude]);
//     }
//   }, [place]);

//   return (
//     <MapContainer
//       ref={mapRef}
//       center={[40.7, -74]}
//       zoom={12}
//       scrollWheelZoom
//       className="h-full"
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {place && <Marker position={[place.latitude, place.longitude]} />}
//     </MapContainer>
//   );
// };

const MapComponent = ({ place }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    if (map && place) {
      map.flyTo([place.latitude, place.longitude], 14); // Zoom opcional
    }
  }, [map, place]);

  return null;
};

export const Map = ({ place }: MapProps) => {
  return (
    <MapContainer
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
      <MapComponent place={place} />
    </MapContainer>
  );
};
