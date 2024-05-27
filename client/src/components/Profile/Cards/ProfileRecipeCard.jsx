import { Rate } from 'antd';
import { IconClock, IconEdit, IconTrash } from '@/components/Icons';
import { timeAgo } from '@/utils/format';
import { Link } from 'react-router-dom';

import styles from './ProfileRecipeCard.module.css';

export const ProfileRecipeCard = ({
	isEdit,
	id,
	title,
	category,
	ratingAverage,
	ratingCount,
	image,
	date,
}) => {
	return (
		<div className={styles.profileRecipeCard}>
			<img src={image} alt='recipe' />

			<div className={styles.profileRecipeContent}>
				<Link to={`/recetas/${id}`}>
					{title}
				</Link>
				<p>{category}</p>

				<span className={styles.profileRecipeStarCard}>
					<Rate disabled allowHalf value={+ratingAverage} />
					<span className={styles.profileRecipeCountReviews}>
						({ratingCount} opiniones)
					</span>
				</span>

				<span>
					<IconClock size={15} /> {timeAgo(date)}
				</span>
			</div>

			<div className={styles.profileRecipeButtonContainer}>
				{isEdit ? (
					<Link to={`/receta-formulario/${id}`} className={styles.profileRecipeButton}>
						<IconEdit size={16} /> Editar
					</Link>
				) : null}

				<button className={styles.profileRecipeButton}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
