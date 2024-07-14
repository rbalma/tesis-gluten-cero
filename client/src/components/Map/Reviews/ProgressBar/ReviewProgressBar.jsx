import { Progress } from 'antd';
import { StarFilledIcon } from '@/components/Icons';

export const ReviewProgressBar = ({ star, percent }) => {
	return (
		<span>
			<strong>{star}</strong>
			<StarFilledIcon />{' '}
			<Progress
				percent={percent}
				strokeColor='#FADB14'
				trailColor='#ddd'
				format={(percent) => `${percent} %`}
			/>
		</span>
	);
};
