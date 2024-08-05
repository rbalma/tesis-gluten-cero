import { Slide } from 'react-awesome-reveal';
import styles from './Banner.module.css';

export const Banner = () => {
	return (
		<section className={styles.hero}>
			<Slide direction='left' triggerOnce>
				<div className={styles.container}>
					<h1>
						Tu guía para una
						<span>vida sin gluten</span>
					</h1>

					<p>
						Este es tu espacio en línea para vivir una vida plena. Te invitamos
						a explorar nuestro contenido y a formar parte de nuestra comunidad.
					</p>

					{/* <button className={styles.btnStarted}>
					Unirme
				</button> */}
				</div>
			</Slide>
		</section>
	);
};
