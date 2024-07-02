import { IconBell } from '../Icons';
import styles from './NotificationList.module.css';

export const NotificationsEmpty = () => {
	return (
		<div className={styles.empty}>
			<span>
				<IconBell size={70} />
			</span>
			<p className={styles.emptyText}>No tienes notificaciones pendientes</p>
		</div>
	);
};
