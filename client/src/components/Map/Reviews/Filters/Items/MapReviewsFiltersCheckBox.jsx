import { StarFilledIcon } from '@/components/Icons';
import styles from './MapReviewsFiltersCheckBox.module.css';

export const MapReviewsFiltersCheckBox = ({ name }) => {
	return (
		<label htmlFor={name} className={styles.categoryItem}>
			<input type='checkbox' id={name} />
			<div>
				{name}
				<StarFilledIcon size={18} />
			</div>
		</label>
	);
};
