import { useReducer, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Row } from 'antd';
import { toast } from 'sonner';
import { CardMarker } from '@/components/Map/Cards/CardMarker';
import { MarkerCurrentLocation } from '@/components/Map/Markers/MarkerCurrentLocation';
import { AutoCompleteMap } from '@/components/Map/AutoComplete/AutoCompleteMap';
import { useGetMarkersByLocation } from '@/services/queries/mapQueries';
import { MarkerPlace } from '@/components/Map/Markers/MarkerPlace';
import { CategoriesMarkers, DistanceRadius } from '@/components/Map/Filters';
import { IconCluster } from '@/components/Map/Markers/IconsMarkers';

import 'leaflet/dist/leaflet.css';
import styles from './MapSearchPage.module.css';

const initialLocation = [-31.41718428534527, -64.18382740831277];

export const MapSearchPage = () => {
	const [map, setMap] = useState(null);
	const [filters, setFilters] = useReducer(
		(current, update) => ({ ...current, ...update }),
		{
			limit: 15,
			active: 1,
			meters: 1000,
			latitude: initialLocation[0],
			longitude: initialLocation[1],
			categoriesIds: null,
		}
	);

	const {
		isFetching,
		isSuccess,
		data: markers,
	} = useGetMarkersByLocation(filters);

	const handleFlyTo = (location) => {
		map.flyTo(location, 17, {
			duration: 5,
		});
		setFilters({
			latitude: location[0],
			longitude: location[1],
		});
	};

	const setViewMap = (location) => {
		map.flyTo(location, 16);
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
						<CategoriesMarkers setFilters={setFilters} />
						<DistanceRadius
							radiusFiltered={filters.meters}
							setFilters={setFilters}
						/>
					</div>
				</section>

				<section className={styles.listCardsMap}>
					<div className={styles.resultButtonMap}>
						<span className={styles.showingResultsMap}>
							{isSuccess
								? markers.length === 1
									? '1 Resultado'
									: `${markers.length} Resultados`
								: 'Sin Resultados'}{' '}
						</span>
						{/* <button
							className={styles.newMarkerButton}
							onClick={() => navigate('/mapa-formulario')}>
							{' '}
							<EnvironmentFilled style={{ marginRight: 5 }} /> Agregar{' '}
						</button> */}
					</div>
					{!isFetching && markers.length > 0
						? markers.map((marker) => (
								<CardMarker
									key={marker._id}
									{...marker}
									handleFlyTo={() =>
										setViewMap([
											marker.location.coordinates[1],
											marker.location.coordinates[0],
										])
									}
								/>
						  ))
						: null}
				</section>
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

					<MarkerClusterGroup
						spiderfyOnMaxZoom={true}
						chunkedLoading
						iconCreateFunction={IconCluster}>
						{!isFetching && markers.length > 0
							? markers.map((marker) => (
									<MarkerPlace
										key={marker._id}
										coordinates={marker.location.coordinates}
										image={marker.image.secure_url}
										category={marker.category.name}
										name={marker.name}
										direction={marker.direction}
										phone={marker.phone}
										ratingAverage={marker.ratingAverage.$numberDecimal}
										ratingCount={marker.ratingCount}
									/>
							  ))
							: null}
					</MarkerClusterGroup>
				</MapContainer>
			</div>
		</div>
	);
};
