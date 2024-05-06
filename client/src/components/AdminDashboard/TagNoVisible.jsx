import { Tag } from 'antd';
import { IconExclamationCircle } from '../Icons';

export const TagNoVisible = () => {
	return (
		<Tag className='iconBtn' icon={<IconExclamationCircle size={16} />} color='error'>
			No Visible
		</Tag>
	);
};
