import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';
import {
	IconHeart,
	IconHeartFilled,
	LocationIcon,
	PhoneIcon,
} from '@/components/Icons';
import useAuthStore from '@/store/authStore';
import { MapReviewModal } from '../Reviews/ReviewsModal/MapReviewModal';
import {
	useAddFavoriteMarker,
	useDeleteFavoriteMarker,
} from '@/services/queries/mapQueries';

import styles from './CardMarker.module.css';

export const CardMarker = ({
	_id,
	image,
	name,
	direction,
	phone,
	category,
	ratingAverage,
	ratingCount,
}) => {
	const [fav, setFav] = useState(false);
	const navigate = useNavigate();
	const userAuth = useAuthStore((state) => state.userProfile);
	const addFavoriteMarker = useAddFavoriteMarker();
	const deleteFavoriteMarker = useDeleteFavoriteMarker();

	useEffect(() => {
		if (userAuth?.favMarkers?.some((markerId) => markerId === _id))
			setFav(true);
	}, []);

	const addFav = async () => {
		const stateInitials = fav;
		if (!userAuth?.id) return navigate('/ingreso');
		setFav(() => !fav);

		try {
			if (!stateInitials) {
				await addFavoriteMarker.mutateAsync(_id);
			} else {
				await deleteFavoriteMarker.mutateAsync(_id);
			}
		} catch (error) {
			console.log(error);
			setFav(stateInitials);
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
					{+ratingAverage.$numberDecimal
						? (+ratingAverage.$numberDecimal).toFixed(1)
						: ''}
					<Rate disabled allowHalf value={+ratingAverage.$numberDecimal} />{' '}
					<MapReviewModal
						markerId={_id}
						markerName={name}
						countReviews={ratingCount}
						ratingReviews={+ratingAverage.$numberDecimal}
					/>
				</span>

				{/* Like Button */}
				<span
					className={`${styles.likeMap} ${fav && styles.likeMapActive}`}
					onClick={addFav}>
					{!fav ? <IconHeart size={20} /> : <IconHeartFilled size={20} />}
				</span>
			</section>
		</div>
	);
};
