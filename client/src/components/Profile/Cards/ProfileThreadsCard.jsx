import { IconTrash,IconMessage,IconHeartFilled } from '@/components/Icons';
import { useDeleteThreads } from '@/services/queries/forumQueries';

import styles from './ProfileThreadsCard.module.css';

export const ProfileThreadsCard = ({ id, title, countReply, countLikes }) => {
	const mutateProduct = useDeleteThreads();

	const showDeleteConfirmReview = () => {
		mutateProduct.mutate({ threadId: id });
	};

	return (
		<div className={styles.profileThreadCard}>
			<div className={styles.profileThreadsContent}>
				<h2 className={styles.titleCard}>{title}</h2>
				<span className={styles.brand}>
					<IconMessage size={16} fill='currentColor' /> {countReply}
					<IconHeartFilled size={16} fill='currentColor' /> {countLikes}
				</span>{' '}
			</div>

			<div className={styles.profileThreadButtonContainer}>
				<button
					className={styles.profileThreadButton}
					onClick={showDeleteConfirmReview}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
