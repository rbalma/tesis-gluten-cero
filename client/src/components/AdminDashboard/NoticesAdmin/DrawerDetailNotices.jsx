import { useState } from 'react';
import { IconEye, IconX } from '@/components/Icons';
import { Button, Drawer } from 'antd';
import { DetailNotices } from './DetailNotices';

export const DrawerDetailNotices = ({ noticeId }) => {
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
				icon={<IconEye size={22} />}
				onClick={showDrawer}
			/>

			<Drawer
				bodyStyle={{ padding: 0, backgroundColor: '#F5F5F5' }}
				title='Noticia'
				closable={false}
				push={false}
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<DetailNotices noticeId={noticeId} onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
