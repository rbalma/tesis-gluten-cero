import { Skeleton } from 'antd';
import { useGetReviewsRecipe } from '@/services/queries/reviewsQueries';
import { CommentRecipe } from './CommentRecipe';

export const ListCommentsRecipe = ({ recetaId }) => {
	const { isFetching, isError, isSuccess, data } = useGetReviewsRecipe({
		recipeId: recetaId,
		filters: {
			page: 1,
		},
	});

	if (isFetching) return <Skeleton />;

	if (isError) return;

	if (isSuccess && !data.count)
		return <h2>Por el momento no hay comentarios para esta receta...</h2>;

	return (
		<>
			{data.data.map((review) => (
				<CommentRecipe key={review._id} recetaId={recetaId} {...review} />
			))}
		</>
	);
};
