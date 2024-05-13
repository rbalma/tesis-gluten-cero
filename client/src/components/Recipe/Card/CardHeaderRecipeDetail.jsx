import { Link } from 'react-router-dom';

import styles from './CardRecipeDetail.module.css';

export const CardHeaderRecipeDetail = ({ title, category }) => {
	return (
		<header className={styles.headerRecipeDetail}>
			<h1>{ title }</h1>
			<span className={styles.linesCategory}>
				<span>
					<Link to='/recetas'>{ category }</Link>
				</span>
			</span>
		</header>
	);
};
