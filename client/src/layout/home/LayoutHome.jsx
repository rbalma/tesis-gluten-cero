import { Outlet } from 'react-router-dom';
import Navbar from './ui/TopBar/NavBar';

const LayoutHome = () => {

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default LayoutHome;
