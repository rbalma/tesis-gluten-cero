import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addFavRecipe,
	createRecipe,
	deleteFavRecipe,
	deleteRecipe,
	getFavoritesRecipes,
	getRecipeById,
	getRecipes,
	getSideBarRecipes,
	updateRecipe,
} from '../api/recipeApi';
import useAuthStore from '@/store/authStore';

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


export const useSearchRecipes = (searchTerm) => {
  return useQuery({
    queryKey: ['searchRecipes', searchTerm],
    queryFn: () => getRecipes({
			type: 'R',
			visible: '1',
			title: searchTerm
		}),
    enabled: !!searchTerm,
  });
};

export const useGetSidebarRecipes = (recipeId) => {
	return useQuery({
		queryKey: ['sidebarRecipes', recipeId],
		queryFn: () => getSideBarRecipes(recipeId),
		enabled: !!recipeId,
	});
};

export const useGetFavoritesRecipes = () => {
	return useQuery({
		queryKey: ['recipesFavorites'],
		queryFn: getFavoritesRecipes,
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useAddFavoriteRecipe = () => {
	const addFavoriteRecipe = useAuthStore((state) => state.addFavoriteRecipe);
	return useMutation({
		mutationFn: addFavRecipe,
		onSuccess: (_, recipeId) => {
			addFavoriteRecipe(recipeId);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteFavoriteRecipe = () => {
	const deleteFavoriteRecipe = useAuthStore((state) => state.deleteFavoriteRecipe);
	return useMutation({
		mutationFn: deleteFavRecipe,
		onSuccess: (data, recipeId) => {
			deleteFavoriteRecipe(recipeId);
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
