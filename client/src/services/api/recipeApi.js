import glutenCeroApi from '../glutenCeroApi';

export const getRecipes = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/recipes', {
		params: filters,
	});
	return data;
};

export const getRecipeById = async (recipeId) => {
	const { data } = await glutenCeroApi.get(`/recipes/${recipeId}`);
	return data.data;
};

export const createRecipe = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (['instructions', 'ingredients'].includes(value)) {
			for (const item of values[value]) {
				formData.append(`${value}[]`, item);
			}
		}
		if (!['image', 'instructions', 'ingredients'].includes(value))
			formData.append(value, values[value]);
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
		if (['instructions', 'ingredients'].includes(value)) {
			for (const item of values[value]) {
				formData.append(`${value}[]`, item);
			}
		}
		if (!['image', 'instructions', 'ingredients'].includes(value))
			formData.append(value, values[value]);
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

export const getSideBarRecipes = async (recipeId) => {
	const { data } = await glutenCeroApi.get(`/sidebar/recipes/${recipeId}`);
	return data;
};

export const getFavoritesRecipes = async () => {
	const { data } = await glutenCeroApi.get('/favorites/recipes');
	return data;
};

export const addFavRecipe = async (recipeId) => {
	const { data } = await glutenCeroApi.patch(`/favorites/recipes`, { recipeId });
	return data;
}

export const deleteFavRecipe = async (recipeId) => {
	const { data } = await glutenCeroApi.delete(`/favorites/recipes/${recipeId}`);
	return data;
}