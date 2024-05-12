import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@/components/Icons';
import { CardHeaderRecipeDetail } from './CardHeaderRecipeDetail';
import { ExtraDataRecipeCard } from './ExtraDataRecipeCard';

import styles from './CardRecipeDetail.module.css';

const getPageMargins = () => {
	return `@page { margin: 30px !important; }`;
};

export const CardRecipeDetail = ({ forwardRef }) => {
	const [fav, setFav] = useState(false);

	const addFav = () => {
		if (!fav) {
			setFav(true);
		} else {
			setFav(false);
		}
	};

	return (
		<>
			<style>{getPageMargins()}</style>

			<div ref={forwardRef} className={styles.detailsRecipe}>
				<div className={styles.headerPrint}>
					<CardHeaderRecipeDetail />
				</div>
				<div className={styles.imageDetailRecipe}>
					<img
						className={styles.imageDetailRecipe}
						src='https://www.lavoz.com.ar/resizer/igh8fcDUwk3e7p8NyRsEfbPe4-8=/0x0:0x0/980x640/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/G4ZDQNBSHFTDKOJXGU2DMNBZGI.jpg'
						alt='Imagen receta'
					/>
					{/* Like Button */}
					<span
						className={`${styles.likeRecipe} ${fav && styles.likeRecipeActive}`}
						onClick={addFav}>
						{!fav ? <IconHeart size={28} /> : <IconHeartFilled size={28} />}
					</span>
				</div>

				<div className={styles.body}>
					<div className={styles.userInfoDetailRecipe}>
						<em>Publicada por </em> Becca Mills <em> el </em> 8 de Marzo, 2018
						<em> (última actualización 9 de Junio, 2024)</em>
					</div>

					<ExtraDataRecipeCard />

					<section style={{ marginTop: 30 }}>
						<h3 className={styles.sectionTitle}>
							Ingredientes <div className={styles.sectionLine} />
						</h3>

						<div className={styles.ingredientsList}>
							<label className={styles.ingredientsItems}>
								<input type='checkbox' name='checkbox' />
								<span>100 g de azúcar</span>
							</label>

							<label className={styles.ingredientsItems}>
								<input type='checkbox' name='checkbox' />
								<span>100 g de azúcar</span>
							</label>

							<label className={styles.ingredientsItems}>
								<input type='checkbox' name='checkbox' />
								<span>500 g de harina de trigo</span>
							</label>

							<label className={styles.ingredientsItems}>
								<input type='checkbox' name='checkbox' />
								<span>1 cucharadita de esencia de vainilla</span>
							</label>
						</div>
					</section>

					<section style={{ marginTop: 40 }}>
						<h3 className={styles.sectionTitle}>
							Instrucciones <div className={styles.sectionLine} />
						</h3>

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
								Dejar que la masa repose en el vaso, cubierta con un paño
								húmedo, hasta que duplique su tamaño.
							</li>
							<li className={styles.stepsListitem}>
								Dividir la masa en tres partes iguales y formar una trenza
								uniendo los extremos para crear la rosca. Colocarla en una
								bandeja y permitir que leude nuevamente.
							</li>
							<li className={styles.stepsListitem}>
								Hornear la rosca en un horno precalentado durante unos 25-30
								minutos.
							</li>
						</ol>
					</section>
				</div>
			</div>
		</>
	);
};
