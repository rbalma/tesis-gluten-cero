import styles from './MapFilterCategory.module.css';

export const MapFilterCategory = ({ category }) => {
	return (
		<label htmlFor={category.name} className={styles.categoryItem}>
			<input type='checkbox' id={category.name} />
			<div style={{ '--bgColor': category.bgColor }}>
				{category.icon}
				{category.name}
			</div>
		</label>
	);
};
