import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	request => {
		const token = localStorage.getItem('token');
		if (token) {
			request.headers.common['Authorization'] = `Bearer ${token}`;
		}
		return request;
	},
	error => {
		Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && originalRequest.url !== '/login') {
			//! Agregar función logout
			//await store.dispatch(startLogout());
			useAuthStore.destroy();
			toast.error('Token Expirado por favor inicie sesión para continuar');
		} 
		Promise.reject(error);
	}
);

export default axiosInstance;
