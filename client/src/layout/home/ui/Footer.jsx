import styles from './Footer.module.css';

const Footer = () => {
	return (
			<footer className={styles.container}>
				<div className={styles.copyright}>
					&copy; Copyright <b>Gluten Cero</b> 2022
				</div>
				<div className={styles.credits}>
					Desarrollado por{' '}
					<a
						className={styles.link}
						target='_blank'
						rel='noreferrer'
						href='https://www.institucional.frc.utn.edu.ar/sistemas/Areas/Academica/ProyectoFinal/Proyectos/Detalle.asp?id=113'
					>
						{' '}
						estudiantes UTN FRC
					</a>
				</div>
			</footer>
	);
};

export default Footer;
