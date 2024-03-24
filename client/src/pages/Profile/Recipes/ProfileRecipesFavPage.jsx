import { Breadcrumb, Select } from 'antd';
import { Link } from 'react-router-dom';
import { IconArrowBackUp, IconChevronDown, IconEdit } from '@/components/Icons';
import { ProfileRecipeCard } from '@/components/Profile/Cards';

import styles from './ProfileRecipe.module.css';

export const ProfileRecipesFavPage = () => {
	return (
		<div className={styles.profileContainer}>
		<header className={styles.profileHeader}>
			<h1>Recetas Favoritas</h1>
			<Breadcrumb
				className={styles.profileBreadcrumb}
				separator={<IconChevronDown size={16} />}>
				<Breadcrumb.Item>
					<Link to='/'>Inicio</Link>
				</Breadcrumb.Item>
				{/* //! Agregar ID del usuario logueado a la url */}
				<Breadcrumb.Item>
					<Link to='/perfil/632298b7f462f1ba1974d3b6/recetas'>Recetas</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Favoritas</Breadcrumb.Item>
			</Breadcrumb>
		</header>

		<div className={styles.recipesList}>
			<ProfileRecipeCard />
			<ProfileRecipeCard />
		</div>

		</div>
		);
};

