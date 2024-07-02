import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getProducts,
	updateProduct,
} from '../api/productsApi';


export const useGetProducts = (filters) => {
	return useQuery({
		queryKey: ['products', filters],
		queryFn: () => getProducts(filters),
	});
};

export const useUpdateProduct = (productId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProduct,
		onSuccess: (data) => {
			queryClient.setQueryData(['products', productId], data?.user);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'products' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};