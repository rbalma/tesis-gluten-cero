import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import { dateFormat } from '@/utils/format';
import { IconTrash } from '@/components/Icons';
import { ReviewReplyModal } from '../Modal/ReviewReplyModal';
import { userGetAvatar } from '@/utils/fetchData';

import styles from './ProfileMarkerCard.module.css';

export const ProfileMarkerReviewCard = ({
	_id,
	user,
	recipe,
	createdAt,
	rating,
	content,
	reply,
}) => {
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
		<div
			className={styles.profileMarkerCard}
			style={{ paddingTop: 20, paddingBottom: 15 }}>
			<div className={styles.profileMarkerReviewContent}>
				<h2 className={styles.titleCard}>
					{'Sanatorio Allende Nueva Córdoba'}
				</h2>

				<div className={styles.dateRate}>
					{/* <span>{dateFormat(createdAt)}</span>{' '} */}
					<span>{'01 Junio, 2024'}</span>{' '}
					<span className={styles.profileMarkerStarCard}>
						<Rate disabled allowHalf value={5} />
					</span>
				</div>

				<p>{'Me gusta la receta! Gracias por compartirla'}</p>
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
