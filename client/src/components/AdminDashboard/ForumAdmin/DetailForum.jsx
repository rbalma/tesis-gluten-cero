import { useGetThreadById } from '@/services/queries/forumQueries';
import { SkeletonDetails } from '../Skeleton/SkeletonDetails';
import {TagStateThread} from '../TagStateThread';
import { ModalDeleteThreads } from './ModalDeleteForum';
import { dateLongFormat } from '@/utils/format';

import styles from './DetailForum.module.css';

export const DetailThread = ({ threadId, onCloseDrawer }) => {
	const { isFetching, data } = useGetThreadById(threadId);

	if (isFetching) return <SkeletonDetails />;

	return (
		<>
			<div className={styles.pictureInfo}>
				<h2>{data.title}</h2>
			</div>

			<div className={styles.bodyInfo}>
				<div className={styles.itemInfo}>
					Contenido:{' '}
					<span className={styles.itemData}>{data.description}</span>
				</div>

				<div className={styles.itemInfo}>
					Fecha de creación:{' '}
					<span className={styles.itemData}>
						{dateLongFormat(data.date)}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Creada por:{' '}
					<span className={styles.itemData}>
						{`${data.user?.name} ${data.user?.lastname}`}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Estado:{' '}
					<span className={styles.itemData}>
						<TagStateThread state={data.status} />
					</span>
				</div>
			</div>

			<div className={styles.btnRow}>
				<ModalDeleteThreads
					threadId={threadId}
					title={`${data.title}`}
					onCloseDrawerDetail={onCloseDrawer}
				/>
			</div>
		</>
	);
};
