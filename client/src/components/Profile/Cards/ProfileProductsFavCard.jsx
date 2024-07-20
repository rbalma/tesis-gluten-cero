import { IconBookmark, IconTrash } from '@/components/Icons';
import { useLikeProduct } from '@/services/queries/productsQueries';

import styles from './ProfileProductsFavCard.module.css';

export const ProfileProductsFavCard = ({ id, product, brand }) => {
	const mutateProduct = useLikeProduct();

	const showDeleteConfirmReview = () => {
		mutateProduct.mutate({ productId: id, isLiked: false });
	};

	return (
		<div className={styles.profileProductCard}>
			<div className={styles.profileProductsContent}>
				<h2 className={styles.titleCard}>{product}</h2>
				<span className={styles.brand}>
					<IconBookmark size={16} fill='currentColor' /> {brand}
				</span>{' '}
			</div>

			<div className={styles.profileProductButtonContainer}>
				<button
					className={styles.profileProductButton}
					onClick={showDeleteConfirmReview}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
