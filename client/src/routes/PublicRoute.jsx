import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const PublicRoute = ({ children }) => {
	const { userProfile } = useAuthStore();

	return userProfile?.id ? <Navigate to='/' /> : children;
};
