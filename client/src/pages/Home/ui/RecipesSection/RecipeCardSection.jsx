import { Link } from 'react-router-dom';

import styles from './RecipeCardSection.module.css';

export const RecipeCardSection = ({ title, image }) => {
	return (
		<div className={styles.cardUser}>
			<Link to='/recetas'>
				<div className={styles.imgBx}>
					<img src={image} alt='recipe' />
				</div>
				<div className={styles.details}>
					<p className={styles.recipeTitle}>{title}</p>
				</div>
			</Link>
		</div>
	);
};
