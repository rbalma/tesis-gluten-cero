import styles from './FiltersProducts.module.css';

export const CleanFiltersProducts = ({ filters, cleanFilters }) => {
	if (!filters.name && !filters.brand && !filters.type) return null;

	return (
		<button className={styles.cleanButton} onClick={cleanFilters}>
			Borrar filtros
		</button>
	);
};
