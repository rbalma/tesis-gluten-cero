import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { DrawerMenu, TopBar, MenuSider } from './ui';

import styles from './LayoutAdmin.module.css';

const { Header, Content } = Layout;

const AdminScreen = () => {
	const [menuCollapsed, setMenuCollapsed] = useState(false);

	const showDrawer = () => {
		setMenuCollapsed((menuPrev) => !menuPrev);
	};

	return (
		<Layout>
			<MenuSider
				menuCollapsed={menuCollapsed}
				setMenuCollapsed={setMenuCollapsed}
			/>
			<DrawerMenu menuCollapsed={menuCollapsed} showDrawer={showDrawer} />
			<Layout className={styles.layoutAdmin}>
				<Header className={styles.header}>
					<TopBar showDrawer={showDrawer} />
				</Header>
				<Content className={styles.content}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminScreen;
