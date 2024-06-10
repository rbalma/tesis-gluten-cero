import L from "leaflet";
import svg from "@/assets/images/markers/location.png";

export const IconMarkerDefault = L.icon({
  iconUrl: svg,
  iconRetinaUrl: svg,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  popupAnchor: [-10, -15],
  className: "leaflet-venue-icon",
});