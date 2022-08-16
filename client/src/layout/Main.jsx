import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

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

export const Main = () => {
	return (
		<>
			<Navbar />

			<Outlet />

			{/* {history.location.pathname !== "/mapa" && <Footer />} */}

			<Footer />

			<BackTop>
				<div style={BackTopStyle}>
					<ArrowUpOutlined />
				</div>
			</BackTop>
		</>
	);
};
