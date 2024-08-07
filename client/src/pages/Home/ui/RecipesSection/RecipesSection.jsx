import { Slide } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import { IconArrowNarrowLeft } from '@/components/Icons';
import picture from '@/assets/images/recetas.jpg';

import styles from './RecipesSection.module.css';

export const RecipesSection = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.recipesContainer}>
			<img src={picture} alt='recipes' className={styles.recipeImage} />

			<div className={styles.recipesInfo}>
				<h2 className={styles.title}>
					Tenemos las mejores <br /> <span>Recetas</span>
				</h2>
				<p>
					Deliciosas recetas sin gluten para saborear cada día con alegría y
					salud.
				</p>
				<p>
					Incluye algunas populares y favoritas entre la comunidad celíaca,
					asegurándote de proporcionar instrucciones claras y precisas.
				</p>
				<Slide direction='left' triggerOnce>
					<button
						className={styles.btnRecipe}
						onClick={() => navigate('/recetas')}>
						Ir a las Recetas <IconArrowNarrowLeft />
					</button>
				</Slide>
			</div>
		</div>
	);
};
