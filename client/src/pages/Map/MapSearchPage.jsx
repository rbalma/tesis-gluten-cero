import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Row } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import { toast } from 'sonner';
import { mapCategories } from '@/utils/constants';
import { CardMarker } from '@/components/Map/Cards/CardMarker';
import {
	MarkerCurrentLocation,
	MarkerHospital,
	MarkerRestaurant,
	MarkerShopping,
} from '@/components/Map/Markers';
import { MapFilterCategory } from '@/components/Map/Filters/MapFilterCategory';
import { AutoCompleteMap } from '@/components/Map/AutoComplete/AutoCompleteMap';
import { useGetMarkersByLocation } from '@/services/queries/mapQueries';
import Footer from '@/layout/home/ui/Footer';

import 'leaflet/dist/leaflet.css';
import styles from './MapSearchPage.module.css';

const initialLocation = [-31.41718428534527, -64.18382740831277];

export const MapSearchPage = () => {
	const navigate = useNavigate();
	const [map, setMap] = useState(null);
	const [filters, setFilters] = useReducer(
		(current, update) => ({ ...current, ...update }),
		{
			limit: 15,
			active: 1,
			meters: 1000,
			latitude: initialLocation[0],
			longitude: initialLocation[1],
		}
	);
	const {
		isFetching,
		isSuccess,
		data: markers,
	} = useGetMarkersByLocation(filters);

	console.log({ markers })

	const handleFlyTo = (location) => {
		map.flyTo(location, 15, {
			duration: 4,
		});
		setFilters({
			latitude: location[0],
			longitude: location[1],
		});
	};

	const getUbicacion = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				let miUbicacion = [coords.latitude, coords.longitude];
				handleFlyTo(miUbicacion);
			},
			(blocked) => {
				if (blocked)
					toast.message('La geolocalización está bloqueada. Debe habilitarla');
			},
			(error) => {
				console.log(error);
				toast.error('No se pudo obtener la geolocalización');
			},
			{
				enableHighAccuracy: true,
			}
		);
	};

	const onSelectSearch = (_, { data }) => {
		handleFlyTo([data.lat, data.lng]);
	};

	return (
		<div className={styles.containerMap}>
			<div className={styles.listSearchMap}>
				<section className={styles.paramSearchMap}>
					<Row style={{ marginBottom: 20 }}>
						<AutoCompleteMap
							onSelectSearch={onSelectSearch}
							getUbicacion={getUbicacion}
						/>
					</Row>

					<div className={styles.displayCategories}>
						{mapCategories.map((category) => (
							<MapFilterCategory key={category.name} category={category} />
						))}
					</div>
				</section>

				<section className={styles.listCardsMap}>
					<div className={styles.resultButtonMap}>
						<span className={styles.showingResultsMap}>14 Resultados </span>
						<button
							className={styles.newMarkerButton}
							onClick={() => navigate('/mapa-formulario')}>
							{' '}
							<EnvironmentFilled style={{ marginRight: 5 }} /> Agregar{' '}
						</button>
					</div>
					{!isFetching && markers.length > 0
						? markers.map((marker) => (
								<CardMarker key={marker._id} {...marker} />
						  ))
						: null}
				</section>
				<Footer />
			</div>

			<div className={styles.fullMap}>
				<MapContainer
					ref={setMap}
					center={initialLocation}
					zoom={15}
					scrollWheelZoom={false}
					style={{
						minHeight: 'calc(100vh - 80px)',
						minWidth: '50vw',
						position: 'fixed',
						right: 0,
						bottom: 0,
					}}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<MarkerCurrentLocation
						posicion={[filters.latitude, filters.longitude]}
					/>
					<MarkerHospital />
					<MarkerShopping />
					<MarkerRestaurant
						posicion={{
							lat: '-31.41976',
							lng: '-64.1881',
						}}
					/>
					{/* 
						Listar cards en un Drawer para mobile!
						<button style={{ zIndex: 500, position: 'absolute', top: 20, right: 20}}
						onClick={() => console.log('HOLA')}
						>Cards</button> */}
				</MapContainer>
			</div>
		</div>
	);
};
