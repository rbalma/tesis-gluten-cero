import { Avatar } from 'antd';
import { TagOutlined } from '@ant-design/icons';

import styles from './SidebarRecipe.module.css';

export const SidebarRecipe = () => {
	return (
		<div className={styles.containerSidebar}>
			<span className={styles.titleSidebar}>Recetas Recientes</span>
			<div className={styles.lineSidebar}></div>

			<div className={styles.itemSidebar}>
				<Avatar
					shape='square'
					size={80}
					src='https://img-global.cpcdn.com/recipes/6ab24d3a956ff32a/680x482cq70/noquis-de-papa-y-zapallo-sin-gluten-foto-principal.webp'
				/>
				<div className={styles.infoSidebar}>
					<span className={styles.titleSidebar}>
					Ñoquis de papa y zapallo
					</span>
					<span className={styles.categorySidebar}>
						<TagOutlined /> Plato Principal
					</span>
				</div>
			</div>

			<div style={{ marginTop: '40px' }}>
				<span className={styles.titleSidebar}>Categorias</span>
				<div className={styles.lineSidebar}></div>
				<div className={styles.buttonGroup}>
					<button className={styles.categoriesSidebar}>Panes</button>
					<button className={styles.categoriesSidebar}>Dulces</button>
					<button className={styles.categoriesSidebar}>Ensaladas</button>
					<button className={styles.categoriesSidebar}>Postres</button>
					<button className={styles.categoriesSidebar}>Aperitivos</button>
					<button className={styles.categoriesSidebar}>Plato Principal</button>
				</div>
			</div>
		</div>
	);
};
