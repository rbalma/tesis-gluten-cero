import { ProfileCard } from './ProfileCard';

import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <ProfileCard />
    </div>
  )
}
