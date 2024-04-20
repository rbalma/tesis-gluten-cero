import { IconClock, IconStar, IconToolsKitchen } from "@/components/Icons";

import styles from './ExtraDataRecipeCard.module.css';

export const ExtraDataRecipeCard = () => {
	return (
		<section className={styles.extraInfoContainer}>
			<div className={styles.extraInfoItem}>
				<IconToolsKitchen size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Rendimiento</span>
					<span className={styles.extraInfoData}>4 porciones</span>
				</div>
			</div>
			<div className={styles.extraInfoItem}>
				<IconClock size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Tiempo preparación</span>
					<span className={styles.extraInfoData}>45 minutos</span>
				</div>
			</div>
			<div className={styles.extraInfoItem}>
				<IconStar size={30} strokeWidth={1.5} />{' '}
				<div className={styles.extraInfoDivText}>
					<span className={styles.extraInfoTitle}>Puntaje</span>
					<span className={styles.extraInfoData}>
						4.5 <small>(21 opiniones)</small>
					</span>
				</div>
			</div>
		</section>
	);
};
