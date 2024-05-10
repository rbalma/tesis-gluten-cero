import { useGetUserById } from '@/services/queries/usersQueries';
import { SkeletonDetails } from '../Skeleton/SkeletonDetails';
import { TagVisible } from '../TagVisible';
import { TagNoVisible } from '../TagNoVisible';
import { ModalDeleteUsers } from './ModalDeleteUsers';
import { ModalChangeStatusUsers } from './ModalChangeStatusUsers';
import { userGetAvatar } from '@/utils/fetchData';
import { Avatar } from 'antd';

import styles from './DetailUsers.module.css';

export const DetailUsers = ({ userId, onCloseDrawer }) => {
	const { isFetching, data } = useGetUserById(userId);

	if (isFetching) return <SkeletonDetails />;

	return (
		<>
			<div className={styles.pictureInfo}>
				<Avatar
					src={userGetAvatar(data.avatar)}
					alt='avatar'
					shape='circle'
					size={180}
				/>
			</div>

			<div className={styles.bodyInfo}>
				<div className={styles.itemInfo}>
					Nombre:{' '}
					<span className={styles.itemData}>{data.name}</span>
				</div>

				<div className={styles.itemInfo}>
					Apellido:{' '}
					<span className={styles.itemData}>{data.lastname}</span>
				</div>
				
				<div className={styles.itemInfo}>
					Correo:{' '}
					<span className={styles.itemData}>{data.email}</span>
				</div>

				<div className={styles.itemInfo}>
					Estado:{' '}
					<span className={styles.itemData}>
						{data.active ? <TagVisible isUser /> : <TagNoVisible isUser />}
					</span>
				</div>
			</div>

			<div className={styles.btnRow}>
				<ModalDeleteUsers
					userId={userId}
					userName={`${data.name} ${data.lastname}`}
					onCloseDrawerDetail={onCloseDrawer}
				/>
				<ModalChangeStatusUsers
					userId={userId}
					isActive={data.active}
					userName={`${data.name} ${data.lastname}`}
					onCloseDrawerDetail={onCloseDrawer}
				/>
			</div>
		</>
	);
};
