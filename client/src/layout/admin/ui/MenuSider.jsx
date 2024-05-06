import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';
import Logo from '@/assets/images/logoGlutenCero.png';

import styles from './MenuSider.module.css';

export const MenuSider = ({ menuCollapsed, setMenuCollapsed }) => {
	const location = useLocation();
	const [itemActive, setItemActive] = useState('Estadísticas');

	useEffect(() => {
		const item = menuItems.find((item) => item.link === location.pathname);

		setItemActive(item?.label);
	}, []);

	const onChangeItemActive = (itemLabel) => {
		setItemActive(itemLabel);
	};

	return (
		<aside className={styles.sidebar}>
			<div className={styles.logoSideBar}>
				<Link to='/'>
					<img width={80} src={Logo} alt='Gluten-Cero' />
				</Link>
			</div>
			<nav className={styles.sidebarNav}>
				{menuItems.map((item) => (
					<NavLink
						key={item.label}
						to={item.link}
						end
						onClick={() => onChangeItemActive(item.label)}
						className={itemActive === item.label ? `${styles.btnActive}` : ''}>
						<button className={styles.item}>
							{item.icon && (
								<span className={styles.iconSize}>{item.icon}</span>
							)}
							<span>{item.label}</span>
						</button>
					</NavLink>
				))}
			</nav>
		</aside>
	);
};
