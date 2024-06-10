import { Marker, Popup } from 'react-leaflet';
import { Rate } from 'antd';
import { IconMarkerRestaurant } from './IconsMarkers';

import Foto from '@/assets/images/patio-olmos.jpg';

export const MarkerRestaurant = ({ posicion }) => {
	return (
		<Marker position={posicion} icon={IconMarkerRestaurant}>
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
