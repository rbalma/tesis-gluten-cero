import { Button, Modal } from 'antd';
import { IconTrash } from '@/components/Icons';
import { useDeleteRecipe } from '@/services/queries/recipeQueries';

const { confirm } = Modal;

export const ModalDeleteRecipes = ({ recipeId, recipeName, onCloseDrawer }) => {
	const { mutateAsync } = useDeleteRecipe();

	const showDeleteConfirm = () => {
		confirm({
			title: `¿Está seguro qué quiere eliminar a la receta ${recipeName}?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync(recipeId);
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
