import { useGetSidebarRecipes } from '@/services/queries/recipeQueries';
import { IconPrinter } from '@/components/Icons';
import { CardSuscribeRecipe } from './CardSuscribeRecipe';
import { LastRecipeItem } from './LastRecipeItem';

import styles from './SidebarRecipeDetail.module.css';

export const SidebarRecipeDetail = ({ recetaId, handlePrint }) => {
	const { isSuccess, data: recipes } = useGetSidebarRecipes(recetaId);

	return (
		<div className={styles.containerSidebar}>
			<h1 className={styles.titleSidebar}>Últimas recetas</h1>
			{isSuccess
				? recipes.data.map((recipe) => (
						<LastRecipeItem
							key={recipe._id}
							recipeId={recipe._id}
							title={recipe.title}
							category={recipe.category.name}
							image={recipe.image.secure_url}
						/>
				  ))
				: null}

			<hr />
			<button className={styles.printButton} onClick={handlePrint}>
				<IconPrinter size={22} /> Imprimir Receta
			</button>
			<hr />
			<CardSuscribeRecipe />
		</div>
	);
};
