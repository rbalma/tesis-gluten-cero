import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './ui/TopBar/NavBar';
import Footer from './ui/Footer';

const LayoutHome = () => {
	const location = useLocation();

	return (
		<>
			<Navbar />
			<Outlet />
			{location.pathname !== '/mapa' && <Footer />}
		</>
	);
};

export default LayoutHome;
