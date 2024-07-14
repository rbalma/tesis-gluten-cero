import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const ProtectedAdminRoute = ({ children }) => {
	const userAuth = useAuthStore((state) => state.userProfile);

	return userAuth?.role === 'admin' ? children : <Navigate to='/' />;
};
