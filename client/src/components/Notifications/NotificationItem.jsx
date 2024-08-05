import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { eventsNotifications, timeAgo } from '@/utils/format';
import { useCheckNotification } from '@/services/queries/notificationsQueries';

import styles from './NotificationItem.module.css';

const NotificationItem = ({
	_id,
	description,
	event,
	read,
	recipe,
	createdAt,
	onClose,
}) => {
	const navigate = useNavigate();
	const { mutate } = useCheckNotification();

	const onItemSelected = async () => {
		navigate(`/recetas/${recipe._id}`);
		if (!read) {
			mutate({
				notificationId: _id,
				values: { read: true },
			});
		}
		onClose();
	};

	const Icon = eventsNotifications[event].icon;

	return (
		<Badge dot={!read} offset={[-30, 20]} status='warning'>
			<div className={styles.containerNotification} onClick={onItemSelected}>
				<span className={styles.successNotification}>
					<Icon color={eventsNotifications[event].color} />
				</span>

				<div className={styles.contentBox}>
					<p>
						<span className={styles.titleNotification}>
							{eventsNotifications[event].title}
						</span>{' '}
						<span className={styles.dateNotification}>
							{timeAgo(createdAt)}
						</span>
					</p>

					<p className={styles.descriptionNotification}>{description}</p>
				</div>
			</div>
		</Badge>
	);
};

export default NotificationItem;
