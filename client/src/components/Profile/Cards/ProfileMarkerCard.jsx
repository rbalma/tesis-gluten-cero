import { Rate } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IconTrash, PhoneIcon } from '@/components/Icons';
import { useDeleteFavoriteMarker } from '@/services/queries/mapQueries';

import styles from './ProfileMarkerCard.module.css';

export const ProfileMarkerCard = ({
	id,
	name,
	phone,
	image,
	ratingAverage,
	direction,
	ratingCount,
}) => {
	const deleteFavoriteMarker = useDeleteFavoriteMarker();

	const handleDeleteFav = async () => {
		try {
			await deleteFavoriteMarker.mutateAsync(id);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.profileMarkerCard}>
			<img src={image} alt='marker' />

			<div className={styles.profileMarkerContent}>
				<h2 className={styles.titleCard}>{name}</h2>
				<p>{direction}</p>

				<span>
					<PhoneIcon size={15} /> {phone}
				</span>

				<span className={styles.profileMarkerStarCard}>
					<Rate disabled allowHalf value={ratingAverage} />
					<span className={styles.profileMarkerCountReviews}>
						({ratingCount} opiniones)
					</span>
				</span>
			</div>

			<div className={styles.profileMarkerButtonContainer}>
				<button
					className={styles.profileMarkerButton}
					onClick={handleDeleteFav}>
					{deleteFavoriteMarker.isPending ? (
						<LoadingOutlined />
					) : (
						<IconTrash size={16} />
					)}{' '}
					Eliminar
				</button>
			</div>
		</div>
	);
};
