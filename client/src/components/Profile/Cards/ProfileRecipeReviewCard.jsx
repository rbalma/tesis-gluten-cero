import { Modal, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { dateFormat } from '@/utils/format';
import useAuthStore from '@/store/authStore';
import { IconTrash } from '@/components/Icons';
import { ReviewReplyModal } from '../Modal/ReviewReplyModal';
import { userGetAvatar } from '@/utils/fetchData';
import {
	useDeleteReplyReview,
	useDeleteReview,
} from '@/services/queries/reviewsQueries';

import styles from './ProfileRecipeCard.module.css';

const { confirm } = Modal;

export const ProfileRecipeReviewCard = ({
	_id,
	user,
	recipe,
	createdAt,
	rating,
	content,
	reply,
	isUserRecipe = false,
}) => {
	const userAuth = useAuthStore((state) => state.userProfile);
	const mutateReview = useDeleteReview();
	const mutateReply = useDeleteReplyReview();

	const showDeleteConfirmReview = () => {
		confirm({
			title: `¿Está seguro de eliminar la reseña?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateReview.mutateAsync(_id);
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	const showDeleteConfirmReply = () => {
		confirm({
			title: `¿Está seguro de eliminar la respuesta?`,
			okText: 'Confirmar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				try {
					await mutateReply.mutateAsync(reply?._id);
				} catch (error) {
					console.log(error);
				}
			},
		});
	};

	return (
		<div className={styles.profileRecipeReviewCard}>
			<img alt='avatar' src={userGetAvatar(user.avatar)} />

			<div className={styles.profileRecipeReviewContent}>
				<span>
					<strong>
						{user.name} {user.lastname}
					</strong>{' '}
					para <Link to={`/recetas/${recipe._id}`}>{recipe.title}</Link>
				</span>

				<div className={styles.dateRate}>
					<span>{dateFormat(createdAt)}</span>{' '}
					<span className={styles.profileRecipeStarCard}>
						<Rate disabled allowHalf value={rating} />
					</span>
				</div>

				<p>{content}</p>

				{isUserRecipe && !reply ? <ReviewReplyModal reviewId={_id} /> : null}

				{!isUserRecipe ? (
					<button
						className={styles.profileRecipeButton}
						onClick={showDeleteConfirmReview}>
						<IconTrash size={16} /> Eliminar
					</button>
				) : null}

				{reply && user._id !== userAuth.id ? (
					<div className={styles.profileRecipeReviewAnswer}>
						<span>Tu Respuesta</span>
						<p>{reply.content}</p>
						<button
							className={styles.profileRecipeButton}
							onClick={showDeleteConfirmReply}>
							<IconTrash size={16} /> Eliminar
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};
