import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileNotificationCard } from '@/components/Profile/Cards/ProfileNotificationCard';
import { useGetNotifications } from '@/services/queries/notificationsQueries';
import useAuthStore from '@/store/authStore';

import styles from './Profile.module.css';

export const ProfileNotificationsPage = () => {
	const user = useAuthStore((state) => state.userProfile);
	const { isLoading, isSuccess, data } = useGetNotifications({ userId: user.id });

	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Notificaciones</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Notificaciones</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.notificationsList}>

			{!isLoading && isSuccess
				? data.notifications.map((notification) => (
						<ProfileNotificationCard
							key={notification._id}
							{...notification}
						/>
				  ))
				: null}
			</div>
		</div>
	);
};
