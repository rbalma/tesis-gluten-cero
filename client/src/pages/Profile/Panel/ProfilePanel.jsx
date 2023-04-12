import { Route, Routes } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { SideBarProfile } from './ui/SideBarProfile';
import { routesProfile } from '@/routes/routes';
import { PrivateRoute } from '@/routes/PrivateRoute';

import styles from './ProfilePanel.module.css';

const ProfilePanel = () => {
	const { userProfile } = useAuthStore();

	return (
		<>
			<SideBarProfile id={userProfile?.id} />
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
		</>
	);
};

export default ProfilePanel;
