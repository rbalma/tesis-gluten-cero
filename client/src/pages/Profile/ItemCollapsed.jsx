import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';

import styles from './ProfileSidebar.module.css';

export const ItemCollapsed = ({ item }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button className={styles.item} onClick={() => setOpen(!open)}>
				{item.icon && <span className={styles.iconSize}>{item.icon}</span>}
				<span>{item.name}</span>
				<span className={open ? `${styles.less}` : `${styles.more}`}>
					<IconChevronDown />
				</span>
			</button>

			<div className={`${styles.subNav} ${open ? styles.open : ''}`}>
				{item.items.map((subItem) => (
					<NavLink
						to={'/perfil/632298b7f462f1ba1974d3b6' + subItem.link}
						end
						className={({ isActive }) =>
							isActive ? `${styles.btnActive}` : ''
						}>
						<button className={styles.item}>
							{subItem.icon && (
								<span className={styles.iconSize}>{subItem.icon}</span>
							)}
							<span>{subItem.name}</span>
						</button>
					</NavLink>
				))}
			</div>
		</>
	);
};
