import styles from './MapSection.module.css';

export const MapSection = () => {
	return (
		<section className={styles.container}>
			<div className={styles.info}>
				<h3 className={styles.title}> Visita Nuestro Mapa </h3>
				<p className={styles.text}>
					Podrás encontrar los mejores restaurantes, comercios y hospitales para
					ir a visitar
				</p>
			</div>
		</section>
	);
};
