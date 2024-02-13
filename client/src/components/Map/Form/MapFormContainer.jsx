import { AutoCompleteMap } from '../AutoComplete/AutoCompleteMap';
import { MapFormItems } from './MapFormItems';
import { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Pin } from '../Pins/IconPins/Pin';

import styles from './MapFormContainer.module.css';

const GEOCODE_URL =
	'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=TR&location=';

const ubicacion = {
	lat: -31.41718428534527,
	lng: -64.18382740831277,
};

export const MapFormContainer = ({ form }) => {
	const markerRef = useRef(null);
	const [map, setMap] = useState(null);
	const [position, setPosition] = useState({
		lat: -31.41718428534527,
		lng: -64.18382740831277,
	});
	const [lugar, setLugar] = useState('Plaza San Martin');

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
						longitude: data.location.x,
						latitude: data.location.y,
					});
					map.panTo(posicion);
				}
			},
		}),
		[]
	);

	return (
		<div className={styles.containerMapForm}>
			<div className={styles.autocompleteItem}>
			<label>
				Ingresa la dirección para encontrarla en el mapa:
			</label>
				<AutoCompleteMap />
			</div>

			<section className={styles.mapContainer}>
				<MapContainer
					center={ubicacion}
					zoom={24}
					scrollWheelZoom={false}
					style={{ minHeight: '100%', minWidth: '100%', zIndex: 1 }}
					ref={setMap}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker
						position={position}
						icon={Pin}
						draggable={true}
						autoPan={true}
						eventHandlers={moverPin}
						ref={markerRef}>
						<Popup>
							<div style={popupContent}>
								<div style={popupHead}>{lugar}</div>
							</div>
						</Popup>
					</Marker>
				</MapContainer>
				<p className={styles.helpTextMap}>
				Si la ubicación en el mapa no coincide, mové el marcador al punto donde
				corresponda la dirección ingresada.
			</p>
			</section>

			<section className={styles.mapForItem}>
				<MapFormItems />
			</section>
		</div>
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
