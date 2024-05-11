import { Tag } from 'antd';
import { IconCircleCheck } from '../Icons';

export const TagVisible = ({ isUser = false }) => {
	return (
		<Tag
			className='iconBtn'
			icon={<IconCircleCheck size={16} />}
			color='success'>
			{isUser ? 'Activo' : 'Visible'}
		</Tag>
	);
};
