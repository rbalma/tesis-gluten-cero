import glutenCeroApi from '../glutenCeroApi';

export const getUsers = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/users', {
		params: filters,
	});
	return data;
};

export const getUserById = async (userId) => {
	const { data } = await glutenCeroApi.get(`/users/${userId}`);
	return data.data;
};

export const createUser = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values?.image?.[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.post('/admin/users', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const updateUser = async ({ userId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values?.image?.[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.put(`/users/${userId}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const deleteUser = async (userId) => {
	const { data } = await glutenCeroApi.delete(`/users/${userId}`);
	return data;
};
