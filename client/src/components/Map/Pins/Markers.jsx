import { Marker, Popup } from 'react-leaflet';
import { IconLocation } from './IconPins/IconLocation';
import Foto from '@/assets/images/patio-olmos.jpg';

import { StarFilledIcon } from '@/components/Icons';
import { Rate } from 'antd';

export const Markers = ({ posicion }) => {
	return (
		<Marker position={posicion} icon={IconLocation}>
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

// const popupContent = {
//   height: "100%",
//   width: '100%',
//   objectFit: 'cover',
//   background: `url(${Foto})`
// };
// const popupHead = {
//   fontWeight: "bold",
//   fontSize: "18px",
//   textAlign: "left",
// };

// const popupText = {
//   fontSize: "14px",
//   textAlign: "left",
// };
