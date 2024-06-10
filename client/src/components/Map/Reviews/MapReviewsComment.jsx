import { Avatar, Divider, Rate } from 'antd';
import styles from './MapReviewsComment.module.css';

export const MapReviewsComment = () => {
	return (
		<>
			<Divider />
			<header className={styles.header}>
				<div className={styles.user}>
					<Avatar size={40} />{' '}
					<p>
						Alex Ray <span>11 dic. 2023</span>
					</p>
				</div>
				<div className={styles.rate}>
					Malo (2.0)
					<Rate style={{ fontSize: 14 }} disabled allowHalf value={2} />
				</div>
			</header>
			<p className={styles.comment}>
				Sunt voluptate esse sunt culpa nulla cillum laboris enim ipsum
				voluptate. Nulla qui velit aliqua anim consectetur ex. Exercitation
				Lorem aliquip elit velit elit minim minim proident cupidatat nisi.
			</p>
		</>
	);
};
