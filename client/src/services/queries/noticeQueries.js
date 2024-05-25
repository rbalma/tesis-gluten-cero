import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createNotice,
	deleteNotice,
	getNotices,
	getNoticesById,
	updateNotice,
} from '../api/noticeApi';

export const useGetNotices = (filters) => {
	return useQuery({
		queryKey: ['notices', filters],
		queryFn: () => getNotices(filters),
	});
};

export const useGetNoticeById = (noticeId) => {
	return useQuery({
		queryKey: ['notices', noticeId],
		queryFn: () => getNoticesById(noticeId),
		enabled: !!noticeId,
		onError: (error) => console.log(error)
	});
};

export const useCreateNotice = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createNotice,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'notices' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useUpdateNotice = (noticeId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateNotice,
		onSuccess: (data) => {
			queryClient.setQueryData(['notices', noticeId], data?.notice);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'notices' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteNotice = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteNotice,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'notices' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
