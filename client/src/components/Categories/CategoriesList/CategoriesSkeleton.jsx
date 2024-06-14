import { Skeleton } from 'antd';

const style = {
	width: 130,
	height: 98,
	borderRadius: 10,
};

export const CategoriesSkeleton = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}>
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
		</div>
	);
};
