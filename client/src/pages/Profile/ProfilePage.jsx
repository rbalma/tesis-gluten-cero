import { ProfileCard } from './ProfileCard';

import styles from './ProfilePage.module.css';
import { ProfileSidebar } from './ProfileSidebar';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <ProfileCard />

      <ProfileSidebar />
    </div>
  )
}
