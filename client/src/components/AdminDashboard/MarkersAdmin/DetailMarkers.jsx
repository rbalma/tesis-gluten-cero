import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { IconEdit, IconStar } from '@/components/Icons';
import { SkeletonDetails } from '../Skeleton/SkeletonDetails';
import { TagVisible } from '../TagVisible';
import { TagNoVisible } from '../TagNoVisible';
import { ModalDeleteMarkers } from './ModalDeleteMarkers';
import { useGetMarkerById } from '@/services/queries/mapQueries';

import styles from './DetailMarkers.module.css';

export const DetailMarkers = ({ markerId, onCloseDrawer }) => {
	const navigate = useNavigate();
	const { isFetching, data } = useGetMarkerById(markerId);

	if (isFetching) return <SkeletonDetails />;

	return (
		<>
			<div className={styles.pictureInfo}>
				<Avatar
					src={data.image.secure_url}
					alt='marker'
					shape='square'
					size={180}
				/>
			</div>

			<div className={styles.bodyInfo}>
				<h2>{data.name}</h2>

				<div className={styles.itemInfo}>
					Categoría:{' '}
					<span className={styles.itemData}>{data.category.name}</span>
				</div>

				<div className={styles.itemInfo}>
					Dirección: <span className={styles.itemData}>{data.direction}</span>
				</div>

				<div className={styles.itemInfo}>
					Latitud:{' '}
					<span className={styles.itemData}>
						{data.location.coordinates[1]}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Longitud:{' '}
					<span className={styles.itemData}>
						{data.location.coordinates[0]}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Teléfono: <span className={styles.itemData}>{data.phone}</span>
				</div>

				<div className={styles.itemInfo}>
					Puntaje:{' '}
					<span className={styles.itemData}>
						{data.ratingAverage.$numberDecimal} <IconStar size={14} /> (
						{data.ratingCount})
					</span>
				</div>

				<div className={styles.itemInfo}>
					Estado:{' '}
					<span className={styles.itemData}>
						{data.active ? <TagVisible /> : <TagNoVisible />}
					</span>
				</div>
			</div>

			<div className={styles.btnRow}>
				<ModalDeleteMarkers
					markerId={markerId}
					markerName={data.name}
					onCloseDrawerDetail={onCloseDrawer}
				/>
				<Button
					type='default'
					size='small'
					className='iconBtn'
					onClick={() => navigate(`/mapa-formulario/${markerId}`)}
					icon={<IconEdit size={14} />}>
					Editar
				</Button>
			</div>
		</>
	);
};
