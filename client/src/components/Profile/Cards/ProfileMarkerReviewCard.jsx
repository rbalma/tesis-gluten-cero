import { Modal, Rate } from 'antd';
import { dateFormat } from '@/utils/format';
import { IconTrash } from '@/components/Icons';
import { useDeleteReviewMarker } from '@/services/queries/reviewsQueries';

import styles from './ProfileMarkerCard.module.css';

const { confirm } = Modal;

export const ProfileMarkerReviewCard = ({
	reviewId,
	rating,
	content,
	createdAt,
	markerName,
}) => {
	const mutateReview = useDeleteReviewMarker();

	const showDeleteConfirmReview = () => {
		confirm({
			title: `¿Está seguro de eliminar la reseña?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateReview.mutateAsync(reviewId);
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<div
			className={styles.profileMarkerCard}
			style={{ paddingTop: 20, paddingBottom: 15 }}>
			<div className={styles.profileMarkerReviewContent}>
				<h2 className={styles.titleCard}>{markerName}</h2>

				<div className={styles.dateRate}>
					<span>{dateFormat(createdAt)}</span>{' '}
					<span className={styles.profileMarkerStarCard}>
						<Rate disabled allowHalf value={rating} />
					</span>
				</div>

				<p>{content}</p>
			</div>

			<div className={styles.profileMarkerButtonContainer}>
				<button
					className={styles.profileMarkerButton}
					onClick={showDeleteConfirmReview}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
