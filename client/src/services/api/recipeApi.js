import glutenCeroApi from '../glutenCeroApi';

export const getRecipes = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/recipes', {
		params: filters,
	});
	return data;
};

export const getRecipeById = async (recipeId) => {
	const { data } = await glutenCeroApi.get(`/recipes/${recipeId}`);
	return data.notice;
};

export const createRecipe = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.post('/recipes', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const updateRecipe = async ({ recipeId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.put(`/recipes/${recipeId}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const deleteRecipe = async (recipeId) => {
	const { data } = await glutenCeroApi.delete(`/recipes/${recipeId}`);
	return data;
};
