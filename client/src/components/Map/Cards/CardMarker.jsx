import { useState } from 'react';
import { Rate } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { LocationIcon, PhoneIcon } from '@/components/Icons';
import { MapReviewModal } from '../Reviews/ReviewsModal/MapReviewModal';

import styles from './CardMarker.module.css';

export const CardMarker = ({
	image,
	name,
	direction,
	phone,
	category,
	ratingAverage,
	ratingCount,
}) => {
	const [fav, setFav] = useState(false);

	const addFav = () => {
		if (!fav) {
			setFav(true);
		} else {
			setFav(false);
		}
	};

	return (
		<div className={styles.containerCard}>
			<img
				src={image.secure_url}
				alt='restaurante'
				className={styles.imagenCard}
			/>
			<span className={styles.tagCard}>{category.name}</span>
			<section className={styles.bodyCard}>
				<p className={styles.titleCard}>{name}</p>

				<span className={styles.infoCardMap}>
					<LocationIcon /> {direction}
				</span>
				<span className={styles.infoCardMap}>
					<PhoneIcon size={16} /> {phone}
				</span>

				<span className={styles.starCard}>
					{ratingAverage.$numberDecimal}{' '}
					<Rate disabled allowHalf value={+ratingAverage.$numberDecimal} />{' '}
					<MapReviewModal countReviews={ratingCount} />
				</span>

				{/* Like Button */}
				<span
					className={`${styles.likeMap} ${fav && styles.likeMapActive}`}
					onClick={addFav}>
					{!fav ? (
						<HeartOutlined />
					) : (
						<HeartFilled className={styles.likediconMap} />
					)}
				</span>
			</section>
		</div>
	);
};
