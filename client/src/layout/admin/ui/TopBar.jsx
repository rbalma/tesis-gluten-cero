import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserProfile } from '@/layout/home/ui/TopBar/UserProfile';
import Logo from '@/assets/images/logoGlutenCero.png';

import styles from './TopBar.module.css';

export const TopBar = ({ showDrawer }) => {
	return (
		<div className={styles.menuTop}>
			<div className={styles.logoBtnMenu}>
				<Button type='link'>
					<MenuOutlined onClick={showDrawer} />
				</Button>

				<Link to='/'>
					<img width={80} src={Logo} alt='Gluten-Cero' />
				</Link>
			</div>

			<div className={styles.profileAvatar}>
				<UserProfile overlayClassName='profileDropdownWhite' />
			</div>
		</div>
	);
};
