import { Skeleton } from 'antd';

const style = {
	width: 270,
	height: 320,
	borderRadius: 10,
};

export const SkeletonCardsRecipes = () => {
	return (
    <>
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
			<Skeleton.Avatar active={true} style={style} shape='square' />
      </>
	);
};