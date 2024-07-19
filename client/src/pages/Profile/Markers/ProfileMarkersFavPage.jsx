import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileMarkerCard } from '@/components/Profile/Cards';

import styles from './ProfileMarkers.module.css';

export const ProfileMarkersFavPage = () => {
  return (
    <div className={styles.profileContainer}>
    <header className={styles.profileHeader}>
      <h1>Marcadores Favoritos</h1>
      <Breadcrumb
        className={styles.profileBreadcrumb}
        separator={<IconChevronDown size={16} />}>
        <Breadcrumb.Item>
          <Link to='/'>Inicio</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/mapa'>Marcadores</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Favoritas</Breadcrumb.Item>
      </Breadcrumb>
    </header>

    <div className={styles.markersList}>

<ProfileMarkerCard />

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
  )
}
