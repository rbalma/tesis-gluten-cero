import { useState } from 'react';
import { MapReviewsFiltersButton } from './Items/MapReviewsFiltersRadio';
//import { MapReviewsFiltersCheckBox } from './Items/MapReviewsFiltersCheckBox';

import styles from './MapReviewsFilters.module.css';

const sortFilter = {
	recientes: {
		sortField: 'createdAt',
		sortOrder: -1,
	},
	alta: {
		sortField: 'rating',
		sortOrder: -1,
	},
	baja: {
		sortField: 'rating',
		sortOrder: 1,
	},
};

export const MapReviewsFilters = ({ setFilters }) => {
	const [selected, setSelected] = useState('recientes');

	const onChangeOrder = (e) => {
		setSelected(e.target.value);
		setFilters(sortFilter[e.target.value]);
	};
	return (
		<>
			<h4>Ordenar por:</h4>
			<div className={styles.containerFiltersOrder}>
				<MapReviewsFiltersButton
					name='Más recientes'
					value='recientes'
					selected={selected}
					onChange={onChangeOrder}
				/>
				<MapReviewsFiltersButton
					name='Más alta'
					value='alta'
					selected={selected}
					onChange={onChangeOrder}
				/>
				<MapReviewsFiltersButton
					name='Más baja'
					value='baja'
					selected={selected}
					onChange={onChangeOrder}
				/>
			</div>
			{/* <div className={styles.containerFiltersOrder}>
				{[5, 4, 3, 2, 1].map((number) => (
					<MapReviewsFiltersCheckBox key={number} name={number} />
				))}
			</div> */}
		</>
	);
};
