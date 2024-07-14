import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { SkeletonListScroll } from './SkeletonListScroll';
import { Empty } from 'antd';
import NotificationItem from './NotificationItem';
import { IconBell, IconExternalLink } from '../Icons';

import styles from './NotificationList.module.css';
import { NotificationsEmpty } from './NotificationsEmpty';

const initialFilters = { page: 1 };

export const NotificationList = () => {
	const navigate = useNavigate();
	const userAuth = useAuthStore((state) => state.userProfile);
	// const [scrollPage, setScrollPage] = useState(2);
	// const {
	// 	1: loadingNotification,
	// 	2: notifications,
	// 	4: fetchData,
	// 	8: setNotifications,
	// 	9: countData,
	// } = useData(`/notificaciones?id_usuario_notificado=${id}`, initialFilters);

	// const loadMoreData = async () => {
	// 	if (loadingNotification) return;
	// 	fetchData({ page: scrollPage });
	// 	setScrollPage((scrollPage) => ++scrollPage);
	// };

	// if (loadingNotification && notifications.length === 0)
	// 	return (
	// 		<>
	// 			<div className={styles.popoverHeader}>
	// 				<h5 className='gx-mb-0'>
	// 					{Traductor('home.userTopbar.notifications')}
	// 				</h5>
	// 			</div>
	// 			<div className={styles.popoverScroll}>
	// 				<SkeletonListScroll />
	// 			</div>
	// 		</>
	// 	);



	return (
		<div className={styles.popoverScroll}>
			<header className={styles.popoverHeader}>
				<h2>Notificaciones</h2>
				<div className={styles.buttonsGroup}>
					<span>Marcar todo como leído</span>
					<span
						onClick={() => navigate(`/perfil/${userAuth.id}/notificaciones`)}>
						<IconExternalLink size={20} />
					</span>
				</div>
			</header>

			{/* <NotificationsEmpty /> */}

		<NotificationItem />

		</div>
	);
};
