import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { IconEye, IconX } from '@/components/Icons';
import { DetailMarkers } from './DetailMarkers';

export const DrawerDetailMarkers = ({ markerId }) => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button icon={<IconEye size={22} />} onClick={showDrawer} />

			<Drawer
				bodyStyle={{ padding: 0, backgroundColor: '#F5F5F5' }}
				title='Marcador'
				closable={false}
				push={false}
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<DetailMarkers markerId={markerId} onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
