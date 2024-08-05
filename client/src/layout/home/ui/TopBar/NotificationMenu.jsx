import { useState } from 'react';
import { Badge, Popover } from 'antd';
import { IconBellFilled } from '@/components/Icons';
import { NotificationList } from '@/components/Notifications';
import { useCountUnreadNotifications } from '@/services/queries/notificationsQueries';
import useAuthStore from '@/store/authStore';

import styles from './NotificationMenu.module.css';

export const NotificationMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useAuthStore((state) => state.userProfile);
	const { data = 0 } = useCountUnreadNotifications(user.id);

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Popover
				placement='bottomRight'
				destroyTooltipOnHide
				content={
					<NotificationList
						userId={user.id}
						isOpen={isOpen}
						onClose={onClose}
					/>
				}
				overlayClassName='notificationListPopover'
				overlayInnerStyle={{ backgroundColor: '#282828' }}
				title={null}
				showArrow={false}
				align={{ offset: [2, -8] }}
				trigger='click'
				open={isOpen}
				onOpenChange={(open) => setIsOpen(open)}>
				<Badge count={data} overflowCount={9} offset={[0, 5]}>
					<div
						className={`${styles.iconNotification} ${
							isOpen ? styles.iconNotificationOpen : ''
						}`}>
						<IconBellFilled size={25} />
					</div>
				</Badge>
			</Popover>
		</div>
	);
};
