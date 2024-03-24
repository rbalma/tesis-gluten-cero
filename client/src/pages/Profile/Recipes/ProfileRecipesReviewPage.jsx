import { Breadcrumb, Select } from 'antd';
import { Link } from 'react-router-dom';
import { IconArrowBackUp, IconChevronDown, IconEdit } from '@/components/Icons';
import { ProfileRecipeReviewCard } from '@/components/Profile/Cards';

import styles from './ProfileRecipe.module.css';

export const ProfileRecipesReviewPage = () => {
	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Reseñas de Recetas</h1>
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
					<Breadcrumb.Item>Reseñas</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.profileRecipeReviewGrid}>
				<section className={styles.recipesList}>
					<div className={styles.recipesListHeader}>
						Reseñas de los Usuarios
						<Select
							defaultValue='jack'
							bordered={false}
							size='small'
							dropdownStyle={{ minWidth: 120}}
							placement='bottomRight'
							options={[
								{
									value: 'jack',
									label: 'Todas',
								},
								{
									value: 'lucy',
									label: 'Respondida',
								},
								{
									value: 'pedro',
									label: 'Sin Responder',
								},
							]}
						/>
					</div>
					<ProfileRecipeReviewCard>
						<IconArrowBackUp size={16} /> Responder esta reseña
					</ProfileRecipeReviewCard>
				</section>
				<section className={styles.recipesList}>
					<div className={styles.recipesListHeader}>Mis Reseñas</div>
					<ProfileRecipeReviewCard>
						<IconEdit size={16} /> Editar
					</ProfileRecipeReviewCard>
				</section>
			</div>
		</div>
	);
};
