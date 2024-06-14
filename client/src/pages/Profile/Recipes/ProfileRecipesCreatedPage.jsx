import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileRecipeCard } from '@/components/Profile/Cards';

import styles from './ProfileRecipe.module.css';
import useAuthStore from '@/store/authStore';
import { useGetRecipes } from '@/services/queries/recipeQueries';

export const ProfileRecipesCreatedPage = () => {
	const userProfile = useAuthStore((state) => state.userProfile);
	const { data, isSuccess, isFetching } = useGetRecipes({ userId: userProfile.id });


	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Mis recetas</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Recetas Publicadas</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.recipesList}>
				{isSuccess && !isFetching
					? data.data.map((recipe) => (
							<ProfileRecipeCard
								key={recipe._id}
								id={recipe._id}
								title={recipe.title}
								category={recipe.category.name}
								ratingAverage={recipe.ratingAverage.$numberDecimal}
								ratingCount={recipe.ratingCount}
								image={recipe.image.secure_url}
								date={recipe.createdAt}
								isEdit
							/>
					  ))
					: null}
			</div>
		</div>
	);
};

