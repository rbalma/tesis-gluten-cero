import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const PrivateRoute = ({ children }) => {
	const { userProfile } = useAuthStore();

	return userProfile?.id ? children : <Navigate to='/ingreso' />;
};
