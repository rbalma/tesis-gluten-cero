import { Link } from 'react-router-dom';
import styles from './AlertLoginRequired.module.css';

export const AlertLoginRequired = () => {
	return (
		<div className={styles.containerLoginRequired}>
			<p className={styles.titleLoginRequired}>
				Tienes que ser miembro de Gluten Cero para dejar un comentario
			</p>

			<div className={styles.flexLoginRequired}>
				<div className={styles.sectionLoginRequired}>
					<p className={styles.titleSectionLoginRequired}>
						Registrate en nuestra comunidad. ¡Es fácil!
					</p>
					<Link to='/registro' className={styles.btnLoginRequired}>
						Crear cuenta
					</Link>
				</div>

				<div className={styles.sectionLoginRequired}>
					<p className={styles.titleSectionLoginRequired}>
						¿Ya tienes una cuenta? Ingresa acá
					</p>
					<Link to='/ingreso' className={styles.btnLoginRequired}>
						Iniciar Sesión
					</Link>
				</div>
			</div>
		</div>
	);
};
