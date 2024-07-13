import { toast } from 'sonner';
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	getProducts,
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

export const useLikeProduct = (filters) => {
	const queryClient = useQueryClient();
	const addFavoriteProduct = useAuthStore((state) => state.addFavoriteProduct);
	const deleteFavoriteProduct = useAuthStore(
		(state) => state.deleteFavoriteProduct
	);
	return useMutation({
		mutationFn: updateProduct,
		onSuccess: (data, { productId, isLiked }) => {
			queryClient.setQueriesData(
				{ queryKey: ['products', filters] },
				(old) => ({
					products: old.products.map((product) =>
						product._id === productId ? { ...product, likesCount: data.product.likesCount } : product
					),
					totalPages: old.totalPages,
					count: old.count,
				})
			);
			isLiked
				? addFavoriteProduct(productId)
				: deleteFavoriteProduct(productId);
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
