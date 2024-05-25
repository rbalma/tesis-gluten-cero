import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoriesById,
	updateCategory,
} from '../api/categoryApi';

export const useGetCategories = (filters) => {
	return useQuery({
		queryKey: ['categories', filters],
		queryFn: () => getCategories(filters),
	});
};

export const useGetCategoryById = (categoryId) => {
	return useQuery({
		queryKey: ['categories', categoryId],
		queryFn: () => getCategoriesById(categoryId),
		enabled: !!categoryId,
	});
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'categories' && query.queryKey[1]?.page >= 1,
			});
			toast.success('Categoría creada');
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useUpdateCategory = (categoryId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCategory,
		onSuccess: (data) => {
			queryClient.setQueryData(['categories', categoryId], data);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'categories' && query.queryKey[1]?.page >= 1,
			});
			toast.success('Categoría actualizada');
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'categories' && query.queryKey[1]?.page >= 1,
			});
			toast.success('Categoría actualizada');
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
