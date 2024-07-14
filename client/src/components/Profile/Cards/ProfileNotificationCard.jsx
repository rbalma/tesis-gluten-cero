import { IconCircleCheck, IconClock } from '@/components/Icons';

import styles from './ProfileNotificationCard.module.css';

export const ProfileNotificationCard = () => {
	return (
		<div className={styles.profileNotificationCard}>
			<IconCircleCheck />

			<div className={styles.profileNotificationContent}>
					<h3>Tu receta fue aprobada</h3>
				<p>
				La receta "Arroz al horno" fue agregada a Gluten Cero y ya puede ser visitada por cualquier usuario.
				</p>
        <span>
						<IconClock size={16} /> Hace 3 horas
					</span>
			</div>

      <div className={styles.notificationUnread} />
		</div>
	);
};
