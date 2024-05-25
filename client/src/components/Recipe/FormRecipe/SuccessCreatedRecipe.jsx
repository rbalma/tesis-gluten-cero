import { Link } from 'react-router-dom';
import { CheckmarkIcon } from '@/components/Checkmark/CheckmarkIcon';
import { IconArrowBackUp } from '@/components/Icons';

import styles from './SuccessCreatedRecipe.module.css';

export const SuccessCreatedRecipe = () => {
	return (
		<div className={styles.containerSuccessRecipe}>
			<CheckmarkIcon />

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
		</div>
	);
};
