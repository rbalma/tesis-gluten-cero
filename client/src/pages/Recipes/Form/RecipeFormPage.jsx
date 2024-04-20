import { useState } from 'react';
import { FormRecipe } from '@/components/Recipe/FormRecipe/FormRecipe';
import { SuccessCreatedRecipe } from '@/components/Recipe/FormRecipe/SuccessCreatedRecipe';

import styles from './RecipeFormPage.module.css';

export const RecipeFormPage = () => {
	const [isSuccessRecipe, setIsSuccessRecipe] = useState();

	return (
		<>
			<div className={styles.containerFormRecipe}>
				<FormRecipe setIsSuccessRecipe={setIsSuccessRecipe} />
			</div>
			{isSuccessRecipe ? <SuccessCreatedRecipe /> : null}
		</>
	);
};
