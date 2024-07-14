import React from 'react';
import { Skeleton } from 'antd';

const flexStyles = {
	display: 'flex',
	flexDirection: 'column',
	fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
	height: 300,
	width: '100%',
	overflow: 'hidden'
};

const inputStyle = {
	height: 110,
	marginBottom: 5,
};

export const SkeletonListScroll = () => {
	return (
		<div style={flexStyles}>
			<Skeleton.Input active={true} block={true} style={inputStyle} />
			<Skeleton.Input active={true} block={true} style={inputStyle} />
			<Skeleton.Input active={true} block={true} style={inputStyle} />
		</div>
	);
};
