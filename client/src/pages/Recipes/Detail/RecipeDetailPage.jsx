import { useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useGetRecipeById } from '@/services/queries/recipeQueries';
import { CardRecipeDetail } from '@/components/Recipe/Card/CardRecipeDetail';
import { SidebarRecipeDetail } from '@/components/Recipe/Sidebar/SidebarRecipeDetail';
import { FormCommentRecipe } from '@/components/Recipe/Comments/FormCommentRecipe';
import { CommentRecipe } from '@/components/Recipe/Comments/CommentRecipe';
import { CardHeaderRecipeDetail } from '@/components/Recipe/Card/CardHeaderRecipeDetail';

import styles from './RecipeDetailPage.module.css';

export const RecipeDetailPage = () => {
	const componentRef = useRef();
	const { recetaId } = useParams();
	const { isPending, isError, data: recipe } = useGetRecipeById(recetaId);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	if (isPending) return <p>Cargando</p>;

	if (isError) return <Navigate to='/recetas' />;

	return (
		<div className={styles.containerRecipeDetail}>
			<CardHeaderRecipeDetail
				title={recipe.title}
				category={recipe.category.name}
			/>
			<main className={styles.recipeDetails}>
				<CardRecipeDetail recipe={recipe} forwardRef={componentRef} />
			</main>
			<aside className={styles.sidebarDetails}>
				<SidebarRecipeDetail recetaId={recetaId} handlePrint={handlePrint} />
			</aside>
			<div className={styles.commentDetails}>
				<FormCommentRecipe />
				{/* <CommentRecipe /> */}
			</div>
		</div>
	);
};
