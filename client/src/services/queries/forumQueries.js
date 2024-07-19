import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	getThreads,
    getThreadById,
    updateThread,
    deleteThread,
	getPosts,
	deletePost,
} from '../api/forumApi';


export const useGetThreads = (filters) => {
	return useQuery({
		queryKey: ['threads', filters],
		queryFn: () => getThreads(filters),
	});
};

export const useGetPosts = (filters) => {
	return useQuery({
		queryKey: ['posts', filters],
		queryFn: () => getPosts(filters),
	});
};

export const useGetThreadById = (threadId) => {
	return useQuery({
		queryKey: ['thread', threadId],
		queryFn: () => getThreadById(threadId),
		enabled: !!threadId,
		onError: (error) => console.log(error),
	});
};

export const useUpdateThread = (threadId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateThread,
		onSuccess: (data) => {
			queryClient.setQueryData(['threads', threadId], data?.thread);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'threads' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteThreads = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteThread,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'threads' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeletePosts = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'threads' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

