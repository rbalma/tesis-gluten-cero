import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/axiosInstance';

const useCrud = endpoint => {
	const [loading, setLoading] = useState(false);

	const createData = async (dataForm, config = {}) => {
		try {
			setLoading(true);
			const data = await axios.post(endpoint, dataForm, config);
			return data.data;
		} catch (error) {
			console.log('Error: ', error.message);
      error.response?.data && toast.success(error.response.data.message );
		} finally {
			setLoading(false);
		}
	};

	const readData = async (filters = {}) => {
		try {
			let params = { ...filters };
			setLoading(true);
			const data = await axios.get(endpoint, { params });
			return data.data;
		} catch (error) {
			console.log('Error', error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateData = async (id, dataForm, config = {}) => {
		try {
			setLoading(false);
			const { data } = await axios.put(`${endpoint}/${id}`, dataForm, config);
			toast.success(data?.message || 'Editado con Ã©xito');
			return data.data;
		} catch (error) {
			console.log('Error: ', error.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteData = async (id, dataForm = {}) => {
		try {
			setLoading(false);
			const { data } = await axios.delete(`${endpoint}/${id}`, {
				data: dataForm,
			});
			toast.success(data?.message || 'Eliminado con Ã©xito');
			return data.data;
		} catch (error) {
			console.log('Error: ', error.message);
		} finally {
			setLoading(false);
		}
	};

	return [loading, createData, readData, updateData, deleteData];
};

export default useCrud;
