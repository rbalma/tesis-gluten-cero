import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IconX } from '@/components/Icons';
import { MapReviews } from '../MapReviews';
import { MapReviewForm } from './MapReviewForm';

import styles from './MapReviewModal.module.css';

export const MapReviewModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<small className={styles.countReviews} onClick={showModal}>
				(8 opiniones)
			</small>
			<Modal
				title={null}
				footer={null}
				centered
				bodyStyle={{
					padding: 0,
					height: 'calc(100dvh - 80px)',
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
						<MapReviewForm
							showModalOne={showModal}
							handleCancelOne={handleCancel}
						/>
						<span className={styles.closableButton} onClick={handleCancel}>
							<IconX size={22} />
						</span>
					</div>
				</header>
				<MapReviews />
			</Modal>
		</>
	);
};
