import { NavLink } from 'react-router-dom';
import { BuildingHospitalIcon } from '@/components/Icons';
import { ItemCollapsed } from './ItemCollapsed';

import styles from './ProfileSidebar.module.css';

const menuItems = [
	{
		name: 'Perfil',
		link: '',
		icon: <BuildingHospitalIcon />,
	},
	{
		name: 'Notificaciones',
		icon: <BuildingHospitalIcon />,
		link: '/notificaciones',
	},
	{
		name: 'Recetas',
		icon: <BuildingHospitalIcon />,
		items: [
			{
				name: 'Publicadas',
				link: '/recetas',
				icon: <BuildingHospitalIcon />,
			},
			{
				name: 'Favoritas',
				link: '/recetas/favoritas',
				icon: <BuildingHospitalIcon />,
			},
			{
				name: 'Reseñas',
				link: '/recetas/reseñas',
				icon: <BuildingHospitalIcon />,
			},
		],
	},
	{
		name: 'Marcadores',
		icon: <BuildingHospitalIcon />,
		items: [
			{
				name: 'Publicados',
				link: '/mapa',
				icon: <BuildingHospitalIcon />,
			},
			{
				name: 'Favoritos',
				link: '/mapa/favoritas',
				icon: <BuildingHospitalIcon />,
			},
			{
				name: 'Reseñas',
				link: '/mapa/reseñas',
				icon: <BuildingHospitalIcon />,
			},
		],
	},
	{
		name: 'Foro',
		icon: <BuildingHospitalIcon />,
		link: `/foro`,
	},
];

export const ProfileSidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<nav className={styles.sidebarNav}>
				{menuItems.map((item) => (
					<>
						{!item.items && (
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
						{item.items && <ItemCollapsed item={item} />}
					</>
				))}
			</nav>
		</aside>
	);
};
