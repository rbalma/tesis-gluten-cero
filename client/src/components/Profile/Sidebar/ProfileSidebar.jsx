import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuItems } from './MenuItems';
import { CollapsedItem } from './CollapsedItem';

import styles from './ProfileSidebar.module.css';

export const ProfileSidebar = () => {
	const location = useLocation();
	const [itemActive, setItemActive] = useState('Perfil');
	const [subItemActive, setSubItemActive] = useState('');
	const [collapsedItem, setCollapsedItem] = useState('');

	useEffect(() => {
		const path = location.pathname.split('/').slice(3, 5).join('/');
		if (path === 'notificaciones') {
			return setItemActive('Notificaciones');
		}

		menuItems.forEach((item) => {
			if (item?.items) {
				item.items.forEach((i) => {
					if (i.link === `/${path}`) {
						setItemActive('');
						setCollapsedItem(item.name);
						return setSubItemActive(i.link);
					}
				});
			}
		});
	}, []);

	const onChangeItemActive = (item) => {
		setSubItemActive('');
		setItemActive(item);
		setCollapsedItem('');
	};

	const onChangeSubItemActive = (item) => {
		setSubItemActive(item);
		setItemActive('');
	};

	const onChangeCollapsedItem = (itemName) => {
		if (collapsedItem === itemName) return setCollapsedItem('');
		setCollapsedItem(itemName);
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
								collapsedItem={collapsedItem}
								onChangeCollapsedItem={onChangeCollapsedItem}
							/>
						) : (
							<NavLink
								to={'/perfil/632298b7f462f1ba1974d3b6' + item.link}
								end
								onClick={() => onChangeItemActive(item.name)}
								className={
									itemActive === item.name ? `${styles.btnActive}` : ''
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
