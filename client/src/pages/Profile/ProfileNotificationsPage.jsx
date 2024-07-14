import { Breadcrumb, Card, Row, Select } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileNotificationCard } from '@/components/Profile/Cards/ProfileNotificationCard';

import styles from './Profile.module.css';

export const ProfileNotificationsPage = () => {
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

			{/* <Row justify='space-between' wrap>
				<span>Marcar todo como leido</span>
				<Select
					defaultValue='lucy'
					bordered={false}
					options={[
						{
							value: 'jack',
							label: 'Más antiguos',
						},
						{
							value: 'lucy',
							label: 'Más recientes',
						},
					]}
				/>
			</Row> */}

			<div className={styles.notificationsList}>
				<ProfileNotificationCard />
			</div>
		</div>
	);
};
