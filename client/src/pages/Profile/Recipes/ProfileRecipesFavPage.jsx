import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileRecipeCard } from '@/components/Profile/Cards';
import { useGetFavoritesRecipes } from '@/services/queries/recipeQueries';

import styles from './ProfileRecipe.module.css';

export const ProfileRecipesFavPage = () => {
	const { data, isSuccess, isFetching } = useGetFavoritesRecipes();

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
				{isSuccess && !isFetching
					? data.favRecipes.map((recipe) => (
							<ProfileRecipeCard
								key={recipe._id}
								id={recipe._id}
								title={recipe.title}
								category={recipe.category.name}
								ratingAverage={recipe.ratingAverage.$numberDecimal}
								ratingCount={recipe.ratingCount}
								image={recipe.image.secure_url}
								date={recipe.createdAt}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
