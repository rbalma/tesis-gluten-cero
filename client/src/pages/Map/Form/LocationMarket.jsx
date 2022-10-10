import { useMemo, useRef, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { Pin } from '../Search/Pin';

const GEOCODE_URL =
	'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=TR&location=';

export const LocationMarket = ({ form }) => {
	const map = useMap();
	const [position, setPosition] = useState({
		lat: -31.41718428534527,
		lng: -64.18382740831277,
	});
	const [lugar, setLugar] = useState('Plaza San Martin');
	const markerRef = useRef(null);

	const moverPin = useMemo(
		() => ({
			async dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					const posicion = marker.getLatLng();
					const data = await (
						await fetch(GEOCODE_URL + `${posicion.lng},${posicion.lat}`)
					).json();
					setPosition(marker.getLatLng());
					setLugar(data.address.LongLabel);
					form.setFieldsValue({
						direction: data.address.Address,
						city: data.address.City,
						country: data.address.CountryCode,
						longitude: data.location.y,
						latitude: data.location.x,
					});
					map.panTo(posicion);
				}
			},
		}),
		[]
	);

	return (
		<Marker
			position={position}
			icon={Pin}
			draggable={true}
			autoPan={true}
			eventHandlers={moverPin}
			ref={markerRef}
		>
			<Popup>
				<div style={popupContent}>
					<div style={popupHead}>{lugar}</div>
				</div>
			</Popup>
		</Marker>
	);
};

// Estilos para el popUp
const popupContent = {
	textAlign: 'center',
	height: 'auto',
};

const popupHead = {
	fontWeight: 'bold',
	fontSize: '11px',
};
