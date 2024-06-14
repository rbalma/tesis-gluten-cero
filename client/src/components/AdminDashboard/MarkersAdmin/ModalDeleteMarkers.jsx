import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteUsers } from '@/services/queries/usersQueries';

const { confirm } = Modal;

export const ModalDeleteMarkers = ({ markerId, markerName, onCloseDrawer }) => {
	const { mutateAsync } = useDeleteUsers();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar el marcador "${markerName}"?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(markerId);
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
