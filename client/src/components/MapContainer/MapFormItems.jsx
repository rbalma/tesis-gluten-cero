import { Form, Input } from 'antd';
import { LocationPinIcon, MapPinIcon, WorldIcon } from '../Icons';

import styles from './MapFormContainer.module.css';

const rules = [{ required: true, message: '' }];

export const MapFormItems = () => {
	return (
		<>
			<p className={styles.mapTextInfo}>Revisa que los datos sean correctos:</p>
			<Form.Item name='direction' label='Dirección' rules={rules}>
				<Input className='formItemMapInput' prefix={<LocationPinIcon />} />
			</Form.Item>
			<Form.Item name='city' label='Ciudad' rules={rules}>
				<Input className='formItemMapInput' prefix={<WorldIcon />} />
			</Form.Item>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
				<Form.Item name='latitude' label='Latitud' rules={rules}>
					<Input
						className='formItemMapInput'
						prefix={<MapPinIcon />}
						readOnly
					/>
				</Form.Item>

				<Form.Item name='longitude' label='Longitud' rules={rules}>
					<Input
						className='formItemMapInput'
						prefix={<MapPinIcon />}
						readOnly
					/>
				</Form.Item>
			</div>
		</>
	);
};
