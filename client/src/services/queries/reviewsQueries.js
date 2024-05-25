import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createReview,
	getReviewsRecipe,
	deleteReview,
	createReplyReview,
	deleteReplyReview,
	userHasReview,
} from '../api/reviewsApi';

export const useGetReviewsRecipe = ({ recipeId, filters }) => {
	return useQuery({
		queryKey: ['reviewsRecipes', recipeId, filters],
		queryFn: () => getReviewsRecipe({ recipeId, filters }),
	});
};

export const useCreateReviewRecipe = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReview,
		onSuccess: ({ newReview, totalRating, countRating }, variables) => {
			queryClient.invalidateQueries(['reviewsRecipes', variables.recipe]);
			queryClient.setQueryData(['recipes', newReview.recipe], (old) => ({
				...old,
				ratingAverage: { $numberDecimal: totalRating },
				countRating: countRating,
			}));
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteReview = () => {
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: ({ message = '' }) => {
			toast.success(message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useHasReviewRecipe = ({ userId, recipeId }) => {
	return useQuery({
		queryKey: ['hasReviewRecipe', userId],
		queryFn: () => userHasReview({ userId, recipeId }),
		enabled: !!userId,
	});
};

export const useHasReviewMarket = ({ userId, marketId }) => {
	return useQuery({
		queryKey: ['hasReviewsMarket', marketId],
		queryFn: () => userHasReview({ userId, marketId }),
		enabled: !!userId,
	});
};

export const useCreateReplyReview = (recipeId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReplyReview,
		onSuccess: ({ reply }, variables) => {
			queryClient.setQueriesData(
				{ queryKey: ['reviewsRecipes', recipeId], exact: false },
				(old) => ({
						data: old.data.map((review) =>
							review._id === variables.reviewId ? { ...review, reply } : review
						),
						totalPages: old.totalPages,
						count: old.count,
					})
			);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteReplyReview = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReplyReview,
		onSuccess: ({ message = '' }) => {
			// queryClient.invalidateQueries({
			// 	predicate: (query) =>
			// 		query.queryKey[0] === 'users' && query.queryKey[1]?.page >= 1,
			// });
			toast.success(message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
