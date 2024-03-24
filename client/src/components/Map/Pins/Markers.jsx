import { Marker, Popup } from 'react-leaflet';
import { HospitalIconPin, ShoppingIconPin, ChefIconPin } from './IconPins/IconLocation';
import Foto from '@/assets/images/patio-olmos.jpg';
import Disco from '@/assets/images/markets/disco.png';
import Sanatorio from '@/assets/images/markets/sanatorio.png';

import { Rate } from 'antd';

export const HospitalMarkers = ({ posicion }) => {
	return (
		<Marker position={{ lat: '-31.42447', lng: '-64.18719'}} icon={HospitalIconPin}>
			<Popup className='popup'>
				<img src={Sanatorio} alt='Patio Olmos' />
				<section>
					<h4>Sanatorio Allende Nueva Córdoba</h4>
					<h5>Obispo Oro 42</h5>
					<h5>0810-555-2553</h5>
           <Rate className='stars' disabled allowHalf value={3} />
				</section>
			</Popup>
		</Marker>
	);
};

export const ShoppingMarkers = ({ posicion }) => {
	return (
		<Marker position={{ lat: '-31.41077', lng: '-64.19263' }} icon={ShoppingIconPin}>
			<Popup className='popup'>
				<img src={Disco} alt='Patio Olmos' />
				<section>
					<h4>Disco</h4>
					<h5>Av. Colón 683</h5>
					<h5>0810-777-8888</h5>
           <Rate className='stars' disabled allowHalf value={4} />
				</section>
			</Popup>
		</Marker>
	);
};

export const ChefMarkers = ({ posicion }) => {
	return (
		<Marker position={posicion} icon={ChefIconPin}>
			<Popup className='popup'>
				<img src={Foto} alt='Patio Olmos' />
				<section>
					<h4>Patio Olmos Shopping</h4>
					<h5>Av. Vélez Sarsfield 361</h5>
					<h5>(0351) 4315478</h5>
           <Rate className='stars' disabled allowHalf value={4.5} />
				</section>
			</Popup>
		</Marker>
	);
};