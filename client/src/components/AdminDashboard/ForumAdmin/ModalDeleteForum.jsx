import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteThreads } from '@/services/queries/forumQueries';

const { confirm } = Modal;

export const ModalDeleteThreads = ({ threadId, title, onCloseDrawer }) => {
	const { mutateAsync } = useDeleteThreads();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar el hilo: ${title}?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(threadId);
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
