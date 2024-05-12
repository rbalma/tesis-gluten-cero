
import styles from './IconLoading.module.css';

export const IconLoading = () => {
	return (
		<div className={styles.lds_ring}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
