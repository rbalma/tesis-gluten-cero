import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IconArrowBackUp, IconX } from '@/components/Icons';

import styles from './ReviewReplyModal.module.css';

export const ReviewReplyModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<button onClick={showModal} className={styles.profileRecipeButton}>
				<IconArrowBackUp size={16} /> Responder esta reseña
			</button>
			<Modal
				title={null}
				footer={null}
				centered
				bodyStyle={{
					padding: 0,
				}}
				width={610}
				closeIcon={
					<span className={styles.closableButton}>
						<IconX size={26} />
					</span>
				}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<header className={styles.reviewReplyModalHeader}>
					<h3 className={styles.reviewReplyModalTitle}>Responder reseña</h3>
				</header>
				<Form style={{ padding: '0 40px 30px' }}>
					<Form.Item>
						<Input.TextArea
							type='string'
							autoSize={{
								minRows: 6,
							}}
						/>
					</Form.Item>

					<Button type='primary' danger>
						Responder
					</Button>
				</Form>
			</Modal>
		</>
	);
};
