import glutenCeroApi from '../glutenCeroApi';

export const getReviewsRecipe = async ({ recipeId, filters = {} }) => {
	const { data } = await glutenCeroApi.get(`/reviews/recipe/${recipeId}`, {
		params: filters,
	});
	return data;
};

export const getReviewsMarker = async ({ markerId, filters = {} }) => {
	const { data } = await glutenCeroApi.get(`/reviews/marker/${markerId}`, {
		params: filters,
	});
	return data;
};

export const getPercentageReviewsMarker = async (markerId) => {
	const { data } = await glutenCeroApi.get(`/reviews/percentage/markers/${markerId}`);
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
	markerId = '',
}) => {
	const { data } = await glutenCeroApi.get(
		`/hasreview/user/${userId}?recipeId=${recipeId}&markerId=${markerId}`
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

export const getReviewsRecipesByUser = async (userId) => {
	const { data } = await glutenCeroApi.get(`/reviews/recipes/user/${userId}`);
	return data;
};

export const getReviewsMarkersByUser = async (userId) => {
	const { data } = await glutenCeroApi.get(`/reviews/markers/user/${userId}`);
	return data;
};