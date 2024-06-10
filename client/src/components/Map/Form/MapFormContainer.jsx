import { useMemo, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { AutoCompleteMap } from '../AutoComplete/AutoCompleteMap';
import { LocationPinIcon, MapPinIcon } from '../../Icons';
import { getReverseGeocoding } from '@/services/api/mapApi';
import { IconMarkerDefault } from '../Markers/IconsMarkers';

import 'leaflet/dist/leaflet.css';
import styles from './MapFormContainer.module.css';

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

	const moverPin = useMemo(
		() => ({
			async dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					const posicion = marker.getLatLng();
					const data = await getReverseGeocoding(posicion);
					setPosition(marker.getLatLng());
					form.setFieldsValue({
						direction: `${data.address?.road} ${data.address?.house_number}`,
						longitude: data.lon,
						latitude: data.lat,
					});
				}
			},
		}),
		[]
	);
	const onSelectSearch = (_, { data }) => {
		const coordinates = {
			lat: data.lat,
			lng: data.lng,
		};

		map.setView(cordenadas, 18);

		setPosition(coordinates);

		form.setFieldsValue({
			direction: data.direction,
			longitude: data.lng,
			latitude: data.lat,
		});
	};

	return (
		<div className={styles.containerMapForm}>
			<h3 className={styles.mapaTitulo}>Ubicación del Marcador</h3>
			<div className={styles.autocompleteItem}>
				<label>Ingresa la dirección del marcador:</label>
				<AutoCompleteMap onSelectSearch={onSelectSearch} />
			</div>

			<MapContainer
				center={ubicacion}
				zoom={24}
				scrollWheelZoom={false}
				style={{ height: 400, width: '100%', zIndex: 1 }}
				ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker
					position={position}
					icon={IconMarkerDefault}
					draggable={true}
					autoPan={true}
					eventHandlers={moverPin}
					ref={markerRef}
				/>
			</MapContainer>
			<p className={styles.helpTextMap}>
				Mueve el Pin hacia el punto exacto en caso de ser necesario
			</p>

			<p className={styles.mapTextInfo}>
				Confirma que los siguientes datos sean correctos:
			</p>
			<Form.Item
				name='direction'
				label='Dirección'
				rules={[{ required: true, message: '' }]}>
				<Input className='formItemMapInput' prefix={<LocationPinIcon />} />
			</Form.Item>

			<Form.Item name='latitude' label='Latitud'>
				<Input className='formItemMapInput' prefix={<MapPinIcon />} disabled />
			</Form.Item>

			<Form.Item name='longitude' label='Longitud'>
				<Input className='formItemMapInput' prefix={<MapPinIcon />} disabled />
			</Form.Item>
		</div>
	);
};
