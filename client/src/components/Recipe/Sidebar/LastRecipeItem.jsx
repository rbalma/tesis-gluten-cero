
import { useNavigate } from 'react-router-dom';
import styles from './LastRecipeItem.module.css';

export const LastRecipeItem = ({ recipeId, title, category, image}) => {
	const navigate = useNavigate()
	return (
		<div className={styles.itemSidebar} onClick={() => navigate(`/recetas/${recipeId}`)}>
			<img
				alt='recipes'
				src={image}
			/>
			<div className={styles.infoSidebar}>
				<span className={styles.titleSidebarItem}>
				{title}
				</span>
				<span className={styles.categorySidebar}>{category}</span>
			</div>
		</div>
	);
};
