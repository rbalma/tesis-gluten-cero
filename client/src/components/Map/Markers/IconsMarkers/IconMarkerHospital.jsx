import L from 'leaflet';
import hospitalPin from '@/assets/images/markers/hospitalPin.png';

export const IconMarkerHospital = L.icon({
	iconUrl: hospitalPin,
	iconRetinaUrl: hospitalPin,
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [50, 50],
	popupAnchor: [0, -10],
	className: 'leaflet-venue-icon',
});