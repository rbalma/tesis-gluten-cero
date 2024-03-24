export const IconCurrentLocation = ({ size = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='icon icon-tabler icon-tabler-current-location'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='rgba(0,0,0,.45)'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
			<path d='M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0' />
			<path d='M12 2l0 2' />
			<path d='M12 20l0 2' />
			<path d='M20 12l2 0' />
			<path d='M2 12l2 0' />
		</svg>
	);
};
