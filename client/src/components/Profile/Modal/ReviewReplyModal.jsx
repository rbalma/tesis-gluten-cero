import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IconArrowBackUp, IconX } from '@/components/Icons';
import { useCreateReplyReviewInProfile } from '@/services/queries/reviewsQueries';

import styles from './ReviewReplyModal.module.css';
import { rules } from '@/utils/rulesForm';

export const ReviewReplyModal = ({ reviewId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { mutateAsync, isPending } = useCreateReplyReviewInProfile();
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const addReply = async (values) => {
		try {
			await mutateAsync({values, reviewId});
			handleCancel();
		} catch (error) {
			console.log(error);
		}
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
				onCancel={handleCancel}>
				<header className={styles.reviewReplyModalHeader}>
					<h3 className={styles.reviewReplyModalTitle}>Responder reseña</h3>
				</header>
				<Form style={{ padding: '0 40px 30px' }} onFinish={addReply}>
					<Form.Item name='content' rules={rules.message}>
						<Input.TextArea
							type='string'
							autoSize={{
								minRows: 6,
							}}
						/>
					</Form.Item>

					<Button htmlType='submit' type='primary' danger loading={isPending}>
						Responder
					</Button>
				</Form>
			</Modal>
		</>
	);
};
