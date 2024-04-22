import { IconPrinter } from '@/components/Icons';
import { CardSuscribeRecipe } from './CardSuscribeRecipe';
import { LastRecipeItem } from './LastRecipeItem';

import styles from './SidebarRecipeDetail.module.css';

export const SidebarRecipeDetail = () => {
	return (
		<div className={styles.containerSidebar}>
			<h1 className={styles.titleSidebar}>Últimas recetas</h1>
			<LastRecipeItem />
			<LastRecipeItem />
			<LastRecipeItem />
			<hr />
			<button className={styles.printButton}>
				<IconPrinter size={22} /> Imprimir Receta
			</button>
			<hr />
			<CardSuscribeRecipe />
		</div>
	);
};
