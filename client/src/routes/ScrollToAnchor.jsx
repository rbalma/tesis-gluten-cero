import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
	const location = useLocation();
	const lastHash = useRef('');
	const navbarHeight = 80;

	useEffect(() => {
		if (location.hash.length > 0) {
			lastHash.current = location.hash.slice(1);
		}

		if (
			lastHash.current.length > 0 &&
			document.getElementById(lastHash.current) != null
		) {
			setTimeout(() => {
				//  s
				const element = document.getElementById(lastHash.current);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				if (element) {
					const elementPosition =
						element.getBoundingClientRect().top + window.scrollY;
					window.scrollTo({
						top: elementPosition - navbarHeight,
						behavior: 'smooth',
					});
				}
				// s
			}, 100);
		}
	}, [location]);

	return null;
};

export default ScrollToAnchor;
