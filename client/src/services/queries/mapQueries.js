import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';
import {
	addFavMarker,
	createMarker,
	deleteFavMarker,
	deleteMarker,
	getAddressesOfPlaces,
	getFavoritesMarkers,
	getMarkers,
	getMarkerById,
	getMarkersByLocation,
	updateMarker,
} from '../api/mapApi';

export const useGetAddresses = (query) => {
	return useQuery({
		queryKey: ['address', query],
		queryFn: ({ signal }) => getAddressesOfPlaces({ query, signal }),
		staleTime: 5 * 1000 * 60, // 5 minutos
		gcTime: 2 * 1000 * 60,
		enabled: !!query,
	});
};

export const useGetMarkersByLocation = (filters) => {
	return useQuery({
		queryKey: ['markers', filters],
		queryFn: () => getMarkersByLocation(filters),
	});
};

export const useGetMarkers = (filters) => {
	return useQuery({
		queryKey: ['markers', filters],
		queryFn: () => getMarkers(filters),
	});
};

export const useGetMarkerById = (markerId) => {
	return useQuery({
		queryKey: ['markers', markerId],
		queryFn: () => getMarkerById(markerId),
		enabled: !!markerId,
		onError: (error) => console.log(error),
	});
};

export const useCreateMarker = () => {
	return useMutation({
		mutationFn: createMarker,
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useUpdateMarker = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateMarker,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'markers' &&
					(query.queryKey[1]?.page >= 1 || query.queryKey[1]?.userId !== null),
			});
			//toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteMarker = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteMarker,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'markers' && query.queryKey[1]?.page >= 1,
			});

			queryClient.setQueryData(['markers', { userId: data.userId }], (old) => {
				if (!old) return [];
				return {
					data: old.data.filter((marker) => marker._id !== data.markerId),
					totalPages: 1,
					count: old.length - 1,
				};
			});
			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useGetFavoritesMarkers = () => {
	return useQuery({
		queryKey: ['markersFavorites'],
		queryFn: getFavoritesMarkers,
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useAddFavoriteMarker = () => {
	const addFavoriteMarker = useAuthStore((state) => state.addFavoriteMarker);
	return useMutation({
		mutationFn: addFavMarker,
		onSuccess: (_, markerId) => {
			addFavoriteMarker(markerId);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};

export const useDeleteFavoriteMarker = () => {
	const queryClient = useQueryClient();
	const deleteFavoriteMarker = useAuthStore(
		(state) => state.deleteFavoriteMarker
	);
	return useMutation({
		mutationFn: deleteFavMarker,
		onSuccess: (data, markerId) => {
			deleteFavoriteMarker(markerId);

			queryClient.setQueryData(['markersFavorites'], (old) => {
				if (!old) return [];
				return {
					favMarkers: old.favMarkers.filter(
						(marker) => marker._id !== markerId
					),
					count: old.count - 1,
				};
			});

			toast.success(data?.message);
		},
		onError: () => toast.error('Error. Vuelva a intentarlo'),
	});
};
