import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createRecipe,
	deleteRecipe,
	getRecipeById,
	getRecipes,
	updateRecipe,
} from '../api/recipeApi';

export const useGetRecipes = (filters) => {
	return useQuery({
		queryKey: ['recipes', filters],
		queryFn: () => getRecipes(filters),
	});
};

export const useGetRecipeById = (recipeId) => {
	return useQuery({
		queryKey: ['recipes', recipeId],
		queryFn: () => getRecipeById(recipeId),
		enabled: !!recipeId,
		onError: (error) => console.log(error),
	});
};

export const useCreateRecipe = () => {
	//const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createRecipe,
		// onSuccess: (data) => {
		// 	queryClient.invalidateQueries({
		// 		predicate: (query) =>
		// 			query.queryKey[0] === 'recipes' && query.queryKey[1]?.page >= 1,
		// 	});
		// 	toast.success(data?.message);
		// },
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useUpdateRecipe = (recipeId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateRecipe,
		onSuccess: (data) => {
			queryClient.setQueryData(['recipes', recipeId], data?.user);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'recipes' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteRecipe = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteRecipe,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'recipes' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
