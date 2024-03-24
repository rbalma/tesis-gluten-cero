import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const ProtectedAdminRoute = ({ children }) => {
	const { userProfile } = useAuthStore();

	return userProfile?.role === 'admin' ? children : <Navigate to='/inicio' />;
};
