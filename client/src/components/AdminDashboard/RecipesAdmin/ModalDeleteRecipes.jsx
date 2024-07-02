import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteUsers } from '@/services/queries/usersQueries';

const { confirm } = Modal;

export const ModalDeleteRecipes = ({ userId, userName, onCloseDrawer }) => {
	const { mutateAsync } = useDeleteUsers();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar a ${userName}?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(userId);
					onCloseDrawer();
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<Button
			type='link'
			size='small'
			className='iconBtn'
			onClick={showDeleteConfirm}
			icon={<IconTrash size={14} />}
			danger>
			Eliminar
		</Button>
	);
};
