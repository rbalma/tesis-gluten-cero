import { IconChevronDown } from '@/components/Icons';
import styles from './StepSummaryRecipe.module.css';

export const StepSummaryRecipe = ({ setCurrent }) => {
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

			<div className={styles.rowDataItems} style={{ alignItems: 'flex-end'}}>
				<div>
					<div className={styles.dataRecipeItem} style={{ marginBottom: 30 }}>
						<h2>Título</h2>
						<span>Nueva receta</span>
					</div>
					<div className={styles.rowData}>
						<div className={styles.dataRecipeItem}>
							<h2>Categoría</h2>
							<span>Dulces</span>
						</div>

						<div className={styles.dataRecipeItem}>
							<h2>Tiempo de preparación</h2>
							<span>15 minutos</span>
						</div>

						<div className={styles.dataRecipeItem}>
							<h2>Rendimiento</h2>
							<span>5 porciones</span>
						</div>
					</div>
				</div>
				<img
					src='https://goodies.icons8.com/web/landings/home/landing-main_icons.jpg'
					alt='recipe'
					width={220}
				/>
			</div>

			<div className={styles.rowDataItems} style={{ alignItems: 'flex-start'}}>
      <div className={styles.dataRecipeItem}>
					<h2>Procedimiento</h2>
					<ol>
						<li>Cortar el tomate</li>
						<li>Pelar las papas</li>
						<li>Tirar el jugo de limón</li>
						<li>Pelar las papas</li>
						<li>Tirar el jugo de limón</li>
						<li>Pelar las papas</li>
					</ol>
				</div>
				<div className={styles.dataRecipeItem}>
					<h2>Ingredientes</h2>
					<ul>
						<li>Un limón</li>
						<li>Un tomate</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
