import { Marker, Popup } from 'react-leaflet';
import { Rate } from 'antd';
import {
	IconMarkerHospital,
	IconMarkerRestaurant,
	IconMarkerShopping,
} from './IconsMarkers';

const markerType = {
	Hospital: IconMarkerHospital,
	Restaurante: IconMarkerRestaurant,
	Comercio: IconMarkerShopping,
};

export const MarkerPlace = ({
	coordinates,
	image,
	category,
	name,
	direction,
	phone,
	ratingAverage,
	ratingCount,
}) => {
	return (
		<Marker
			position={{ lat: coordinates[1], lng: coordinates[0] }}
			icon={markerType[category]}>
			<Popup className='popup'>
				<img src={image} alt='marker' />
				<section>
					<h4>{name}</h4>
					<h5>{direction}</h5>
					<h5>{phone}</h5>
					{ratingCount ? (
						<Rate className='stars' disabled allowHalf value={+ratingAverage} />
					) : null}
				</section>
			</Popup>
		</Marker>
	);
};
