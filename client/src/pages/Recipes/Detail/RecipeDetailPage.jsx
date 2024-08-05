import { useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useGetRecipeById } from '@/services/queries/recipeQueries';
import { CardRecipeDetail } from '@/components/Recipe/Card/CardRecipeDetail';
import { SidebarRecipeDetail } from '@/components/Recipe/Sidebar/SidebarRecipeDetail';
import { FormCommentRecipe } from '@/components/Recipe/Comments/FormCommentRecipe';
import { ListCommentsRecipe } from '@/components/Recipe/Comments/ListCommentsRecipe';
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
				state={recipe.state}
				userId={recipe.user._id}
				recipeId={recipe._id}
			/>
			<main className={styles.recipeDetails}>
				<CardRecipeDetail recipe={recipe} forwardRef={componentRef} />
			</main>
			<aside className={styles.sidebarDetails}>
				<SidebarRecipeDetail recetaId={recetaId} handlePrint={handlePrint} />
			</aside>
			<div className={styles.commentDetails}>
			
					<h3 id='comentarios' className={styles.sectionTitle}>
						COMENTARIOS <div className={styles.sectionLine} />
					</h3>
			
				<FormCommentRecipe recetaId={recetaId} userId={recipe.user._id} />
				<ListCommentsRecipe recetaId={recetaId} recipeUserId={recipe.user._id} />
			</div>
		</div>
	);
};
