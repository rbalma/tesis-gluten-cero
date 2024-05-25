export const IconCircleCheck = ({ size = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={1.5}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tabler icons-tabler-outline icon-tabler-circle-check'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
			<path d='M9 12l2 2l4 -4' />
		</svg>
	);
};
