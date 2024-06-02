import glutenCeroApi from '../glutenCeroApi';

export const getProducts = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/products-anmat', {
		params: filters,
	});
	return data;
};

export const updateProduct = async ({ productId, values }) => {
	const { data } = await glutenCeroApi.put(`/products-anmat/${productId}`, values, {
		headers: { 'Content-Type': 'application/json' },
	});
	return data;
};