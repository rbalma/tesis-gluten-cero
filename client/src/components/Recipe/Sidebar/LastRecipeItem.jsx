
import styles from './LastRecipeItem.module.css';

export const LastRecipeItem = () => {
	return (
		<div className={styles.itemSidebar}>
			<img
				alt='recipes'
				src='https://img-global.cpcdn.com/recipes/6ab24d3a956ff32a/680x482cq70/noquis-de-papa-y-zapallo-sin-gluten-foto-principal.webp'
			/>
			<div className={styles.infoSidebar}>
				<span className={styles.titleSidebarItem}>
					Ñoquis de papa y zapallo para todo el mundo
				</span>
				<span className={styles.categorySidebar}>Plato Principal</span>
			</div>
		</div>
	);
};
