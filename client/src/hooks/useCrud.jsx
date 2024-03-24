import { useState } from 'react';
import axios from '../utils/axiosInstance';

const useCrud = endpoint => {
	const [loading, setLoading] = useState(false);

	const createData = async (dataForm, config = {}) => {
		try {
			setLoading(true);
			const resp = await axios.post(endpoint, dataForm, config);
			return resp.data;
		} catch (error) {
			console.log('Error: ', error.message);
			const messageError = error.response?.data.message;
			return { error: messageError || 'Error del servidor' };
		} finally {
			setLoading(false);
		}
	};

	const readData = async (filters = {}) => {
		try {
			setLoading(true);
			const resp = await axios.get(endpoint, { ...filters });
			return resp.data;
		} catch (error) {
			console.log('Error: ', error.message);
			const messageError = error.response?.data.message;
			return { error: messageError || 'Error del servidor' };
		} finally {
			setLoading(false);
		}
	};

	const updateData = async (id, dataForm, config = {}) => {
		try {
			setLoading(true);
			const resp = await axios.put(`${endpoint}/${id}`, dataForm, config);
			return resp.data;
		} catch (error) {
			console.log('Error: ', error.message);
			const messageError = error.response?.data.message;
			return { error: messageError || 'Error del servidor' };
		} finally {
			setLoading(false);
		}
	};

	const deleteData = async (id, dataForm = {}) => {
		try {
			setLoading(true);
			const resp = await axios.delete(`${endpoint}/${id}`, {
				data: dataForm,
			});
			return resp.data;
		} catch (error) {
			console.log('Error: ', error.message);
			const messageError = error.response?.data.message;
			return { error: messageError || 'Error del servidor' };
		} finally {
			setLoading(false);
		}
	};

	return [loading, createData, readData, updateData, deleteData];
};

export default useCrud;
