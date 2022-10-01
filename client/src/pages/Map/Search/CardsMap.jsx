import { useState } from 'react';
import picture from '@/assets/images/map.jpg';
// import { FaRegHeart, FaHeart } from 'react-icons/fa';

import styles from './CardsMap.module.css';

export const CardsMap = () => {
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
			<section className={styles.leftCard}>
				<img src={picture} alt='restaurante' className={styles.imagenCard} />
				<span className={styles.tagCard}>Restaurante</span>
			</section>
			<section className={styles.rightCard}>
				<h3 className={styles.nameCard}>Patio Olmos Shopping</h3>
				<span className={styles.infoCardMap}>Av. Vélez Sarsfield 361</span>
				<span className={styles.infoCardMap}>(0351) 4315478</span>

				{/* Like Button */}
				<span
					className={`${styles.likeMap} ${fav && styles.likeMapActive}`}
					onClick={addFav}
				>
					{/* {!fav ? <FaRegHeart /> : <FaHeart className='likedicon__map' />} */}
				</span>
			</section>
		</div>
	);
};
