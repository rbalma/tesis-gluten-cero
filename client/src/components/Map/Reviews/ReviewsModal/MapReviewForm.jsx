import { useState } from 'react';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { IconEdit, IconX } from '@/components/Icons';

import styles from './MapReviewForm.module.css';

export const MapReviewForm = ({ showModalOne, handleCancelOne }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		handleCancelOne();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		showModalOne();
	};

	const addMarkerReview = () => {};

	return (
		<>
			<Button
				size='small'
				type='primary'
				className='iconBtn'
				style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Montserrat' }}
				onClick={showModal}
				icon={<IconEdit size={14} />}>
				Escribir una opinión
			</Button>
			<Modal
				title={null}
				footer={null}
				centered
				width={580}
				bodyStyle={{
					height: 380,
					padding: 25,
					fontFamily: 'Montserrat',
				}}
				closable={false}
				open={isModalOpen}
				onCancel={handleCancel}>
				<h2 className={styles.titleMarker}>Patio Olmos</h2>
				<Form onFinish={addMarkerReview}>
					<div className={styles.rowRate}>
						<Form.Item name='rating' label=''>
							<Rate className={styles.rateMarker} />
						</Form.Item>
					</div>
					<Input.TextArea
						placeholder='¿Visitaste este lugar? Tomate un momento para dejar una calificación de estrellas y comentar.'
						autoSize={{
							minRows: 7,
							maxRows: 7,
						}}
					/>

					<div className={styles.btnFooter}>
						<Button className={styles.btnForm} onClick={handleCancel}>
							Cancelar
						</Button>

						<Button className={styles.btnForm} type='primary' htmlType='submit'>
							Publicar
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
