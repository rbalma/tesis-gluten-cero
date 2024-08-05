import glutenCeroApi from '../glutenCeroApi';

export const getNotifications = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/notifications', {
		params: filters,
	});
	return data;
};

export const checkOrUncheckNotification = async ({
	notificationId,
	values,
}) => {
	const { data } = await glutenCeroApi.patch(
		`/notifications/${notificationId}`,
		values
	);
	return data;
};

export const checkAllNotification = async (userId) => {
	const { data } = await glutenCeroApi.patch(
		`/notifications/unread/user/${userId}`
	);
	return data;
};

export const countUnreadNotifications = async (userId) => {
	const { data } = await glutenCeroApi.get(
		`/notifications/unread/user/${userId}`
	);
	return data.count;
};
