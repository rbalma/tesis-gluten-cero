import L from 'leaflet';
import hospitalPin from '@/assets/images/markets/hospitalPin.png';
import shoppingPin from '@/assets/images/markets/shoppingPin.png';
import chefPin from '@/assets/images/markets/chefPin.png';

export const HospitalIconPin = L.icon({
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

export const ShoppingIconPin = L.icon({
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

export const ChefIconPin = L.icon({
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
