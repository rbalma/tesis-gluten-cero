import { useState } from 'react';
import { Button, Popover, Row, Slider } from 'antd';
import { IconChevronDown } from '@/components/Icons';

import styles from './FiltersMarkers.module.css';

export const DistanceRadius = ({ radiusFiltered, setFilters }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenChange = (open) => setIsOpen(open);

	return (
		<Popover
			placement='bottomLeft'
			title={null}
			content={
				<SliderRadius
					handleOpenChange={handleOpenChange}
					radiusFiltered={radiusFiltered}
					setFilters={setFilters}
				/>
			}
			showArrow={false}
			align={{ offset: [0, -10] }}
			open={isOpen}
			destroyTooltipOnHide
			onOpenChange={handleOpenChange}
			trigger='click'>
			<span className={styles.buttonFilter} onClick={(e) => e.preventDefault()}>
				Radio de Distancia{' '}
				<span className={isOpen ? styles.less : styles.more}>
					<IconChevronDown size={16} />
				</span>{' '}
			</span>
		</Popover>
	);
};

export const SliderRadius = ({
	handleOpenChange,
	radiusFiltered,
	setFilters,
}) => {
	const [radio, setRadio] = useState(radiusFiltered);

	const handleApplyFilter = () => {
		setFilters({
			meters: radio,
		});
		handleOpenChange(false);
	};

	return (
		<div className={styles.menuRadius}>
			<h2>{radio} Mtrs</h2>
			<span>Radio alrededor del destino seleccionado</span>
			<Slider
				min={500}
				max={5000}
				step={500}
				onChange={(value) => setRadio(value)}
				value={radio}
			/>

			<Row style={{ paddingTop: 10 }} justify='space-between'>
				<Button size='small' onClick={() => handleOpenChange(false)}>
					Cancelar
				</Button>
				<Button size='small' type='primary' onClick={handleApplyFilter}>
					Aceptar
				</Button>
			</Row>
		</div>
	);
};
