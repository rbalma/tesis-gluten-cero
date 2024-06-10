import { Marker, Popup } from "react-leaflet";
import { Rate } from "antd";
import { IconMarkerHospital } from "./IconsMarkers";

import Sanatorio from '@/assets/images/markers/sanatorio.png';


export const MarkerHospital = ({ posicion }) => {
	return (
		<Marker
			position={{ lat: '-31.42447', lng: '-64.18719' }}
			icon={IconMarkerHospital}>
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