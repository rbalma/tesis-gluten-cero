import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { IconEye, IconX } from '@/components/Icons';
import { DetailRecipes } from './DetailRecipes';

export const DrawerDetailRecipes = ({ recipeId }) => {
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
				title='Receta'
				closable={false}
				push={false}
				extra={
					<span style={{ cursor: 'pointer' }} onClick={onClose}>
						<IconX />
					</span>
				}
				onClose={onClose}
				open={open}>
				<DetailRecipes recipeId={recipeId} onCloseDrawer={onClose} />
			</Drawer>
		</>
	);
};
