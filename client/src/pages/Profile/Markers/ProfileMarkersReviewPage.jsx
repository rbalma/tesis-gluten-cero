import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileMarkerReviewCard } from '@/components/Profile/Cards';
import { useGetReviewsMarkersByUser } from '@/services/queries/reviewsQueries';
import useAuthStore from '@/store/authStore';

import styles from './ProfileMarkers.module.css';

export const ProfileMarkersReviewPage = () => {
	const userProfile = useAuthStore((state) => state.userProfile);
	const { data, isLoading, isSuccess } = useGetReviewsMarkersByUser(
		userProfile.id
	);

	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Reseñas de Marcadores</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to='/mapa'>Marcadores</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Reseñas</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.markersList}>
				{isSuccess && !isLoading
					? data.reviews.map((review) => (
							<ProfileMarkerReviewCard
								key={review._id}
								reviewId={review.id}
								rating={review.rating}
								content={review.content}
								createdAt={review.createdAt}
								markerName={review.marker.name}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
