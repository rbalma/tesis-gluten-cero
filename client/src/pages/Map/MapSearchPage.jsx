import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Row } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import { toast } from 'sonner';
import { mapCategories } from '@/utils/constants';
import {
	CardsMap,
	CardsMapDisco,
	CardsMapSanatorio,
} from '@/components/Map/Cards/CardsMap';
import {
	MarkerCurrentLocation,
	MarkerHospital,
	MarkerRestaurant,
	MarkerShopping,
} from '@/components/Map/Markers';
import { MapFilterCategory } from '@/components/Map/Filters/MapFilterCategory';
import { AutoCompleteMap } from '@/components/Map/AutoComplete/AutoCompleteMap';
import Footer from '@/layout/home/ui/Footer';

import 'leaflet/dist/leaflet.css';
import styles from './MapSearchPage.module.css';

const ubicacion = [-31.41718428534527, -64.18382740831277];

export const MapSearchPage = () => {
	const navigate = useNavigate();
	const [map, setMap] = useState(null);
	const [posicion, setPosicion] = useState(ubicacion);

	const handleFlyTo = (miUbicacion) => {
		map.flyTo(miUbicacion, 15, {
			duration: 4,
		});
		setPosicion(miUbicacion);
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
		const coordinates = {
			lat: data.lat,
			lng: data.lng,
		};

		//	map.panTo(coordinates);

		map.flyTo(coordinates, 15, {
			duration: 4,
		});

		setPosicion(coordinates);
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
					<CardsMap />
					<CardsMapDisco />
					<CardsMapSanatorio />
					{/* <CardsMap />
					<CardsMap />
					<CardsMap /> */}
				</section>
				<Footer />
			</div>

			<div className={styles.fullMap}>
				<MapContainer
					ref={setMap}
					center={ubicacion}
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
					<MarkerCurrentLocation posicion={posicion} />
					<MarkerHospital posicion={posicion} />
					<MarkerShopping />
					<MarkerRestaurant posicion={{
							lat: '-31.41976',
							lng: '-64.1881',
						}} />
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
