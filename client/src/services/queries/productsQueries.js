import { toast } from 'sonner';
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	getProducts,
	getProductsByUser,
	getProductsTypes,
	updateProduct,
} from '../api/productsApi';
import useAuthStore from '@/store/authStore';

export const useGetProducts = (filters = {}) => {
	return useQuery({
		queryKey: ['products', filters],
		queryFn: () => getProducts(filters),
		placeholderData: keepPreviousData,
		staleTime: 5 * 1000 * 60, // 5 minutos
	});
};

export const useGetTypesProducts = () => {
	return useQuery({
		queryKey: ['typesProducts'],
		queryFn: () => getProductsTypes(),
		staleTime: 10 * 1000 * 60, // 10 minutos
	});
};

export const useLikeProduct = () => {
	const queryClient = useQueryClient();
	const addFavoriteProduct = useAuthStore((state) => state.addFavoriteProduct);
	const deleteFavoriteProduct = useAuthStore(
		(state) => state.deleteFavoriteProduct
	);
	return useMutation({
		mutationFn: updateProduct,
		onSuccess: (data, { productId, isLiked }) => {
			queryClient.setQueriesData(
				{ queryKey: ['products'], type: 'active' },
				(old) => ({
					products: old.products.map((product) =>
						product._id === productId
							? { ...product, likesCount: data.product.likesCount }
							: product
					),
					totalPages: old.totalPages,
					count: old.count,
				})
			);

			queryClient.invalidateQueries({ queryKey: ['products'], type: 'inactive' });

			isLiked
				? addFavoriteProduct(productId)
				: deleteFavoriteProduct(productId);

			queryClient.invalidateQueries({ queryKey: ['favProductsUser'] });
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useGetProductsByUser = () => {
	return useQuery({
		queryKey: ['favProductsUser'],
		queryFn: getProductsByUser,
	});
};
