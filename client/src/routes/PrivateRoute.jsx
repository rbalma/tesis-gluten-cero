import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const PrivateRoute = ({ children }) => {
	const userAuth = useAuthStore((state) => state.userProfile);

	return userAuth?.id ? children : <Navigate to='/ingreso' />;
};
