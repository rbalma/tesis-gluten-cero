import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawerMenu, TopBar, MenuSider } from './ui';

import styles from './LayoutAdmin.module.css';

const AdminScreen = () => {
	const [menuCollapsed, setMenuCollapsed] = useState(false);

	const showDrawer = () => {
		setMenuCollapsed((menuPrev) => !menuPrev);
	};

	return (
		<div className={styles.layoutBodyContainer}>
			<MenuSider
				menuCollapsed={menuCollapsed}
				setMenuCollapsed={setMenuCollapsed}
			/>
			<DrawerMenu menuCollapsed={menuCollapsed} showDrawer={showDrawer} />
			<div className={styles.mainLayout}>
				<TopBar showDrawer={showDrawer} />
				<main className={styles.content}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminScreen;
