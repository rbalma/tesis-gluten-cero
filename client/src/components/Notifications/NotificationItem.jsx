import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IconCircleCheck } from '../Icons';

import styles from './NotificationItem.module.css';

const notificationCounter = 0;

const NotificationItem = ({ notification, setNotifications }) => {
	const navigate = useNavigate();

	const onItemSelected = async () => {
		navigate(`/recetas/664238f50475fb9f1b7e75d7`);
		// if (notification.abierto) return navigate(`/tickets/${id_ticket}`);

		// dispatch(notificationsCounter(notificationCounter - 1));

		// const resp = await putNotification(notification.id, { abierto: 1 });
		// if (resp) {
		// 	setNotifications((notifications) => {
		// 		const notificationIndex = notifications.indexOf(notification);
		// 		notifications[notificationIndex].abierto = true;
		// 		return notifications;
		// 	});
		// }
	};

	return (
		<Badge dot={true} offset={[-26, 20]} status='warning'>
			<div className={styles.containerNotification} onClick={onItemSelected}>
				<span className={styles.successNotification}>
					<IconCircleCheck />
				</span>

				<div className={styles.contentBox}>
					<p>
						<span className={styles.titleNotification}>
							Tu receta fue aprobada
						</span>{' '}
						<span className={styles.dateNotification}>
							hace 3 horas
						</span>
					</p>

					<p className={styles.descriptionNotification}>
						La receta "Arroz al horno" fue agregada a Gluten Cero y ya puede ser visitada
						por cualquier usuario.
					</p>
				</div>
			</div>
		</Badge>
	);
};

export default NotificationItem;
