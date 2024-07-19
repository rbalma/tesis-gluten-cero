import { useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';
import { IconCircleX } from '@/components/Icons';
import { rules } from '@/utils/rulesForm';
import { useChangeStateRecipe } from '@/services/queries/recipeQueries';

import styles from './DetailRecipes.module.css';

export const ModalRejectRecipes = ({
	recipeId,
	onCloseDrawerDetail,
	size = 'small',
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isPending, mutateAsync } = useChangeStateRecipe();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const rejectRecipe = async (values) => {
		try {
			values.state = 'error';
			await mutateAsync({ recipeId, values });
			setIsModalOpen(false);

			if (onCloseDrawerDetail) onCloseDrawerDetail();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button
				danger={size === 'small'}
				ghost={size === 'middle'}
				size={size}
				className='iconBtn'
				onClick={showModal}
				icon={size === 'small' ? <IconCircleX size={16} /> : null}>
				Rechazar
			</Button>
			<Modal
				title={null}
				footer={null}
				centered
				destroyOnClose
				width={600}
				bodyStyle={{
					height: 310,
					padding: 25,
					fontFamily: 'Montserrat',
				}}
				closable={false}
				open={isModalOpen}
				onCancel={handleCancel}>
				<Form
					layout='vertical'
					name='rejectRecipe'
					autoComplete='off'
					onFinish={rejectRecipe}>
					<Form.Item
						name='description'
						label='Indique el motivo por el que rechaza la receta:'
						rules={rules.message}>
						<Input.TextArea
							autoSize={{
								minRows: 8,
								maxRows: 8,
							}}
						/>
					</Form.Item>
					<div className={styles.btnFooter}>
						<Button className={styles.btnForm} onClick={handleCancel}>
							Cancelar
						</Button>

						<Button
							className={styles.btnForm}
							loading={isPending}
							danger
							type='primary'
							htmlType='submit'>
							Rechazar
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};
