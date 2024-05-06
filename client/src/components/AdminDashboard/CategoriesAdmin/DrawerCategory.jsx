import { IconCirclePlus, IconEdit, IconX } from '@/components/Icons';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { FormCategory } from './FormCategory';

export const DrawerCategory = ({ categoryId }) => {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			{categoryId ? (
				<Button
					type='default'
					icon={<IconEdit size={22} />}
					onClick={showDrawer}
				/>
			) : (
				<Button
					className='iconBtn'
					type='primary'
					icon={<IconCirclePlus size={18} />}
					onClick={showDrawer}>
					Agregar
				</Button>
			)}

			<Drawer
				bodyStyle={{ padding: 20 }}
				destroyOnClose
				title={categoryId ? 'Editando Categoría' : 'Creando Categoría'}
				closable={false}
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<FormCategory onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
