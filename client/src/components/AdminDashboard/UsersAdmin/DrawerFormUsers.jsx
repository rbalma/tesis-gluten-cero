import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { IconCirclePlus, IconX } from '@/components/Icons';
import { FormUsers } from './FormUsers';

export const DrawerFormUsers = () => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
				<Button
					className='iconBtn'
					type='primary'
					icon={<IconCirclePlus size={18} />}
					onClick={showDrawer}>
					Agregar
				</Button>

			<Drawer
				bodyStyle={{ padding: 20 }}
				title='Creando Usuario'
				closable={false}
				destroyOnClose
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<FormUsers onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
