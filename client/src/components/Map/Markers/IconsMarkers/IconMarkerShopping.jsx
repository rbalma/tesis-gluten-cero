import L from 'leaflet';
import shoppingPin from '@/assets/images/markers/shoppingPin.png';

export const IconMarkerShopping = L.icon({
	iconUrl: shoppingPin,
	iconRetinaUrl: shoppingPin,
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [50, 50],
	popupAnchor: [0, -10],
	className: 'leaflet-venue-icon',
});