import { Rate } from 'antd';
import { IconClock, IconEdit, IconTrash } from '@/components/Icons';

import styles from './ProfileRecipeCard.module.css';

export const ProfileRecipeCard = ({ isEdit }) => {
	return (
		<div className={styles.profileRecipeCard}>
			<img
				src='https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg'
				alt='recipe'
			/>

			<div className={styles.profileRecipeContent}>
				<h2>Burger House</h2>
				<p>Categoria</p>

				<span className={styles.profileRecipeStarCard}>
					<Rate disabled allowHalf value={2.4} />
					<span className={styles.profileRecipeCountReviews}>
						(8 opiniones)
					</span>
				</span>

				<span>
					<IconClock size={15} /> Hace 2 días
				</span>
			</div>

			<div className={styles.profileRecipeButtonContainer}>
				{isEdit ? (
					<button className={styles.profileRecipeButton}>
						<IconEdit size={16} /> Editar
					</button>
				) : null}

				<button className={styles.profileRecipeButton}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
