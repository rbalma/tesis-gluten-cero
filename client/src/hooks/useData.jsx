import { useState, useEffect, useRef } from 'react';
import * as underscore from 'underscore';
import axios from '../utils/axiosInstance';

const useData = (endpoint, filters) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchInput, setSearchInput] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [countData, setCountData] = useState(0);
	const [countFilteredData, setCountFilteredData] = useState(0);

	const fetchData = async params => {
		try {
			setLoading(true);
			const response = await axios.get(endpoint, { params });

			const newData = response.data.data;
			const newCount = response.data.count;
			setData(newData);
			setCountData(newCount ? newCount : newData.length);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
			setLoading(false);
			setError(error);
		}
	};

	useEffect(() => {
		let mounted = true;
		if (endpoint === null) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				let params = { ...filters };

				const response = await axios.get(endpoint, { params });

				let { data, count } = response.data;

				setData(data);
				setCountData(count ? count : data.length);
				setLoading(false);
			} catch (error) {
				console.log(error.message);
				if (mounted) {
					setLoading(false);
					setError(error);
				}
			}
		};

		fetchData();

		return () => (mounted = false);
	}, [endpoint, filters]);

	const handleSearch = async searchInput => {
		if (searchInput === '') {
			setFilterData(null);
			setCountFilteredData(0);
			fetchData({ ...filters });
		}

		if (!searchInput) return;

		let params = { ...filters, search: searchInput };

		fetchData(params);
	};

	const handleChangeSearchInput = input => {
		setSearchInput(input);
		debounceHandleSearch(input);
	};

	const debounceHandleSearch = useRef(
		underscore.debounce(searchInput => handleSearch(searchInput), 600)
	).current;

	useEffect(() => {
		if (filterData === null && countFilteredData === 0) {
			handleSearch(searchInput);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterData, countFilteredData]);

	return [
		error,
		loading,
		data,
		filterData,
		fetchData,
		searchInput,
		handleChangeSearchInput,
		debounceHandleSearch,
		setData,
		countData,
		countFilteredData,
	];
};

export default useData;
