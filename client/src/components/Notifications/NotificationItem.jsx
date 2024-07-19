import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { eventsNotifications, timeAgo } from '@/utils/format';
import { useCheckNotification } from '@/services/queries/notificationsQueries';

import styles from './NotificationItem.module.css';


const NotificationItem = ({
	_id,
	description,
	read,
	recipe,
	createdAt,
	onClose
}) => {
	const navigate = useNavigate();
	const { mutate } = useCheckNotification();

	const onItemSelected = async () => {
		navigate(`/recetas/${recipe._id}`);
		if (!read) {
			mutate({
				notificationId: _id,
				values: { read: true }
			});
		}
		onClose();
	};

	return (
		<Badge dot={!read} offset={[-30, 20]} status='warning'>
			<div className={styles.containerNotification} onClick={onItemSelected}>
				<span className={styles.successNotification}>
					{/* <IconCircleX /> */}
					<eventsNotifications.RECIPE_VALUED.icon color={eventsNotifications.RECIPE_VALUED.color} />
				</span>

				<div className={styles.contentBox}>
					<p>
						<span className={styles.titleNotification}>
							{eventsNotifications.RECIPE_VALUED.title}
						</span>{' '}
						<span className={styles.dateNotification}>{timeAgo(createdAt)}</span>
					</p>

					<p className={styles.descriptionNotification}>
						{/* La receta "Arroz al horno" fue agregada a Gluten Cero y ya puede ser
						visitada por cualquier usuario. */}
						{ description }
					</p>
				</div>
			</div>
		</Badge>
	);
};

export default NotificationItem;
