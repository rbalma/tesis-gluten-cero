import { Progress } from 'antd';
import { StarFilledIcon } from '@/components/Icons';
import { MapReviewsFilters } from './Filters/MapReviewsFilters';
import { MapReviewsComment } from './MapReviewsComment';

import styles from './MapReviews.module.css';
import { ReviewProgressBar } from './ProgressBar/ReviewProgressBar';

export const MapReviews = ({ setIsReviews }) => {
	return (
		<div className={styles.containerMapReview}>
			<div className={styles.header}>
				<h2>Patio Olmos Shopping</h2>
				<div className={styles.averageContainer}>
					<span>
						<StarFilledIcon size={36} /> 4.8
					</span>
					8 opiniones
				</div>
			</div>
			<div className={styles.reviewsContainer}>
				<ReviewProgressBar star={5} percent={50} />
				<ReviewProgressBar star={4} percent={30} />
				<ReviewProgressBar star={3} percent={10} />
				<ReviewProgressBar star={2} percent={5} />
				<ReviewProgressBar star={1} percent={5} />
			</div>

			<MapReviewsFilters />

			<MapReviewsComment />
			<MapReviewsComment />
		</div>
	);
};
