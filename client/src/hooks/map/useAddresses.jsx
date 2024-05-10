import { getAddressesOfPlaces } from '@/services/queries/mapQueries';
import { useQuery } from '@tanstack/react-query';

export const useAddresses = (query) => {
	const {
		isLoading,
		isError,
		error,
		data: addresses = [],
		isFetching,
	} = useQuery({
		queryKey: ['address', { query }],
		queryFn: ({ signal }) => getAddressesOfPlaces(query, signal),
		staleTime: 5 * 1000 * 60, // 5 minutos
		gcTime: 2 * 1000 * 60,
	});

	return {
		isLoading,
		isError,
		error,
		addresses,
		isFetching,
	};
};
