import { Skeleton } from 'antd';

export const SkeletonDetails = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 20,
			}}>
			<Skeleton.Avatar active={true} size={250} shape='square' />

			<Skeleton active={true} />
			<Skeleton active={true} block={true} />
		</div>
	);
};
