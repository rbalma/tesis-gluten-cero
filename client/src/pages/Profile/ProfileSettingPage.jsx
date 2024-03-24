import { Link } from 'react-router-dom';
import { Breadcrumb, Card } from 'antd';
import { IconChevronDown } from '@/components/Icons';
import { ProfileDetailForm, ProfilePasswordForm } from '../../components/Profile';

import styles from './Profile.module.css';

export const ProfileSettingPage = () => {
	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Mi Perfil</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Perfil</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.profileCardsContainer}>
				<Card
					type='inner'
					bodyStyle={{ padding: 30 }}
					title={
						<span className={styles.profileCardTitle}>
							Actualizar Información Personal
						</span>
					}>
					<ProfileDetailForm />
				</Card>

				<Card
					type='inner'
					style={{ height: 'fit-content' }}
					bodyStyle={{ padding: 30 }}
					title={
						<span className={styles.profileCardTitle}>
							Modificar Contraseña
						</span>
					}>
					<ProfilePasswordForm />
				</Card>
			</div>
		</div>
	);
};
