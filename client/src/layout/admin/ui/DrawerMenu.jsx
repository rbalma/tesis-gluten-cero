import { Drawer, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/images/logoBlanco.png';
import { menuItems } from './menuItems';

import styles from './DrawerMenu.module.css';

export const DrawerMenu = ({ menuCollapsed, showDrawer }) => {
	const location = useLocation();

	return (
		<Drawer
			title={
				<Link to='/'>
					<img width={80} src={Logo} alt='Gluten-Cero' />
				</Link>
			}
			placement='left'
			closable={false}
			onClose={showDrawer}
			visible={menuCollapsed}
			width={200}
			className={styles.drawerAdmin}
			headerStyle={{ backgroundColor: '#001529',
				textAlign: 'center', height: 70, borderRadius: 0 }}
			bodyStyle={{	background: '#003366' }}
		>
			<Menu
			theme='dark'
			mode='vertical'
			className='menuAntd'
			defaultSelectedKeys={[location.pathname]}
			items={menuItems}
		/>
		</Drawer>
	);
};
