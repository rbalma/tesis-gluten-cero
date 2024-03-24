import styles from './MapReviewsFiltersRadio.module.css';

export const MapReviewsFiltersButton = ({
	name,
	value,
	onChange,
	selected,
}) => {
	return (
		<label htmlFor={name} className={styles.radioButton}>
			<input
				type='radio'
				name='order'
				id={name}
				value={value}
				onChange={onChange}
				checked={selected === value}
			/>
			<div className={styles.contentWrapper}>
				<div className={styles.radioContent}>
					<h4>{name}</h4>
				</div>
			</div>
		</label>
	);
};
