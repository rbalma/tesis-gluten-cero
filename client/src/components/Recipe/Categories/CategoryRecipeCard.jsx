import { categoryGetImage } from '@/utils/fetchData';
import styles from './CategoryRecipeCard.module.css';

export const CategoryRecipeCard = ({ category }) => {
	return (
		<label htmlFor={category._id} className={styles.categoryRecipeCard}>
			<input type='checkbox' id={category._id} />
			<div className={styles.categoryRecipeItem}>
				<img alta='category' src={categoryGetImage(category.image)} />
				<span>{category.name}</span>
			</div>
		</label>
	);
};
