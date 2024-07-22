import { IconTrash } from '@/components/Icons';
import { useDeletePosts } from '@/services/queries/forumQueries';

import styles from './ProfilePostsCard.module.css';

export const ProfilePostsCard = ({ id, thread, content }) => {
	const mutateProduct = useDeletePosts();

	const showDeleteConfirmReview = () => {
		mutateProduct.mutate({ postId: id });
	};

	return (
		<div className={styles.profilePostCard}>
			<div className={styles.profilePostContent}>
				<h2 className={styles.titleCard}>{thread.title}</h2>
				<p>{content}</p>
			</div>

			<div className={styles.profilePostButtonContainer}>
				<button
					className={styles.profilePostButton}
					onClick={showDeleteConfirmReview}>
					<IconTrash size={16} /> Eliminar
				</button>
			</div>
		</div>
	);
};
