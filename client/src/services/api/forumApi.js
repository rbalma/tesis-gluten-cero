import glutenCeroApi from '../glutenCeroApi';

export const getThreads = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/threads', {
		params: filters,
	});
	return data;
};

export const getPosts = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/posts', {
		params: filters,
	});
	return data;
};

export const getThreadById = async (threadId) => {
	const { data } = await glutenCeroApi.get(`/threads/${threadId}`);
	return data.data;
};

export const updateThread = async ({ threadId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const { data } = await glutenCeroApi.put(`/threads/${threadId}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const deleteThread = async (threadId) => {
	const { data } = await glutenCeroApi.delete(`/threads/${threadId}`);
	return data;
};

export const deletePost = async (postId) => {
	const { data } = await glutenCeroApi.delete(`/posts/${postId}`);
	return data;
};