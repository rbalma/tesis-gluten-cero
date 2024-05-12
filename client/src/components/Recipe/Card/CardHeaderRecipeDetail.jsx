import { Link } from 'react-router-dom';

import styles from './CardRecipeDetail.module.css';

export const CardHeaderRecipeDetail = () => {
	return (
		<header className={styles.headerRecipeDetail}>
			<h1>Rosca de Pascua</h1>
			<span className={styles.linesCategory}>
				<span>
					<Link to='/recetas'>DULCES</Link>
				</span>
			</span>
		</header>
	);
};
