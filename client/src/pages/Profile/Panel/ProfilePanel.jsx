import { Route, Routes } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { ProfileSidebar } from '../ProfileSidebar';
import { routesProfile } from '@/routes/routes';
import { PrivateRoute } from '@/routes/PrivateRoute';

import styles from './ProfilePanel.module.css';

const ProfilePanel = () => {
	const { userProfile } = useAuthStore();

	return (
		<div style={{ display: 'flex' }}>
			<ProfileSidebar id={userProfile?.id} />
			<div className={styles.mainP}>
				<Routes>
					{routesProfile.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={
								<PrivateRoute>
									<route.element />
								</PrivateRoute>
							}
						/>
					))}
				</Routes>
			</div>
		</div>
	);
};

export default ProfilePanel;
