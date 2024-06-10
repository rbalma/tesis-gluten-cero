import L from 'leaflet';
import chefPin from '@/assets/images/markers/chefPin.png';

export const IconMarkerRestaurant = L.icon({
	iconUrl: chefPin,
	iconRetinaUrl: chefPin,
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [50, 50],
	popupAnchor: [0, -10],
	className: 'leaflet-venue-icon',
});