import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeletePosts } from '@/services/queries/forumQueries';

const { confirm } = Modal;

export const ModalDeletePost = ({ postId }) => {
	const { mutateAsync } = useDeletePosts();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar la respuesta?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(postId);
				} catch (error) {
					console.log(error);
				}
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
