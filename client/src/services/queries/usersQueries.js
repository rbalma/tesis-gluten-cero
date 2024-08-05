import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createUser,
	deleteUser,
	getUsers,
	getUserById,
	updateUser,
	changeStatusUser,
} from '../api/usersApi';

export const useGetUsers = (filters) => {
	return useQuery({
		queryKey: ['users', filters],
		queryFn: () => getUsers(filters),
	});
};

export const useGetUserById = (userId) => {
	return useQuery({
		queryKey: ['users', userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
		onError: (error) => console.log(error),
	});
};

export const useCreateUserDashboard = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUser,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'users' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useUpdateUser = (userId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			queryClient.setQueryData(['users', userId], data?.user);
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'users' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteUsers = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'users' && query.queryKey[1]?.page >= 1,
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};



export const useChangeStatusUser = () => {
	return useMutation({
		mutationFn: changeStatusUser,
		onError: (error) => console.error(error),
	});
};