import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';

import styles from './ProfileSidebar.module.css';

export const CollapsedItem = ({
	item,
	subItemActive,
	onChangeSubItemActive,
	collapsedItem,
	onChangeCollapsedItem,
}) => {
	const isSubItemActive = () => {
		return item.items.some((i) => i.link === subItemActive);
	};

	return (
		<>
			<button
				className={`${styles.collapsedItem} ${
					isSubItemActive() ? styles.collapsedItemActive : ''
				}`}
				onClick={() => onChangeCollapsedItem(item.name)}>
				{item.icon && (
					<span
						className={
							collapsedItem === item.name ? `${styles.less}` : `${styles.more}`
						}>
						<IconChevronDown size={24} />
					</span>
				)}
				<span>{item.name}</span>
			</button>

			<div
				className={`${styles.subNav} ${
					collapsedItem === item.name ? styles.open : ''
				}`}>
				{item.items.map((subItem) => (
					<NavLink
						to={'/perfil/632298b7f462f1ba1974d3b6' + subItem.link}
						end
						key={subItem.link}
						className={({ isActive }) =>
							isActive ? `${styles.btnActive}` : ''
						}>
						<button
							className={styles.item}
							onClick={() => onChangeSubItemActive(subItem.link)}>
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
