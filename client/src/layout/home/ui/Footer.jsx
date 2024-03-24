import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.copyright}>
				&copy; Copyright <b>Gluten Cero</b> {currentYear}
			</div>
			<div className={styles.credits}>
				Desarrollado por estudiantes de la{' '}
				<a
					className={styles.link}
					target='_blank'
					rel='noreferrer'
					href='https://www.frc.utn.edu.ar'>
					{' '}
					Universidad Tecnológica Nacional
				</a>
			</div>
		</footer>
	);
};

export default Footer;
