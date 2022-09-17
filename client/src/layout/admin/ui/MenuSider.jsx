import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';

import styles from './MenuSider.module.css';


export const MenuSider = ({ menuCollapsed, setMenuCollapsed }) => {
	const location = useLocation();

	return (
		<Layout.Sider
			collapsible
			onCollapse={value => setMenuCollapsed(value)}
			className={styles.adminSider}
			collapsed={menuCollapsed}
		>
		<Menu
			theme='dark'
			mode='inline'
			className='menuAntd'
			defaultSelectedKeys={[location.pathname]}
			items={menuItems}
		/>
		</Layout.Sider>
	);
};
