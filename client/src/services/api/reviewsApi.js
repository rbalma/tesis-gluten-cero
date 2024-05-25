import glutenCeroApi from '../glutenCeroApi';

export const getReviewsRecipe = async ({ recipeId, filters = {} }) => {
	const { data } = await glutenCeroApi.get(`/reviews/recipe/${recipeId}`, {
		params: filters,
	});
	return data;
};

export const getReviewsMarket = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/reviews', {
		params: filters,
	});
	return data;
};

export const createReview = async (values) => {
	const { data } = await glutenCeroApi.post('/reviews', values);
	return data;
};

export const deleteReview = async (reviewId) => {
	const { data } = await glutenCeroApi.delete(`/reviews/${reviewId}`);
	return data;
};

export const userHasReview = async ({
	userId,
	recipeId = '',
	marketId = '',
}) => {
	const { data } = await glutenCeroApi.get(
		`/hasreview/user/${userId}?recipeId=${recipeId}&marketId=${marketId}`
	);
	return data;
};

export const createReplyReview = async ({ values, reviewId }) => {
	const { data } = await glutenCeroApi.post(
		`/reply/review/${reviewId}`,
		values
	);
	return data;
};

export const deleteReplyReview = async (replyId) => {
	const { data } = await glutenCeroApi.delete(`/reply/${replyId}`);
	return data;
};


export const getReviewsRecipeFromUsers = async ({ filters = {} }) => {
	const { data } = await glutenCeroApi.get(`/reviews/recipes/users`, {
		params: filters,
	});
	return data;
};

export const getReviewsRecipeByUser = async (userId) => {
	const { data } = await glutenCeroApi.get(`/reviews/recipe/user/${userId}`);
	return data;
};