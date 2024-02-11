import L from 'leaflet';
import svg from '@/assets/images/markets/cooks.png';

export const IconLocation = L.icon({
    iconUrl: svg,
    iconRetinaUrl: svg,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40, 40],
    popupAnchor: [0, -10],
    className: "leaflet-venue-icon"
});
