import {
	ProfileOutlined,
	EnvironmentOutlined,
	RobotOutlined,
	ShoppingCartOutlined,
	WechatOutlined,
} from '@ant-design/icons';

import styles from './ServicesSection.module.css';

export const ServicesSection = () => {
	return (
		<section className={styles.sectionBg}>
			<header className={styles.header}>
				<h3>Servicios</h3>
				<p>
					A través de Gluten Cero se podrá acceder a diferentes funcionalidades
					para brindar el mejor apoyo a la comunidad.
				</p>
			</header>

			<div className={styles.flexboxCards}>
				<div className={styles.box}>
					<div className={styles.icon}>
						<ProfileOutlined
							className={styles.iconAntd}
							style={{ color: '#ff689b' }}
						/>
					</div>
					<h4 className={styles.title}>Recetas</h4>
					<p className={styles.description}>
						Recetas sin tacc organizadas por categorías donde cada usuario podrá
						crear su propia receta para ser compartida con cualquier persona que
						visite nuestro sitio web{' '}
					</p>
				</div>

				<div className={styles.box}>
					<div className={styles.icon}>
						<ShoppingCartOutlined
							className={styles.iconAntd}
							style={{ color: '#e9bf06' }}
						/>
					</div>
					<h4 className={styles.title}>Productos</h4>
					<p className={styles.description}>
						Listado de productos libres de gluten aprobados por ANMAT y
						organizados en categorías. Además de información sobre las últimas
						ofertas en el mercado
					</p>
				</div>
			</div>

			<div className={styles.flexboxCards}>
				<div className={styles.box}>
					<div className={styles.icon}>
						<EnvironmentOutlined
							className={styles.iconAntd}
							style={{ color: '#3fcdc7' }}
						/>
					</div>
					<h4 className={styles.title}>Mapa</h4>
					<p className={styles.description}>
						Mapa interactivo con ubicaciones de restaurantes aptos para la
						consumición y centros de atención para la salud
					</p>
				</div>

				<div className={styles.box}>
					<div className={styles.icon}>
						<WechatOutlined
							className={styles.iconAntd}
							style={{ color: '#41cf2e' }}
						/>
					</div>
					<h4 className={styles.title}>Foro</h4>
					<p className={styles.description}>
						Foro que permite establecer contacto con otros usuarios y generar
						comunicación sobre diversos temas.
					</p>
				</div>
			</div>

			<div className={styles.flexboxCards}>
				<div className={styles.box}>
					<div className={styles.icon}>
						<RobotOutlined
							className={styles.iconAntd}
							style={{ color: '#4680ff' }}
						/>
					</div>
					<h4 className={styles.title}>Chatbot</h4>
					<p className={styles.description}>
						Ayuda inmediata al usuario mediante inteligencia artificial
					</p>
				</div>
			</div>
		</section>
	);
};
