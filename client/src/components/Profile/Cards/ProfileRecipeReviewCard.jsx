import { Rate } from 'antd';
import { IconArrowBackUp } from '@/components/Icons';
import styles from './ProfileRecipeCard.module.css';

export const ProfileRecipeReviewCard = ({ children }) => {
	return (
		<div className={styles.profileRecipeReviewCard}>
			<img
				alt='avatar'
				src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70'
			/>

			<div className={styles.profileRecipeReviewContent}>
				<span>
					<strong>John Doe</strong> para <b>Burger House</b>
				</span>

				<div className={styles.dateRate}>
					<span>Junio 2017</span>{' '}
					<span className={styles.profileRecipeStarCard}>
						<Rate disabled allowHalf value={2.5} />
					</span>
				</div>

				<p>
					Morbi velit eros, sagittis in facilisis non, rhoncus et erat. Nam
					posuere tristique sem, eu ultricies tortor imperdiet vitae. Curabitur
					lacinia neque non metus
				</p>

				<button className={styles.profileRecipeButton}>{children}</button>

				{/* <div className={styles.profileRecipeReviewAnswer}>
					<span>Tu Respuesta</span>
					<p>
						Morbi velit eros, sagittis in facilisis non, rhoncus et erat. Nam
						posuere tristique sem, eu ultricies tortor imperdiet vitae.
						Curabitur lacinia neque non metus
					</p>
				</div> */}
			</div>
		</div>
	);
};
