import { Tag } from 'antd';
import { IconCircleCheck } from '../Icons';

export const TagVisible = () => {
	return (
		<Tag className='iconBtn' icon={<IconCircleCheck size={16} />} color='success'>
			Visible
		</Tag>
	);
};
