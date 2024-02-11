import { useState } from 'react';
import { Rate } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {
	LocationIcon,
	PhoneIcon,
} from '@/components/Icons';
import picture from '@/assets/images/map.jpg';
import { MapReviews } from '../Reviews/MapReviews';

import styles from './CardsMap.module.css';

export const CardsMap = () => {
	const [fav, setFav] = useState(false);
	const [isReviews, setIsReviews] = useState(false);

	const addFav = () => {
		if (!fav) {
			setFav(true);
		} else {
			setFav(false);
		}
	};

	if (isReviews) {
		return (<MapReviews setIsReviews={setIsReviews} />);
	}

	return (
		<div className={styles.containerCard}>
			<img src={picture} alt='restaurante' className={styles.imagenCard} />
			<span className={styles.tagCard}>Restaurante</span>
			<section className={styles.bodyCard}>
				<p className={styles.titleCard}>Patio Olmos Shopping </p>

				<span className={styles.infoCardMap}>
					<LocationIcon /> Av. Vélez Sarsfield 361
				</span>
				<span className={styles.infoCardMap}>
					<PhoneIcon size={16} /> (0351) 4315478
				</span>

				<span className={styles.starCard}>
					4.5 <Rate disabled allowHalf value={2.4} />{' '}
					<small className={styles.countReviews} onClick={() => setIsReviews(true)}>(8 opiniones)</small>
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
