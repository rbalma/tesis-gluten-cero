import { useGetNoticeById } from '@/services/queries/noticeQueries';
import { SkeletonDetails } from '../Skeleton/SkeletonDetails';
import { TagVisible } from '../TagVisible';
import { TagNoVisible } from '../TagNoVisible';
import { ModalDeleteNotices } from './ModalDeleteNotices';
import { DrawerFormNotices } from './DrawerFormNotices';
import { noticeGetImage } from '@/utils/fetchData';
import { dateFormat } from '@/utils/format';

import styles from './DetailNotices.module.css';

export const DetailNotices = ({ noticeId, onCloseDrawer }) => {
	const { isFetching, data } = useGetNoticeById(noticeId);

	if (isFetching) return <SkeletonDetails />;

	return (
		<>
			<div className={styles.pictureInfo}>
				<img
					src={noticeGetImage(data.image)}
					alt='noticia'
					width={300}
					height={190}
				/>
			</div>

			<div className={styles.bodyInfo}>
				<h2>{data.title}</h2>

				<div className={styles.itemInfo}>
					Fuente:{' '}
					<a href={data.link} target='_blank' className={styles.itemData}>
						{data.source}
					</a>
				</div>

				<div className={styles.itemInfo}>
					Fecha publicación:{' '}
					<span className={styles.itemData}>{dateFormat(data.date)}</span>
				</div>

				<div className={styles.itemInfo}>
					Estado:{' '}
					<span className={styles.itemData}>
						{+data.visible === 1 ? <TagVisible /> : <TagNoVisible />}
					</span>
				</div>
			</div>

			<div className={styles.btnRow}>
				<ModalDeleteNotices
					noticeId={noticeId}
					onCloseDrawerDetail={onCloseDrawer}
				/>
				<DrawerFormNotices
					noticeId={noticeId}
					onCloseDrawerDetail={onCloseDrawer}
				/>
			</div>
		</>
	);
};
