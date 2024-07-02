import { useState } from 'react';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { IconEdit } from '@/components/Icons';
import { useCreateReviewMarker } from '@/services/queries/reviewsQueries';

import styles from './MapReviewForm.module.css';

export const MapReviewForm = ({
	markerId,
	markerName,
	showModalOne,
	handleCancelOne,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submittable, setSubmittable] = useState(false);
	const { isPending, mutateAsync } = useCreateReviewMarker();

	const showModal = () => {
		handleCancelOne();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		showModalOne();
		setIsModalOpen(false);
	};

	const addMarkerReview = async (values) => {
		try {
			values.marker = markerId;
			await mutateAsync(values);
			setIsModalOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

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
				destroyOnClose
				width={580}
				bodyStyle={{
					height: 380,
					padding: 25,
					fontFamily: 'Montserrat',
				}}
				closable={false}
				open={isModalOpen}
				onCancel={handleCancel}>
				<h2 className={styles.titleMarker}>{markerName}</h2>
				<Form name='reviewMarker' autoComplete='off' onFinish={addMarkerReview}>
					<div className={styles.rowRate}>
						<Form.Item
							name='rating'
							rules={[
								{
									required: true,
									message: 'Selecciona un puntaje',
								},
							]}>
							<Rate
								className={styles.rateMarker}
								onChange={() => setSubmittable(true)}
							/>
						</Form.Item>
					</div>
					<Form.Item name='content'>
						<Input.TextArea
							placeholder='¿Visitaste este lugar? Tomate un momento para dejar una calificación de estrellas y comentar.'
							autoSize={{
								minRows: 7,
								maxRows: 7,
							}}
						/>
					</Form.Item>
					<div className={styles.btnFooter}>
						<Button className={styles.btnForm} onClick={handleCancel}>
							Cancelar
						</Button>

						<Button
							className={styles.btnForm}
							disabled={!submittable}
							loading={isPending}
							type='primary'
							htmlType='submit'>
							Publicar
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
