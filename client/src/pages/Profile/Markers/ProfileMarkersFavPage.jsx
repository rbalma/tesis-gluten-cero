import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileMarkerCard } from '@/components/Profile/Cards';
import { useGetFavoritesMarkers } from '@/services/queries/mapQueries';

import styles from './ProfileMarkers.module.css';

export const ProfileMarkersFavPage = () => {
	const { isLoading, data, isSuccess } = useGetFavoritesMarkers();

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
					<Breadcrumb.Item>Favoritos</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.markersList}>
				{isSuccess && !isLoading
					? data.favMarkers.map((marker) => (
							<ProfileMarkerCard
								key={marker._id}
								id={marker._id}
								image={marker.image.secure_url}
								name={marker.name}
								phone={marker.phone}
                direction={marker.direction}
								ratingCount={marker.ratingCount}
								ratingAverage={+marker.ratingAverage.$numberDecimal}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
