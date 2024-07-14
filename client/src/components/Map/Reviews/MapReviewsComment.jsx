import { Avatar, Divider, Rate } from 'antd';
import { userGetAvatar } from '@/utils/fetchData';
import { dateFormat } from '@/utils/format';

import styles from './MapReviewsComment.module.css';

const qualification = {
	1: 'Malo',
	2: 'Regular',
	3: 'Bueno',
	4: 'Muy Bueno',
	5: 'Excelente',
};

export const MapReviewsComment = ({
	createdAt,
	userName,
	userLastName,
	userAvatar,
	rating,
	content,
}) => {
	return (
		<>
			<Divider />
			<header className={styles.header}>
				<div className={styles.user}>
					<Avatar alt='userAvatar' src={userGetAvatar(userAvatar)} size={40} />{' '}
					<p>
						{userName} {userLastName} <span>{dateFormat(createdAt)}</span>
					</p>
				</div>
				<div className={styles.rate}>
					{qualification[rating]} ({rating.toFixed(1)})
					<Rate style={{ fontSize: 14 }} disabled allowHalf value={rating} />
				</div>
			</header>
			<p className={styles.comment}>{content}</p>
		</>
	);
};
