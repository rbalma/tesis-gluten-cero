import { Link } from 'react-router-dom';
import { CardPost } from './CardPost';
import styles from './PostList.module.css';

export const PostsList = () => {
	return (
		<>
			<CardPost />
			<div className={styles.noLogin}>
				<p className={styles.noLoginTitle}>
					Crea una cuenta o inicia sesión para comentar
				</p>
				<p className={styles.noLoginSubtitle}>
					Tienes que ser miembro de Gluten Cero para dejar un comentario
				</p>

				<div className={styles.buttonGroup}>
					<div className={styles.noLoginSection}>
						<p className={styles.noLoginButtonTitle}>
							Registrate en nuestra comunidad. ¡Es fácil!
						</p>
						<Link to='/register' className={styles.btnPost}>
							Crear cuenta
						</Link>
					</div>

					<div className={styles.noLoginSection}>
						<p className={styles.noLoginButtonTitle}>
							¿Ya tienes una cuenta? Ingresa acá
						</p>
						<Link to='/login' className={styles.btnPost}>
							Iniciar Sesión
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
