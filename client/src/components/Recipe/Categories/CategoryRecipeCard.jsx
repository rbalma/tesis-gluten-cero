import styles from './CategoryRecipeCard.module.css';

export const CategoryRecipeCard = ({ category }) => {
	return (
    <label htmlFor={category} className={styles.categoryRecipeCard}>
    <input type='checkbox' id={category} />
    <div className={styles.categoryRecipeItem}>
    <img
				alta='category'
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFU4F3ENTPVbAtwkQBH7mK27Z0s3eeHpM0w&usqp=CAU'
			/>
			<span>{category}</span>
      </div>
  </label>
	);
};
