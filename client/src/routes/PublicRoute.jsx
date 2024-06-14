import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const PublicRoute = ({ children }) => {
	const userAuth = useAuthStore((state) => state.userProfile);

	return userAuth?.id ? <Navigate to='/' /> : children;
};
