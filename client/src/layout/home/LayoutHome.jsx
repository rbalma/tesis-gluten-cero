import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './ui/TopBar/NavBar';
import Footer from './ui/Footer';

const BackTopStyle = {
	height: 40,
	width: 40,
	lineHeight: '40px',
	borderRadius: 4,
	backgroundColor: '#1088e9',
	color: '#fff',
	textAlign: 'center',
	fontSize: 14,
};

export const LayoutHome = () => {
	const location = useLocation();

	return (
		<>
			<Navbar />
			<div style={{ minHeight: 'calc(100vh - 170px)', height: '100%' }}>
				<Outlet />
			</div>

			{location.pathname !== '/mapa' && <Footer />}

			<BackTop>
				<div style={BackTopStyle}>
					<ArrowUpOutlined />
				</div>
			</BackTop>
		</>
	);
};
