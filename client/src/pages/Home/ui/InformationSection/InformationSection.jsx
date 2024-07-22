import styles from './InformationSection.module.css';

export const InformationSection = () => {
	return (
		<section className={styles.sectionContainer}>
			<div className={styles.imageContainer} />
			<div className={styles.textContainer}>
				<h1>¿Qué es la <span>Celiaquía ?</span></h1>
				<p>
					La celiaquía es una enfermedad autoinmune que se produce cuando el
					cuerpo reacciona al gluten, una proteína que se encuentra en el trigo,
					la cebada y el centeno.
				</p>
				<p>
					Esta reacción puede causar daño al intestino delgado y dificultar la
					absorción de nutrientes.
				</p>
				<p>
					Esto produce diferentes consecuencias en la persona, tanto fisicas,
					como emocionales
				</p>
				<p>
					En nuestro sitio web, encontrarás información útil sobre la celiaquía,
					consejos para llevar una vida sin riesgos y una comunidad de apoyo.
				</p>
			</div>
		</section>
	);
};
