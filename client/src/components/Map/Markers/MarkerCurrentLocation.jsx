import { Marker } from 'react-leaflet';
import { IconMarkerCurrentLocation } from './IconsMarkers';

export const MarkerCurrentLocation = ({ posicion }) => {
	return <Marker position={posicion} icon={IconMarkerCurrentLocation} />;
};
