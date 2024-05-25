import { categoryGetImage } from '@/utils/fetchData';
import styles from './CategoryRecipeCard.module.css';

export const CategoryRecipeCard = ({ category, onClickCategory }) => {
	return (
		<label
			htmlFor={category._id}
			className={styles.categoryRecipeCard}
			onChange={() => onClickCategory(category._id)}>
			<input type='checkbox' id={category._id} />
			<div className={styles.categoryRecipeItem}>
				<img alta='category' src={categoryGetImage(category.image)} />
				<span>{category.name}</span>
			</div>
		</label>
	);
};
