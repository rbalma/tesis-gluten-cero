import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { IconCirclePlus, IconEdit, IconX } from '@/components/Icons';
import { FormNotices } from './FormNotices';

export const DrawerFormNotices = ({ noticeId, onCloseDrawerDetail }) => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
	if (noticeId) onCloseDrawerDetail();
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			{noticeId ? (
				<Button
					size='small'
					className='iconBtn'
					icon={<IconEdit size={14} />}
					onClick={showDrawer}>
					Editar
				</Button>
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
				title={noticeId ? 'Editando Noticia' : 'Creando Noticia'}
				closable={false}
				destroyOnClose
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<FormNotices noticeId={noticeId} onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
