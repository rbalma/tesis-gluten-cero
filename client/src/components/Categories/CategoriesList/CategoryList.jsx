import { CategoryItem } from './CategoryItem';
import styles from './CategoryItem.module.css';

export const CategoryList = ({ categories, onChange }) => {
	return (
		<div className={styles.gridCategories}>
			{categories.map((category) => (
				<CategoryItem
          key={category._id}
          id={category._id}
					name={category.name}
					image={category.image}
					onChange={onChange}
				/>
			))}
		</div>
	);
};
