import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteNotice } from '@/services/queries/noticeQueries';

const { confirm } = Modal;

export const ModalDeleteNotices = ({ noticeId, onCloseDrawer }) => {
	const { mutateAsync } = useDeleteNotice();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar la noticia?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(noticeId);
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
