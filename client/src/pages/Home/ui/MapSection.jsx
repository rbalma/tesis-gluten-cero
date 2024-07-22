import styles from './MapSection.module.css';
import video from '@/assets/images/traffic.mp4'

export const MapSection = () => {
	return (
		<section className={styles.container}>
			<div className={styles.info}>
				<h3 className={styles.title}>Consulta nuestro <span>Mapa</span> </h3>
				<p className={styles.text}>
					Podrás encontrar los mejores restaurantes, comercios y hospitales para
					ir a visitar
				</p>
			</div>
			<div className={styles.videoContainer}>
			<video loop autoPlay muted>
				<source src={video} type='video/mp4' />
			</video>
			</div>
		</section>
	);
};
