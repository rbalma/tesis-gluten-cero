import { SidebarRecipe } from './SidebarRecipe';
import { CardRecipeDetail } from './CardRecipeDetail';
import { CommentsRecipe  } from './CommentsRecipe';

import styles from './RecipeDetail.module.css';


export const RecipeDetail = () => {
	return (
		<div className={styles.container}>
			<main className={styles.recipeDetails}>
				<CardRecipeDetail />
			</main>
			<aside className={styles.sidebarDetails}>
				<SidebarRecipe />
			</aside>
			<div className={styles.commentDetails}>
				<CommentsRecipe />
			</div>
		</div>
	);
};
