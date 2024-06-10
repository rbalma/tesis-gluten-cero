import { useState } from 'react';
import { Rate } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {
	LocationIcon,
	PhoneIcon,
} from '@/components/Icons';
import picture from '@/assets/images/map.jpg';
import disco from '@/assets/images/markers/disco.png';
import sanatorio from '@/assets/images/markers/sanatorio.png';
import { MapReviews } from '../Reviews/MapReviews';

import styles from './CardsMap.module.css';
import { MapReviewModal } from '../Reviews/ReviewsModal/MapReviewModal';

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
					<MapReviewModal />
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


export const CardsMapSanatorio = () => {
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
			<img src={sanatorio} alt='restaurante' className={styles.imagenCard} />
			<span className={styles.tagCard}>Hospital</span>
			<section className={styles.bodyCard}>
				<p className={styles.titleCard}>Sanatorio Allende Nueva Córdoba </p>

				<span className={styles.infoCardMap}>
					<LocationIcon /> Obispo Oro 42
				</span>
				<span className={styles.infoCardMap}>
					<PhoneIcon size={16} /> 0810-555-2553
				</span>

				<span className={styles.starCard}>
					3 <Rate disabled allowHalf value={3} />{' '}
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


export const CardsMapDisco = () => {
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
			<img src={disco} alt='restaurante' className={styles.imagenCard} />
			<span className={styles.tagCard}>Comercio</span>
			<section className={styles.bodyCard}>
				<p className={styles.titleCard}>Disco </p>

				<span className={styles.infoCardMap}>
					<LocationIcon /> Av. Colón 683
				</span>
				<span className={styles.infoCardMap}>
					<PhoneIcon size={16} /> 0810-777-8888
				</span>

				<span className={styles.starCard}>
					4 <Rate disabled allowHalf value={4} />{' '}
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