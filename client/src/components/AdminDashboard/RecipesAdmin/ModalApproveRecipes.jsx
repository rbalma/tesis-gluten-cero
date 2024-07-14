import { Button, Modal } from 'antd';
import { IconCircleCheck } from '@/components/Icons';
import { useUpdateUser } from '@/services/queries/usersQueries';

const { confirm } = Modal;

export const ModalApproveRecipes = ({ recipeId, recipeName, onCloseDrawerDetail }) => {
	const { mutateAsync } = useUpdateUser(recipeId);

	const showConfirmRecipe = () => {
		confirm({
			title: `¿Está seguro qué quiere aprobar la receta "${recipeName}"?`,
			okText: 'Confirmar',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateAsync({recipeId, values: { active: 'success'} });
					onCloseDrawerDetail();
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<Button
			size='small'
			className='iconBtn success-dark'
			onClick={showConfirmRecipe}
			icon={<IconCircleCheck size={16} />}
			>
			Aprobar
		</Button>
	);
};
