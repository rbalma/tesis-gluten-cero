import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
	const { id } = useSelector(({ auth }) => auth);

	return id ? children : <Navigate to='/login' />;
};
