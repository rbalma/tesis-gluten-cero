import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '@/components/Profile';
import Navbar from './ui/TopBar/NavBar';
import Footer from './ui/Footer';
import useAuthStore from '@/store/authStore';

import styles from './LayoutProfile.module.css';

const LayoutProfile = () => {
	const userProfile = useAuthStore((state) => state.userProfile);

	return (
		<>
			<Navbar />
			<div className={styles.layoutProfileContainer}>
				<ProfileSidebar id={userProfile?.id} />

				<main className={styles.layoutProfileBody}>
					<Outlet />
					<Footer />
				</main>
			</div>
		</>
	);
};

export default LayoutProfile;
