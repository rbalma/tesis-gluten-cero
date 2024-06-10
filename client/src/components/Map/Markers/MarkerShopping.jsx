import { Marker, Popup } from "react-leaflet";
import { Rate } from "antd";
import { IconMarkerShopping } from "./IconsMarkers";
import Disco from '@/assets/images/markers/disco.png';


export const MarkerShopping = ({ posicion }) => {
	return (
		<Marker
			position={{ lat: '-31.41077', lng: '-64.19263' }}
			icon={IconMarkerShopping}>
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