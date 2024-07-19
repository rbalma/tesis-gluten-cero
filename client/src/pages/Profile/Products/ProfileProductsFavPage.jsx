import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileProductsFavCard } from '@/components/Profile/Cards';

import styles from './ProfileProducts.module.css';

export const ProfileProductsFavPage = () => {
	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Productos Favoritos</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to='/productos'>Productos</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Favoritos</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.productsList}>
				<ProfileProductsFavCard />

				{/* {isSuccess && !isFetching
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
					: null} */}
			</div>
		</div>
	);
};
