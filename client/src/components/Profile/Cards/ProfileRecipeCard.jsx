import { Modal, Rate } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IconClock, IconEdit, IconTrash } from '@/components/Icons';
import { useDeleteFavoriteRecipe, useDeleteRecipe } from '@/services/queries/recipeQueries';
import { Link } from 'react-router-dom';
import { timeAgo } from '@/utils/format';

import styles from './ProfileRecipeCard.module.css';

const { confirm } = Modal;

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

	const deleteRecipe = useDeleteRecipe();
	const deleteFavoriteRecipe = useDeleteFavoriteRecipe();

	const showDeleteConfirmRecipe = () => {
		confirm({
			title: `¿Está seguro de eliminar la receta?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await deleteRecipe.mutateAsync(id);
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	const handleDeleteFav = async () => {
		try {
			await deleteFavoriteRecipe.mutateAsync(id);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.profileRecipeCard}>
			<img src={image} alt='recipe' />

			<div className={styles.profileRecipeContent}>
				<Link to={`/recetas/${id}`}>{title}</Link>
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
					<Link
						to={`/receta-formulario/${id}`}
						className={styles.profileRecipeButton}>
						<IconEdit size={16} /> Editar
					</Link>
				) : null}

				<button
					className={styles.profileRecipeButton}
					onClick={isEdit ? showDeleteConfirmRecipe : handleDeleteFav}>
					{deleteFavoriteRecipe.isPending ? (
						<LoadingOutlined />
					) : (
						<IconTrash size={16} />
					)}{' '}
					Eliminar
				</button>
			</div>
		</div>
	);
};
