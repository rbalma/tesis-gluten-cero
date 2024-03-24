import {
	UserOutlined,
	CommentOutlined,
	ClockCircleOutlined,
	TagOutlined,
} from '@ant-design/icons';

import styles from './CardRecipeDetail.module.css';

export const CardRecipeDetail = () => {
	return (
		<div className={styles.detailsRecipe}>
			<img
				className={styles.image}
				src='https://www.lavoz.com.ar/resizer/igh8fcDUwk3e7p8NyRsEfbPe4-8=/0x0:0x0/980x640/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/G4ZDQNBSHFTDKOJXGU2DMNBZGI.jpg'
				alt='Imagen receta'
				width='100%'
				height='auto'
			/>

			<div className={styles.body}>
				<div className={styles.title}>Rosca de Pascua</div>

				<div className={styles.info}>
					<span>
						{' '}
						<UserOutlined /> Ignacio Paez
					</span>
					<span>
						{' '}
						<TagOutlined /> Dulces
					</span>
					<span>
						{' '}
						<ClockCircleOutlined /> 20 de Marzo 2024
					</span>
					<span>
						{' '}
						<CommentOutlined /> 1 comentarios
					</span>
				</div>

				<article style={{ marginTop: '40px' }}>
					<h3 className={styles.ingredientsTitle}>Ingredientes</h3>
					<ul className={styles.ingredientsList}>
						<li className={styles.ingredientsItems}>
							500 g de harina de trigo
						</li>
						<li className={styles.ingredientsItems}>100 g de azúcar</li>
						<li className={styles.ingredientsItems}>1 pizca de sal</li>
						<li className={styles.ingredientsItems}>10 g de levadura fresca</li>
						<li className={styles.ingredientsItems}>200 ml de leche tibia</li>
						<li className={styles.ingredientsItems}>2 huevos</li>
						<li className={styles.ingredientsItems}>
							100 g de manteca derretida
						</li>
						<li className={styles.ingredientsItems}>
							1 cucharadita de esencia de vainilla
						</li>
						<li className={styles.ingredientsItems}>
							Ralladura de una naranja
						</li>
					</ul>
				</article>

				<article style={{ marginTop: '40px' }}>
					<h3 className={styles.ingredientsTitle}>Preparación</h3>
					<ol className={styles.stepsList}>
						<li className={styles.stepsListitem}>
							En una procesadora colocar la harina, la levadura activada en
							leche tibia, azúcar, sal, huevos, manteca derretida, esencia de
							vainilla y ralladura de naranja.
						</li>
						<li className={styles.stepsListitem}>
							Utilizar el accesorio amasador de la procesadora para formar el
							bollo.
						</li>
						<li className={styles.stepsListitem}>
							Dejar que la masa repose en el vaso, cubierta con un paño húmedo,
							hasta que duplique su tamaño.
						</li>
						<li className={styles.stepsListitem}>
							Dividir la masa en tres partes iguales y formar una trenza uniendo
							los extremos para crear la rosca. Colocarla en una bandeja y
							permitir que leude nuevamente.
						</li>
						<li className={styles.stepsListitem}>
							Hornear la rosca en un horno precalentado durante unos 25-30
							minutos.
						</li>
					</ol>
				</article>
			</div>
		</div>
	);
};
