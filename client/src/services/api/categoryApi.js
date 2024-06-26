import glutenCeroApi from '../glutenCeroApi';

export const getCategories = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/categories', {
		params: filters,
	});
	return data.data;
};

export const getCategoriesById = async (categoryId) => {
	const { data } = await glutenCeroApi.get(`/categories/${categoryId}`);
	return data.data;
};

export const createCategory = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.post('/categories', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data.data;
};

export const updateCategory = async ({ categoryId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.put(
		`/categories/${categoryId}`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	);
	return data.data;
};

export const deleteCategory = async (categoryId) => {
	const { data } = await glutenCeroApi.delete(`/categories/${categoryId}`);
	return data.data;
};
