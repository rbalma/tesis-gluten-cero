import L from 'leaflet';
import manPin from '@/assets/images/markers/man.png';

export const IconMarkerCurrentLocation = L.icon({
	iconUrl: manPin,
	iconRetinaUrl: manPin,
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [40, 40],
	popupAnchor: [0, -10],
	className: 'pulse-effect',
});
