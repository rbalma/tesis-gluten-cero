import { Link } from "react-router-dom";
import styles from './IntroductionSection.module.css';

export const IntroductionSection = () => {
	return (
		<section className={styles.sectionContainer}>
            <div className={styles.imageContainer}/>
			<div className={styles.textContainer}>
				<h1>
					Bienvenidos a <span>Gluten Cero</span>
				</h1>
				<h2>¡El poder de la tecnología al servicio de la inclusión y el bienestar!</h2>
                <p>Gluten Cero es tu espacio en línea para vivir una vida plena sin gluten.<br></br>
                Aquí encontrarás todo lo que necesitas para navegar el mundo sin restricciones.<br></br>
                Te invitamos a explorar nuestro contenido y a formar parte de nuestra comunidad.</p>
				<div style={{ display: 'flex' }}>
					<Link to={'/quienes-somos'} className={styles.btnStarted}>
						Quienes somos
					</Link>
				</div>
			</div>
		</section>
	);
};