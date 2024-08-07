import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createReview,
	getReviewsRecipe,
	deleteReview,
	createReplyReview,
	deleteReplyReview,
	userHasReview,
	getReviewsRecipesByUser,
	getReviewsRecipeFromUsers,
	getReviewsMarker,
	getReviewsMarkersByUser,
	getPercentageReviewsMarker,
} from '../api/reviewsApi';

/* 
	*RECETAS
*/

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
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: ({ reviewId, message = '' }) => {
			queryClient.setQueryData(['reviewsRecipesByUser'], (old) => ({
				reviews: old.reviews.filter((review) => review._id !== reviewId),
				totalPages: old.totalPages,
				count: old.count,
			}));
			toast.success(message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useHasReviewRecipe = ({ userId, recipeId }) => {
	return useQuery({
		queryKey: ['hasReviewRecipe', recipeId],
		queryFn: () => userHasReview({ userId, recipeId }),
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

export const useCreateReplyReviewInProfile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReplyReview,
		onSuccess: ({ reply }, variables) => {
			queryClient.setQueriesData(
				{ queryKey: ['reviewsRecipesFromUsers'], exact: false },
				(old) => ({
					reviews: old.reviews.map((review) =>
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
		onSuccess: ({ reviewId }) => {
			queryClient.setQueriesData(
				{ queryKey: ['reviewsRecipesFromUsers'], exact: false },
				(old) => ({
					reviews: old.reviews.map((review) =>
						review._id === reviewId ? { ...review, reply: null } : review
					),
					totalPages: old.totalPages,
					count: old.count,
				})
			);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useGetReviewsRecipeFromUsers = ({ filters }) => {
	return useQuery({
		queryKey: ['reviewsRecipesFromUsers', filters],
		queryFn: () => getReviewsRecipeFromUsers({ filters }),
	});
};

export const useGetReviewsRecipeByUser = (userId) => {
	return useQuery({
		queryKey: ['reviewsRecipesByUser'],
		queryFn: () => getReviewsRecipesByUser(userId),
		enabled: !!userId,
	});
};

/* 
	*MARCADORES
*/
export const useGetReviewsMarker = ({ markerId, filters }) => {
	return useQuery({
		queryKey: ['reviewsMarker', markerId, filters],
		queryFn: () => getReviewsMarker({ markerId, filters }),
	});
};

export const useGetPercentageReviewsMarker = (markerId) => {
	return useQuery({
		queryKey: ['percentageReviewsMarker', markerId],
		queryFn: () => getPercentageReviewsMarker(markerId),
	});
};

export const useCreateReviewMarker = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createReview,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(['reviewsMarker', variables.marker]);
			queryClient.invalidateQueries(['percentageReviewsMarker', variables.marker]);
			queryClient.invalidateQueries(['markers']);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteReviewMarker = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteReview,
		onSuccess: ({ reviewId, message = '' }) => {
			queryClient.setQueryData(['reviewsMarkersByUser'], (old) => ({
				reviews: old.reviews.filter((review) => review._id !== reviewId),
				totalPages: old.totalPages,
				count: old.count,
			}));
			toast.success(message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useHasReviewMarker = ({ userId, markerId, isModalOpen }) => {
	return useQuery({
		queryKey: ['hasReviewMarker', markerId],
		queryFn: () => userHasReview({ userId, markerId }),
		enabled: !!userId && isModalOpen,
	});
};

export const useGetReviewsMarkersByUser = (userId) => {
	return useQuery({
		queryKey: ['reviewsMarkersByUser'],
		queryFn: () => getReviewsMarkersByUser(userId),
		enabled: !!userId,
	});
};