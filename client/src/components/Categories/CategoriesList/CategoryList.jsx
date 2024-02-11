import { CategoryItem } from './CategoryItem';
import styles from './CategoryItem.module.css';

export const CategoryList = ({ categories, onChange }) => {
	return (
		<div className={styles.gridCategories}>
			{categories.map((category) => (
				<CategoryItem
          key={category.name}
					name={category.name}
					icon={category.icon}
					onChange={onChange}
				/>
			))}
		</div>
	);
};
