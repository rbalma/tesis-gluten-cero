import { Link } from 'react-router-dom';
import { CardRecipeDetail } from '@/components/Recipe/Card/CardRecipeDetail';
import { SidebarRecipeDetail } from '@/components/Recipe/Sidebar/SidebarRecipeDetail';
import { FormCommentRecipe } from '@/components/Recipe/Comments/FormCommentRecipe';
import { CommentRecipe } from '@/components/Recipe/Comments/CommentRecipe';

import styles from './RecipeDetailPage.module.css';

export const RecipeDetailPage = () => {
	return (
		<div className={styles.containerRecipeDetail}>
			<header className={styles.headerRecipeDetail}>
				<h1>Rosca de Pascua</h1>
				<span className={styles.linesCategory}>
					<span>
						<Link to='/recetas'>DULCES</Link>
					</span>
				</span>
			</header>
			<main className={styles.recipeDetails}>
				<CardRecipeDetail />
			</main>
			<aside className={styles.sidebarDetails}>
				<SidebarRecipeDetail />
			</aside>
			<div className={styles.commentDetails}>
				<FormCommentRecipe />
				<CommentRecipe />
			</div>
		</div>
	);
};
