import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import { dateFormat } from '@/utils/format';
import { IconBookmark, IconTrash } from '@/components/Icons';
import { ReviewReplyModal } from '../Modal/ReviewReplyModal';
import { userGetAvatar } from '@/utils/fetchData';

import styles from './ProfileProductsFavCard.module.css';

export const ProfileProductsFavCard = () => {
	const showDeleteConfirmReview = () => {
		confirm({
			title: `¿Está seguro de eliminar la reseña?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateReview.mutateAsync(_id);
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<div className={styles.profileProductCard}>
			<div className={styles.profileProductsContent}>
				<h2 className={styles.titleCard}>
					{'Sanatorio Allende Nueva Córdoba'}
				</h2>
				<span className={styles.brand}>
					<IconBookmark size={16} fill='currentColor' /> {'01 Junio, 2024'}
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
