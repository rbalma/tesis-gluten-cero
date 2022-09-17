import { Link } from "react-router-dom";
import styles from './Banner.module.css';

export const Banner = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<h1>
					Bienvenido a <span>Gluten Cero</span>
				</h1>
				<h2>Forma parte de nuestra comunidad</h2>
				<div style={{ display: 'flex' }}>
					<Link to={'/quienes-somos'} className={styles.btnStarted}>
						Quienes somos
					</Link>
				</div>
			</div>
		</section>
	);
};
