import axios from 'axios';
import glutenCeroApi from '../glutenCeroApi';

const API_Access_Token = import.meta.env.VITE_LOCATIONIQ_TOKEN;

export const getAddressesOfPlaces = async ({ query, signal }) => {
	const { data } = await axios.get(
		`https://api.locationiq.com/v1/autocomplete?key=${API_Access_Token}&q=${query}&limit=5&dedupe=1&country=Argentina`,
		{ signal }
	);
	return data;
};

export const getReverseGeocoding = async ({ lat, lng }) => {
	const { data } = await axios.get(
		`https://us1.locationiq.com/v1/reverse?key=${API_Access_Token}&lat=${lat}&lon=${lng}&format=json`
	);
	return data;
};

export const getMarkers = async (filters = {}) => {
	const { data } = await glutenCeroApi.get('/markers', {
		params: filters,
	});
	return data;
};

export const getMarkerById = async (markerId) => {
	const { data } = await glutenCeroApi.get(`/markers/${markerId}`);
	return data.data;
};

export const createMarker = async (values) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.post('/markers', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const updateMarker = async ({ markerId, values }) => {
	const formData = new FormData();

	for (const value in values) {
		if (value !== 'image') formData.append(value, values[value]);
	}

	const file = values.image[0]?.originFileObj;
	if (file) formData.append('image', file, file.name);

	const { data } = await glutenCeroApi.put(`/markers/${markerId}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

export const deleteMarker = async (markerId) => {
	const { data } = await glutenCeroApi.delete(`/markers/${markerId}`);
	return data;
};

export const getFavoritesMarkers = async () => {
	const { data } = await glutenCeroApi.get('/favorites/markers');
	return data;
};

export const addFavMarker = async (markerId) => {
	const { data } = await glutenCeroApi.put(`/favorites/markers/${markerId}`);
	return data;
};

export const deleteFavMarker = async (markerId) => {
	const { data } = await glutenCeroApi.delete(`/favorites/markers/${markerId}`);
	return data;
};
