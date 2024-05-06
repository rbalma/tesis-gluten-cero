import { IconTrash } from '@/components/Icons';
import { Button, Modal } from 'antd';

const { confirm } = Modal;

export const ModalDeleteCategory = ({ categoryName, categoryId }) => {
	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar la categoría: '${categoryName}'?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				console.log('OK');
			},
		});
	};

	return (
		<Button
			danger
			icon={<IconTrash size={22} />}
			onClick={showDeleteConfirm}
			type='default'
		/>
	);
};
