import styles from './ProfileCard.module.css';

export const ProfileCard = () => {
	return (
		<div className={styles.cardProfile}>
			<div className={styles.cardHeader}>
				<div className={styles.wavesContainer}>
					<div className={`${styles.wave} ${styles.wave1}`}></div>
					<div className={`${styles.wave} ${styles.wave2}`}></div>
					<div className={`${styles.wave} ${styles.wave3}`}></div>
					<img
						src='http://localhost:5000/api/get-avatar/TphRCAwGB.jpeg'
						className={styles.imgProfile}
						alt='user profile'
					/>
				</div>
				<div className={styles.cardBody}>
					<h2>Rodrigo Balmaceda</h2>
				</div>
			</div>
		</div>
	);
};
