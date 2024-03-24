import { Progress, Collapse, Input, Button, Rate } from 'antd';
import {
	IconArrowNarrowLeft,
	IconCirclePlus,
	StarFilledIcon,
} from '@/components/Icons';

import styles from './MapReviews.module.css';
import { MapReviewsFilters } from './Filters/MapReviewsFilters';
import { MapReviewsComment } from './MapReviewsComment';

export const MapReviews = ({ setIsReviews }) => {
	return (
		<>
			<a className={styles.btnBack} onClick={() => setIsReviews(false)}>
				<IconArrowNarrowLeft /> Volver
			</a>
			<div className={styles.header}>
				<h2>Patio Olmos Shopping</h2>
				<div className={styles.averageContainer}>
					<span>
						<StarFilledIcon size={36} /> 4.8
					</span>
					8 opiniones
				</div>
			</div>
			<div className={styles.reviewsContainer}>
				<p>Opiniones</p>
				<span>
					<strong>5</strong>
					<StarFilledIcon />{' '}
					<Progress
						percent={30}
						strokeColor='#FADB14'
						trailColor='#ddd'
						format={(percent) => percent}
					/>
				</span>
			</div>
			<Collapse
				ghost
				expandIcon={({ isActive }) => (
					<span
						style={{
							transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
							display: 'flex',
						}}>
						<IconCirclePlus size={22} />
					</span>
				)}>
				<Collapse.Panel
					collapsible='header'
					style={{ fontSize: 16 }}
					header='Escribir una opinión'
					key='1'>
					<Rate allowHalf defaultValue={0} />
					<Input.TextArea
						placeholder='Comparte tu experiencia en este lugar'
						autoSize={{
							minRows: 2,
							maxRows: 4,
						}}
					/>
					{/* Habilitar botón para publicar una vez que haya seleccionado cantidad de estrellas */}
					<Button>Confirmar</Button>
				</Collapse.Panel>
			</Collapse>

			<MapReviewsFilters />

			<MapReviewsComment />
		</>
	);
};
