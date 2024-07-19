import { Modal, Rate } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IconTrash, PhoneIcon } from '@/components/Icons';
import {
	useDeleteFavoriteRecipe,
	useDeleteRecipe,
} from '@/services/queries/recipeQueries';
import styles from './ProfileMarkerCard.module.css';

const { confirm } = Modal;

export const ProfileMarkerCard = ({
	isEdit,
	id,
	title,
	category,
	state,
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
	};

	return (
		<div className={styles.profileMarkerCard}>
			<img
				src={
					'https://tiotomar.vtexassets.com/arquivos/ids/223252-800-800?v=638349017454700000&width=800&height=800&aspect=true'
				}
				alt='marker'
			/>

			<div className={styles.profileMarkerContent}>
				<h2 className={styles.titleCard}>
					{'Sanatorio Allende Nueva Córdoba'}
				</h2>
				<p>{'Obispo Oro 42'}</p>

				<span>
					<PhoneIcon size={15} /> {'(0810) 555-2553'}
				</span>

				<span className={styles.profileMarkerStarCard}>
					{/* <Rate disabled allowHalf value={+ratingAverage} /> */}
					<Rate disabled allowHalf value={3} />
					<span className={styles.profileMarkerCountReviews}>
						({'2'} opiniones)
					</span>
				</span>
			</div>

			<div className={styles.profileMarkerButtonContainer}>
				<button
					className={styles.profileMarkerButton}
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
