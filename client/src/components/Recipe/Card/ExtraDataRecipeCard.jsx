import { IconClock, IconStar, IconToolsKitchen } from '@/components/Icons';

import styles from './ExtraDataRecipeCard.module.css';

export const ExtraDataRecipeCard = ({
	preparationTime,
	performance,
	ratingAverage,
	ratingCount,
}) => {
	return (
		<section className={styles.extraInfoContainer}>
			<div className={styles.extraInfoItem}>
				<IconToolsKitchen size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Rendimiento</span>
					<span className={styles.extraInfoData}>{performance} porciones</span>
				</div>
			</div>
			<div className={styles.extraInfoItem}>
				<IconClock size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Tiempo preparación</span>
					<span className={styles.extraInfoData}>
						{preparationTime} minutos
					</span>
				</div>
			</div>
			<div className={styles.extraInfoItem}>
				<IconStar size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Puntaje</span>
					<span className={styles.extraInfoData}>
						{+ratingAverage.$numberDecimal
							? ratingAverage.$numberDecimal
							: '--'}{' '}
						<small>({ratingCount} opiniones)</small>
					</span>
				</div>
			</div>
		</section>
	);
};
