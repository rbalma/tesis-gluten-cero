import { useState } from 'react';
import { Modal } from 'antd';
import { IconX } from '@/components/Icons';
import useAuthStore from '@/store/authStore';
import { MapReviews } from '../MapReviews';
import { MapReviewForm } from './MapReviewForm';
import { useHasReviewMarker } from '@/services/queries/reviewsQueries';

import styles from './MapReviewModal.module.css';

export const MapReviewModal = ({
	markerId,
	markerName,
	countReviews,
	ratingReviews,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const userProfile = useAuthStore((state) => state.userProfile);
	const { isSuccess: isSuccessHasReview, data: userReview } =
		useHasReviewMarker({
			userId: userProfile?.id,
			markerId,
			isModalOpen
		});

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<small className={styles.countReviews} onClick={showModal}>
				({countReviews} {countReviews === 1 ? 'opinión' : 'opiniones'})
			</small>
			<Modal
				title={null}
				footer={null}
				centered
				bodyStyle={{
					padding: 0,
					height: '100%',
					maxHeight: 'calc(100dvh - 80px)',
					overflowY: 'auto',
					borderRadius: 10,
				}}
				width={810}
				closable={false}
				open={isModalOpen}
				onCancel={handleCancel}>
				<header className={styles.reviewReplyModalHeader}>
					<h3 className={styles.reviewReplyModalTitle}>Opiniones del sitio</h3>
					<div className={styles.btnGroup}>
						{isSuccessHasReview && !userReview.hasReview ? (
							<MapReviewForm
								markerId={markerId}
								markerName={markerName}
								showModalOne={showModal}
								handleCancelOne={handleCancel}
							/>
						) : null}
						<span className={styles.closableButton} onClick={handleCancel}>
							<IconX size={22} />
						</span>
					</div>
				</header>
				<MapReviews
					markerId={markerId}
					markerName={markerName}
					ratingReviews={ratingReviews}
					countReviews={countReviews}
				/>
			</Modal>
		</>
	);
};
