import L from "leaflet";
import svg from "@/assets/images/markets/venue_location_icon.svg";

export const Pin = L.icon({
  iconUrl: svg,
  iconRetinaUrl: svg,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  popupAnchor: [-10, -15],
  className: "leaflet-venue-icon",
});