import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from './MenuItems';
import { CollapsedItem } from './CollapsedItem';

import styles from './ProfileSidebar.module.css';


export const ProfileSidebar = () => {
	const [subItemActive, setSubItemActive] = useState('');

	const onChangeSubItemActive = (item) => {
		setSubItemActive(item);
	};

	return (
		<aside className={styles.sidebar}>
			<nav className={styles.sidebarNav}>
				{menuItems.map((item, i) => (
					<div key={i}>
						{item.items ? (
							<CollapsedItem
								item={item}
								subItemActive={subItemActive}
								onChangeSubItemActive={onChangeSubItemActive}
							/>
						) : (
							<NavLink
								to={'/perfil/632298b7f462f1ba1974d3b6' + item.link}
								end
								className={({ isActive }) =>
									isActive ? `${styles.btnActive}` : ''
								}>
								<button className={styles.item}>
									{item.icon && (
										<span className={styles.iconSize}>{item.icon}</span>
									)}
									<span>{item.name}</span>
								</button>
							</NavLink>
						)}
					</div>
				))}
			</nav>
		</aside>
	);
};
