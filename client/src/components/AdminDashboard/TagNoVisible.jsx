import { Tag } from 'antd';
import { IconExclamationCircle } from '../Icons';

export const TagNoVisible = ({ isUser = false }) => {
	return (
		<Tag
			className='iconBtn'
			icon={<IconExclamationCircle size={16} />}
			color='error'>
			{isUser ? 'Inactivo' : 'No Visible'}
		</Tag>
	);
};
