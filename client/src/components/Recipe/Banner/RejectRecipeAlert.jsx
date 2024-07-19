import { useGetRejectedRecipeInfo } from '@/services/queries/recipeQueries';
import { Alert, Skeleton } from 'antd';

export const RejectRecipeAlert = ({ recipeId }) => {
	const { isLoading, isSuccess, data } = useGetRejectedRecipeInfo(recipeId);

	if (isLoading)
		return <Skeleton.Input active={true} block={true} style={{ height: 79 }} />;

	if (isSuccess)
		return (
			<Alert
				message='Receta Rechazada'
				description={data.description}
				type='error'
				showIcon
			/>
		);

	return null;
};
