import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteCategory } from '@/services/queries/categoryQueries';

const { confirm } = Modal;

export const ModalDeleteCategory = ({ categoryName, categoryId }) => {
	const { mutateAsync } = useDeleteCategory();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar la categoría: '${categoryName}'?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => await mutateAsync(categoryId),
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
