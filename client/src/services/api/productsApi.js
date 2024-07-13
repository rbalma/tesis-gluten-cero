import glutenCeroApi from '../glutenCeroApi';

export const getProducts = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/products', {
		params: filters,
	});
	return data;
};

export const getProductsTypes = async () => {
	const { data } = await glutenCeroApi.get('/types/products');
	return data.productsTypes;
};

export const updateProduct = async ({ productId, isLiked }) => {
	const { data } = await glutenCeroApi.put(`/favorites/products/${productId}`, { isLiked });
	return data;
};