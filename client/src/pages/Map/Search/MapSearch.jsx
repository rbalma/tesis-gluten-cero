import { useState, useRef } from 'react';
import {
	Dropdown,
	Checkbox,
	Button,
	Slider,
	Input,
	Tooltip,
	Row,
	Col,
} from 'antd';
import {
	DownOutlined,
	AimOutlined,
	EnvironmentFilled,
} from '@ant-design/icons';
import { CardsMap } from './CardsMap';
import { Markers } from './Markers';
import { useNavigate } from 'react-router-dom';
import Footer from '@/layout/Home/ui/Footer';

//import { Map, TileLayer } from 'react-leaflet';
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 

import styles from './mapSearch.module.css';

export const MapSearch = () => {
	const navigate = useNavigate();
	const [visibleCategories, setVisibleCategories] = useState(false);
	const [visibleRadio, setVisibleRadio] = useState(false);
	const [radio, setRadio] = useState(50);
	const ubicacion = [-31.41718428534527, -64.18382740831277];

	const mapRef = useRef();

	const handleFlyTo = (miUbicacion) => {
		const { current = {} } = mapRef;
		const { leafletElement: map } = current;
		map.flyTo(miUbicacion, 15, {
			duration: 4,
		});
	};

	const menuCategories = (
		<div className={styles.radioMenuMap}>
			<Checkbox.Group
				defaultValue={[1, 2, 3]}
				onChange={(checkedValues) => console.log('checked = ', checkedValues)}
			>
				<Col>
					<Checkbox value={1}> Comercio </Checkbox>
				</Col>
				<Col>
					<Checkbox value={2}> Restaurante </Checkbox>
				</Col>
				<Col>
					<Checkbox value={3}> Centro de Salud </Checkbox>
				</Col>
			</Checkbox.Group>
		</div>
	);

	const menuRadio = (
		<div className={styles.radioMenuMap}>
			<span>{radio} Km</span>
			<p>Radio alrededor del destino seleccionado</p>
			<Slider
				min={1}
				max={100}
				onChange={(value) => setRadio(value)}
				value={radio}
			/>
			<div className='radio-button'>
				<Button
					size='small'
					style={{ marginRight: 20 }}
					onClick={() => setVisibleRadio(false)}
				>
					Cancelar
				</Button>
				<Button size='small' type='primary'>
					Aceptar
				</Button>
			</div>
		</div>
	);

	const getUbicacion = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				let miUbicacion = [coords.latitude, coords.longitude];
				handleFlyTo(miUbicacion);
			},
			(blocked) => {
				if (blocked) console.log('La geolocalización está bloqueada. Debe habilitarla');
			},
			(error) => {
				console.log(error);
			},
			{
				enableHighAccuracy: true,
			}
		);
	};

	return (
		<div className={styles.containerMap}>
			<div className={styles.listSearchMap}>
				<section className={styles.paramSearchMap}>
					<Row style={{ marginBottom: 20 }}>
						<Col span={24}>
							<Input
								placeholder='Dirección'
								size='large'
								suffix={
									<Tooltip title='Mi ubicación'>
										<AimOutlined
											style={{ color: 'rgba(0,0,0,.45)' }}
											onClick={getUbicacion}
										/>
									</Tooltip>
								}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={10}>
							<Dropdown
								overlay={menuCategories}
								onVisibleChange={(e) => setVisibleCategories(e)}
								visible={visibleCategories}
							>
								<span
									style={{ cursor: 'pointer' }}
									onClick={(e) => e.preventDefault()}
								>
									Categorías <DownOutlined />
								</span>
							</Dropdown>
						</Col>

						<Col span={12}>
							<Dropdown
								trigger={['click']}
								overlay={menuRadio}
								onVisibleChange={(e) => setVisibleRadio(e)}
								visible={visibleRadio}
							>
								<span
									style={{ cursor: 'pointer' }}
									onClick={(e) => e.preventDefault()}
								>
									Radio de Distancia <DownOutlined />
								</span>
							</Dropdown>
						</Col>
					</Row>
				</section>

				<section className={styles.listCardsMap}>
					<div className={styles.resultButtonMap}>
						<span className={styles.showingResultsMap}>14 Resultados </span>
						<button
							className={styles.newMarketButton}
							onClick={() => navigate('/mapa-formulario')}
						>
							{' '}
							<EnvironmentFilled /> Nuevo{' '}
						</button>
					</div>
					<CardsMap />
					<CardsMap />
					<CardsMap />
					<CardsMap />
				</section>
				<Footer />
			</div>

			<div className={styles.fullMap}>
				<MapContainer
					ref={mapRef}
					center={ubicacion}
					zoom={15}
					scrollWheelZoom={false}
					style={{ minHeight: "calc(100vh - 80px)", minWidth: "50vw", position: 'fixed', right: 0, bottom: 0 }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Markers />
				</MapContainer>
			</div> 
		</div>
	);
};
