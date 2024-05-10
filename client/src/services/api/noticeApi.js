import glutenCeroApi from '../glutenCeroApi';

export const getNotices = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/notices', {
		params: filters,
	});
	return data;
};

export const getNoticesById = async (noticeId) => {
	const { data } = await glutenCeroApi.get(`/notices/${noticeId}`);
	return data.notice;
};

export const createNotice = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.post('/notices', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const updateNotice = async ({ noticeId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.put(`/notices/${noticeId}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const deleteNotice = async (noticeId) => {
	const { data } = await glutenCeroApi.delete(`/notices/${noticeId}`);
	return data;
};
