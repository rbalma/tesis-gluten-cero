import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IconChevronDown } from '@/components/Icons';

import styles from './StepSummaryRecipe.module.css';

const categoriesFilters = {
	type: 'R',
	visible: '1',
};

export const StepSummaryRecipe = ({ setCurrent, formInstance }) => {
	const [image, setImage] = useState('');
	const recipe = formInstance.getFieldsValue(true);

	const queryClient = useQueryClient();
	const categories = queryClient
		.getQueryData(['categories', categoriesFilters])
		?.find((category) => category._id === recipe.category);

	useEffect(() => {
		const urlImage = async () => {
			if (recipe.image[0].uid.startsWith('http'))
				return setImage(recipe.image[0].uid);

			const src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(recipe.image[0].originFileObj);
				reader.onload = () => resolve(reader.result);
			});
			setImage(src);
		};

		if (recipe.image?.[0]?.uid) urlImage();
	}, [recipe.image?.[0]?.uid]);

	return (
		<div className={styles.containerSummary}>
			<header className={styles.headerSummary}>
				<h1 className={styles.titleSummary}>Revisa los datos</h1>

				<span
					className={styles.backToForm}
					onClick={() => setCurrent((current) => current - 1)}>
					<IconChevronDown size={18} /> Volver a Editar la Receta
				</span>
			</header>

			<div className={styles.rowDataItems} style={{ alignItems: 'flex-end' }}>
				<div>
					<div className={styles.dataRecipeItem} style={{ marginBottom: 30 }}>
						<h2>Título</h2>
						<span>{recipe.title}</span>
					</div>
					<div className={styles.rowData}>
						<div className={styles.dataRecipeItem}>
							<h2>Categoría</h2>
							<span>{categories?.name}</span>
						</div>

						<div className={styles.dataRecipeItem}>
							<h2>Tiempo de preparación</h2>
							<span>{recipe.preparationTime} minutos</span>
						</div>

						<div className={styles.dataRecipeItem}>
							<h2>Rendimiento</h2>
							<span>{recipe.performance} porciones</span>
						</div>
					</div>
				</div>
				<img src={image} alt='recipe' width={220} />
			</div>

			<div className={styles.rowDataItems} style={{ alignItems: 'flex-start' }}>
				<div className={styles.dataRecipeItem}>
					<h2>Procedimiento</h2>
					<ol>
						{recipe.instructions?.map((instruction) => (
							<li key={instruction}>{instruction}</li>
						))}
					</ol>
				</div>
				<div className={styles.dataRecipeItem}>
					<h2>Ingredientes</h2>
					<ul>
						{recipe.ingredients?.map((ingredient) => (
							<li key={ingredient}>{ingredient}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
