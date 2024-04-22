import { useState } from 'react';
import { AutoComplete, Input, Tooltip } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { ChefHatIcon, IconCurrentLocation, IconMap2, SearchIcon, SpinnerIcon } from '../../Icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import useDebounce from '@/hooks/useDebounce';

import { useAddresses } from '@/hooks/map/useAddresses';
import styles from './AutoCompleteMap.module.css';

const GEOCODE_URL =
	'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=TR&location=';

export const AutoCompleteMap = ({ form, getUbicacion }) => {
	const [search, setSearch] = useState('');
	const debounceSearch = useDebounce(search, 700);

	const { isLoading, isError, error, addresses, isFetching } =
		useAddresses(debounceSearch);

	const handleSetView = (cordenadas, nombre) => {
		setLugar(nombre);
		map.setView(cordenadas, 18);
	};

	const buscarDireccion = (value) => {
		setSearch(value);
		// if (value.length > 8) {
		// 	// Utilizar el provider
		// 	const provider = new OpenStreetMapProvider();
		// 	provider.search({ query: value.trim() }).then(async (resultado) => {
		// 		if (resultado[0]?.bounds[0]) {
		// 			console.log(resultado[0]?.bounds[0]);
		// 			handleSetView(resultado[0].bounds[0], resultado[0].label);
		// 			const coordinates = resultado[0].bounds[0];
		// 			setPosition({
		// 				lat: coordinates[0],
		// 				lng: coordinates[1],
		// 			});
		// 			const data = await (
		// 				await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
		// 			).json();
		// 			form.setFieldsValue({
		// 				direction: data.address.Address,
		// 				city: data.address.City,
		// 				country: data.address.CountryCode,
		// 				longitude: data.location.x,
		// 				latitude: data.location.y,
		// 			});
		// 		}
		// 	});
		// }
	};

	const onSelectSearch = (value, option) => {
		//form.resetFields();
		console.log({ value, option });
	};

	// https://es.locationiq.com/demo?_gl=1*e9iqiv*_ga*NTk2NDY3MTE2LjE2OTg3MTQ1NzE.*_ga_TRV5GF9KFC*MTcwNTM2NTg5My4zLjEuMTcwNTM2NTk3NS4wLjAuMA..#autocomplete
	//https://github.com/TanStack/query/discussions/5279

	return (
			<AutoComplete
				options={
					isFetching
						? []
						: addresses.map((address) => ({
								label: (
									<span className={styles.optionsAutoComplete}>
										<IconMap2 /> {address.title}
									</span>
								),
								value: address.title,
						  }))
				}
				onSelect={(value, option) => onSelectSearch(value, option)}
				onSearch={buscarDireccion}
				style={{ width: '100%' }}>
				<Input
					className='autocompleteInputMap'
					type='text'
					placeholder='Buscar por calle, número, y barrio'
					prefix={isFetching ? <SpinnerIcon /> : <SearchIcon size={20} />}
					suffix={
						<Tooltip title='Mi ubicación' placement='left' color='#f50'>
							<span onClick={getUbicacion}>
						<IconCurrentLocation />
						</span>
					</Tooltip>
					}
				/>
			</AutoComplete>
	);
};
