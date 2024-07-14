import { useState } from 'react';
import { Badge, Popover } from 'antd';
import { IconBellFilled } from '@/components/Icons';
import { NotificationList } from '@/components/Notifications';

import styles from './NotificationMenu.module.css';

export const NotificationMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<Popover
				placement='bottomRight'
				destroyTooltipOnHide
				content={<NotificationList isOpen={isOpen} />}
				overlayClassName='notificationListPopover'
				overlayInnerStyle={{ backgroundColor: '#282828'}}
				title={null}
				showArrow={false}
				align={{ offset: [2, -8] }}
				trigger='click'
				open={isOpen}
				onOpenChange={(open) => setIsOpen(open)}>
				<Badge count={0} overflowCount={9} offset={[0, 5]}>
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
