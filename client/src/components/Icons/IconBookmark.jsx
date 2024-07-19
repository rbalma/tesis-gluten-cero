export const IconBookmark = ({ size = 24, fill = 'none' }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={ size }
			height={ size }
			viewBox='0 0 24 24'
			fill={fill}
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tabler icons-tabler-outline icon-tabler-bookmark'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z' />
		</svg>
	);
};
