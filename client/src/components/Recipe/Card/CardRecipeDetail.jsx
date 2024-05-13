import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@/components/Icons';
import { CardHeaderRecipeDetail } from './CardHeaderRecipeDetail';
import { ExtraDataRecipeCard } from './ExtraDataRecipeCard';

import styles from './CardRecipeDetail.module.css';
import { dateFormat } from '@/utils/format';

const getPageMargins = () => {
	return `@page { margin: 30px !important; }`;
};

export const CardRecipeDetail = ({ recipe, forwardRef }) => {
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
					<CardHeaderRecipeDetail
						title={recipe.title}
						category={recipe.category.name}
					/>
				</div>
				<div className={styles.imageDetailRecipe}>
					<img
						className={styles.imageDetailRecipe}
						src={recipe.image.secure_url}
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
						<em>Publicada por </em> {recipe.user.name} {recipe.user.lastname}{' '}
						<em> el </em> {dateFormat(recipe.createdAt)}
						<em>
							{recipe.isUpdated
								? `(última actualización ${dateFormat(recipe.updatedAt)})`
								: ''}
						</em>
					</div>

					<ExtraDataRecipeCard
						preparationTime={recipe.preparationTime}
						performance={recipe.performance}
						ratingAverage={recipe.ratingAverage}
						ratingCount={recipe.ratingCount}
					/>

					<section style={{ marginTop: 30 }}>
						<h3 className={styles.sectionTitle}>
							Ingredientes <div className={styles.sectionLine} />
						</h3>

						<div className={styles.ingredientsList}>
							{recipe.ingredients.map((ingredient, index) => (
								<label key={index} className={styles.ingredientsItems}>
									<input type='checkbox' name='checkbox' />
									<span>{ingredient}</span>
								</label>
							))}
						</div>
					</section>

					<section style={{ marginTop: 40 }}>
						<h3 className={styles.sectionTitle}>
							Instrucciones <div className={styles.sectionLine} />
						</h3>

						<ol className={styles.stepsList}>
							{recipe.instructions.map((instruction, index) => (
								<li key={index} className={styles.stepsListitem}>
									{instruction}
								</li>
							))}
						</ol>
					</section>
				</div>
			</div>
		</>
	);
};
