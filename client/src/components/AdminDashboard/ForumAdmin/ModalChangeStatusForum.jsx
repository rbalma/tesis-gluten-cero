import { Button, Modal } from 'antd';
import { IconCircleCheck, IconExclamationCircle, IconTrash } from '@/components/Icons';
import { useUpdateThread } from '@/services/queries/forumQueries';

const { confirm } = Modal;

export const ModalChangeStatusThreads = ({ threadId, isActive, title, onCloseDrawerDetail }) => {
	const { mutateAsync } = useUpdateThread(threadId);

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere ${isActive ? 'inactivar' : 'activar'} a ${title}?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync({threadId, values: { active: !isActive } });
					onCloseDrawerDetail();
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<Button
			danger={isActive}
			size='small'
			className='iconBtn'
			onClick={showDeleteConfirm}
			icon={isActive ? <IconExclamationCircle size={16} /> : <IconCircleCheck size={16} />}
			>
			{isActive ? 'Inactivar' : 'Activar'}
		</Button>
	);
};
