import { IconClock } from '@/components/Icons';
import { useNavigate } from 'react-router-dom';
import { eventsNotifications, timeAgo } from '@/utils/format';

import styles from './ProfileNotificationCard.module.css';

export const ProfileNotificationCard = ({
	description,
	event,
	read,
	recipe,
	createdAt,
}) => {
	const navigate = useNavigate();
	const Icon = eventsNotifications[event].icon;
	return (
		<div
			className={styles.profileNotificationCard}
			onClick={() => navigate(`/recetas/${recipe._id}`)}>
			<Icon color={eventsNotifications[event].color} />

			<div className={styles.profileNotificationContent}>
				<h3>{eventsNotifications[event].title}</h3>
				<p>{description}</p>
				<span>
					<IconClock size={16} /> {timeAgo(createdAt)}
				</span>
			</div>

			{!read && <div className={styles.notificationUnread} />}
		</div>
	);
};
