import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CardRecipeDetail } from '@/components/Recipe/Card/CardRecipeDetail';
import { SidebarRecipeDetail } from '@/components/Recipe/Sidebar/SidebarRecipeDetail';
import { FormCommentRecipe } from '@/components/Recipe/Comments/FormCommentRecipe';
import { CommentRecipe } from '@/components/Recipe/Comments/CommentRecipe';
import { CardHeaderRecipeDetail } from '@/components/Recipe/Card/CardHeaderRecipeDetail';

import styles from './RecipeDetailPage.module.css';

export const RecipeDetailPage = () => {
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div className={styles.containerRecipeDetail}>
			<CardHeaderRecipeDetail />
			<main className={styles.recipeDetails}>
				<CardRecipeDetail forwardRef={componentRef} />
			</main>
			<aside className={styles.sidebarDetails}>
				<SidebarRecipeDetail handlePrint={handlePrint} />
			</aside>
			<div className={styles.commentDetails}>
				<FormCommentRecipe />
				<CommentRecipe />
			</div>
		</div>
	);
};
