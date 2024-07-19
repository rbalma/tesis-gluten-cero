import { Skeleton } from 'antd';

const flexStyles = {
	height: 150,
	overflow: 'hidden',
};

const inputStyle = {
	height: 90,
	margin: '0 20px 10px',
	width: '90%',
};

export const SkeletonListScroll = () => {
	return (
		<div style={flexStyles}>
			<Skeleton.Input active={true} block={true} style={inputStyle} />
			<Skeleton.Input active={true} block={true} style={inputStyle} />
		</div>
	);
};
