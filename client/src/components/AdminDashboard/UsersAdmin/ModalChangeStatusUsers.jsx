import { Button, Modal } from 'antd';
import { IconCircleCheck, IconExclamationCircle, IconTrash } from '@/components/Icons';
import { useUpdateUser } from '@/services/queries/usersQueries';

const { confirm } = Modal;

export const ModalChangeStatusUsers = ({ userId, isActive, userName, onCloseDrawerDetail }) => {
	const { mutateAsync } = useUpdateUser(userId);

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere ${isActive ? 'inactivar' : 'activar'} a ${userName}?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync({userId, values: { active: !isActive } });
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
