import recipe1 from '@/assets/images/recipes/recipe1.jpg';
import recipe2 from '@/assets/images/recipes/recipe2.jpg';
import recipe3 from '@/assets/images/recipes/recipe3.jpg';
import { RecipeCardSection } from './RecipeCardSection';

import styles from './RecipesSection.module.css';

export const RecipesSection = () => {
	return (
		<>
			<h2 className={styles.title}>Recetas por Categorías</h2>
			<div className={styles.cardGrid}>
				<RecipeCardSection title={'Postre'} image={recipe1} />
				<RecipeCardSection title={'Dulces'} image={recipe2} />
				<RecipeCardSection title={'Ensaladas'} image={recipe3} />
				<div className={styles.lastRecipe}>
					<RecipeCardSection title={'Ensaladas'} image={recipe3} />
				</div>
			</div>
		</>
	);
};
