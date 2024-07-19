import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	checkAllNotification,
	checkOrUncheckNotification,
	countUnreadNotifications,
	getNotifications,
} from '../api/notificationsApi';

export const useGetNotifications = (filters) => {
	return useQuery({
		queryKey: ['notifications'],
		queryFn: () => getNotifications(filters),
	});
};

export const useCountUnreadNotifications = (userId) => {
	return useQuery({
		queryKey: ['notificationsCount'],
		queryFn: () => countUnreadNotifications(userId),
		refetchOnWindowFocus: true,
	});
};

export const useCheckAllNotification = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: checkAllNotification,
		onSuccess: () => {
			queryClient.setQueryData(['notifications'], (old) => ({
				notifications: old.notifications.map((notification) => ({
					...notification,
					read: true,
				})),
			}));
			queryClient.setQueryData(['notificationsCount'], 0);
		},
		onError: (error) =>
			console.log(error),
	});
};

export const useCheckNotification = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: checkOrUncheckNotification,
		onSuccess: (_, { notificationId }) => {
			queryClient.setQueryData(['notifications'], (old) => ({
				notifications: old.notifications.map((notification) =>
					notification._id === notificationId
						? { ...notification, read: true }
						: notification
				),
        totalPages: old.totalPages,
        count: old.count
			}));
			queryClient.setQueryData(
				['notificationsCount'],
				(old) => old - 1
			);
		},
		onError: (error) =>
			console.log(error),
	});
};
