import { useReducer } from 'react';
import { StarFilledIcon } from '@/components/Icons';
import { MapReviewsFilters } from './Filters/MapReviewsFilters';
import { MapReviewsComment } from './MapReviewsComment';
import { ReviewProgressBar } from './ProgressBar/ReviewProgressBar';
import {
	useGetPercentageReviewsMarker,
	useGetReviewsMarker,
} from '@/services/queries/reviewsQueries';

import styles from './MapReviews.module.css';

export const MapReviews = ({
	markerId,
	markerName,
	ratingReviews,
	countReviews,
}) => {
	const [filters, setFilters] = useReducer(
		(current, update) => ({ ...current, ...update }),
		{
			page: 1,
			limit: 20,
			sortField: 'createdAt',
			sortOrder: -1,
		}
	);
	const {
		isFetching,
		data: reviews,
		isSuccess,
	} = useGetReviewsMarker({
		markerId,
		filters
	});
	const {
		isLoading,
		data: percentajes,
		isSuccess: isPercentajesSuccess,
	} = useGetPercentageReviewsMarker(markerId);

	return (
		<div className={styles.containerMapReview}>
			<div className={styles.header}>
				<h2>{markerName}</h2>
				<div className={styles.averageContainer}>
					<span>
						<StarFilledIcon size={36} />{' '}
						{ratingReviews ? ratingReviews.toFixed(1) : '-'}
					</span>
					{countReviews} {countReviews === 1 ? 'opinión' : 'opiniones'}
				</div>
			</div>

			{!isLoading && isPercentajesSuccess ? (
				<div className={styles.reviewsContainer}>
					<ReviewProgressBar
						star={5}
						percent={percentajes.percentageFive || 0}
					/>
					<ReviewProgressBar
						star={4}
						percent={percentajes.percentageFour || 0}
					/>
					<ReviewProgressBar
						star={3}
						percent={percentajes.percentageThree || 0}
					/>
					<ReviewProgressBar
						star={2}
						percent={percentajes.percentageTwo || 0}
					/>
					<ReviewProgressBar
						star={1}
						percent={percentajes.percentageOne || 0}
					/>
				</div>
			) : null}

			{countReviews > 0 ? <MapReviewsFilters setFilters={setFilters} /> : null}

			{!isFetching && isSuccess
				? reviews.data.map((review) => (
						<MapReviewsComment
							key={review._id}
							createdAt={review.createdAt}
							userName={review.user.name}
							userLastName={review.user.lastname}
							userAvatar={review.user.avatar}
							rating={review.rating}
							content={review.content}
						/>
				  ))
				: null}
		</div>
	);
};
