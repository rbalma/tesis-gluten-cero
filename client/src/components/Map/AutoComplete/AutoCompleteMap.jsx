import { useState } from 'react';
import { AutoComplete, Input, Tooltip } from 'antd';
import {
	IconCurrentLocation,
	IconMap2,
	SearchIcon,
	SpinnerIcon,
} from '../../Icons';
import { useGetAddresses } from '@/services/queries/mapQueries';
import useDebounce from '@/hooks/useDebounce';

import styles from './AutoCompleteMap.module.css';

export const AutoCompleteMap = ({ onSelectSearch, getUbicacion }) => {
	const [search, setSearch] = useState('');
	const debounceSearch = useDebounce(search, 700);

	const {
		isSuccess,
		data: addresses,
		isFetching,
	} = useGetAddresses(debounceSearch);

	const buscarDireccion = (value) => {
		if (!value) return;
		setSearch(value);
	};

	return (
		<AutoComplete
			options={
				isFetching && !isSuccess
					? []
					: addresses?.map((address) => {
							const fullDirection = `${address.address?.road || ''} ${
								address.address?.house_number || ''
							} ${address.address?.suburb || ''} ${
								address.address?.state
							} ${address.address?.country}`;
							return {
								label: (
									<span className={styles.optionsAutoComplete}>
										<IconMap2 /> {fullDirection}
									</span>
								),
								value: fullDirection,
								data: {
									lat: address?.lat,
									lng: address?.lon,
									direction: `${address.address?.road} ${address.address?.house_number}`,
								},
							};
					  })
			}
			onSelect={(value, option) => onSelectSearch(value, option)}
			onSearch={buscarDireccion}
			style={{ width: '100%' }}>
			<Input
				className='autocompleteInputMap'
				type='text'
				placeholder='Buscar por calle, número, y provincia'
				prefix={isFetching ? <SpinnerIcon /> : <SearchIcon size={20} />}
				suffix={
					getUbicacion ? (
						<Tooltip title='Mi ubicación' placement='left' color='#f50'>
							<span onClick={getUbicacion}>
								<IconCurrentLocation />
							</span>
						</Tooltip>
					) : null
				}
			/>
		</AutoComplete>
	);
};
