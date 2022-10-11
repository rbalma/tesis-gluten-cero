import styles from './RecipeCardSection.module.css';

export const RecipeCardSection = ({ title, image }) => {
	return (
		<div className={styles.cardUser}>
				<div className={styles.imgBx}>
					<img src={image} alt='recipe' />
				</div>
				<div className={styles.details}>
					<p className={styles.recipeTitle}>{title}</p>
				</div>
		</div>
	);
};
