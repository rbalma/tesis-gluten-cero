import { useNavigate } from 'react-router-dom';
import NotificationItem from './NotificationItem';
import { IconExternalLink } from '../Icons';
import { NotificationsEmpty } from './NotificationsEmpty';
import {
	useCheckAllNotification,
	useGetNotifications,
} from '@/services/queries/notificationsQueries';

import styles from './NotificationList.module.css';
import { SkeletonListScroll } from './SkeletonListScroll';

export const NotificationList = ({ userId, onClose }) => {
	const navigate = useNavigate();
	const { isFetching, isSuccess, isError, data } = useGetNotifications(userId);
	const { mutate } = useCheckAllNotification();

	const checkAllNotifications = () => {
		mutate(userId);
	};

	return (
		<div className={styles.popoverScroll}>
			<header className={styles.popoverHeader}>
				<h2>Notificaciones</h2>
				<div className={styles.buttonsGroup}>
					<span onClick={checkAllNotifications}>Marcar todo como leído</span>
					<span onClick={() => navigate(`/perfil/${userId}/notificaciones`)}>
						<IconExternalLink size={20} />
					</span>
				</div>
			</header>

			{isFetching ? <SkeletonListScroll /> : null}

			{isError ? <NotificationsEmpty /> : null}

			{!isFetching && isSuccess && !data.notifications.length ? (
				<NotificationsEmpty />
			) : null}

			{!isFetching && isSuccess && data.notifications.length
				? data.notifications.map((notification) => (
						<NotificationItem
							key={notification._id}
							onClose={onClose}
							{...notification}
						/>
				  ))
				: null}
		</div>
	);
};
