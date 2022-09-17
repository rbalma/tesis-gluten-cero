import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './ui/TopBar/NavBar';
import Footer from './ui/Footer';


const LayoutHome = () => {
	const location = useLocation();

	return (
		<>
			<Navbar />
			<div style={{ minHeight: 'calc(100vh - 170px)', height: '100%' }}>
				<Outlet />
			</div>

			{location.pathname !== '/mapa' && <Footer />}
		</>
	);
};

export default LayoutHome;