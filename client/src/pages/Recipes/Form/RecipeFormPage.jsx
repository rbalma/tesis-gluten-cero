import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowBackUp } from '@/components/Icons';
import { FormRecipe } from '@/components/Recipe/FormRecipe/FormRecipe';
import { SuccessMessageForm } from '@/components/SuccessForm/SuccessMessageForm';

import styles from './RecipeFormPage.module.css';

export const RecipeFormPage = () => {
	const [isSuccessRecipe, setIsSuccessRecipe] = useState();

	return (
		<>
			<div className={styles.containerFormRecipe}>
				<FormRecipe setIsSuccessRecipe={setIsSuccessRecipe} />
			</div>
			{isSuccessRecipe ? (
				<SuccessMessageForm>
					<h1>La receta creada está en revisión</h1>
					<p>
						Todas las recetas se someten a un proceso de revisión estándar.
						<br /> Si se aprueba tu receta, aparecerá visible para los demás en
						Gluten Cero
					</p>

					<Link to='/recetas'>
						{' '}
						<IconArrowBackUp size={20} /> Regresar a las recetas
					</Link>
				</SuccessMessageForm>
			) : null}
		</>
	);
};
